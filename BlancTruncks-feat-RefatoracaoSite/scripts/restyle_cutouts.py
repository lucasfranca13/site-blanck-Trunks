"""
Restaura os recortes de baixa resolução do catálogo:
1. Super-resolução EDSR x4 (reconstrói detalhe, reduz o pixelado);
2. Remoção do fundo claro/uniforme (flood-fill + erosão da borda p/ tirar franja);
3. Recomposição sobre o gradiente charcoal de estúdio + sombra de contato;
4. Nitidez final. Saída JPG 4:5.

Uso: python scripts/restyle_cutouts.py
"""
from PIL import Image, ImageFilter
import numpy as np
import cv2
from cv2 import dnn_superres
import os
from collections import Counter, deque

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "public/img/masculino")
DST_DIR = os.path.join(ROOT, "public/img/colecao")
MODEL = os.path.join(ROOT, "scripts/models/EDSR_x4.pb")

CANVAS = (1000, 1250)
GARMENT_MAX_H, GARMENT_MAX_W = 980, 800

TOP = np.array([58, 52, 50], float)
BOT = np.array([24, 21, 20], float)
GLOW = np.array([84, 78, 80], float)

# itens: (origem, destino)
ITEMS = [
    ("img10.png", "moletom.jpg"),
    ("jaqueta-neoprene.png", "jaqueta-neoprene.jpg"),
    ("winstopper.png", "corta-vento-winstopper.jpg"),
    ("img4.png", "bermuda-preta.jpg"),
]

sr = dnn_superres.DnnSuperResImpl_create()
sr.readModel(MODEL)
sr.setModel("edsr", 4)


def super_res(pil_rgb):
    """EDSR x4 sobre RGB pequeno -> RGB grande e mais suave."""
    bgr = cv2.cvtColor(np.asarray(pil_rgb), cv2.COLOR_RGB2BGR)
    up = sr.upsample(bgr)  # x4
    rgb = cv2.cvtColor(up, cv2.COLOR_BGR2RGB)
    return Image.fromarray(rgb, "RGB")


def studio_bg(w, h):
    yy = np.linspace(0, 1, h)[:, None, None]
    grad = np.repeat(TOP[None, None, :] * (1 - yy) + BOT[None, None, :] * yy, w, axis=1)
    xs, ys = np.linspace(0, 1, w)[None, :], np.linspace(0, 1, h)[:, None]
    d = np.sqrt(((xs - 0.42) * 1.1) ** 2 + ((ys - 0.38) * 1.0) ** 2)
    glow = np.clip(1 - d / 0.85, 0, 1)[:, :, None] ** 1.6
    return np.clip(grad + (GLOW - grad) * glow * 0.35, 0, 255)


def garment_alpha(pil_rgb):
    """Máscara da peça calculada no ORIGINAL (fundo uniforme): remove só o
    fundo conectado às bordas e preenche buracos internos. Recorte limpo,
    sem morder a peça nem deixar placa."""
    rgb = np.asarray(pil_rgb).astype(np.int32)
    h, w, _ = rgb.shape
    ring = np.concatenate([
        rgb[:2].reshape(-1, 3), rgb[-2:].reshape(-1, 3),
        rgb[:, :2].reshape(-1, 3), rgb[:, -2:].reshape(-1, 3),
    ])
    bg = np.array(Counter(map(tuple, (ring // 12 * 12))).most_common(1)[0][0], np.int32) + 6
    dist = np.sqrt(((rgb - bg) ** 2).sum(2))
    bgcand = dist < 68

    visited = np.zeros((h, w), bool)
    dq = deque()
    for x in range(w):
        for y in (0, h - 1):
            if bgcand[y, x]:
                visited[y, x] = True; dq.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if bgcand[y, x] and not visited[y, x]:
                visited[y, x] = True; dq.append((y, x))
    while dq:
        y, x = dq.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and bgcand[ny, nx]:
                visited[ny, nx] = True; dq.append((ny, nx))

    mask = np.where(visited, 0, 255).astype(np.uint8)
    return Image.fromarray(mask, "L")


def process(src_name, dst_name):
    native = Image.open(os.path.join(SRC_DIR, src_name)).convert("RGB")
    alpha_n = garment_alpha(native)           # máscara no original (limpa)
    src = super_res(native)                   # 150 -> 600 (EDSR) só no RGB

    # leva a máscara para a resolução do EDSR, erode p/ tirar franja, suaviza
    alpha = alpha_n.resize(src.size, Image.LANCZOS).filter(ImageFilter.MinFilter(5))
    a = np.asarray(alpha)
    ys, xs = np.where(a > 24)
    pad = 8
    box = (max(xs.min() - pad, 0), max(ys.min() - pad, 0),
           min(xs.max() + pad, src.width), min(ys.max() + pad, src.height))
    cut = Image.merge("RGBA", (*src.split(), alpha)).crop(box)

    # escala para o alvo (suave, pois já veio do EDSR)
    scale = min(GARMENT_MAX_W / cut.width, GARMENT_MAX_H / cut.height)
    cut = cut.resize((round(cut.width * scale), round(cut.height * scale)), Image.LANCZOS)
    r, g, b, al = cut.split()
    rgb = Image.merge("RGB", (r, g, b)).filter(
        ImageFilter.UnsharpMask(radius=2.0, percent=80, threshold=2))
    al = al.filter(ImageFilter.GaussianBlur(1.2))
    cut = Image.merge("RGBA", (*rgb.split(), al))

    bg = Image.fromarray(studio_bg(*CANVAS).astype(np.uint8), "RGB").convert("RGBA")
    cx, cy = (CANVAS[0] - cut.width) // 2, (CANVAS[1] - cut.height) // 2

    shimg = Image.new("L", CANVAS, 0)
    shimg.paste(al.point(lambda v: int(v * 0.42)), (cx + 12, cy + 28))
    shimg = shimg.filter(ImageFilter.GaussianBlur(20))
    bg = Image.composite(Image.new("RGBA", CANVAS, (0, 0, 0, 255)), bg, shimg)

    bg.alpha_composite(cut, (cx, cy))
    bg.convert("RGB").save(os.path.join(DST_DIR, dst_name), quality=92)
    print("ok:", dst_name, "->", cut.size, "alpha%%=%.1f" % ((np.asarray(al) > 128).mean() * 100))


for s, d in ITEMS:
    process(s, d)

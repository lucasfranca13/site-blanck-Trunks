"""
Deixa o fundo dos recortes transparente (mantendo a foto original, sem
ampliar): remove só o fundo claro conectado às bordas. Assim a peça fica
uniforme sobre o tile do catálogo, no lugar do fundo branco.

Uso: python scripts/transparent_cutouts.py
"""
from PIL import Image, ImageFilter
import numpy as np
import os
from collections import Counter, deque

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "public/img/masculino")
DST = os.path.join(ROOT, "public/img/colecao")

ITEMS = [
    ("img10.png", "moletom.png"),
    ("jaqueta-neoprene.png", "jaqueta-neoprene.png"),
    ("winstopper.png", "corta-vento-winstopper.png"),
    ("img4.png", "bermuda-preta.png"),
]


def bg_mask(rgb):
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
    return visited  # True = fundo


def process(src_name, dst_name):
    im = Image.open(os.path.join(SRC, src_name)).convert("RGB")
    rgb = np.asarray(im).astype(np.int32)
    bg = bg_mask(rgb)
    alpha = Image.fromarray(np.where(bg, 0, 255).astype(np.uint8), "L")
    alpha = alpha.filter(ImageFilter.MinFilter(3))          # erode 1px (tira franja)
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.6))     # borda suave
    out = Image.merge("RGBA", (*im.split(), alpha))
    out.save(os.path.join(DST, dst_name))
    print("ok:", dst_name, out.size, "transparente%%=%.1f" % ((np.asarray(alpha) < 128).mean() * 100))


for s, d in ITEMS:
    process(s, d)

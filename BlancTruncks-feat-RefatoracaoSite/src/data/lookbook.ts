/**
 * Lookbook editorial da página /produtos — conceito "Field Manual".
 *
 * Curadoria a partir do arquivo fotográfico real da marca (public/img):
 * camisetas em estúdio, estampas de arquivo, peças técnicas e equipamento de
 * voo. Mantém-se separado de `products.ts`, que abastece a home — assim a
 * landing continua intacta enquanto o catálogo ganha vida própria.
 */

export const CONTACT = {
  instagram: "https://www.instagram.com/blacktrunksbrasil",
  whatsapp: "https://wa.me/5531999999999",
} as const;

/** Elementos gráficos herdados da marca (traço à mão), usados como DNA visual. */
export const BRAND_MARKS = {
  eagleSketch: "/img/diversos/Logorabisco-removebg-preview.png",
  pilotSketch: "/img/diversos/voodesenho-removebg-preview.png",
  logo: "/img/diversos/BlanckTruncks.png",
} as const;

export type Gender = "masculino" | "feminino" | "unissex";

/**
 * "photo": foto em estúdio/arquivo, ocupa o quadro (object-cover, fundo escuro).
 * "swatch": estampa recortada de arquivo, tratada como prancha de design
 * (object-contain sobre papel claro). Trata o material cru como peça editorial.
 */
export type LookKind = "photo" | "swatch";

export interface Look {
  id: string;
  name: string;
  /** Cor / variação. */
  colorway?: string;
  /** Legenda técnica curta — material, técnica, função. */
  spec: string;
  kind: LookKind;
  image: string;
  /** Imagem alternativa (verso/detalhe) revelada no hover. */
  hoverImage?: string;
  /** Selo curto sobre a peça. */
  badge?: string;
  gender: Gender;
}

export interface Chapter {
  slug: string;
  /** Índice editorial ("01", "02"…). */
  index: string;
  /** Rótulo curto usado na navegação de coleções. */
  nav: string;
  /** Título completo do capítulo. */
  title: string;
  /** Subtítulo / posicionamento. */
  kicker: string;
  /** Parágrafo de abertura. */
  intro: string;
  looks: Look[];
}

const IMG = "/img/colecao";

export const chapters: Chapter[] = [
  {
    slug: "solo",
    index: "01",
    nav: "Solo",
    title: "Solo",
    kicker: "Streetwear · do asfalto à rampa",
    intro:
      "A coleção que nasce no chão. Camisetas de algodão penteado com a águia em silk de alta definição e estampas de arquivo que carregam o traço original da marca — feitas para quem vive a cidade esperando o próximo voo.",
    looks: [
      {
        id: "bt-tree",
        name: "BT Tree",
        colorway: "Vinho",
        spec: "Bordado no peito · toque macio",
        kind: "photo",
        image: `${IMG}/tee-bt-tree.jpg`,
        badge: "Novo",
        gender: "masculino",
      },
      {
        id: "eagle-classic",
        name: "Eagle Classic",
        colorway: "Branca",
        spec: "Águia em silk HD · 100% algodão",
        kind: "photo",
        image: `${IMG}/tee-eagle-classic.jpg`,
        gender: "masculino",
      },
      {
        id: "concrete-jungle",
        name: "Concrete Jungle",
        spec: "Full print P&B · algodão penteado",
        kind: "photo",
        image: `${IMG}/tee-concrete-jungle.jpg`,
        hoverImage: `${IMG}/tee-concrete-jungle-back.jpg`,
        badge: "Best seller",
        gender: "masculino",
      },
      {
        id: "french-town-yellow",
        name: "French Town Tee",
        colorway: "Amarela",
        spec: "Estampa nas costas · algodão penteado",
        kind: "photo",
        image: `${IMG}/tee-french-town-yellow.jpg`,
        gender: "masculino",
      },
      {
        id: "french-town-green",
        name: "French Town Tee",
        colorway: "Verde",
        spec: "Corte feminino · barra floral",
        kind: "photo",
        image: `${IMG}/tee-french-town-green.jpg`,
        gender: "feminino",
      },
      {
        id: "bt-sports",
        name: "BT Sports Tee",
        colorway: "Caqui",
        spec: "Estampa gráfica · 100% algodão",
        kind: "photo",
        image: `${IMG}/tee-bt-sports.jpg`,
        gender: "masculino",
      },
      {
        id: "moletom-bt",
        name: "Moletom BT",
        colorway: "Areia",
        spec: "Capuz · bordado da águia no peito",
        kind: "photo",
        image: `${IMG}/moletom.jpg`,
        gender: "masculino",
      },
    ],
  },
  {
    slug: "altitude",
    index: "02",
    nav: "Altitude",
    title: "Altitude",
    kicker: "Técnico · proteção que veste",
    intro:
      "Quando o vento muda, a peça responde. Jaquetas, corta-ventos, calças e bermudas em ripstop e nylon resistente à água — modelagem pensada para o corpo em movimento, do mirante à decolagem.",
    looks: [
      {
        id: "corta-vento-bt",
        name: "Corta-Vento BT",
        colorway: "Pink",
        spec: "Nylon resistente à água · capuz · forro mesh",
        kind: "photo",
        image: `${IMG}/altitude-corta-vento.jpg`,
        badge: "Edição de arquivo",
        gender: "unissex",
      },
      {
        id: "calca-cargo",
        name: "Calça Cargo Conversível",
        colorway: "Cinza",
        spec: "Ripstop · zip-off vira bermuda · selo da águia",
        kind: "photo",
        image: `${IMG}/calca-cargo-front.jpg`,
        hoverImage: `${IMG}/calca-cargo-detail.jpg`,
        badge: "2 em 1",
        gender: "unissex",
      },
      {
        id: "jaqueta-neoprene",
        name: "Jaqueta Neoprene",
        colorway: "Grafite",
        spec: "Neoprene · águia em alto-relevo nas costas",
        kind: "photo",
        image: `${IMG}/jaqueta-neoprene.jpg`,
        gender: "masculino",
      },
      {
        id: "corta-vento-winstopper",
        name: "Corta-Vento Winstopper",
        colorway: "Vermelho / Preto",
        spec: "Corta-frio com capuz · mangas em contraste",
        kind: "photo",
        image: `${IMG}/corta-vento-winstopper.jpg`,
        gender: "masculino",
      },
      {
        id: "bermuda-preta",
        name: "Bermuda BT",
        colorway: "Preta",
        spec: "Board short · águia tonal · cordão interno",
        kind: "photo",
        image: `${IMG}/bermuda-preta.jpg`,
        gender: "masculino",
      },
    ],
  },
  {
    slug: "voo-livre",
    index: "03",
    nav: "Voo Livre",
    title: "Voo Livre",
    kicker: "Parapente · segunda pele e equipamento",
    intro:
      "O capítulo que define a origem da marca. Segunda pele térmica de compressão, macacões para grandes altitudes, mochilas, capacetes e equipamento de sela — a linha feita para quem leva o corpo ao céu.",
    looks: [
      {
        id: "termico-masc",
        name: "Segunda Pele Térmica",
        colorway: "Preto / Vermelho",
        spec: "Tecido térmico de compressão · proteção em voo",
        kind: "photo",
        image: `${IMG}/voo-termico-masc.jpg`,
        gender: "masculino",
      },
      {
        id: "termico-fem",
        name: "Macacão de Voo",
        colorway: "Preto / Vermelho",
        spec: "Corte feminino · térmico para grandes altitudes",
        kind: "photo",
        image: `${IMG}/voo-termico-fem.jpg`,
        gender: "feminino",
      },
      {
        id: "cadeirinha",
        name: "Cadeirinha de Voo",
        spec: "Equipamento · proteção e conforto na sela",
        kind: "photo",
        image: `${IMG}/voo-cadeirinha.jpg`,
        badge: "Equipamento",
        gender: "unissex",
      },
      {
        id: "mochila-voo",
        name: "Mochila de Voo",
        colorway: "Camuflada",
        spec: "Transporte da vela · tecido reforçado · bandeira BR",
        kind: "photo",
        image: `${IMG}/mochila-camo.jpg`,
        badge: "Equipamento",
        gender: "unissex",
      },
      {
        id: "capacete",
        name: "Capacete de Voo",
        spec: "Casco em fibra de carbono · pintura personalizada",
        kind: "photo",
        image: `${IMG}/capacete.jpg`,
        badge: "Equipamento",
        gender: "unissex",
      },
    ],
  },
];

/** Bloco institucional de lifestyle inserido entre os capítulos. */
export const heritage = {
  slug: "serra",
  nav: "Serra",
  kicker: "Onde tudo começa",
  title: "Serra da Moeda",
  paragraphs: [
    "Antes de ser roupa, a Black Trunks foi rampa. Nasceu na Serra da Moeda, no ritual de esperar o vento certo e correr para o vazio confiando no que se veste.",
    "Cada peça carrega esse DNA: a águia desenhada à mão, o cuidado de quem confia a própria pele ao equipamento, a liberdade de quem enxerga o horizonte de cima.",
  ],
} as const;

/** Imagem cinematográfica de abertura da página. */
export const heroImage = `${IMG}/hero-serra.jpg`;

export const totalLooks = chapters.reduce((n, c) => n + c.looks.length, 0);

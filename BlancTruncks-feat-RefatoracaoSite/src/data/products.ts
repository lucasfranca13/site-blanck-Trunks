import type { Category, CategoryInfo, PackagingShot, Product } from "@/types";

/** Formata um preço em reais. */
export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
}

/** Estrutura completa de categorias (prontas para receber fotos reais). */
export const categories: CategoryInfo[] = [
  { slug: "camisas", title: "Camisas" },
  { slug: "calcas", title: "Calças" },
  { slug: "shorts", title: "Shorts" },
  { slug: "corta-vento", title: "Corta-vento" },
  { slug: "bones", title: "Bonés" },
  { slug: "bermudas", title: "Bermudas" },
];

// Fotos reais disponíveis hoje (camisetas). Reutilizadas como placeholder
// nas demais categorias até chegarem as fotos definitivas de cada peça.
const TEE_WHITE = "/img/produtos/classic.jpg";
const TEE_NAVY = "/img/produtos/classic-media.jpg";
const TEE_CONCRETE = "/img/produtos/concrete-jungle.jpg";
const TEE_TREE = "/img/produtos/bt-tree.jpg";

export const products: Product[] = [
  // ——— Camisas (fotos reais) ———
  // Destaques da home (nesta ordem) — trio de estúdio, mesma qualidade/fundo.
  {
    id: "bt-tree-tee-vinho",
    name: "BT Tree Tee",
    description: "Bordado da águia no peito sobre algodão de toque macio.",
    price: 169,
    category: "camisas",
    gender: "masculino",
    colorway: "Vinho",
    image: "/img/colecao/tee-bt-tree.jpg",
    badge: "Novo",
    featured: true,
  },
  {
    id: "eagle-classic-tee-branca",
    name: "Eagle Classic Tee",
    description: "A águia em silk de alta definição sobre algodão 100% penteado.",
    price: 159,
    category: "camisas",
    gender: "masculino",
    colorway: "Branca",
    image: "/img/colecao/tee-eagle-classic.jpg",
    featured: true,
  },
  {
    id: "concrete-jungle-tee",
    name: "Concrete Jungle Tee",
    description: "Estampa full print em preto e branco inspirada na selva de concreto.",
    price: 179,
    category: "camisas",
    gender: "masculino",
    image: "/img/colecao/tee-concrete-jungle.jpg",
    badge: "Best seller",
    featured: true,
  },
  {
    id: "eagle-fit-crop",
    name: "Eagle Fit Crop",
    description: "A águia em corte cropped feminino. Algodão penteado de toque macio.",
    price: 149,
    category: "camisas",
    gender: "feminino",
    colorway: "Azul-marinho",
    image: TEE_NAVY,
  },

  // ——— Calças (placeholder) ———
  {
    id: "bt-tactical-pant",
    name: "BT Tactical Pant",
    description: "Calça cargo em ripstop com reforço nos joelhos e cós ajustável.",
    price: 289,
    category: "calcas",
    gender: "masculino",
    image: TEE_CONCRETE,
    placeholder: true,
  },
  {
    id: "high-waist-pant",
    name: "High Waist Pant",
    description: "Modelagem wide leg, cintura alta e tecido fluido.",
    price: 269,
    category: "calcas",
    gender: "feminino",
    image: TEE_NAVY,
    placeholder: true,
  },

  // ——— Shorts (placeholder) ———
  {
    id: "street-short",
    name: "Street Short BT",
    description: "Short esportivo com cordão interno e bolso zíper.",
    price: 149,
    category: "shorts",
    gender: "masculino",
    image: TEE_TREE,
    placeholder: true,
  },
  {
    id: "active-short-fem",
    name: "Active Short",
    description: "Short fitness com cintura elástica e logo reflexivo.",
    price: 139,
    category: "shorts",
    gender: "feminino",
    image: TEE_WHITE,
    placeholder: true,
  },

  // ——— Corta-vento (placeholder) ———
  {
    id: "bt-windbreaker",
    name: "BT Signature Windbreaker",
    description: "Corta-vento leve com capuz e forro mesh. Resistente à água.",
    price: 379,
    category: "corta-vento",
    gender: "masculino",
    image: TEE_NAVY,
    badge: "Edição limitada",
    placeholder: true,
  },
  {
    id: "windbreaker-fem",
    name: "Windbreaker Fem",
    description: "Corte feminino com capuz ajustável e zíperes contrastantes.",
    price: 359,
    category: "corta-vento",
    gender: "feminino",
    image: TEE_CONCRETE,
    placeholder: true,
  },

  // ——— Bonés (placeholder) ———
  {
    id: "tactical-cap",
    name: "Tactical Cap BT",
    description: "Cap 6 panels com logo metálico. Aba pré-curvada, snapback.",
    price: 129,
    category: "bones",
    gender: "masculino",
    image: TEE_WHITE,
    placeholder: true,
  },
  {
    id: "curve-cap-fem",
    name: "Curve Cap BT",
    description: "Boné aba curva com bordado rose gold. Ajuste snapback.",
    price: 119,
    category: "bones",
    gender: "feminino",
    image: TEE_TREE,
    placeholder: true,
  },

  // ——— Bermudas (placeholder) ———
  {
    id: "field-bermuda",
    name: "BT Field Bermuda",
    description: "Bermuda cargo com cintura confortável e bolsos utilitários.",
    price: 159,
    category: "bermudas",
    gender: "masculino",
    image: TEE_CONCRETE,
    placeholder: true,
  },
  {
    id: "linen-bermuda-fem",
    name: "Linen Bermuda",
    description: "Tecido linho leve, corte solto e elegante.",
    price: 139,
    category: "bermudas",
    gender: "feminino",
    image: TEE_WHITE,
    placeholder: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

/** Indica se há alguma peça com foto ainda provisória. */
export const hasPlaceholders = products.some((p) => p.placeholder);

/** Fotos da embalagem artesanal (caixa kraft + selo da águia). */
export const packagingShots: PackagingShot[] = [
  { image: "/img/produtos/pack-7.jpg", alt: "Caixa kraft Black Trunks com camiseta dobrada ao lado" },
  { image: "/img/produtos/pack-1.jpg", alt: "Caixa Black Trunks aberta com as peças embaladas" },
  { image: "/img/produtos/pack-6.jpg", alt: "Caixa kraft com o selo da águia e camisetas" },
  { image: "/img/produtos/pack-4.jpg", alt: "Caixa Black Trunks com peças embaladas à mão" },
];

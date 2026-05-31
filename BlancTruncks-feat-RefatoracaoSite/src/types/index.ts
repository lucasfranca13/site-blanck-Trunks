import type { LucideIcon } from "lucide-react";

export type Category =
  | "camisas"
  | "calcas"
  | "shorts"
  | "corta-vento"
  | "bones"
  | "bermudas";

export type Gender = "masculino" | "feminino";

export interface CategoryInfo {
  slug: Category;
  title: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Valor de referência (catálogo, não loja). */
  price: number;
  category: Category;
  gender: Gender;
  image: string;
  /** Cor/variação (ex.: "Branca", "Azul-marinho"). */
  colorway?: string;
  /** Selo curto exibido sobre a imagem (ex.: "Best seller"). */
  badge?: string;
  /** Em destaque na seção da landing. */
  featured?: boolean;
  /** Foto ainda é placeholder (coleção em fotografia). */
  placeholder?: boolean;
}

export interface PackagingShot {
  image: string;
  alt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
}

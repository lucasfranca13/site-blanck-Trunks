import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionProvider } from "@/components/common/MotionProvider";
import { TextureOverlay } from "@/components/common/TextureOverlay";
import { BackToTop } from "@/components/common/BackToTop";
import "./globals.css";

const siteUrl = "https://blacktrunks.com.br";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Black Trunks",
  url: siteUrl,
  logo: `${siteUrl}/img/diversos/BlanckTruncks.png`,
  description:
    "Moda streetwear premium com DNA do voo livre. Estilo, força e identidade do solo ao céu.",
  sameAs: ["https://www.instagram.com/blacktrunksbrasil"],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Black Trunks — Moda premium com DNA do voo livre",
    template: "%s · Black Trunks",
  },
  description:
    "Black Trunks é moda streetwear premium para quem voa acima da média. Estilo, força e identidade do solo ao céu — inspirada na liberdade do voo livre.",
  keywords: [
    "Black Trunks",
    "moda streetwear premium",
    "voo livre",
    "parapente",
    "vestuário esportivo",
    "moda premium",
  ],
  authors: [{ name: "Black Trunks" }],
  creator: "Black Trunks",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Black Trunks",
    title: "Black Trunks — Moda premium com DNA do voo livre",
    description:
      "Moda streetwear premium para quem voa acima da média. Estilo, força e identidade do solo ao céu.",
    images: [{ url: "/img/diversos/BlanckTruncks.png", alt: "Black Trunks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Trunks — Moda premium com DNA do voo livre",
    description: "Moda streetwear premium para quem voa acima da média.",
    images: ["/img/diversos/BlanckTruncks.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
        <TextureOverlay />
        <BackToTop />
      </body>
    </html>
  );
}

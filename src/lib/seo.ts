import type { Metadata } from "next";

export const siteUrl = "https://ravanellierosenoadv.com.br";
export const siteName = "Ravanelli & Roseno Advogados Associados";

export const defaultDescription =
  "Escritório de advocacia full service, com atuação preventiva e unidades em Brasília e Taguatinga, no Distrito Federal.";

export const socialImage = {
  url: "/images/sala-de-reuniao-enhanced.webp",
  width: 1536,
  height: 1024,
  alt: "Sala de reunião do escritório Ravanelli & Roseno Advogados Associados",
} as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: path,
      siteName,
      title,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  foundingDate: "2010",
  telephone: "+55 61 3222-2010",
  email: "atendimento@ravanellierosenoadv.com.br",
  image: `${siteUrl}${socialImage.url}`,
  address: [
    {
      "@type": "PostalAddress",
      name: "Brasília — Sede",
      streetAddress:
        "SIG, Quadra 01, Lote 385, Sala 03, Edifício Platinum Office",
      addressLocality: "Brasília",
      addressRegion: "DF",
      postalCode: "70610-480",
      addressCountry: "BR",
    },
    {
      "@type": "PostalAddress",
      name: "Taguatinga — Filial",
      streetAddress:
        "QNJ 46, Lote 52, Sala 101B, Edifício Maria Iracema",
      addressLocality: "Taguatinga",
      addressRegion: "DF",
      postalCode: "72140-460",
      addressCountry: "BR",
    },
  ],
} as const;

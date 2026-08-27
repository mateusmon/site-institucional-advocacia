import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Source_Serif_4 } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageTransition } from "@/components/motion/page-transition";
import { MotionProvider } from "@/components/motion/motion-provider";
import { JsonLd } from "@/components/seo/json-ld";
import {
  defaultDescription,
  organizationJsonLd,
  siteName,
  siteUrl,
  socialImage,
} from "@/lib/seo";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName,
    title: siteName,
    description: defaultDescription,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
    images: [socialImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "legal services",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${sourceSerif.variable} antialiased`}>
        <JsonLd data={organizationJsonLd} />
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}

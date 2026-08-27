import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/seo";

const routes = [
  "",
  "/escritorio",
  "/areas-de-atuacao",
  "/equipe",
  "/conteudos",
  "/contato",
  "/seguranca-e-prevencao-a-fraudes",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route === "/contato" ? 0.9 : 0.8,
  }));
}

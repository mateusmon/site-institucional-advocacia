export type NavigationItem = Readonly<{
  label: string;
  href: string;
}>;

export const primaryNavigation: readonly NavigationItem[] = [
  { label: "Escritório", href: "/escritorio" },
  { label: "Áreas de atuação", href: "/areas-de-atuacao" },
  { label: "Equipe", href: "/equipe" },
  { label: "Conteúdos", href: "/conteudos" },
  { label: "Contato", href: "/contato" },
] as const;

export const contactCta: NavigationItem = {
  label: "Falar com o escritório",
  href: "/contato",
};

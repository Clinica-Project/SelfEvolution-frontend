export const publicNav = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Unidades", href: "/unidades" },
] as const;

export type PublicNavItem = (typeof publicNav)[number];

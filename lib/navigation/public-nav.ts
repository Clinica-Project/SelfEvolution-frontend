export const publicNav = [
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Diferenciais", href: "/diferenciais" },
] as const;

export type PublicNavItem = (typeof publicNav)[number];

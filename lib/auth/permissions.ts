import type { Role } from "@/types/auth";

/** Rotas do dashboard permitidas por perfil. */
export const PERMISSIONS: Record<Role, string[]> = {
  ADMIN: [
    "/dashboard",
    "/pacientes",
    "/consultas",
    "/documentos",
    "/ia",
    "/usuarios",
  ],
  PSICOLOGO: ["/dashboard", "/pacientes", "/consultas", "/documentos", "/ia"],
  PACIENTE: ["/dashboard", "/consultas"],
};

export function canAccess(role: Role | null, path: string): boolean {
  if (!role) return false;
  return PERMISSIONS[role].some(
    (route) => path === route || path.startsWith(`${route}/`)
  );
}

export const ROLE_LABELS: Record<Role, string> = {
  ADMIN: "Administrador",
  PSICOLOGO: "Psicólogo",
  PACIENTE: "Paciente",
};

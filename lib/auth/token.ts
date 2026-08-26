import type { Role } from "@/types/auth";

const TOKEN_KEY = "se_token";
const ROLE_KEY = "se_role";

const isBrowser = () => typeof window !== "undefined";

export function getToken(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function getRole(): Role | null {
  if (!isBrowser()) return null;
  const role = window.localStorage.getItem(ROLE_KEY);
  if (role === "PACIENTE" || role === "PSICOLOGO" || role === "ADMIN") {
    return role;
  }
  return null;
}

export function setRole(role: Role): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(ROLE_KEY, role);
}

export function removeToken(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(ROLE_KEY);
}

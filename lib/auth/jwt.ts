import { getToken } from "@/lib/auth/token";

type JwtPayload = {
  sub?: string;
  role?: string;
  [claim: string]: unknown;
};

/** Decodifica o payload do JWT sem validar assinatura (uso apenas de leitura). */
export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized)) as JwtPayload;
  } catch {
    return null;
  }
}

/** E-mail (claim `sub`) do usuário logado, ou null. */
export function getEmailFromToken(): string | null {
  const token = getToken();
  if (!token) return null;
  return decodeJwtPayload(token)?.sub ?? null;
}

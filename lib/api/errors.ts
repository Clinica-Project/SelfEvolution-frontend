import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/types/api";

const FALLBACK = "Não foi possível completar a operação. Tente novamente.";

/**
 * Extrai mensagem amigável de um erro da API.
 * Suporta o JSON padrão ({ mensagem, erro }) e respostas em texto plano
 * (ex.: POST /auth/login com credenciais inválidas).
 */
export function parseApiError(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim().length > 0) {
      return data;
    }

    if (data && typeof data === "object") {
      const apiError = data as Partial<ApiErrorResponse>;
      if (apiError.mensagem) return apiError.mensagem;
      if (apiError.erro) return apiError.erro;
    }

    if (error.code === "ERR_NETWORK") {
      return "Não foi possível conectar ao servidor. Verifique se o backend está no ar.";
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return FALLBACK;
}

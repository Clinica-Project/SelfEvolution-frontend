import { apiClient } from "@/lib/api/client";
import type {
  AtualizarPacienteRequest,
  CriarPacienteRequest,
  PacienteResponse,
} from "@/types/paciente";

/**
 * ATENÇÃO: o backend atual NÃO expõe GET /pacientes (listagem).
 * Esta função tenta o endpoint mesmo assim: se ele for adicionado no
 * backend, o select de pacientes passa a funcionar automaticamente.
 * Enquanto não existir, a chamada falha (403/404/405) e a UI usa
 * um campo de UUID como fallback.
 */
export async function listarPacientes(): Promise<PacienteResponse[]> {
  const { data } = await apiClient.get<PacienteResponse[]>("/pacientes");
  return data;
}

export async function buscarPaciente(id: string): Promise<PacienteResponse> {
  const { data } = await apiClient.get<PacienteResponse>(`/pacientes/${id}`);
  return data;
}

export async function buscarPacientePorEmail(
  email: string
): Promise<PacienteResponse> {
  const { data } = await apiClient.get<PacienteResponse>(
    `/pacientes/email/${encodeURIComponent(email)}`
  );
  return data;
}

export async function criarPaciente(
  body: CriarPacienteRequest
): Promise<PacienteResponse> {
  const { data } = await apiClient.post<PacienteResponse>("/pacientes", body);
  return data;
}

export async function atualizarPaciente(
  id: string,
  body: AtualizarPacienteRequest
): Promise<PacienteResponse> {
  const { data } = await apiClient.put<PacienteResponse>(
    `/pacientes/${id}`,
    body
  );
  return data;
}

export async function excluirPaciente(id: string): Promise<void> {
  await apiClient.delete(`/pacientes/${id}`);
}

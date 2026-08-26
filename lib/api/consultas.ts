import { apiClient } from "@/lib/api/client";
import type {
  AtualizarConsultaRequest,
  ConsultaResponse,
  CriarConsultaRequest,
  ListarConsultasParams,
} from "@/types/consulta";

export async function listarConsultas(
  params?: ListarConsultasParams
): Promise<ConsultaResponse[]> {
  const { data } = await apiClient.get<ConsultaResponse[]>("/consultas", {
    params,
  });
  return data;
}

export async function buscarConsulta(id: string): Promise<ConsultaResponse> {
  const { data } = await apiClient.get<ConsultaResponse>(`/consultas/${id}`);
  return data;
}

export async function criarConsulta(
  body: CriarConsultaRequest
): Promise<ConsultaResponse> {
  const { data } = await apiClient.post<ConsultaResponse>("/consultas", body);
  return data;
}

export async function atualizarConsulta(
  id: string,
  body: AtualizarConsultaRequest
): Promise<ConsultaResponse> {
  const { data } = await apiClient.put<ConsultaResponse>(
    `/consultas/${id}`,
    body
  );
  return data;
}

/**
 * DELETE /consultas/{id} tem comportamento duplo no backend:
 * - PACIENTE: cancela (200 + ConsultaResponse com status CANCELADA)
 * - PSICOLOGO/ADMIN: exclui de fato (204 sem corpo)
 */
export async function cancelarOuExcluirConsulta(
  id: string
): Promise<ConsultaResponse | null> {
  const response = await apiClient.delete<ConsultaResponse | "">(
    `/consultas/${id}`
  );
  if (response.status === 204 || !response.data) return null;
  return response.data as ConsultaResponse;
}

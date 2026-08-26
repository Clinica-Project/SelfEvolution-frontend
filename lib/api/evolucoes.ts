import { apiClient } from "@/lib/api/client";
import type {
  EvolucaoClinicaRequest,
  EvolucaoClinicaResponse,
} from "@/types/evolucao";

export async function buscarEvolucao(
  consultaId: string
): Promise<EvolucaoClinicaResponse> {
  const { data } = await apiClient.get<EvolucaoClinicaResponse>(
    `/consultas/${consultaId}/evolucao`
  );
  return data;
}

export async function criarEvolucao(
  consultaId: string,
  body: EvolucaoClinicaRequest
): Promise<EvolucaoClinicaResponse> {
  const { data } = await apiClient.post<EvolucaoClinicaResponse>(
    `/consultas/${consultaId}/evolucao`,
    body
  );
  return data;
}

export async function atualizarEvolucao(
  consultaId: string,
  body: EvolucaoClinicaRequest
): Promise<EvolucaoClinicaResponse> {
  const { data } = await apiClient.put<EvolucaoClinicaResponse>(
    `/consultas/${consultaId}/evolucao`,
    body
  );
  return data;
}

export async function excluirEvolucao(consultaId: string): Promise<void> {
  await apiClient.delete(`/consultas/${consultaId}/evolucao`);
}

export async function listarEvolucoesDoPaciente(
  pacienteId: string
): Promise<EvolucaoClinicaResponse[]> {
  const { data } = await apiClient.get<EvolucaoClinicaResponse[]>(
    `/pacientes/${pacienteId}/evolucoes`
  );
  return data;
}

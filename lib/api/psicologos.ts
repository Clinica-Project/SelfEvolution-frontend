import { apiClient } from "@/lib/api/client";
import type {
  HorarioAtendimentoResponse,
  PsicologoResponse,
  ServicoResponse,
} from "@/types/psicologo";

export async function listarPsicologos(): Promise<PsicologoResponse[]> {
  const { data } = await apiClient.get<PsicologoResponse[]>("/psicologos");
  return data;
}

export async function buscarPsicologoPorEmail(
  email: string
): Promise<PsicologoResponse> {
  const { data } = await apiClient.get<PsicologoResponse>(
    `/psicologos/email/${encodeURIComponent(email)}`
  );
  return data;
}

export async function listarServicos(
  psicologoId: string
): Promise<ServicoResponse[]> {
  const { data } = await apiClient.get<ServicoResponse[]>(
    `/psicologos/${psicologoId}/servicos`
  );
  return data;
}

export async function listarHorarios(
  psicologoId: string
): Promise<HorarioAtendimentoResponse[]> {
  const { data } = await apiClient.get<HorarioAtendimentoResponse[]>(
    `/psicologos/${psicologoId}/horarios`
  );
  return data;
}

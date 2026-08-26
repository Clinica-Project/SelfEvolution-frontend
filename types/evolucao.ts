export type EvolucaoClinicaResponse = {
  id: string;
  consultaId: string;
  descricao: string;
  humor: string | null;
  observacoes: string | null;
  criadoEm: string;
  atualizadoEm: string | null;
};

export type EvolucaoClinicaRequest = {
  descricao: string;
  humor?: string;
  observacoes?: string;
};

export type StatusConsulta = "AGENDADA" | "REALIZADA" | "CANCELADA";

export type ConsultaResponse = {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  psicologoId: string;
  psicologoNome: string;
  servicoId: string | null;
  servicoNome: string | null;
  dataHoraInicio: string;
  dataHoraFim: string;
  status: StatusConsulta;
  observacoes: string | null;
};

export type CriarConsultaRequest = {
  pacienteId: string;
  psicologoId: string;
  servicoId?: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  observacoes?: string;
};

export type AtualizarConsultaRequest = {
  servicoId?: string;
  dataHoraInicio?: string;
  dataHoraFim?: string;
  status?: StatusConsulta;
  observacoes?: string;
};

export type ListarConsultasParams = {
  pacienteId?: string;
  psicologoId?: string;
};

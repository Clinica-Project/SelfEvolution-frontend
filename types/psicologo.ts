export type PsicologoResponse = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  registro_profissional: string;
  tipo_registro_profissional: number;
  especialidade: string;
};

export type ServicoResponse = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  /** Duração em minutos. */
  duracao: number;
};

export type DiaSemana =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type HorarioAtendimentoResponse = {
  dia: DiaSemana;
  /** Formato "HH:mm:ss". */
  inicio: string;
  fim: string;
};

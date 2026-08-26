export type PacienteResponse = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
};

export type CriarPacienteRequest = {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
};

export type AtualizarPacienteRequest = {
  nome?: string;
  email?: string;
  cpf?: string;
};

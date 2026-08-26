/** Formato padrão de erro do Core API (ApiErrorResponse). */
export type ApiErrorResponse = {
  status: number;
  erro: string;
  mensagem: string;
  path: string;
  timestamp: string;
};

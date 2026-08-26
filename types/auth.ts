export type Role = "PACIENTE" | "PSICOLOGO" | "ADMIN";

export type LoginRequest = {
  email: string;
  senha: string;
};

export type AuthResponse = {
  token: string;
  type: "Bearer";
  role: Role;
};

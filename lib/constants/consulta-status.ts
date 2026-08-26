import type { StatusConsulta } from "@/types/consulta";

export const STATUS_LABELS: Record<StatusConsulta, string> = {
  AGENDADA: "Agendada",
  REALIZADA: "Realizada",
  CANCELADA: "Cancelada",
};

export type StatusBadgeVariant = "info" | "success" | "default";

export const STATUS_BADGES: Record<StatusConsulta, StatusBadgeVariant> = {
  AGENDADA: "info",
  REALIZADA: "success",
  CANCELADA: "default",
};

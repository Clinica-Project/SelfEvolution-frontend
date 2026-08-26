import { useParams, useSearchParams } from "react-router-dom";
import { EvolucaoForm } from "@/components/forms/EvolucaoForm";

export function EvolucaoPage() {
  const { id = "" } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const consultaId = searchParams.get("consultaId") ?? undefined;

  return <EvolucaoForm pacienteId={id} consultaId={consultaId} />;
}

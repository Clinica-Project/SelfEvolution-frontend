import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

export function NovaConsultaPage() {
  const [searchParams] = useSearchParams();
  const pacienteId = searchParams.get("pacienteId") ?? undefined;

  return (
    <div>
      <PageHeader
        eyebrow="Agenda"
        title="Agendar consulta"
        description="Escolha o profissional, o serviço e o melhor horário dentro da disponibilidade."
      />
      <AppointmentForm defaultPacienteId={pacienteId} />
    </div>
  );
}

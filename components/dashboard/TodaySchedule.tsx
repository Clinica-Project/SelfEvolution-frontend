import { Link } from "@/lib/link";
import { CalendarCheck, CalendarPlus, UserPlus } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useAuth } from "@/lib/auth/context";
import { canAccess } from "@/lib/auth/permissions";
import type { ConsultaResponse } from "@/types/consulta";

type TodayScheduleProps = {
  consultas: ConsultaResponse[];
  loading: boolean;
};

function formatHora(iso: string): string {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TodaySchedule({ consultas, loading }: TodayScheduleProps) {
  const { role } = useAuth();
  const podeCriarPaciente = canAccess(role, "/pacientes");

  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardTitle>Agenda de hoje</CardTitle>
        <div className="flex items-center gap-2">
          <Link
            href="/consultas/nova"
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-3 py-1.5 text-xs font-medium text-content-inverse transition-all duration-200 ease-expo hover:bg-brand-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <CalendarPlus className="h-3.5 w-3.5" aria-hidden="true" />
            Agendar
          </Link>
          {podeCriarPaciente && (
            <Link
              href="/pacientes/novo"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-content-secondary transition-colors duration-200 ease-expo hover:bg-surface-muted hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <UserPlus className="h-3.5 w-3.5" aria-hidden="true" />
              Novo paciente
            </Link>
          )}
        </div>
      </div>

      {loading ? (
        <div className="mt-5 space-y-4" aria-label="Carregando" role="status">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="skeleton h-4 w-10" />
              <div className="skeleton h-4 flex-1" />
            </div>
          ))}
        </div>
      ) : consultas.length === 0 ? (
        <div className="mt-6 flex flex-1 flex-col items-center justify-center py-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
            <CalendarCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-3 text-sm font-medium text-content-primary">
            Nenhuma consulta hoje
          </p>
          <p className="mt-1 max-w-[26ch] text-xs leading-relaxed text-content-muted">
            A agenda de hoje está livre. Que tal agendar a próxima sessão?
          </p>
        </div>
      ) : (
        <ol className="relative mt-5 flex-1 space-y-0">
          {consultas.map((consulta, i) => (
            <li key={consulta.id} className="relative flex gap-4 pb-5 last:pb-0">
              {i < consultas.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[5px] top-4 h-full w-px bg-border"
                />
              )}
              <span
                aria-hidden="true"
                className="mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-brand-primary bg-surface-card"
              />
              <Link
                href={`/consultas/${consulta.id}`}
                className="group -m-1.5 flex min-w-0 flex-1 items-center justify-between gap-3 rounded-md p-1.5 transition-colors duration-200 ease-expo hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-content-primary">
                    {formatHora(consulta.dataHoraInicio)}–{formatHora(consulta.dataHoraFim)}
                    <span className="mx-2 text-content-muted" aria-hidden="true">·</span>
                    {consulta.pacienteNome}
                  </span>
                  <span className="block truncate text-xs text-content-muted">
                    {consulta.servicoNome ?? consulta.psicologoNome}
                  </span>
                </span>
                <StatusBadge status={consulta.status} className="shrink-0" />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}

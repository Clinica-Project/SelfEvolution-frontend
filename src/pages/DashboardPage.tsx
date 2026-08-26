import { useMemo } from "react";
import {
  Calendar,
  CalendarCheck,
  CalendarClock,
  Heart,
  Shield,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { WeekChart, type WeekDayDatum } from "@/components/dashboard/WeekChart";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { useConsultas } from "@/hooks/useConsultas";
import { usePacientes } from "@/hooks/usePacientes";
import { useAuth } from "@/lib/auth/context";
import { canAccess } from "@/lib/auth/permissions";
import type { ConsultaResponse } from "@/types/consulta";
import type { Role } from "@/types/auth";

const WELCOME_BY_ROLE: Record<
  Role,
  { icon: LucideIcon; title: string; accentWord: string; description: string }
> = {
  ADMIN: {
    icon: Shield,
    title: "Bem-vindo, Administrador",
    accentWord: "Administrador",
    description:
      "Acompanhe a agenda da clínica, gerencie psicólogos e pacientes e tenha a visão geral de todos os atendimentos.",
  },
  PSICOLOGO: {
    icon: Stethoscope,
    title: "Bem-vindo, Psicólogo",
    accentWord: "Psicólogo",
    description:
      "Veja suas consultas, marque atendimentos como realizados e registre a evolução clínica dos seus pacientes.",
  },
  PACIENTE: {
    icon: Heart,
    title: "Bem-vindo ao SelfEvolution",
    accentWord: "SelfEvolution",
    description:
      "Acompanhe suas consultas agendadas, agende novos horários e gerencie seus atendimentos com tranquilidade.",
  },
};

/** Envolve a palavra de destaque do título com o marca-texto editorial. */
function renderTituloComMark(title: string, accentWord: string) {
  const index = title.indexOf(accentWord);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <mark className="mark-accent">{accentWord}</mark>
      {title.slice(index + accentWord.length)}
    </>
  );
}

function isMesmoDia(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

const DIA_LABELS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

/** Série dos últimos 7 dias (do mais antigo para hoje) filtrada por status. */
function serieSemana(
  consultas: ConsultaResponse[],
  status?: ConsultaResponse["status"]
): number[] {
  const hoje = new Date();
  const dias: number[] = [];
  for (let offset = 6; offset >= 0; offset--) {
    const dia = new Date(hoje);
    dia.setDate(hoje.getDate() - offset);
    dias.push(
      consultas.filter((c) => {
        if (status && c.status !== status) return false;
        return isMesmoDia(new Date(c.dataHoraInicio), dia);
      }).length
    );
  }
  return dias;
}

export function DashboardPage() {
  const { role } = useAuth();
  const consultas = useConsultas();
  const pacientes = usePacientes(canAccess(role, "/pacientes"));

  const metricas = useMemo(() => {
    const agora = new Date();
    const doMes = consultas.data.filter((consulta) => {
      const inicio = new Date(consulta.dataHoraInicio);
      return (
        inicio.getMonth() === agora.getMonth() &&
        inicio.getFullYear() === agora.getFullYear()
      );
    });

    return {
      consultasDoMes: doMes.length,
      agendadas: consultas.data.filter((c) => c.status === "AGENDADA").length,
      realizadas: consultas.data.filter((c) => c.status === "REALIZADA").length,
    };
  }, [consultas.data]);

  const agendaHoje = useMemo(() => {
    const hoje = new Date();
    return consultas.data
      .filter((c) => isMesmoDia(new Date(c.dataHoraInicio), hoje))
      .sort((a, b) => a.dataHoraInicio.localeCompare(b.dataHoraInicio));
  }, [consultas.data]);

  const semana = useMemo<WeekDayDatum[]>(() => {
    const hoje = new Date();
    const dias: WeekDayDatum[] = [];
    for (let offset = 6; offset >= 0; offset--) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() - offset);
      const doDia = consultas.data.filter((c) =>
        isMesmoDia(new Date(c.dataHoraInicio), dia)
      );
      dias.push({
        label: DIA_LABELS[dia.getDay()],
        agendadas: doDia.filter((c) => c.status === "AGENDADA").length,
        realizadas: doDia.filter((c) => c.status === "REALIZADA").length,
      });
    }
    return dias;
  }, [consultas.data]);

  const sparkTodas = useMemo(() => serieSemana(consultas.data), [consultas.data]);
  const sparkAgendadas = useMemo(
    () => serieSemana(consultas.data, "AGENDADA"),
    [consultas.data]
  );
  const sparkRealizadas = useMemo(
    () => serieSemana(consultas.data, "REALIZADA"),
    [consultas.data]
  );

  const totalPacientes =
    pacientes.supported && !pacientes.error ? pacientes.data.length : null;

  const welcome = WELCOME_BY_ROLE[role ?? "PACIENTE"];
  const WelcomeIcon = welcome.icon;

  return (
    <div>
      <PageHeader
        eyebrow="Visão geral"
        title="Dashboard"
        description="Visão geral dos atendimentos da clínica."
      />

      <RevealGroup
        stagger={0.08}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]"
      >
        <RevealItem>
          <MetricCard
            title="Consultas do mês"
            value={consultas.error ? null : metricas.consultasDoMes}
            description="Com início no mês atual"
            icon={Calendar}
            sparkline={sparkTodas}
            featured
            loading={consultas.loading}
          />
        </RevealItem>
        <RevealItem>
          <MetricCard
            title="Consultas agendadas"
            value={consultas.error ? null : metricas.agendadas}
            description="Aguardando atendimento"
            icon={CalendarClock}
            accent="secondary"
            sparkline={sparkAgendadas}
            loading={consultas.loading}
          />
        </RevealItem>
        <RevealItem>
          <MetricCard
            title="Consultas realizadas"
            value={consultas.error ? null : metricas.realizadas}
            description="Atendimentos concluídos"
            icon={CalendarCheck}
            accent="success"
            sparkline={sparkRealizadas}
            loading={consultas.loading}
          />
        </RevealItem>
        <RevealItem>
          <MetricCard
            title="Total de pacientes"
            value={totalPacientes}
            description={
              totalPacientes === null
                ? "Indisponível no momento"
                : "Pacientes cadastrados"
            }
            icon={Users}
            accent="primary"
            loading={pacientes.loading && canAccess(role, "/pacientes")}
          />
        </RevealItem>
      </RevealGroup>

      {consultas.error && (
        <p className="mt-3 text-sm text-content-muted">
          Não foi possível carregar as métricas de consultas — {consultas.error}
        </p>
      )}

      <RevealGroup stagger={0.1} className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <RevealItem>
          <TodaySchedule consultas={agendaHoje} loading={consultas.loading} />
        </RevealItem>
        <RevealItem>
          <Card className="h-full">
            <h2 className="font-display text-lg font-semibold tracking-[-0.01em] text-content-primary">
              Últimos 7 dias
            </h2>
            <p className="mt-1 text-xs text-content-muted">
              Consultas por dia de início
            </p>
            <div className="mt-4">
              <WeekChart data={semana} />
            </div>
          </Card>
        </RevealItem>
      </RevealGroup>

      <Reveal className="mt-6" delay={0.1}>
        <Card className="border-brand-secondary/20 bg-brand-secondary/5">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
              <WelcomeIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-content-primary">
                {renderTituloComMark(welcome.title, welcome.accentWord)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                {welcome.description}
              </p>
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}

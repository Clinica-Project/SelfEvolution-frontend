import { Link } from "@/lib/link";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CalendarPlus,
  Fingerprint,
  Mail,
  NotebookPen,
} from "lucide-react";
import { ActionLink } from "@/components/dashboard/ActionLink";
import { ErrorState } from "@/components/dashboard/ErrorState";
import { PageSkeleton } from "@/components/dashboard/PageSkeleton";
import { PatientAvatar } from "@/components/dashboard/PatientAvatar";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { usePaciente } from "@/hooks/usePaciente";
import { listarConsultas } from "@/lib/api/consultas";
import { listarEvolucoesDoPaciente } from "@/lib/api/evolucoes";
import { useAuth } from "@/lib/auth/context";
import { EASE_EXPO } from "@/lib/motion";
import { formatCpf } from "@/lib/utils/cpf";
import { cn } from "@/lib/utils/cn";
import type { ConsultaResponse } from "@/types/consulta";
import type { EvolucaoClinicaResponse } from "@/types/evolucao";

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

type Tab = "consultas" | "historico";

export function PacienteDetalhePage() {
  const params = useParams<{ id: string }>();
  const pacienteId = params?.id;
  const { role } = useAuth();
  const podeVerClinico = role === "ADMIN" || role === "PSICOLOGO";

  const { data: paciente, loading, error, errorStatus } = usePaciente(pacienteId);

  const [consultas, setConsultas] = useState<ConsultaResponse[]>([]);
  const [consultasLoading, setConsultasLoading] = useState(podeVerClinico);
  const [evolucoes, setEvolucoes] = useState<EvolucaoClinicaResponse[]>([]);
  const [evolucoesLoading, setEvolucoesLoading] = useState(podeVerClinico);
  const [evolucoesNegadas, setEvolucoesNegadas] = useState(false);
  const [tab, setTab] = useState<Tab>("consultas");

  useEffect(() => {
    if (!podeVerClinico || !pacienteId) return;

    // ADMIN filtra no backend; PSICOLOGO recebe as próprias e filtramos aqui
    listarConsultas({ pacienteId })
      .then((lista) =>
        setConsultas(
          lista
            .filter((consulta) => consulta.pacienteId === pacienteId)
            .sort((a, b) => b.dataHoraInicio.localeCompare(a.dataHoraInicio))
        )
      )
      .catch(() => setConsultas([]))
      .finally(() => setConsultasLoading(false));

    listarEvolucoesDoPaciente(pacienteId)
      .then(setEvolucoes)
      .catch(() => setEvolucoesNegadas(true))
      .finally(() => setEvolucoesLoading(false));
  }, [podeVerClinico, pacienteId]);

  const breadcrumb = (
    <Breadcrumb
      className="mb-4"
      items={[
        { label: "Pacientes", href: "/pacientes" },
        { label: "Detalhe" },
      ]}
    />
  );

  if (loading) {
    return (
      <div>
        {breadcrumb}
        <PageSkeleton lines={3} aria-label="Carregando paciente" />
      </div>
    );
  }

  if (error || !paciente) {
    return (
      <div>
        {breadcrumb}
        <ErrorState
          title={
            errorStatus === 404
              ? "Paciente não encontrado"
              : "Não foi possível carregar o paciente"
          }
          message={error ?? "Tente novamente em instantes."}
          backHref="/pacientes"
          backLabel="Voltar para pacientes"
        />
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof CalendarDays; count?: number }[] = [
    ...(podeVerClinico && !consultasLoading
      ? [{ id: "consultas" as Tab, label: "Consultas", icon: CalendarDays, count: consultas.length }]
      : [{ id: "consultas" as Tab, label: "Consultas", icon: CalendarDays }]),
    ...(podeVerClinico
      ? [!evolucoesLoading
          ? { id: "historico" as Tab, label: "Histórico clínico", icon: NotebookPen, count: evolucoes.length }
          : { id: "historico" as Tab, label: "Histórico clínico", icon: NotebookPen }]
      : []),
  ];

  return (
    <div>
      {breadcrumb}

      {/* Hero do paciente */}
      <Card className="card-surface grain-overlay">
        <div className="flex flex-wrap items-center gap-5">
          <PatientAvatar nome={paciente.nome} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary">
              Paciente
            </p>
            <h1 className="mt-1 font-display text-page-title font-bold text-content-primary">
              {paciente.nome}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-card px-3 py-1 text-xs text-content-secondary">
                <Mail className="h-3.5 w-3.5 text-content-muted" aria-hidden="true" />
                {paciente.email}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-card px-3 py-1 font-mono text-xs tracking-wide text-content-secondary">
                <Fingerprint className="h-3.5 w-3.5 text-content-muted" aria-hidden="true" />
                {formatCpf(paciente.cpf)}
              </span>
            </div>
          </div>
          <Link
            href={`/consultas/nova?pacienteId=${paciente.id}`}
            className={cn(buttonVariants("primary"), "shrink-0")}
          >
            <span className="inline-flex items-center gap-2">
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Agendar consulta
            </span>
          </Link>
        </div>
      </Card>

      {/* Tabs com underline animado */}
      <div className="mt-8 border-b border-border" role="tablist" aria-label="Seções do paciente">
        <div className="flex gap-1">
          {tabs.map(({ id, label, icon: Icon, count }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`tabpanel-${id}`}
                id={`tab-${id}`}
                onClick={() => setTab(id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                  active
                    ? "text-brand-primary"
                    : "text-content-secondary hover:text-content-primary"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
                {count !== undefined && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                      active
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "bg-surface-muted text-content-muted"
                    )}
                  >
                    {count}
                  </span>
                )}
                {active && (
                  <motion.span
                    layoutId="paciente-tab-underline"
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-primary"
                    transition={{ duration: 0.35, ease: EASE_EXPO }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Painel: Consultas */}
      {tab === "consultas" && (
        <div role="tabpanel" id="tabpanel-consultas" aria-labelledby="tab-consultas" className="mt-6">
          {!podeVerClinico ? (
            <p className="text-sm text-content-secondary">
              Acompanhe suas consultas na página{" "}
              <Link
                href="/consultas"
                className="font-medium text-brand-primary hover:underline"
              >
                Consultas
              </Link>
              .
            </p>
          ) : consultasLoading ? (
            <div className="space-y-2" aria-busy="true">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="skeleton h-14" />
              ))}
            </div>
          ) : consultas.length === 0 ? (
            <p className="text-sm text-content-secondary">
              Nenhuma consulta registrada para este paciente.
            </p>
          ) : (
            <ul className="space-y-2">
              {consultas.map((consulta) => (
                <li
                  key={consulta.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-surface-card px-4 py-3 shadow-sm transition-all duration-200 ease-expo hover:-translate-y-px hover:shadow-card-hover"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium text-content-primary">
                      {dateTimeFormatter.format(new Date(consulta.dataHoraInicio))}
                    </span>
                    <span className="text-sm text-content-secondary">
                      {consulta.psicologoNome}
                    </span>
                    <StatusBadge status={consulta.status} />
                  </div>
                  <ActionLink href={`/consultas/${consulta.id}`} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Painel: Histórico clínico — só ADMIN/PSICOLOGO */}
      {tab === "historico" && podeVerClinico && (
        <div role="tabpanel" id="tabpanel-historico" aria-labelledby="tab-historico" className="mt-6">
          {evolucoesLoading ? (
            <div className="space-y-2" aria-busy="true">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="skeleton h-16" />
              ))}
            </div>
          ) : evolucoesNegadas ? (
            <p className="text-sm text-content-secondary">
              Não foi possível carregar o histórico clínico deste paciente.
            </p>
          ) : evolucoes.length === 0 ? (
            <p className="text-sm text-content-secondary">
              Nenhuma evolução registrada. O registro é feito a partir do
              detalhe de uma consulta realizada.
            </p>
          ) : (
            <ol className="relative space-y-6 border-l-2 border-brand-primary/30 pl-6">
              {evolucoes.map((evolucao) => (
                <li key={evolucao.id} className="relative">
                  <Reveal>
                    <span
                      aria-hidden="true"
                      className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-brand-primary bg-surface-card"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-content-muted">
                        {dateTimeFormatter.format(new Date(evolucao.criadoEm))}
                        {evolucao.atualizadoEm && " · editada"}
                      </span>
                      {evolucao.humor && (
                        <Badge variant="secondary">{evolucao.humor}</Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-content-primary">
                      {evolucao.descricao}
                    </p>
                    {evolucao.observacoes && (
                      <p className="mt-2 rounded-md bg-surface-muted/50 px-3 py-2 text-sm text-content-secondary">
                        <span className="font-medium">Observações:</span>{" "}
                        {evolucao.observacoes}
                      </p>
                    )}
                  </Reveal>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}

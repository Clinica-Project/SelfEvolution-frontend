import { Link } from "@/lib/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { CalendarPlus, X } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ActionLink } from "@/components/dashboard/ActionLink";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ErrorState } from "@/components/dashboard/ErrorState";
import { TableSkeleton } from "@/components/dashboard/TableSkeleton";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SelectField } from "@/components/ui/SelectField";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useConsultas } from "@/hooks/useConsultas";
import { STATUS_LABELS } from "@/lib/constants/consulta-status";
import { cn } from "@/lib/utils/cn";
import type { ConsultaResponse, StatusConsulta } from "@/types/consulta";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

function formatData(iso: string) {
  return dateFormatter.format(new Date(iso));
}

function formatHora(inicio: string, fim: string) {
  return `${timeFormatter.format(new Date(inicio))} – ${timeFormatter.format(new Date(fim))}`;
}

type GrupoData = "hoje" | "amanha" | "proximas" | "anteriores";

const GRUPO_LABELS: Record<GrupoData, string> = {
  hoje: "Hoje",
  amanha: "Amanhã",
  proximas: "Próximas",
  anteriores: "Anteriores",
};

const GRUPO_ORDEM: GrupoData[] = ["hoje", "amanha", "proximas", "anteriores"];

function grupoDaConsulta(iso: string): GrupoData {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const dia = new Date(iso.slice(0, 10) + "T00:00:00");
  const diffDias = Math.round((dia.getTime() - hoje.getTime()) / 86_400_000);
  if (diffDias === 0) return "hoje";
  if (diffDias === 1) return "amanha";
  return diffDias > 1 ? "proximas" : "anteriores";
}

function agruparPorData(
  consultas: ConsultaResponse[]
): { grupo: GrupoData; items: ConsultaResponse[] }[] {
  const buckets = new Map<GrupoData, ConsultaResponse[]>();
  for (const consulta of consultas) {
    const grupo = grupoDaConsulta(consulta.dataHoraInicio);
    const lista = buckets.get(grupo) ?? [];
    lista.push(consulta);
    buckets.set(grupo, lista);
  }
  // Dentro de cada grupo: futuras em ordem crescente, anteriores decrescente
  for (const [grupo, lista] of buckets) {
    lista.sort((a, b) =>
      grupo === "anteriores"
        ? b.dataHoraInicio.localeCompare(a.dataHoraInicio)
        : a.dataHoraInicio.localeCompare(b.dataHoraInicio)
    );
  }
  return GRUPO_ORDEM.filter((g) => buckets.has(g)).map((g) => ({
    grupo: g,
    items: buckets.get(g)!,
  }));
}

function GroupLabel({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 px-2 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-content-muted first:pt-1">
      <span aria-hidden="true" className="h-px w-6 bg-brand-primary/30" />
      {children}
    </p>
  );
}

function ConsultasTable({ consultas }: { consultas: ConsultaResponse[] }) {
  const grupos = agruparPorData(consultas);

  return (
    <>
      {/* Tabela — desktop: header sticky dentro do card com scroll */}
      <Card className="hidden max-h-[70vh] overflow-y-auto p-0 md:block">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-border bg-surface-muted/90 text-xs uppercase tracking-wide text-content-secondary backdrop-blur-sm">
              <th scope="col" className="px-6 py-3.5 font-semibold">Paciente</th>
              <th scope="col" className="px-6 py-3.5 font-semibold">Psicólogo</th>
              <th scope="col" className="px-6 py-3.5 font-semibold">Data</th>
              <th scope="col" className="px-6 py-3.5 font-semibold">Hora</th>
              <th scope="col" className="px-6 py-3.5 text-center font-semibold">Status</th>
              <th scope="col" className="px-6 py-3.5 text-right font-semibold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {grupos.map(({ grupo, items }) => (
              <Fragment key={grupo}>
                <tr className="border-b border-border/60">
                  <td colSpan={6} className="px-6 pb-1.5 pt-4">
                    <span className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-content-muted">
                      <span aria-hidden="true" className="h-px w-6 bg-brand-primary/30" />
                      {GRUPO_LABELS[grupo]}
                    </span>
                  </td>
                </tr>
                {items.map((consulta) => (
                  <tr
                    key={consulta.id}
                    className="group border-b border-border/60 transition-colors duration-200 ease-expo last:border-b-0 hover:bg-surface-muted/40"
                  >
                    <td className="px-6 py-4 font-medium text-content-primary">
                      {consulta.pacienteNome}
                    </td>
                    <td className="px-6 py-4 text-content-secondary">
                      {consulta.psicologoNome}
                    </td>
                    <td className="px-6 py-4 text-content-secondary">
                      {formatData(consulta.dataHoraInicio)}
                    </td>
                    <td className="px-6 py-4 text-content-secondary">
                      {formatHora(consulta.dataHoraInicio, consulta.dataHoraFim)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={consulta.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block opacity-0 transition-opacity duration-200 ease-expo group-hover:opacity-100 group-focus-within:opacity-100">
                        <ActionLink href={`/consultas/${consulta.id}`} />
                      </span>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Cards — mobile, agrupados por data */}
      <div className="md:hidden">
        {grupos.map(({ grupo, items }) => (
          <div key={grupo}>
            <GroupLabel>{GRUPO_LABELS[grupo]}</GroupLabel>
            <div className="space-y-3">
              {items.map((consulta) => (
                <Card key={consulta.id} className="relative p-4 shadow-sm">
                  <StatusBadge
                    status={consulta.status}
                    className="absolute right-4 top-4"
                  />
                  <div className="pr-20">
                    <p className="font-medium text-content-primary">
                      {consulta.pacienteNome}
                    </p>
                    <p className="mt-0.5 text-sm text-content-secondary">
                      {consulta.psicologoNome}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-content-secondary">
                    <span>
                      {formatData(consulta.dataHoraInicio)} ·{" "}
                      {formatHora(consulta.dataHoraInicio, consulta.dataHoraFim)}
                    </span>
                    <ActionLink href={`/consultas/${consulta.id}`} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 py-1 pl-3 pr-1.5 text-xs font-medium text-brand-primary">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remover filtro ${label}`}
        className="flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-150 hover:bg-brand-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  );
}

export function ConsultasPage() {
  const { data, loading, error, refresh } = useConsultas();

  const [statusFilter, setStatusFilter] = useState<StatusConsulta | "TODAS">(
    "TODAS"
  );
  const [dataDe, setDataDe] = useState("");
  const [dataAte, setDataAte] = useState("");
  const [created, setCreated] = useState(false);

  // Lê ?created=1 via window para evitar Suspense de useSearchParams
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("created") === "1") {
      setCreated(true);
      window.history.replaceState(null, "", "/consultas");
    }
  }, []);

  const hasFilters = statusFilter !== "TODAS" || dataDe !== "" || dataAte !== "";

  const consultasFiltradas = useMemo(() => {
    return data
      .filter((consulta) => {
        if (statusFilter !== "TODAS" && consulta.status !== statusFilter) {
          return false;
        }
        // Compara apenas a parte de data (YYYY-MM-DD) do ISO local
        const dia = consulta.dataHoraInicio.slice(0, 10);
        if (dataDe && dia < dataDe) return false;
        if (dataAte && dia > dataAte) return false;
        return true;
      })
      .sort((a, b) => b.dataHoraInicio.localeCompare(a.dataHoraInicio));
  }, [data, statusFilter, dataDe, dataAte]);

  const filteredEmpty = hasFilters && data.length > 0;

  return (
    <div>
      {created && (
        <AlertBanner variant="success" className="mb-6">
          Consulta agendada com sucesso.
        </AlertBanner>
      )}

      <PageHeader
        eyebrow="Agenda"
        title="Consultas"
        description="Acompanhe os agendamentos e o histórico de atendimentos."
        actions={
          <Link
            href="/consultas/nova"
            className={buttonVariants("primary")}
          >
            <span className="inline-flex items-center gap-2">
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Agendar consulta
            </span>
          </Link>
        }
      />

      <Card className="mb-4 p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SelectField
            label="Status"
            name="filtro-status"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusConsulta | "TODAS")
            }
          >
            <option value="TODAS">Todas</option>
            <option value="AGENDADA">Agendada</option>
            <option value="REALIZADA">Realizada</option>
            <option value="CANCELADA">Cancelada</option>
          </SelectField>

          <Input
            label="De"
            name="filtro-data-de"
            type="date"
            value={dataDe}
            onChange={(event) => setDataDe(event.target.value)}
          />
          <Input
            label="Até"
            name="filtro-data-ate"
            type="date"
            value={dataAte}
            onChange={(event) => setDataAte(event.target.value)}
          />

          <div className="flex items-end">
            <Button
              variant="ghost"
              disabled={!hasFilters}
              onClick={() => {
                setStatusFilter("TODAS");
                setDataDe("");
                setDataAte("");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        </div>
      </Card>

      {/* Chips removíveis dos filtros ativos */}
      {hasFilters && (
        <div
          className={cn("mb-5 flex flex-wrap items-center gap-2")}
          aria-label="Filtros ativos"
        >
          {statusFilter !== "TODAS" && (
            <FilterChip
              label={`Status: ${STATUS_LABELS[statusFilter]}`}
              onRemove={() => setStatusFilter("TODAS")}
            />
          )}
          {dataDe && (
            <FilterChip
              label={`De: ${formatData(dataDe + "T00:00:00")}`}
              onRemove={() => setDataDe("")}
            />
          )}
          {dataAte && (
            <FilterChip
              label={`Até: ${formatData(dataAte + "T00:00:00")}`}
              onRemove={() => setDataAte("")}
            />
          )}
        </div>
      )}

      {loading ? (
        <TableSkeleton columns={6} aria-label="Carregando consultas" />
      ) : error ? (
        <ErrorState
          title="Não foi possível carregar as consultas"
          message={error}
          onRetry={() => void refresh()}
        />
      ) : consultasFiltradas.length === 0 ? (
        <EmptyState
          icon={CalendarPlus}
          title={
            filteredEmpty
              ? "Nenhuma consulta encontrada com esses filtros"
              : "Nenhuma consulta agendada"
          }
          description={
            filteredEmpty
              ? "Ajuste os filtros de status ou período para ver outras consultas."
              : "Quando houver consultas, elas aparecerão aqui."
          }
          action={
            filteredEmpty
              ? undefined
              : { label: "Agendar consulta", href: "/consultas/nova" }
          }
        />
      ) : (
        <Reveal>
          <ConsultasTable consultas={consultasFiltradas} />
        </Reveal>
      )}
    </div>
  );
}

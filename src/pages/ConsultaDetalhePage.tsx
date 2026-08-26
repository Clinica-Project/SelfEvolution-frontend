import { Link } from "@/lib/link";
import { useParams } from "react-router-dom";
import { useRouter } from "@/hooks/useRouter";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Calendar,
  CalendarCheck,
  Check,
  ChevronDown,
  ClipboardPen,
  Clock,
  FileText,
  Loader2,
  Trash2,
  User,
  UserCog,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageSkeleton } from "@/components/dashboard/PageSkeleton";
import { PermissionState } from "@/components/dashboard/PermissionState";
import { ErrorState } from "@/components/dashboard/ErrorState";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Input } from "@/components/ui/Input";
import { SelectField } from "@/components/ui/SelectField";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TextareaField } from "@/components/ui/TextareaField";
import { useConsulta } from "@/hooks/useConsulta";
import {
  atualizarConsulta,
  cancelarOuExcluirConsulta,
} from "@/lib/api/consultas";
import { parseApiError } from "@/lib/api/errors";
import { listarServicos } from "@/lib/api/psicologos";
import { useAuth } from "@/lib/auth/context";
import { STATUS_LABELS } from "@/lib/constants/consulta-status";
import { cn } from "@/lib/utils/cn";
import type { ConsultaResponse, StatusConsulta } from "@/types/consulta";
import type { ServicoResponse } from "@/types/psicologo";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

function ResumoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-wide text-content-muted">
          {label}
        </dt>
        <dd className="mt-1 text-sm text-content-primary">{value}</dd>
      </div>
    </div>
  );
}

/** Stepper horizontal: Agendada → Realizada; CANCELADA como estado terminal distinto. */
function StatusStepper({ status }: { status: StatusConsulta }) {
  if (status === "CANCELADA") {
    return (
      <div className="flex items-center gap-3 rounded-md border border-border bg-surface-muted/50 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-content-muted/15 text-content-muted">
          <XCircle className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="text-sm text-content-secondary">
          Esta consulta foi <span className="font-semibold text-content-primary">cancelada</span>{" "}
          e o horário ficou livre.
        </p>
      </div>
    );
  }

  const steps: { label: string; done: boolean; current: boolean }[] = [
    { label: "Agendada", done: true, current: status === "AGENDADA" },
    { label: "Realizada", done: status === "REALIZADA", current: status === "REALIZADA" },
  ];

  return (
    <ol aria-label="Progresso da consulta" className="flex items-center">
      {steps.map((step, i) => (
        <li key={step.label} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors duration-300",
                step.done
                  ? "border-brand-primary bg-brand-primary text-content-inverse"
                  : "border-border bg-surface-card text-content-muted",
                step.current && "ring-4 ring-brand-primary/15"
              )}
            >
              {step.done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={cn(
                "text-xs font-medium",
                step.current
                  ? "text-brand-primary"
                  : step.done
                    ? "text-content-primary"
                    : "text-content-muted"
              )}
              aria-current={step.current ? "step" : undefined}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                "mx-3 mb-6 h-0.5 flex-1 rounded-full transition-colors duration-300",
                steps[i + 1].done ? "bg-brand-primary" : "bg-border"
              )}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

function toInputValue(iso: string) {
  return iso.slice(0, 16);
}

function toLocalDateTime(value: string) {
  return value.length === 16 ? `${value}:00` : value;
}

export function ConsultaDetalhePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { role } = useAuth();

  const consultaId = params?.id;
  const { data: consulta, loading, error, errorStatus, setData } =
    useConsulta(consultaId);

  const isPaciente = role === "PACIENTE";
  const podeGerenciar = role === "PSICOLOGO" || role === "ADMIN";

  const [servicos, setServicos] = useState<ServicoResponse[]>([]);
  const [editServicoId, setEditServicoId] = useState("");
  const [editInicio, setEditInicio] = useState("");
  const [editFim, setEditFim] = useState("");
  const [editObservacoes, setEditObservacoes] = useState("");
  const [edicaoAberta, setEdicaoAberta] = useState(false);

  const [saving, setSaving] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [feedback, setFeedback] = useState<{
    variant: "success" | "error";
    message: string;
  } | null>(null);

  const [confirmAction, setConfirmAction] = useState<
    "excluir" | "cancelar" | null
  >(null);

  // Preenche o formulário de edição quando a consulta carrega
  useEffect(() => {
    if (!consulta) return;
    setEditServicoId(consulta.servicoId ?? "");
    setEditInicio(toInputValue(consulta.dataHoraInicio));
    setEditFim(toInputValue(consulta.dataHoraFim));
    setEditObservacoes(consulta.observacoes ?? "");
    // Consulta ainda agendada abre a edição; encerradas ficam fechadas
    setEdicaoAberta(consulta.status === "AGENDADA");
  }, [consulta]);

  // Serviços do psicólogo para o select de edição
  useEffect(() => {
    if (!podeGerenciar || !consulta?.psicologoId) return;
    listarServicos(consulta.psicologoId)
      .then(setServicos)
      .catch(() => setServicos([]));
  }, [podeGerenciar, consulta?.psicologoId]);

  function aplicarAtualizacao(atualizada: ConsultaResponse) {
    setData(atualizada);
  }

  async function handleSalvarEdicao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consultaId || saving) return;
    setFeedback(null);

    if (new Date(editFim) <= new Date(editInicio)) {
      setFeedback({
        variant: "error",
        message: "O horário de fim deve ser posterior ao de início.",
      });
      return;
    }

    setSaving(true);
    try {
      const atualizada = await atualizarConsulta(consultaId, {
        servicoId: editServicoId || undefined,
        dataHoraInicio: toLocalDateTime(editInicio),
        dataHoraFim: toLocalDateTime(editFim),
        observacoes: editObservacoes.trim() || undefined,
      });
      aplicarAtualizacao(atualizada);
      setFeedback({ variant: "success", message: "Consulta atualizada com sucesso." });
    } catch (err) {
      setFeedback({ variant: "error", message: parseApiError(err) });
    } finally {
      setSaving(false);
    }
  }

  async function handleMarcarRealizada() {
    if (!consultaId || actionBusy) return;
    setFeedback(null);
    setActionBusy(true);
    try {
      const atualizada = await atualizarConsulta(consultaId, {
        status: "REALIZADA",
      });
      aplicarAtualizacao(atualizada);
      setFeedback({
        variant: "success",
        message: "Consulta marcada como realizada.",
      });
    } catch (err) {
      setFeedback({ variant: "error", message: parseApiError(err) });
    } finally {
      setActionBusy(false);
    }
  }

  async function handleCancelarComoPaciente() {
    if (!consultaId || actionBusy) return;
    setActionBusy(true);
    try {
      const atualizada = await atualizarConsulta(consultaId, {
        status: "CANCELADA",
      });
      aplicarAtualizacao(atualizada);
      setFeedback({ variant: "success", message: "Consulta cancelada." });
      setConfirmAction(null);
    } catch (err) {
      setFeedback({ variant: "error", message: parseApiError(err) });
      setConfirmAction(null);
    } finally {
      setActionBusy(false);
    }
  }

  async function handleExcluir() {
    if (!consultaId || actionBusy) return;
    setActionBusy(true);
    try {
      const resultado = await cancelarOuExcluirConsulta(consultaId);
      if (resultado === null) {
        // 204: excluída de fato (psicólogo/admin) → volta para a listagem
        router.push("/consultas");
        return;
      }
      // 200: soft cancel (paciente)
      aplicarAtualizacao(resultado);
      setFeedback({ variant: "success", message: "Consulta cancelada." });
      setConfirmAction(null);
    } catch (err) {
      setFeedback({ variant: "error", message: parseApiError(err) });
      setConfirmAction(null);
    } finally {
      setActionBusy(false);
    }
  }

  const breadcrumb = (
    <Breadcrumb
      className="mb-4"
      items={[
        { label: "Consultas", href: "/consultas" },
        { label: "Detalhe" },
      ]}
    />
  );

  if (loading) {
    return (
      <div>
        {breadcrumb}
        <PageSkeleton aria-label="Carregando consulta" />
      </div>
    );
  }

  if (error || !consulta) {
    return (
      <div>
        {breadcrumb}
        {errorStatus === 403 ? (
          <PermissionState
            description="Você não tem acesso a esta consulta."
            backHref="/consultas"
            backLabel="Voltar para consultas"
          />
        ) : (
          <ErrorState
            title={
              errorStatus === 404
                ? "Consulta não encontrada"
                : "Não foi possível carregar a consulta"
            }
            message={error ?? "Tente novamente em instantes."}
            backHref="/consultas"
            backLabel="Voltar para consultas"
          />
        )}
      </div>
    );
  }

  const encerrada = consulta.status !== "AGENDADA";

  return (
    <div>
      {breadcrumb}

      <PageHeader
        eyebrow="Agenda"
        title="Detalhe da consulta"
        actions={<StatusBadge status={consulta.status} className="px-3 py-1 text-sm" />}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        {/* Coluna principal */}
        <div className="min-w-0 space-y-6">
          {feedback && (
            <AlertBanner variant={feedback.variant}>
              {feedback.message}
            </AlertBanner>
          )}

          {/* Resumo */}
          <Card>
            <CardTitle>Resumo</CardTitle>
            <div className="mt-5">
              <StatusStepper status={consulta.status} />
            </div>
            <dl className="mt-6 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
              <ResumoItem icon={User} label="Paciente" value={consulta.pacienteNome} />
              <ResumoItem icon={UserCog} label="Psicólogo" value={consulta.psicologoNome} />
              <ResumoItem
                icon={ClipboardPen}
                label="Serviço"
                value={consulta.servicoNome ?? "Sem serviço específico"}
              />
              <ResumoItem
                icon={FileText}
                label="Observações"
                value={consulta.observacoes?.trim() ? consulta.observacoes : "—"}
              />
            </dl>
          </Card>

          {/* Edição — psicólogo/admin (colapsável) */}
          {podeGerenciar && (
            <Card className="p-0">
              <button
                type="button"
                onClick={() => setEdicaoAberta((aberta) => !aberta)}
                aria-expanded={edicaoAberta}
                className="flex w-full items-center justify-between gap-3 rounded-lg p-6 text-left transition-colors duration-200 ease-expo hover:bg-surface-muted/40"
              >
                <CardTitle>Editar consulta</CardTitle>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-content-muted transition-transform duration-200 ease-expo",
                    edicaoAberta && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {edicaoAberta && (
                <form
                  onSubmit={handleSalvarEdicao}
                  className="space-y-5 border-t border-border p-6 pt-5"
                  noValidate
                >
                  <SelectField
                    label="Serviço"
                    name="edit-servico"
                    value={editServicoId}
                    onChange={(event) => setEditServicoId(event.target.value)}
                    disabled={saving || encerrada}
                  >
                    <option value="">Sem serviço específico</option>
                    {servicos.map((servico) => (
                      <option key={servico.id} value={servico.id}>
                        {servico.nome} · {servico.duracao} min
                      </option>
                    ))}
                  </SelectField>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Início"
                      name="edit-inicio"
                      type="datetime-local"
                      value={editInicio}
                      onChange={(event) => setEditInicio(event.target.value)}
                      disabled={saving || encerrada}
                      required
                    />
                    <Input
                      label="Fim"
                      name="edit-fim"
                      type="datetime-local"
                      value={editFim}
                      onChange={(event) => setEditFim(event.target.value)}
                      disabled={saving || encerrada}
                      required
                    />
                  </div>

                  <TextareaField
                    label="Observações"
                    name="edit-observacoes"
                    rows={3}
                    value={editObservacoes}
                    onChange={(event) => setEditObservacoes(event.target.value)}
                    disabled={saving}
                  />

                  {encerrada && (
                    <p className="text-xs text-content-muted">
                      Datas e serviço não podem ser alterados em consultas{" "}
                      {STATUS_LABELS[consulta.status].toLowerCase()}s.
                    </p>
                  )}

                  <div className="flex justify-end">
                    <Button type="submit" disabled={saving} className="gap-2">
                      {saving && (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      )}
                      Salvar alterações
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          )}
        </div>

        {/* Sidebar sticky */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          {/* Ações */}
          <Card>
            <CardTitle>Ações</CardTitle>
            <div className="mt-5 flex flex-col gap-2.5">
              {podeGerenciar && (
                <>
                  <Button
                    variant="primary"
                    onClick={handleMarcarRealizada}
                    disabled={actionBusy || encerrada}
                    className="w-full justify-center gap-2"
                  >
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Marcar como realizada
                  </Button>

                  {consulta.status === "REALIZADA" && (
                    <Link
                      href={`/pacientes/${consulta.pacienteId}/evolucao?consultaId=${consulta.id}`}
                      className={cn(buttonVariants("secondary"), "w-full justify-center gap-2")}
                    >
                      <ClipboardPen className="h-4 w-4" aria-hidden="true" />
                      Registrar evolução
                    </Link>
                  )}

                  <Button
                    variant="danger"
                    onClick={() => setConfirmAction("excluir")}
                    disabled={actionBusy}
                    className="w-full justify-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Excluir consulta
                  </Button>
                </>
              )}

              {isPaciente && (
                <Button
                  variant="danger"
                  onClick={() => setConfirmAction("cancelar")}
                  disabled={actionBusy || encerrada}
                  className="w-full justify-center gap-2"
                >
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  Cancelar consulta
                </Button>
              )}
            </div>

            {isPaciente && encerrada && (
              <p className="mt-3 text-xs text-content-muted">
                Consultas {STATUS_LABELS[consulta.status].toLowerCase()}s não podem
                ser canceladas.
              </p>
            )}
          </Card>

          {/* Datas */}
          <Card>
            <CardTitle>Data e horário</CardTitle>
            <dl className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-content-muted">
                    Data
                  </dt>
                  <dd className="mt-1 text-sm text-content-primary">
                    {dateFormatter.format(new Date(consulta.dataHoraInicio))}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-content-muted">
                    Horário
                  </dt>
                  <dd className="mt-1 text-sm text-content-primary">
                    {timeFormatter.format(new Date(consulta.dataHoraInicio))} –{" "}
                    {timeFormatter.format(new Date(consulta.dataHoraFim))}
                  </dd>
                </div>
              </div>
            </dl>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={confirmAction === "excluir"}
        title="Excluir consulta"
        description="Esta ação remove a consulta definitivamente e não pode ser desfeita. Deseja continuar?"
        confirmLabel="Excluir"
        danger
        busy={actionBusy}
        onConfirm={handleExcluir}
        onClose={() => setConfirmAction(null)}
      />

      <ConfirmDialog
        open={confirmAction === "cancelar"}
        title="Cancelar consulta"
        description="A consulta será marcada como cancelada e o horário ficará livre. Deseja continuar?"
        confirmLabel="Cancelar consulta"
        danger
        busy={actionBusy}
        onConfirm={handleCancelarComoPaciente}
        onClose={() => setConfirmAction(null)}
      />
    </div>
  );
}

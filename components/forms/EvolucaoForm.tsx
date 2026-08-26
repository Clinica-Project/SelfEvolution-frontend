import { useEffect, useState, type FormEvent } from "react";
import { Calendar, NotebookPen, User } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ErrorState } from "@/components/dashboard/ErrorState";
import { PageSkeleton } from "@/components/dashboard/PageSkeleton";
import { PermissionState } from "@/components/dashboard/PermissionState";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Badge } from "@/components/ui/Badge";
import { Card, CardTitle } from "@/components/ui/Card";
import { FormActions } from "@/components/ui/FormActions";
import { Input } from "@/components/ui/Input";
import { TextareaField } from "@/components/ui/TextareaField";
import { useConsulta } from "@/hooks/useConsulta";
import { useEvolucao } from "@/hooks/useEvolucao";
import { parseApiError } from "@/lib/api/errors";
import {
  atualizarEvolucao,
  buscarEvolucao,
  criarEvolucao,
} from "@/lib/api/evolucoes";
import { buscarPaciente } from "@/lib/api/pacientes";
import { useAuth } from "@/lib/auth/context";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

type EvolucaoFormProps = {
  pacienteId: string;
  consultaId: string | undefined;
};

export function EvolucaoForm({ pacienteId, consultaId }: EvolucaoFormProps) {
  const { role } = useAuth();
  const podeRegistrar = role === "PSICOLOGO" || role === "ADMIN";

  const consulta = useConsulta(podeRegistrar ? consultaId : undefined);
  const evolucaoState = useEvolucao(podeRegistrar ? consultaId : undefined);

  const [pacienteNome, setPacienteNome] = useState<string | null>(null);

  const [descricao, setDescricao] = useState("");
  const [humor, setHumor] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    variant: "success" | "error";
    message: string;
  } | null>(null);

  // Nome do paciente: GET /pacientes/{id}, com fallback no nome vindo da consulta
  useEffect(() => {
    if (!podeRegistrar || !pacienteId) return;
    buscarPaciente(pacienteId)
      .then((paciente) => setPacienteNome(paciente.nome))
      .catch(() => setPacienteNome(null));
  }, [podeRegistrar, pacienteId]);

  // Preenche o formulário quando já existe evolução (modo edição)
  useEffect(() => {
    if (!evolucaoState.evolucao) return;
    setModoEdicao(true);
    setDescricao(evolucaoState.evolucao.descricao);
    setHumor(evolucaoState.evolucao.humor ?? "");
    setObservacoes(evolucaoState.evolucao.observacoes ?? "");
  }, [evolucaoState.evolucao]);

  const backHref = consultaId ? `/consultas/${consultaId}` : "/consultas";

  // ---- Guardas ----

  if (!podeRegistrar) {
    return (
      <PermissionState
        description="A evolução clínica é restrita a psicólogos e administradores."
        backHref="/consultas"
      />
    );
  }

  if (!consultaId) {
    return (
      <ErrorState
        title="Consulta não informada"
        message="Acesse esta página a partir do detalhe de uma consulta realizada."
        backHref="/consultas"
      />
    );
  }

  if (consulta.loading || evolucaoState.loading) {
    return <PageSkeleton lines={4} aria-label="Carregando evolução clínica" />;
  }

  const errorStatus = consulta.errorStatus ?? evolucaoState.errorStatus;
  const loadError = consulta.error ?? evolucaoState.error;

  if (loadError || !consulta.data) {
    if (errorStatus === 403) {
      return (
        <PermissionState
          description="Você só pode registrar evoluções de consultas atendidas por você."
          backHref={backHref}
        />
      );
    }
    return (
      <ErrorState
        title={
          errorStatus === 404
            ? "Consulta não encontrada"
            : "Não foi possível carregar os dados"
        }
        message={loadError ?? "Tente novamente em instantes."}
        backHref={backHref}
      />
    );
  }

  const consultaRealizada = consulta.data.status === "REALIZADA";
  const nomeExibido = pacienteNome ?? consulta.data.pacienteNome;
  const formDisabled = saving || !consultaRealizada;
  const evolucao = evolucaoState.evolucao;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consultaId || saving) return;
    setFeedback(null);

    if (!descricao.trim()) {
      setFeedback({
        variant: "error",
        message: "Descreva a evolução clínica antes de salvar.",
      });
      return;
    }

    const body = {
      descricao: descricao.trim(),
      humor: humor.trim() || undefined,
      observacoes: observacoes.trim() || undefined,
    };

    setSaving(true);
    try {
      if (modoEdicao) {
        const atualizada = await atualizarEvolucao(consultaId, body);
        evolucaoState.setEvolucao(atualizada);
        setFeedback({
          variant: "success",
          message: "Evolução clínica atualizada com sucesso.",
        });
      } else {
        const criada = await criarEvolucao(consultaId, body);
        evolucaoState.setEvolucao(criada);
        setModoEdicao(true);
        setFeedback({
          variant: "success",
          message: "Evolução clínica registrada com sucesso.",
        });
      }
    } catch (err) {
      // Já existe evolução para esta consulta? Muda para edição.
      if (!modoEdicao) {
        try {
          const existente = await buscarEvolucao(consultaId);
          evolucaoState.setEvolucao(existente);
          setModoEdicao(true);
          setFeedback({
            variant: "error",
            message:
              "Esta consulta já possui uma evolução registrada — os dados foram carregados para edição.",
          });
          return;
        } catch {
          // Não era esse o problema; mostra o erro original abaixo
        }
      }
      setFeedback({ variant: "error", message: parseApiError(err) });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <PageHeader
          eyebrow="Prontuário"
          title="Evolução clínica"
          className="mb-0"
        />
        {modoEdicao && <Badge variant="primary">Editando registro</Badge>}
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Contexto da consulta */}
        <Card className="bg-surface-muted/40 p-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
              <NotebookPen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-2 text-content-primary">
                <User className="h-4 w-4 text-content-muted" aria-hidden="true" />
                <span className="font-medium">{nomeExibido}</span>
              </span>
              <span className="flex items-center gap-2 text-content-secondary">
                <Calendar className="h-4 w-4 text-content-muted" aria-hidden="true" />
                {dateFormatter.format(new Date(consulta.data.dataHoraInicio))}
              </span>
              {consultaRealizada ? (
                <Badge variant="success">Consulta realizada</Badge>
              ) : (
                <Badge variant="warning">Consulta não realizada</Badge>
              )}
            </div>
          </div>
        </Card>

        {!consultaRealizada && (
          <AlertBanner variant="warning">
            A evolução clínica só pode ser registrada para consultas com status{" "}
            <strong>Realizada</strong>. Esta consulta está{" "}
            {consulta.data.status === "AGENDADA" ? "agendada" : "cancelada"}.
          </AlertBanner>
        )}

        {feedback && (
          <AlertBanner variant={feedback.variant}>
            {feedback.message}
          </AlertBanner>
        )}

        <Card>
          <CardTitle>
            {modoEdicao ? "Editar registro" : "Novo registro"}
          </CardTitle>

          {modoEdicao && evolucao && (
            <p className="mt-1 text-xs text-content-muted">
              Registrada em{" "}
              {dateFormatter.format(new Date(evolucao.criadoEm))}
              {evolucao.atualizadoEm &&
                ` · última edição em ${dateFormatter.format(new Date(evolucao.atualizadoEm))}`}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-5" noValidate>
            <TextareaField
              label="Como foi a sessão?"
              name="descricao"
              rows={8}
              placeholder="Registre com carinho como o paciente chegou, os temas trabalhados, os avanços observados e os pontos de atenção para os próximos encontros."
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              disabled={formDisabled}
              required
            />

            <Input
              label="Humor (opcional)"
              name="humor"
              placeholder="ex.: Estável, ansioso, animado…"
              value={humor}
              onChange={(event) => setHumor(event.target.value)}
              disabled={formDisabled}
            />

            <TextareaField
              label="Observações"
              optional
              name="observacoes"
              rows={3}
              placeholder="ex.: Manter acompanhamento semanal"
              value={observacoes}
              onChange={(event) => setObservacoes(event.target.value)}
              disabled={formDisabled}
            />

            <FormActions
              cancelHref={backHref}
              cancelLabel="Voltar"
              submitLabel={modoEdicao ? "Salvar alterações" : "Salvar evolução"}
              loading={saving}
              disabled={formDisabled}
            />
          </form>
        </Card>
      </div>
    </div>
  );
}

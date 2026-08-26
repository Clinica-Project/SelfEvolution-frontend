import { useRouter } from "@/hooks/useRouter";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { Clock, Lock } from "lucide-react";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Card, CardTitle } from "@/components/ui/Card";
import { FormActions } from "@/components/ui/FormActions";
import { Input } from "@/components/ui/Input";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";
import { criarConsulta } from "@/lib/api/consultas";
import { parseApiError } from "@/lib/api/errors";
import {
  buscarPsicologoPorEmail,
  listarHorarios,
  listarServicos,
} from "@/lib/api/psicologos";
import { buscarPacientePorEmail } from "@/lib/api/pacientes";
import { useAuth } from "@/lib/auth/context";
import { decodeJwtPayload, getEmailFromToken } from "@/lib/auth/jwt";
import { getToken } from "@/lib/auth/token";
import { usePacientes } from "@/hooks/usePacientes";
import { usePsicologos } from "@/hooks/usePsicologos";
import type {
  DiaSemana,
  HorarioAtendimentoResponse,
  ServicoResponse,
} from "@/types/psicologo";

const DIAS_SEMANA: Record<DiaSemana, string> = {
  MONDAY: "Segunda-feira",
  TUESDAY: "Terça-feira",
  WEDNESDAY: "Quarta-feira",
  THURSDAY: "Quinta-feira",
  FRIDAY: "Sexta-feira",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

const ORDEM_DIAS: DiaSemana[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

function formatHorario(valor: string) {
  return valor.slice(0, 5);
}

function formatPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Campo travado (usuário logado) com fundo suave e cadeado. */
function LockedField({ label, name, value }: { label: string; name: string; value: string }) {
  return (
    <Input
      label={
        <>
          {label}{" "}
          <Lock
            className="ml-1 inline-block h-3.5 w-3.5 align-[-2px] text-content-muted"
            aria-hidden="true"
          />
        </>
      }
      name={name}
      value={value}
      disabled
      readOnly
      className="bg-surface-muted/40 text-content-secondary"
    />
  );
}

function HorariosAtendimento({
  horarios,
  loading,
}: {
  horarios: HorarioAtendimentoResponse[];
  loading: boolean;
}) {
  const agrupados = useMemo(() => {
    return ORDEM_DIAS.map((dia) => ({
      dia,
      faixas: horarios.filter((horario) => horario.dia === dia),
    })).filter((grupo) => grupo.faixas.length > 0);
  }, [horarios]);

  return (
    <Card className="p-5 lg:sticky lg:top-6">
      <CardTitle className="flex items-center gap-2 text-base">
        <Clock className="h-4 w-4 text-brand-primary" aria-hidden="true" />
        Horários de atendimento
      </CardTitle>

      {loading ? (
        <div className="mt-4 space-y-2" aria-busy="true" aria-label="Carregando horários">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton h-8" />
          ))}
        </div>
      ) : agrupados.length === 0 ? (
        <p className="mt-4 text-sm text-content-secondary">
          Este psicólogo ainda não cadastrou horários de atendimento — não será
          possível agendar até que a agenda seja configurada.
        </p>
      ) : (
        <ul className="mt-4 space-y-2.5 text-sm text-content-secondary">
          {agrupados.map(({ dia, faixas }) => (
            <li key={dia} className="flex flex-wrap gap-x-2">
              <span className="w-32 shrink-0 font-medium text-content-primary">
                {DIAS_SEMANA[dia]}
              </span>
              <span>
                {faixas
                  .map(
                    (faixa) =>
                      `${formatHorario(faixa.inicio)} às ${formatHorario(faixa.fim)}`
                  )
                  .join(" · ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

/** Converte "YYYY-MM-DDTHH:mm" (datetime-local) para LocalDateTime ISO. */
function toLocalDateTime(value: string) {
  return value.length === 16 ? `${value}:00` : value;
}

function addMinutes(value: string, minutes: number) {
  const date = new Date(value);
  date.setMinutes(date.getMinutes() + minutes);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

type AppointmentFormProps = {
  /** Pré-seleciona o paciente (ex.: vindo de /pacientes/[id]). */
  defaultPacienteId?: string;
};

export function AppointmentForm({ defaultPacienteId }: AppointmentFormProps) {
  const router = useRouter();
  const { role } = useAuth();

  const isPaciente = role === "PACIENTE";
  const isPsicologo = role === "PSICOLOGO";

  // ID do próprio usuário (quando presente como claim no JWT)
  const ownIdFromToken = useMemo(() => {
    const token = getToken();
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    const id = payload?.id ?? payload?.userId ?? payload?.uuid;
    return typeof id === "string" ? id : null;
  }, []);

  // Psicólogo logado: resolve o próprio id via GET /psicologos/email/{email}
  const [meuPsicologoId, setMeuPsicologoId] = useState<string | null>(null);
  const [meuPsicologoNome, setMeuPsicologoNome] = useState<string | null>(null);

  useEffect(() => {
    if (!isPsicologo) return;
    const email = getEmailFromToken();
    if (!email) return;
    buscarPsicologoPorEmail(email)
      .then((psicologo) => {
        setMeuPsicologoId(psicologo.id);
        setMeuPsicologoNome(psicologo.nome);
      })
      .catch(() => {
        // Mantém o select como fallback se a busca falhar
      });
  }, [isPsicologo]);

  // Paciente logado: resolve o próprio id via GET /pacientes/email/{email}
  const [meuPacienteId, setMeuPacienteId] = useState<string | null>(null);
  const [meuPacienteNome, setMeuPacienteNome] = useState<string | null>(null);

  useEffect(() => {
    if (!isPaciente) return;
    const email = getEmailFromToken();
    if (!email) return;
    buscarPacientePorEmail(email)
      .then((paciente) => {
        setMeuPacienteId(paciente.id);
        setMeuPacienteNome(paciente.nome);
      })
      .catch(() => {
        // Se falhar, o paciente fica sem poder agendar (não deve escolher outro)
      });
  }, [isPaciente]);

  const psicologos = usePsicologos(!isPsicologo || !meuPsicologoId);
  const pacientes = usePacientes(!isPaciente);

  const [pacienteId, setPacienteId] = useState(defaultPacienteId ?? "");
  const [psicologoId, setPsicologoId] = useState("");
  const [servicoId, setServicoId] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [servicos, setServicos] = useState<ServicoResponse[]>([]);
  const [horarios, setHorarios] = useState<HorarioAtendimentoResponse[]>([]);
  const [loadingAgenda, setLoadingAgenda] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const psicologoSelecionado = isPsicologo && meuPsicologoId ? meuPsicologoId : psicologoId;

  // Paciente logado: usa o próprio id (do token ou resolvido por e-mail)
  useEffect(() => {
    if (!isPaciente) return;
    if (ownIdFromToken) setPacienteId(ownIdFromToken);
    else if (meuPacienteId) setPacienteId(meuPacienteId);
  }, [isPaciente, ownIdFromToken, meuPacienteId]);

  // Ao escolher psicólogo: carrega serviços + horários
  useEffect(() => {
    if (!psicologoSelecionado) {
      setServicos([]);
      setHorarios([]);
      return;
    }

    let active = true;
    setLoadingAgenda(true);
    setServicoId("");

    Promise.all([
      listarServicos(psicologoSelecionado).catch(() => []),
      listarHorarios(psicologoSelecionado).catch(() => []),
    ])
      .then(([listaServicos, listaHorarios]) => {
        if (!active) return;
        setServicos(listaServicos);
        setHorarios(listaHorarios);
      })
      .finally(() => {
        if (active) setLoadingAgenda(false);
      });

    return () => {
      active = false;
    };
  }, [psicologoSelecionado]);

  const servicoAtual = servicos.find((servico) => servico.id === servicoId);

  // Sugestão UX: fim = início + duração do serviço
  useEffect(() => {
    if (inicio && servicoAtual?.duracao) {
      setFim(addMinutes(inicio, servicoAtual.duracao));
    }
  }, [inicio, servicoAtual]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFormError(null);

    if (!pacienteId.trim()) {
      setFormError("Informe o paciente da consulta.");
      return;
    }
    if (!psicologoSelecionado) {
      setFormError("Selecione o psicólogo.");
      return;
    }
    if (!inicio || !fim) {
      setFormError("Preencha data e hora de início e fim.");
      return;
    }
    if (new Date(fim) <= new Date(inicio)) {
      setFormError("O horário de fim deve ser posterior ao de início.");
      return;
    }
    if (new Date(inicio) < new Date()) {
      setFormError("Não é possível agendar uma consulta no passado.");
      return;
    }

    setSubmitting(true);
    try {
      await criarConsulta({
        pacienteId: pacienteId.trim(),
        psicologoId: psicologoSelecionado,
        servicoId: servicoId || undefined,
        dataHoraInicio: toLocalDateTime(inicio),
        dataHoraFim: toLocalDateTime(fim),
        observacoes: observacoes.trim() || undefined,
      });
      router.push("/consultas?created=1");
    } catch (error) {
      setFormError(parseApiError(error));
      setSubmitting(false);
    }
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Card>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {formError && (
            <AlertBanner variant="error">{formError}</AlertBanner>
          )}

          {/* Paciente */}
          {isPaciente ? (
            <LockedField
              label="Paciente"
              name="paciente"
              value={meuPacienteNome ?? meuPacienteId ?? "Carregando seus dados…"}
            />
          ) : pacientes.supported ? (
            <SelectField
              label="Paciente"
              name="pacienteId"
              value={pacienteId}
              onChange={(event) => setPacienteId(event.target.value)}
              disabled={submitting || pacientes.loading}
              required
            >
              <option value="">
                {pacientes.loading ? "Carregando pacientes…" : "Selecione o paciente"}
              </option>
              {pacientes.data.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nome} — {paciente.email}
                </option>
              ))}
            </SelectField>
          ) : (
            <Input
              label="ID do paciente (UUID)"
              name="pacienteId"
              placeholder="ex.: 550e8400-e29b-41d4-a716-446655440000"
              value={pacienteId}
              onChange={(event) => setPacienteId(event.target.value)}
              disabled={submitting}
              required
            />
          )}
          {!pacientes.supported && !isPaciente && (
            <p className="-mt-3 text-xs text-content-muted">
              O backend ainda não expõe a listagem de pacientes (GET /pacientes) —
              informe o UUID manualmente por enquanto.
            </p>
          )}

          {/* Psicólogo */}
          {isPsicologo && meuPsicologoId ? (
            <LockedField
              label="Psicólogo"
              name="psicologo"
              value={meuPsicologoNome ?? "Você"}
            />
          ) : (
            <SelectField
              label="Psicólogo"
              name="psicologoId"
              value={psicologoId}
              onChange={(event) => setPsicologoId(event.target.value)}
              disabled={submitting || psicologos.loading}
              required
            >
              <option value="">
                {psicologos.loading ? "Carregando psicólogos…" : "Selecione o psicólogo"}
              </option>
              {psicologos.data.map((psicologo) => (
                <option key={psicologo.id} value={psicologo.id}>
                  {psicologo.nome} — {psicologo.especialidade}
                </option>
              ))}
            </SelectField>
          )}

          {/* Serviço (opcional) */}
          <SelectField
            label="Serviço (opcional)"
            name="servicoId"
            value={servicoId}
            onChange={(event) => setServicoId(event.target.value)}
            disabled={submitting || !psicologoSelecionado || loadingAgenda}
            hint={
              servicoAtual
                ? `Duração de ${servicoAtual.duracao} min · ${formatPreco(servicoAtual.preco)} — o horário de fim é sugerido automaticamente.`
                : psicologoSelecionado
                  ? undefined
                  : "Selecione um psicólogo para ver os serviços."
            }
          >
            <option value="">Sem serviço específico</option>
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.nome} · {servico.duracao} min · {formatPreco(servico.preco)}
              </option>
            ))}
          </SelectField>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Início"
              name="dataHoraInicio"
              type="datetime-local"
              value={inicio}
              onChange={(event) => setInicio(event.target.value)}
              disabled={submitting}
              required
            />
            <Input
              label="Fim"
              name="dataHoraFim"
              type="datetime-local"
              value={fim}
              onChange={(event) => setFim(event.target.value)}
              disabled={submitting}
              required
            />
          </div>

          <TextareaField
            label="Observações"
            optional
            name="observacoes"
            rows={3}
            placeholder="ex.: Primeira consulta"
            value={observacoes}
            onChange={(event) => setObservacoes(event.target.value)}
            disabled={submitting}
          />

          <FormActions
            cancelHref="/consultas"
            submitLabel={submitting ? "Agendando…" : "Agendar"}
            loading={submitting}
          />
        </form>
      </Card>

      {psicologoSelecionado && (
        <HorariosAtendimento horarios={horarios} loading={loadingAgenda} />
      )}
    </div>
  );
}

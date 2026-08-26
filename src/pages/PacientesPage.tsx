import { Link } from "@/lib/link";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ActionLink } from "@/components/dashboard/ActionLink";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ErrorState } from "@/components/dashboard/ErrorState";
import { PatientAvatar } from "@/components/dashboard/PatientAvatar";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { usePacientes } from "@/hooks/usePacientes";
import { EASE_EXPO } from "@/lib/motion";
import { formatCpf } from "@/lib/utils/cpf";
import type { PacienteResponse } from "@/types/paciente";

function PacienteCard({ paciente }: { paciente: PacienteResponse }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="h-full"
      {...(reduced
        ? {}
        : {
            whileHover: { y: -2 },
            transition: { duration: 0.25, ease: EASE_EXPO },
          })}
    >
      <Card className="group flex h-full flex-col p-5 transition-shadow duration-300 ease-expo hover:shadow-card-hover">
        <div className="flex items-start gap-4">
          <PatientAvatar nome={paciente.nome} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-content-primary">
              {paciente.nome}
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-content-secondary">
              <Mail className="h-3.5 w-3.5 shrink-0 text-content-muted" aria-hidden="true" />
              {paciente.email}
            </p>
            <p className="mt-1 font-mono text-xs tracking-wide text-content-muted">
              {formatCpf(paciente.cpf)}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end border-t border-border/60 pt-3">
          <ActionLink href={`/pacientes/${paciente.id}`} label="Ver perfil" />
        </div>
      </Card>
    </motion.div>
  );
}

export function PacientesPage() {
  const { data, loading, error, supported, refresh } = usePacientes();

  return (
    <div>
      <PageHeader
        eyebrow="Pessoas"
        title="Pacientes"
        description="Cadastro e acompanhamento dos pacientes da clínica."
        actions={
          <Link href="/pacientes/novo" className={buttonVariants("primary")}>
            <span className="inline-flex items-center gap-2">
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Novo paciente
            </span>
          </Link>
        }
      />

      {loading ? (
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Carregando pacientes"
          role="status"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="p-5">
              <div className="flex items-start gap-4">
                <div className="skeleton h-11 w-11 rounded-full" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-3 w-full" />
                  <div className="skeleton h-3 w-1/2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : !supported ? (
        <EmptyState
          icon={UserPlus}
          variant="warning"
          title="Listagem indisponível"
          description="O backend ainda não expõe o endpoint de listagem de pacientes (GET /pacientes). Você ainda pode cadastrar novos pacientes e acessar o detalhe pela URL /pacientes/{id}."
          action={{ label: "Novo paciente", href: "/pacientes/novo" }}
        />
      ) : error ? (
        <ErrorState
          title="Não foi possível carregar os pacientes"
          message={error}
          onRetry={() => void refresh()}
        />
      ) : data.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum paciente cadastrado"
          description="Cadastre o primeiro paciente para começar os atendimentos."
          action={{ label: "Novo paciente", href: "/pacientes/novo" }}
        />
      ) : (
        <RevealGroup stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((paciente) => (
            <RevealItem key={paciente.id}>
              <PacienteCard paciente={paciente} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}

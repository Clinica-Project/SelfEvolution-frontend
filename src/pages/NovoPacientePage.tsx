import { useRouter } from "@/hooks/useRouter";
import { useState, type FormEvent } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { FormActions } from "@/components/ui/FormActions";
import { Input } from "@/components/ui/Input";
import { parseApiError } from "@/lib/api/errors";
import { criarPaciente } from "@/lib/api/pacientes";

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 border-b border-border pb-2 text-sm font-semibold text-content-secondary">
      {children}
    </p>
  );
}

export function NovoPacientePage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFormError(null);

    if (!nome.trim() || !email.trim() || !cpf.trim() || !senha) {
      setFormError("Preencha todos os campos para cadastrar o paciente.");
      return;
    }
    if (senha.length < 6) {
      setFormError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setSubmitting(true);
    try {
      const paciente = await criarPaciente({
        nome: nome.trim(),
        email: email.trim(),
        cpf: cpf.trim(),
        senha,
      });
      router.push(`/pacientes/${paciente.id}`);
    } catch (error) {
      // Ex.: "Insira um CPF valido", e-mail/CPF duplicado
      setFormError(parseApiError(error));
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Breadcrumb
        className="mb-4"
        items={[
          { label: "Pacientes", href: "/pacientes" },
          { label: "Novo" },
        ]}
      />

      <PageHeader
        eyebrow="Pessoas"
        title="Novo paciente"
        description="Cadastre o paciente para agendar consultas e acompanhar a evolução."
      />

      <Card className="mx-auto max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {formError && (
            <AlertBanner variant="error">{formError}</AlertBanner>
          )}

          <fieldset className="space-y-5">
            <legend className="sr-only">Dados pessoais</legend>
            <SectionLabel>Dados pessoais</SectionLabel>

            <Input
              label="Nome completo"
              name="nome"
              placeholder="ex.: Maria Silva"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              disabled={submitting}
              required
            />

            <Input
              label="CPF"
              name="cpf"
              inputMode="numeric"
              placeholder="ex.: 529.982.247-25"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              disabled={submitting}
              required
            />
          </fieldset>

          <fieldset className="space-y-5">
            <legend className="sr-only">Dados de acesso</legend>
            <SectionLabel>Dados de acesso</SectionLabel>

            <Input
              label="E-mail"
              name="email"
              type="email"
              placeholder="ex.: maria@email.com"
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitting}
              required
            />

            <Input
              label="Senha de acesso"
              name="senha"
              type="password"
              placeholder="Mínimo de 6 caracteres"
              autoComplete="new-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              disabled={submitting}
              required
            />
          </fieldset>

          <FormActions
            cancelHref="/pacientes"
            submitLabel="Cadastrar paciente"
            loading={submitting}
          />
        </form>
      </Card>
    </div>
  );
}

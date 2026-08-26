import { Link } from "@/lib/link";
import { useRouter } from "@/hooks/useRouter";
import { useState, type FormEvent } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingOrbs } from "@/components/home/FloatingOrbs";
import { LoginBrandPanel } from "@/components/auth/LoginBrandPanel";
import { AlertBanner } from "@/components/ui/AlertBanner";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { parseApiError } from "@/lib/api/errors";
import { criarPaciente } from "@/lib/api/pacientes";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

export function CadastroForm() {
  const router = useRouter();
  const reduced = useReducedMotion();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE_EXPO },
        };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setFormError(null);

    if (!nome.trim() || !email.trim() || !cpf.trim() || !senha) {
      setFormError("Preencha todos os campos para criar sua conta.");
      return;
    }
    if (senha.length < 6) {
      setFormError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setSubmitting(true);
    try {
      await criarPaciente({
        nome: nome.trim(),
        email: email.trim(),
        cpf: cpf.trim(),
        senha,
      });
      router.push("/login?registered=1");
    } catch (error) {
      setFormError(parseApiError(error));
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <LoginBrandPanel />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-page py-12 lg:border-l lg:border-border/70 lg:bg-white/40 lg:px-8">
        <FloatingOrbs variant="soft" className="hidden lg:block" />
        <motion.div
          {...enter(0.1)}
          className="relative z-10 w-full max-w-md"
        >
          <div className="mb-8">
            <h1 className="font-display text-2xl font-bold text-content-primary">
              Criar conta
            </h1>
            <p className="mt-2 text-sm text-content-secondary">
              Cadastre-se como paciente para agendar consultas e acompanhar seus
              atendimentos.
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {formError && (
                <AlertBanner variant="error">{formError}</AlertBanner>
              )}

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
                label="E-mail"
                name="email"
                type="email"
                placeholder="ex.: maria@email.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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

              <Input
                label="Senha"
                name="senha"
                type="password"
                placeholder="Mínimo de 6 caracteres"
                autoComplete="new-password"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                disabled={submitting}
                required
              />

              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-primary text-base font-medium text-content-inverse",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark hover:shadow-lift",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-60"
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Cadastrando…
                  </>
                ) : (
                  "Cadastrar"
                )}
              </button>
            </form>
          </Card>

          <p className="mt-6 text-center text-sm text-content-secondary">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="font-medium text-brand-primary hover:underline"
            >
              Entrar
            </Link>
          </p>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-content-secondary transition-colors hover:text-brand-primary"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              Voltar ao site
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

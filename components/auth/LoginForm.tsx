import { Link } from "@/lib/link";
import { useRouter } from "@/hooks/useRouter";
import { useAuth } from "@/lib/auth/context";
import {
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
  type ComponentType,
} from "react";
import {
  ArrowLeft,
  CircleAlert,
  Eye,
  EyeOff,
  Info,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { parseApiError } from "@/lib/api/errors";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type Status = "idle" | "loading" | "info" | "error";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  trailing?: ReactNode;
};

function Field({ id, label, icon: Icon, trailing, ...inputProps }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-content-secondary">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={id}
          className={cn(
            "peer h-12 w-full rounded-md border border-border bg-surface-card pl-10 text-base text-content-primary placeholder:text-content-muted",
            "transition-all duration-200 focus:border-brand-primary focus:outline-none focus:ring-[3px] focus:ring-brand-primary/15",
            trailing ? "pr-12" : "pr-4"
          )}
          {...inputProps}
        />
        <Icon
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted transition-all duration-200 peer-focus:scale-110 peer-focus:text-brand-primary"
          aria-hidden="true"
        />
        {trailing}
      </div>
    </div>
  );
}

function Banner({
  variant,
  children,
}: {
  variant: "info" | "error";
  children: ReactNode;
}) {
  const BannerIcon = variant === "error" ? CircleAlert : Info;

  return (
    <motion.p
      role="alert"
      aria-live="polite"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_EXPO }}
      className={cn(
        "flex items-start gap-2.5 rounded-md border-l-4 px-4 py-3 text-sm",
        variant === "error"
          ? "border-status-error bg-status-error/10 text-status-error"
          : "border-brand-secondary bg-brand-secondary/10 text-content-secondary"
      )}
    >
      <BannerIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </motion.p>
  );
}

export function LoginForm() {
  const reduced = useReducedMotion();
  const { login } = useAuth();
  const router = useRouter();

  const [expired, setExpired] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setExpired(params.get("expired") === "1");
    setRegistered(params.get("registered") === "1");
  }, []);

  const enter = (delay: number, y = 12) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE_EXPO },
        };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage(null);

    try {
      await login(email, senha);
      router.push("/dashboard");
    } catch (error) {
      setStatus("error");
      setMessage(parseApiError(error));
    }
  }

  const loading = status === "loading";

  return (
    <motion.div
      {...(reduced
        ? {}
        : {
            initial: { opacity: 0, x: 32 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.9, delay: 0.25, ease: EASE_EXPO },
          })}
      className="relative w-full max-w-[420px]"
    >
      {/* Shake gentil quando houver erro de credenciais */}
      <motion.div
        animate={
          status === "error" && !reduced
            ? { x: [0, -4, 4, -4, 4, 0] }
            : { x: 0 }
        }
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="rounded-xl border border-white/80 bg-white/70 p-8 shadow-[0_24px_64px_-24px_rgba(107,78,145,0.25)] backdrop-blur-xl lg:p-10"
      >
        <motion.div {...enter(0.45)}>
          <h1 className="font-display text-3xl font-bold text-content-primary">
            Área restrita
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary">
            Entre com seu e-mail e senha para acessar o painel.
          </p>
        </motion.div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          {expired && status === "idle" && !message && (
            <Banner variant="info">
              Sua sessão expirou. Faça login novamente.
            </Banner>
          )}
          {registered && status === "idle" && !message && (
            <Banner variant="info">
              Conta criada com sucesso. Faça login para continuar.
            </Banner>
          )}
          {message && (
            <Banner variant={status === "error" ? "error" : "info"}>
              {message}
            </Banner>
          )}

          <motion.div {...enter(0.55)}>
            <Field
              id="email"
              label="E-mail"
              icon={Mail}
              name="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              required
            />
          </motion.div>

          <motion.div {...enter(0.63)}>
            <Field
              id="password"
              label="Senha"
              icon={Lock}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              disabled={loading}
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-content-muted transition-colors hover:text-brand-primary"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              }
            />
          </motion.div>

          <motion.div {...enter(0.71)}>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand-primary text-base font-medium text-content-inverse",
                "transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary-dark hover:shadow-lift",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-60"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Entrando…
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </motion.div>
        </form>

        <motion.div {...enter(0.75)} className="mt-6 text-center text-sm text-content-secondary">
          Não tem conta?{" "}
          <Link href="/cadastro" className="font-medium text-brand-primary hover:underline">
            Cadastre-se
          </Link>
        </motion.div>

        <motion.div {...enter(0.79)} className="mt-4 text-center">
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

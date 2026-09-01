import { Link } from "@/lib/link";
import { Mail } from "lucide-react";
import { publicNav } from "@/lib/navigation/public-nav";
import { Logo } from "@/components/ui/Logo";
import { sobreContent } from "@/lib/content/institucional";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PublicFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-primary/10 bg-surface-background">
      <div className="relative mx-auto max-w-7xl px-page py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-content-secondary">
              Clínica interdisciplinar. Presencial em Guarulhos e São Paulo,
              online para todo o Brasil.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.instagram.com/selfevolution_clinica/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da clínica"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary transition-colors duration-300 ease-expo hover:bg-brand-primary hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:contato@selfevolution.com.br"
                aria-label="Enviar e-mail"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary transition-colors duration-300 ease-expo hover:bg-brand-primary hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="lg:col-span-3 lg:col-start-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-content-muted">
              Navegação
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-content-secondary transition-colors duration-300 ease-expo hover:text-brand-primary"
                >
                  Início
                </Link>
              </li>
              {publicNav.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-content-secondary transition-colors duration-300 ease-expo hover:text-brand-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-content-muted">
              Contato
            </p>
            <ul className="mt-5 space-y-3 text-sm text-content-secondary">
              <li>
                <a
                  href={sobreContent.contato.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-300 ease-expo hover:text-brand-primary"
                >
                  WhatsApp {sobreContent.contato.whatsappLabel}
                </a>
              </li>
              {sobreContent.contato.unidades.map((unidade) => (
                <li key={unidade}>{unidade}</li>
              ))}
              <li>Atendimento online em todo o Brasil</li>
            </ul>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/login"
                className="rounded-full border border-brand-primary/20 px-4 py-2 text-center text-sm font-medium text-content-secondary transition-colors duration-300 ease-expo hover:text-brand-primary"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="rounded-full bg-brand-primary px-4 py-2 text-center text-sm font-semibold text-content-inverse transition-colors duration-300 ease-expo hover:bg-brand-primary-dark"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-brand-primary/10 pt-8 text-xs text-content-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SelfEvolution — clínica interdisciplinar</p>
          <p>Você não está sozinho(a).</p>
        </div>
      </div>
    </footer>
  );
}

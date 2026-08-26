import { Link } from "@/lib/link";
import { Mail, MessageCircle } from "lucide-react";
import { publicNav } from "@/lib/navigation/public-nav";

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
    <footer className="relative overflow-hidden border-t border-brand-primary/10 bg-[#F7F2FB]">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-0 select-none font-display text-[clamp(5rem,16vw,12rem)] font-bold leading-none tracking-[-0.06em] text-brand-primary/[0.04]"
      >
        self
      </p>

      <div className="relative mx-auto max-w-7xl px-page py-20 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="font-display text-2xl font-semibold lowercase tracking-[-0.03em] text-brand-primary"
            >
              selfevolution
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-content-secondary">
              Clínica interdisciplinar de saúde mental. Cuidado que evolui com
              você — com escuta, ciência e presença.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.instagram.com/selfevolution_clinica/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da clínica"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:contato@selfevolution.com.br"
                aria-label="Enviar e-mail"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                aria-label="Falar no WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
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
                <Link href="/" className="text-content-secondary transition-colors hover:text-brand-primary">
                  Início
                </Link>
              </li>
              {publicNav.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-content-secondary transition-colors hover:text-brand-primary"
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
                  href="mailto:contato@selfevolution.com.br"
                  className="transition-colors hover:text-brand-primary"
                >
                  contato@selfevolution.com.br
                </a>
              </li>
              <li>Atendimento online e presencial</li>
            </ul>
            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/login"
                className="rounded-full border border-brand-primary/20 px-4 py-2 text-center text-sm font-medium text-content-secondary transition-colors hover:text-brand-primary"
              >
                Entrar
              </Link>
              <Link
                href="/cadastro"
                className="rounded-full bg-brand-primary px-4 py-2 text-center text-sm font-semibold text-content-inverse"
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

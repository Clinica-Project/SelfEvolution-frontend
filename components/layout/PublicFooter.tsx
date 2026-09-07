import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@/lib/link";
import { publicNav } from "@/lib/navigation/public-nav";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { sobreContent } from "@/lib/content/institucional";
import {
  type Unidade,
  unidadePath,
  unidades,
  unidadesByCity,
} from "@/lib/content/unidades";
import { usePathname } from "@/hooks/usePathname";
import { cn } from "@/lib/utils/cn";

const EMAIL = "silvana.selfevolution@gmail.com";

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

function FooterUnitLink({
  unit,
  pathname,
  showAddress = false,
}: {
  unit: Unidade;
  pathname: string;
  showAddress?: boolean;
}) {
  const href = unidadePath(unit.slug);
  const current = pathname === href;
  const showNeighborhood = unit.neighborhood !== unit.name;

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "group flex min-w-0 flex-col py-2 transition-colors duration-300 ease-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
        current ? "text-brand-primary" : "text-content-primary"
      )}
    >
      <span className="block font-display text-[15px] font-bold tracking-[-0.02em] transition-colors duration-300 ease-expo group-hover:text-brand-primary">
        {unit.name}
      </span>
      {showNeighborhood && (
        <span className="mt-0.5 block text-[12px] leading-snug text-content-muted">
          {unit.neighborhood}
        </span>
      )}
      {showAddress && (
        <span className="mt-1 block max-w-[16rem] text-[12px] leading-relaxed text-content-muted">
          {unit.address}
        </span>
      )}
    </Link>
  );
}

export function PublicFooter() {
  const pathname = usePathname();
  const spUnits = unidadesByCity("São Paulo");
  const guarulhosUnits = unidadesByCity("Guarulhos");

  return (
    <footer className="relative overflow-hidden border-t border-brand-primary/10 bg-surface-background">
      <div
        aria-hidden="true"
        className="h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-page py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <Logo size="md" />
            <p className="mt-5 text-sm leading-relaxed text-content-secondary">
              Clínica interdisciplinar. {unidades.length} endereços em São Paulo
              e Guarulhos, e atendimento online para todo o Brasil.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={sobreContent.contato.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2BB673] transition-colors duration-300 ease-expo hover:text-[#249E64]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {sobreContent.contato.whatsappLabel}
            </a>
            <div className="flex items-center gap-2">
              <a
                href={sobreContent.contato.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram da clínica"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary transition-colors duration-300 ease-expo hover:bg-brand-primary hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Enviar e-mail"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/15 text-brand-primary transition-colors duration-300 ease-expo hover:bg-brand-primary hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <nav
          aria-label="Unidades da clínica"
          className="mt-14 border-t border-brand-primary/10 pt-12 lg:mt-16 lg:pt-16"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-primary">
                Unidades
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-content-primary">
                Encontre a mais próxima
              </h2>
            </div>
            <Link
              href="/unidades"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors duration-300 ease-expo hover:text-brand-primary-dark"
            >
              Ver todas as unidades
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 ease-expo motion-safe:group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-9">
              <div className="flex items-baseline justify-between gap-4 border-b border-brand-primary/10 pb-4">
                <h3 className="font-display text-lg font-bold tracking-[-0.03em] text-content-primary">
                  São Paulo
                </h3>
                <p className="text-[11px] text-content-muted">
                  {spUnits.length} unidades
                </p>
              </div>
              <ul className="mt-1 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-4">
                {spUnits.map((unit) => (
                  <li key={unit.slug}>
                    <FooterUnitLink unit={unit} pathname={pathname} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3 lg:border-l lg:border-brand-primary/10 lg:pl-10">
              <div className="flex items-baseline justify-between gap-4 border-b border-brand-primary/10 pb-4">
                <h3 className="font-display text-lg font-bold tracking-[-0.03em] text-content-primary">
                  Guarulhos
                </h3>
                <p className="text-[11px] text-content-muted">
                  {guarulhosUnits.length}{" "}
                  {guarulhosUnits.length === 1 ? "unidade" : "unidades"}
                </p>
              </div>
              <ul className="mt-2">
                {guarulhosUnits.map((unit) => (
                  <li key={unit.slug}>
                    <FooterUnitLink
                      unit={unit}
                      pathname={pathname}
                      showAddress
                    />
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-content-muted">
                Online
              </p>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                Atendimento em todo o Brasil, com a mesma escuta das unidades
                presenciais.
              </p>
            </div>
          </div>
        </nav>

        <div className="mt-14 flex flex-col gap-8 border-t border-brand-primary/10 pt-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {publicNav.map(({ label, href }) => {
                const active =
                  href === "/"
                    ? pathname === "/"
                    : pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "transition-colors duration-300 ease-expo hover:text-brand-primary",
                        active ? "text-brand-primary" : "text-content-secondary"
                      )}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-2 text-xs text-content-muted sm:flex-row sm:items-center sm:gap-8">
            <p>© {new Date().getFullYear()} SelfEvolution — clínica interdisciplinar</p>
            <p>Você não está sozinho(a).</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

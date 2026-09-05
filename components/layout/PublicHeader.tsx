import { Link } from "@/lib/link";
import { useEffect, useState } from "react";
import { usePathname } from "@/hooks/usePathname";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";
import { getLenisInstance } from "@/lib/lenis-instance";
import { publicNav } from "@/lib/navigation/public-nav";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { sobreContent } from "@/lib/content/institucional";
import { EASE_EXPO, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

const overlayItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

export function PublicHeader({ className }: { className?: string }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 20;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const lenis = getLenisInstance();
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
      getLenisInstance()?.start();
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4",
          className
        )}
      >
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[68rem] items-center justify-between gap-2 rounded-full border transition-[padding,box-shadow,background-color,border-color,backdrop-filter] duration-500 ease-expo",
            scrolled
              ? "border-brand-primary/10 bg-surface-card/80 py-1 pl-4 pr-1.5 shadow-[0_12px_40px_-18px_rgba(107,78,145,0.35)] backdrop-blur-2xl sm:pl-5"
              : "border-white/40 bg-white/70 py-2.5 pl-4 pr-2 shadow-[0_8px_32px_-16px_rgba(107,78,145,0.2)] backdrop-blur-md sm:pl-5"
          )}
        >
          <Logo size="sm" />

          <nav
            className="relative hidden items-center gap-0.5 lg:flex"
            aria-label="Navegação principal"
          >
            {publicNav.map(({ label, href }) => {
              const active = mounted && pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative z-10 rounded-full px-4 py-1.5 text-[13px] font-medium tracking-wide transition-colors duration-300 ease-expo",
                    active
                      ? "text-brand-primary"
                      : "text-content-secondary hover:text-brand-primary"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="public-nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-primary/[0.08]"
                      transition={{ duration: 0.45, ease: EASE_EXPO }}
                    />
                  )}
                  {label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-x-4 bottom-[5px] h-px origin-left bg-brand-primary/55 transition-transform duration-500 ease-expo",
                      active ? "scale-x-0" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <a
              href={sobreContent.contato.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp da clínica"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2BB673] px-3.5 py-2 text-[13px] font-semibold text-white shadow-[0_8px_18px_-10px_rgba(43,182,115,0.55)] transition-all duration-300 ease-expo hover:bg-[#249E64] active:scale-[0.98] sm:px-4"
            >
              <WhatsAppIcon className="h-[15px] w-[15px]" />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center gap-1.5 rounded-full bg-content-primary px-3.5 py-2 text-[13px] font-semibold text-content-inverse transition-colors duration-300 hover:bg-brand-primary lg:hidden"
            >
              Menu
              <span aria-hidden="true" className="tracking-[0.2em]">
                …
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#F8F4FC] px-page py-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={reduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0, transition: { duration: 0.22 } }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
          >
            <div className="flex items-center justify-between">
              <Logo size="md" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="inline-flex items-center rounded-full bg-content-primary px-3.5 py-2 text-sm font-medium text-content-inverse"
              >
                Fechar
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.09, 0.1)}
              className="mt-20 flex flex-1 flex-col"
              aria-label="Navegação principal"
            >
              {publicNav.map(({ label, href }) => (
                <motion.div key={href} variants={overlayItem}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "block border-b border-brand-primary/10 py-4 font-display text-[2.75rem] font-bold leading-none tracking-[-0.03em] transition-colors hover:text-brand-primary",
                      pathname === href ? "text-brand-primary" : "text-content-primary"
                    )}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: EASE_EXPO }}
              className="flex flex-col gap-3 pb-4"
            >
              <a
                href={sobreContent.contato.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2BB673] py-3.5 text-base font-semibold text-white shadow-[0_8px_18px_-10px_rgba(43,182,115,0.55)] transition-colors duration-300 ease-expo hover:bg-[#249E64]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp da clínica
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { Link } from "@/lib/link";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FloatingOrbs } from "@/components/home/FloatingOrbs";
import { LoginVisual } from "@/components/auth/LoginVisual";
import { Logo } from "@/components/ui/Logo";
import { EASE_EXPO } from "@/lib/motion";

export function LoginBrandPanel() {
  const reduced = useReducedMotion();

  const enter = (delay: number, x = -32) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.9, delay, ease: EASE_EXPO },
        };

  return (
    <aside className="relative flex min-h-[30svh] flex-col justify-between overflow-hidden px-page py-8 lg:min-h-svh lg:w-[55%] lg:px-14 lg:py-12">
      <FloatingOrbs />

      <motion.div {...enter(0.1, 0)} className="relative">
        <Logo href="/" />
      </motion.div>

      {/* Desktop: manifesto completo do painel */}
      <div className="relative hidden lg:block">
        <h2 className="font-display text-[clamp(2.25rem,3.6vw,3.25rem)] font-bold leading-[1.08] text-content-primary">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              {...(reduced
                ? {}
                : {
                    initial: { y: "110%" },
                    animate: { y: "0%" },
                    transition: { duration: 0.95, delay: 0.25, ease: EASE_EXPO },
                  })}
            >
              Você cuida.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block bg-gradient-to-r from-brand-primary via-brand-primary-light to-brand-secondary bg-clip-text text-transparent"
              {...(reduced
                ? {}
                : {
                    initial: { y: "110%" },
                    animate: { y: "0%" },
                    transition: { duration: 0.95, delay: 0.38, ease: EASE_EXPO },
                  })}
            >
              Nós organizamos.
            </motion.span>
          </span>
        </h2>

        <motion.p
          {...enter(0.55, 0)}
          className="mt-6 max-w-md text-lg leading-relaxed text-content-secondary"
        >
          Acesso exclusivo para{" "}
          <strong className="font-semibold text-content-primary">
            profissionais
          </strong>{" "}
          da clínica. Gerencie pacientes, consultas e evolução com{" "}
          <strong className="font-semibold text-content-primary">clareza</strong>.
        </motion.p>

        <motion.div {...enter(0.75, 0)} className="mt-12">
          <LoginVisual />
        </motion.div>
      </div>

      {/* Mobile: frase curta na faixa de marca */}
      <motion.p
        {...enter(0.3, 0)}
        className="relative max-w-xs text-balance font-display text-xl font-semibold leading-snug text-content-primary lg:hidden"
      >
        Você cuida.{" "}
        <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
          Nós organizamos.
        </span>
      </motion.p>

      <motion.div {...enter(0.85, 0)} className="relative hidden lg:block">
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
    </aside>
  );
}

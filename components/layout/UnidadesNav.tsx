import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/lib/link";
import { usePathname } from "@/hooks/usePathname";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";
import {
  type UnidadeCity,
  unidadeCities,
  unidadePath,
  unidadesByCity,
} from "@/lib/content/unidades";

export function UnidadesNavItem({
  open,
  onOpenChange,
  active,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  active: boolean;
}) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const closeTimer = useRef<number | null>(null);
  const openTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [city, setCity] = useState<UnidadeCity>("São Paulo");
  const labelId = useId();

  useEffect(() => {
    if (pathname.startsWith("/unidades/guarulhos")) setCity("Guarulhos");
    else setCity("São Paulo");
  }, [pathname]);

  function clearOpen() {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    openTimer.current = null;
  }

  function clearClose() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    clearOpen();
    clearClose();
    closeTimer.current = window.setTimeout(() => {
      if (!rootRef.current?.contains(document.activeElement)) onOpenChange(false);
    }, 280);
  }

  useEffect(() => () => { clearOpen(); clearClose(); }, []);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open, onOpenChange]);

  const units = unidadesByCity(city);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onOpenChange(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          clearOpen();
          clearClose();
          onOpenChange(false);
          triggerRef.current?.focus();
        }
      }}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        clearClose();
        clearOpen();
        openTimer.current = window.setTimeout(() => onOpenChange(true), 140);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={labelId}
        onClick={() => { clearOpen(); clearClose(); onOpenChange(!open); }}
        className={cn(
          "group relative z-10 inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-[13px] font-medium tracking-wide transition-colors duration-300 ease-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
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
        Unidades
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-500 ease-expo motion-reduce:transition-none",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-full z-[54] h-10 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2"
          onMouseEnter={clearClose}
        />
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            id={labelId}
            role="region"
            aria-label="Unidades da clínica"
            initial={reduced ? false : { opacity: 0, y: -8, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6, scale: reduced ? 1 : 0.985, transition: { duration: reduced ? 0 : 0.18 } }}
            transition={{ duration: reduced ? 0 : 0.45, ease: EASE_EXPO }}
            style={{ x: "-50%", transformOrigin: "50% 0%" }}
            className="fixed left-1/2 top-[4.6rem] z-[55] w-[min(46rem,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-brand-primary/10 bg-surface-card shadow-[0_24px_70px_-24px_rgba(55,37,76,0.25)]"
            onMouseEnter={clearClose}
            onMouseLeave={scheduleClose}
          >
            <div className="grid grid-cols-[12rem_1fr]">
              <div className="flex flex-col border-r border-brand-primary/10 bg-surface-background p-5">
                <p className="text-[10px] font-semibold uppercase leading-5 tracking-[0.18em] text-brand-primary">
                  Perto de você
                </p>
                <p className="mt-2 font-display text-xl font-bold tracking-[-0.03em] text-content-primary">
                  Nossas unidades
                </p>
                <div className="mt-6 space-y-2" aria-label="Selecionar cidade">
                  {unidadeCities.map((item) => {
                    const selected = item === city;
                    return (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setCity(item)}
                        className={cn(
                          "relative isolate flex min-h-12 w-full items-center justify-between gap-2 rounded-md px-3 text-left text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary",
                          selected ? "text-brand-primary" : "text-content-secondary hover:text-brand-primary"
                        )}
                      >
                        {selected && (
                          <motion.span
                            layoutId={`${labelId}-city`}
                            aria-hidden="true"
                            className="absolute inset-0 -z-10 rounded-md border border-brand-primary/10 bg-white shadow-sm"
                            transition={{ duration: reduced ? 0 : 0.4, ease: EASE_EXPO }}
                          />
                        )}
                        {item}
                        <span className="text-[11px] font-normal tabular-nums opacity-60">
                          {unidadesByCity(item).length.toString().padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <Link
                  href="/unidades"
                  onClick={() => onOpenChange(false)}
                  className="group mt-auto inline-flex min-h-11 items-center justify-between gap-2 pt-8 text-xs font-semibold text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
                >
                  Ver todas as unidades
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-500 ease-expo motion-safe:group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="px-6 pb-5 pt-6">
                <div className="mb-3 flex items-baseline justify-between gap-3 border-b border-brand-primary/10 pb-4">
                  <h2 className="font-display text-xl font-bold tracking-[-0.03em] text-content-primary">{city}</h2>
                  <span className="text-[11px] text-content-muted">{units.length} {units.length === 1 ? "endereço" : "endereços"}</span>
                </div>
                <div className="h-[min(26.5rem,calc(100dvh-13rem))] overflow-y-auto overscroll-contain" data-lenis-prevent>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.ul
                      key={city}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={{
                        hidden: { opacity: 0, y: reduced ? 0 : 6 },
                        visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.3, staggerChildren: reduced ? 0 : 0.022 } },
                        exit: { opacity: 0, y: reduced ? 0 : -4, transition: { duration: reduced ? 0 : 0.12 } },
                      }}
                      className="grid grid-cols-2 gap-x-4 gap-y-1"
                    >
                      {units.map((unit) => {
                        const current = pathname === unidadePath(unit.slug);
                        return (
                          <motion.li key={unit.slug} variants={{ hidden: { opacity: 0, y: reduced ? 0 : 6 }, visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.4, ease: EASE_EXPO } } }}>
                            <Link
                              href={unidadePath(unit.slug)}
                              aria-current={current ? "page" : undefined}
                              onClick={() => onOpenChange(false)}
                              className={cn(
                                "group relative flex min-h-14 items-center justify-between gap-2 rounded-sm px-2 py-2 transition-colors duration-300 hover:bg-brand-primary/[0.04] focus-visible:bg-brand-primary/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary",
                                current ? "bg-brand-primary/[0.06] text-brand-primary" : "text-content-primary"
                              )}
                            >
                              <span className="min-w-0 transition-transform duration-500 ease-expo motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1">
                                <span className="block font-display text-sm font-bold leading-5 group-hover:text-brand-primary">{unit.name}</span>
                                <span className="mt-0.5 block text-[11px] leading-4 text-content-muted">{unit.neighborhood}</span>
                              </span>
                              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-primary opacity-30 transition-[opacity,transform] duration-500 ease-expo group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:group-hover:-translate-y-0.5" />
                            </Link>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function UnidadesMobileAccordion({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const accordionId = useId();
  const [open, setOpen] = useState(pathname.startsWith("/unidades"));
  const [city, setCity] = useState<UnidadeCity>(
    pathname.startsWith("/unidades/guarulhos") ? "Guarulhos" : "São Paulo"
  );
  const units = unidadesByCity(city);
  const active = pathname === "/unidades" || pathname.startsWith("/unidades/");

  return (
    <div className="border-b border-brand-primary/10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={accordionId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between py-4 font-display text-[clamp(2rem,9vw,2.75rem)] font-bold leading-none tracking-[-0.03em] transition-colors hover:text-brand-primary",
          active ? "text-brand-primary" : "text-content-primary"
        )}
      >
        Unidades
        <ChevronDown
          className={cn(
            "h-6 w-6 shrink-0 text-brand-primary/70 transition-transform duration-300 motion-reduce:transition-none",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={accordionId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE_EXPO }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <div className="mb-3 grid grid-cols-2 gap-2">
                {unidadeCities.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={item === city}
                    onClick={() => setCity(item)}
                    className={cn(
                      "flex min-h-12 items-center justify-between gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary",
                      item === city
                        ? "bg-brand-primary text-white"
                        : "bg-brand-primary/10 text-brand-primary"
                    )}
                  >
                    {item}
                    <span className="font-normal tabular-nums opacity-70">{unidadesByCity(item).length}</span>
                  </button>
                ))}
              </div>
              <Link
                href="/unidades"
                onClick={onNavigate}
                className="mb-2 flex min-h-11 items-center justify-between px-2 text-sm font-semibold text-brand-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
              >
                Ver todas as unidades
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <div className="max-h-[38svh] overflow-y-auto overscroll-contain pr-1" data-lenis-prevent>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.ul
                    key={city}
                    initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.18, ease: EASE_EXPO }}
                    className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4"
                  >
                    {units.map((unit) => (
                      <li key={unit.slug} className="border-t border-brand-primary/10">
                        <Link
                          href={unidadePath(unit.slug)}
                          onClick={onNavigate}
                          aria-current={pathname === unidadePath(unit.slug) ? "page" : undefined}
                          className={cn(
                            "flex min-h-16 items-center justify-between gap-3 rounded-sm px-2 py-3 transition-colors active:bg-brand-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary",
                            pathname === unidadePath(unit.slug) ? "text-brand-primary" : "text-content-primary"
                          )}
                        >
                          <span className="min-w-0">
                            <span className="block font-display text-base font-bold">{unit.name}</span>
                            <span className="mt-0.5 block text-xs text-content-secondary">{unit.neighborhood}</span>
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-brand-primary/70" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  CalendarPlus,
  CornerDownLeft,
  Search,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth/context";
import { canAccess } from "@/lib/auth/permissions";
import { useConsultas } from "@/hooks/useConsultas";
import { usePacientes } from "@/hooks/usePacientes";
import { dashboardNavItems } from "@/lib/navigation";
import { scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

type PaletteItem = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  href: string;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Match simples: substring vale mais; subsequence (fuzzy) como fallback. */
function fuzzyScore(query: string, target: string): number {
  const q = normalize(query);
  const t = normalize(target);
  if (!q) return 1;
  const idx = t.indexOf(q);
  if (idx >= 0) return idx === 0 ? 3 : 2;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length ? 1 : 0;
}

function formatDataHora(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { role } = useAuth();
  const goTo = useNavigate();
  const { data: consultas } = useConsultas();
  const { data: pacientes } = usePacientes(canAccess(role, "/pacientes"));

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const allItems = useMemo<PaletteItem[]>(() => {
    const items: PaletteItem[] = [];

    const navVisivel = dashboardNavItems.filter(
      (item) => (!item.adminOnly || role === "ADMIN") && canAccess(role, item.href)
    );
    for (const item of navVisivel) {
      items.push({
        id: `nav-${item.href}`,
        group: "Páginas",
        label: item.label,
        hint: item.section,
        icon: item.icon,
        href: item.href,
      });
    }

    if (canAccess(role, "/consultas")) {
      items.push({
        id: "acao-nova-consulta",
        group: "Ações",
        label: "Agendar consulta",
        hint: "Nova consulta",
        icon: CalendarPlus,
        href: "/consultas/nova",
      });
    }
    if (canAccess(role, "/pacientes")) {
      items.push({
        id: "acao-novo-paciente",
        group: "Ações",
        label: "Novo paciente",
        hint: "Cadastrar paciente",
        icon: UserPlus,
        href: "/pacientes/novo",
      });
    }

    for (const c of consultas) {
      items.push({
        id: `consulta-${c.id}`,
        group: "Consultas",
        label: c.pacienteNome,
        hint: `${formatDataHora(c.dataHoraInicio)} · ${c.psicologoNome}`,
        icon: Calendar,
        href: `/consultas/${c.id}`,
      });
    }

    for (const p of pacientes) {
      items.push({
        id: `paciente-${p.id}`,
        group: "Pacientes",
        label: p.nome,
        hint: p.email,
        icon: Users,
        href: `/pacientes/${p.id}`,
      });
    }

    return items;
  }, [role, consultas, pacientes]);

  const filtered = useMemo(() => {
    const scored = allItems
      .map((item) => ({
        item,
        score: Math.max(
          fuzzyScore(query, item.label),
          item.hint ? fuzzyScore(query, item.hint) * 0.5 : 0
        ),
      }))
      .filter(({ score }) => score > 0);

    if (query) {
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 12).map(({ item }) => item);
    }
    return scored.map(({ item }) => item);
  }, [allItems, query]);

  // Reset ao abrir/fechar e ao mudar a busca
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (activeIndex >= filtered.length) {
      setActiveIndex(Math.max(0, filtered.length - 1));
    }
  }, [filtered.length, activeIndex]);

  function navigate(item: PaletteItem) {
    onClose();
    goTo(item.href);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) navigate(item);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  }

  useEffect(() => {
    const activeEl = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
          <motion.button
            type="button"
            aria-label="Fechar busca"
            className="absolute inset-0 bg-content-primary/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Busca rápida"
            className="card-surface relative w-full max-w-lg overflow-hidden rounded-lg shadow-lift"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-content-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                aria-activedescendant={
                  filtered[activeIndex] ? `palette-item-${activeIndex}` : undefined
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar páginas, ações, consultas, pacientes…"
                className="h-12 flex-1 bg-transparent text-sm text-content-primary outline-none placeholder:text-content-muted"
              />
              <kbd className="rounded-sm border border-border bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium text-content-muted">
                Esc
              </kbd>
            </div>

            <ul
              ref={listRef}
              id="command-palette-list"
              role="listbox"
              aria-label="Resultados"
              className="max-h-[50vh] overflow-y-auto p-2"
            >
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-content-muted">
                  Nenhum resultado para{" "}
                  <span className="font-medium text-content-secondary">“{query}”</span>
                </li>
              )}
              {filtered.map((item, index) => {
                const Icon = item.icon;
                const showGroupHeader = item.group !== lastGroup;
                lastGroup = item.group;
                const isActive = index === activeIndex;

                return (
                  <li key={item.id} role="presentation">
                    {showGroupHeader && (
                      <p
                        className={cn(
                          "px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-content-muted",
                          index > 0 && "pt-3"
                        )}
                      >
                        {item.group}
                      </p>
                    )}
                    <button
                      type="button"
                      role="option"
                      id={`palette-item-${index}`}
                      data-index={index}
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => navigate(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors duration-100",
                        isActive
                          ? "bg-brand-primary text-content-inverse"
                          : "text-content-secondary"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{item.label}</span>
                        {item.hint && (
                          <span
                            className={cn(
                              "block truncate text-xs",
                              isActive ? "text-content-inverse/70" : "text-content-muted"
                            )}
                          >
                            {item.hint}
                          </span>
                        )}
                      </span>
                      {isActive && (
                        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-content-muted">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-sm border border-border bg-surface-muted px-1.5 py-0.5 font-medium">↑↓</kbd>
                navegar
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-sm border border-border bg-surface-muted px-1.5 py-0.5 font-medium">Enter</kbd>
                abrir
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded-sm border border-border bg-surface-muted px-1.5 py-0.5 font-medium">Esc</kbd>
                fechar
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

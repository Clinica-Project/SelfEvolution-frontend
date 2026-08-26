import { CalendarCheck, ClipboardList, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const chips = [
  {
    label: "Pacientes",
    icon: Users,
    dot: "bg-brand-primary",
    position: "left-0 top-2",
    float: "animate-float-a",
  },
  {
    label: "Consultas",
    icon: CalendarCheck,
    dot: "bg-brand-secondary",
    position: "right-4 top-14",
    float: "animate-float-b",
  },
  {
    label: "Evolução clínica",
    icon: ClipboardList,
    dot: "bg-brand-accent-teal",
    position: "bottom-0 left-10",
    float: "animate-float-c",
  },
];

/** Composição decorativa do painel de marca: anéis girando + chips do dia a dia clínico. */
export function LoginVisual() {
  return (
    <div className="relative h-56 w-full max-w-sm" aria-hidden="true">
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-[spin_90s_linear_infinite] text-brand-primary/20"
      >
        <circle cx="200" cy="200" r="197" stroke="currentColor" strokeDasharray="3 12" />
        <circle cx="200" cy="3" r="5" fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 animate-[spin_130s_linear_infinite_reverse] text-brand-secondary/25"
      >
        <circle cx="200" cy="200" r="197" stroke="currentColor" />
        <circle cx="397" cy="200" r="6" fill="currentColor" />
      </svg>

      {/* Loops nas cinco cores da marca, como no manifesto da home */}
      <svg
        viewBox="0 0 160 40"
        fill="none"
        className="absolute left-1/2 top-1/2 h-8 w-32 -translate-x-1/2 -translate-y-1/2"
      >
        <circle cx="20" cy="20" r="14" stroke="#6B4E91" strokeOpacity="0.55" strokeWidth="2.5" />
        <circle cx="50" cy="20" r="14" stroke="#6297F5" strokeOpacity="0.55" strokeWidth="2.5" />
        <circle cx="80" cy="20" r="14" stroke="#5BBFB5" strokeOpacity="0.55" strokeWidth="2.5" />
        <circle cx="110" cy="20" r="14" stroke="#F4CC47" strokeOpacity="0.65" strokeWidth="2.5" />
        <circle cx="140" cy="20" r="14" stroke="#E8716D" strokeOpacity="0.55" strokeWidth="2.5" />
      </svg>

      {chips.map(({ label, icon: Icon, dot, position, float }) => (
        <div
          key={label}
          className={cn(
            "absolute flex items-center gap-2 rounded-xl border border-border bg-surface-card px-3.5 py-2.5 shadow-md",
            position,
            float
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
          <Icon className="h-4 w-4 text-brand-primary" />
          <span className="whitespace-nowrap text-sm font-medium text-content-primary">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

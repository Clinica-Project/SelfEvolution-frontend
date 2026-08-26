import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/dashboard/CountUp";
import { cn } from "@/lib/utils/cn";

export type MetricAccent = "primary" | "secondary" | "success";

const accentClasses: Record<MetricAccent, string> = {
  primary: "bg-brand-primary/10 text-brand-primary",
  secondary: "bg-brand-secondary/10 text-brand-secondary",
  success: "bg-status-success/10 text-status-success",
};

/** Pontos de uma sparkline normalizados para o viewBox (w × h), com respiro vertical. */
function sparklinePoints(values: number[], w: number, h: number): string {
  const max = Math.max(...values, 1);
  const step = values.length > 1 ? w / (values.length - 1) : 0;
  return values
    .map((v, i) => `${(i * step).toFixed(1)},${(h - 3 - (v / max) * (h - 8)).toFixed(1)}`)
    .join(" ");
}

type MetricCardProps = {
  title: string;
  value: number | null;
  description: string;
  icon: LucideIcon;
  accent?: MetricAccent;
  loading?: boolean;
  /** Série dos últimos dias — desenha sparkline em área no rodapé do card. */
  sparkline?: number[];
  /** Card principal do grid: fundo brand-primary e texto invertido. */
  featured?: boolean;
};

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  accent = "primary",
  loading = false,
  sparkline,
  featured = false,
}: MetricCardProps) {
  const gradientId = useId();

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition-all duration-300 ease-expo hover:-translate-y-0.5 hover:shadow-card-hover",
        featured && "border-transparent bg-gradient-to-br from-brand-primary to-brand-secondary text-content-inverse"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={cn("text-sm", featured ? "text-content-inverse/80" : "text-content-secondary")}>
            {title}
          </p>
          {loading ? (
            <div className="mt-3 space-y-2" aria-label="Carregando" role="status">
              <div className="skeleton h-8 w-16" />
              <div className="skeleton h-3 w-24" />
            </div>
          ) : (
            <>
              <p className="mt-2 font-display text-metric font-bold">
                {value === null ? "—" : <CountUp value={value} />}
              </p>
              <p className={cn("mt-1 text-xs", featured ? "text-content-inverse/70" : "text-content-muted")}>
                {description}
              </p>
            </>
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            featured ? "bg-white/15 text-content-inverse" : accentClasses[accent]
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      {sparkline && !loading && (
        <svg
          viewBox="0 0 120 32"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="mt-4 h-8 w-full"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                className={featured ? "text-white/40" : "text-brand-primary/30"}
                stopColor="currentColor"
              />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-transparent" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,32 ${sparklinePoints(sparkline, 120, 32)} 120,32`}
            fill={`url(#${gradientId})`}
          />
          <polyline
            points={sparklinePoints(sparkline, 120, 32)}
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={featured ? "stroke-brand-accent-yellow" : "stroke-brand-primary"}
          />
        </svg>
      )}
    </Card>
  );
}

import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils/cn";

type PageHeaderProps = {
  title: string;
  description?: string;
  /** Texto de contexto acima do título (ex.: seção ou categoria). */
  eyebrow?: string;
  /** Ações à direita do título (botões, links). */
  actions?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <Reveal className={cn("mb-8", className)}>
      <div className={cn(actions && "flex flex-wrap items-start justify-between gap-4")}>
        <div>
          {eyebrow && (
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-primary">
              <span aria-hidden="true" className="h-px w-8 bg-brand-primary/40" />
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "font-display text-page-title font-bold text-content-primary",
              eyebrow && "mt-2"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-content-secondary">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
      </div>
    </Reveal>
  );
}

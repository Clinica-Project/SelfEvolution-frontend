import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type DefinitionItemProps = {
  label: string;
  value: ReactNode;
};

export function DefinitionItem({ label, value }: DefinitionItemProps) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-content-muted">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-content-primary">{value}</dd>
    </div>
  );
}

type DefinitionGridProps = {
  children: ReactNode;
  className?: string;
};

export function DefinitionGrid({ children, className }: DefinitionGridProps) {
  return (
    <dl
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </dl>
  );
}

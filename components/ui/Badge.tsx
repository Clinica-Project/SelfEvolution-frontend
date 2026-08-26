import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

const variants = {
  default: "bg-surface-muted text-content-secondary",
  primary: "bg-brand-primary/10 text-brand-primary",
  secondary: "bg-brand-secondary/10 text-brand-secondary",
  success: "bg-status-success/10 text-status-success",
  warning: "bg-status-warning/20 text-content-primary",
  error: "bg-status-error/10 text-status-error",
  info: "bg-status-info/10 text-status-info",
  admin: "bg-brand-accent-yellow/30 text-content-primary",
} as const;

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: keyof typeof variants;
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function consultationStatusBadge(status: string) {
  const map: Record<string, keyof typeof variants> = {
    Agendada: "info",
    Confirmada: "success",
    Cancelada: "default",
    Realizada: "primary",
  };

  return map[status] ?? "default";
}

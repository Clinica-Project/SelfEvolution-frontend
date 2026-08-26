import { CircleAlert, CircleCheck, Info, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

const variantConfig: Record<
  "success" | "error" | "warning" | "info",
  { Icon: LucideIcon; classes: string; role: "alert" | "status" }
> = {
  success: {
    Icon: CircleCheck,
    classes: "border-status-success bg-status-success/10 text-status-success",
    role: "status",
  },
  error: {
    Icon: CircleAlert,
    classes: "border-status-error bg-status-error/10 text-status-error",
    role: "alert",
  },
  warning: {
    Icon: Info,
    classes: "border-status-warning bg-status-warning/10 text-content-primary",
    role: "status",
  },
  info: {
    Icon: Info,
    classes: "border-brand-secondary bg-brand-secondary/10 text-content-secondary",
    role: "status",
  },
};

type AlertBannerProps = {
  variant: "success" | "error" | "warning" | "info";
  children: ReactNode;
  className?: string;
};

export function AlertBanner({ variant, children, className }: AlertBannerProps) {
  const { Icon, classes, role } = variantConfig[variant];

  return (
    <p
      role={role}
      aria-live={role === "alert" ? "assertive" : "polite"}
      className={cn(
        "flex items-start gap-2.5 rounded-md border-l-4 px-4 py-3 text-sm",
        classes,
        className
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

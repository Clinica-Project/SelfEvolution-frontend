import { Link } from "@/lib/link";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  /** "warning" muda a cor do ícone (ex.: listagem indisponível). */
  variant?: "default" | "warning";
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = "default",
}: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center gap-4 py-14 text-center">
      <Icon
        className={`h-8 w-8 ${variant === "warning" ? "text-status-warning" : "text-brand-primary"}`}
        aria-hidden="true"
      />
      <div>
        <p className="font-display text-lg font-semibold text-content-primary">
          {title}
        </p>
        <p className="mt-1 text-sm text-content-secondary">{description}</p>
      </div>
      {action && (
        <Link href={action.href} className={buttonVariants("primary")}>
          {action.label}
        </Link>
      )}
    </Card>
  );
}

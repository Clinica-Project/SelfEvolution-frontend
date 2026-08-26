import { Link } from "@/lib/link";
import { Lock } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type PermissionStateProps = {
  title?: string;
  description: string;
  backHref: string;
  backLabel?: string;
};

export function PermissionState({
  title = "Sem permissão",
  description,
  backHref,
  backLabel = "Voltar",
}: PermissionStateProps) {
  return (
    <Card className="flex flex-col items-center gap-4 py-12 text-center">
      <Lock className="h-8 w-8 text-status-error" aria-hidden="true" />
      <div>
        <p className="font-display text-lg font-semibold text-content-primary">
          {title}
        </p>
        <p className="mt-1 text-sm text-content-secondary">{description}</p>
      </div>
      <Link href={backHref} className={buttonVariants("secondary")}>
        {backLabel}
      </Link>
    </Card>
  );
}

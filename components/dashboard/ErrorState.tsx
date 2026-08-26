import { Link } from "@/lib/link";
import { CircleAlert, RotateCcw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type ErrorStateProps = {
  title: string;
  message: string;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
};

export function ErrorState({
  title,
  message,
  onRetry,
  backHref,
  backLabel = "Voltar",
}: ErrorStateProps) {
  return (
    <Card className="flex flex-col items-center gap-4 py-12 text-center">
      <CircleAlert className="h-8 w-8 text-status-error" aria-hidden="true" />
      <div>
        <p className="font-display text-lg font-semibold text-content-primary">
          {title}
        </p>
        <p className="mt-1 text-sm text-content-secondary">{message}</p>
      </div>
      <div className="flex gap-3">
        {onRetry && (
          <Button variant="secondary" onClick={onRetry} className="gap-2">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Tentar novamente
          </Button>
        )}
        {backHref && (
          <Link href={backHref} className={buttonVariants("secondary")}>
            {backLabel}
          </Link>
        )}
      </div>
    </Card>
  );
}

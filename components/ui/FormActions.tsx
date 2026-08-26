import { Link } from "@/lib/link";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

type FormActionsProps = {
  cancelHref: string;
  cancelLabel?: string;
  submitLabel: string;
  loading?: boolean;
  disabled?: boolean;
};

export function FormActions({
  cancelHref,
  cancelLabel = "Cancelar",
  submitLabel,
  loading = false,
  disabled = false,
}: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
      <Link
        href={cancelHref}
        className={cn(
          buttonVariants("ghost"),
          "w-full sm:w-auto",
          loading && "pointer-events-none opacity-50"
        )}
      >
        {cancelLabel}
      </Link>
      <Button
        type="submit"
        disabled={loading || disabled}
        className="w-full gap-2 sm:w-auto"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {submitLabel}
      </Button>
    </div>
  );
}

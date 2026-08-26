import { Link } from "@/lib/link";
import { Eye } from "lucide-react";

type ActionLinkProps = {
  href: string;
  label?: string;
};

export function ActionLink({ href, label = "Ver" }: ActionLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-brand-primary transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
      <Eye className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}

import { Badge } from "@/components/ui/Badge";
import {
  STATUS_BADGES,
  STATUS_LABELS,
} from "@/lib/constants/consulta-status";
import type { StatusConsulta } from "@/types/consulta";

type StatusBadgeProps = {
  status: StatusConsulta;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant={STATUS_BADGES[status]} className={className}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}

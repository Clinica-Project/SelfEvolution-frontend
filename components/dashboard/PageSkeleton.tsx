import { Card } from "@/components/ui/Card";

type PageSkeletonProps = {
  lines?: number;
  "aria-label"?: string;
};

export function PageSkeleton({
  lines = 6,
  "aria-label": ariaLabel = "Carregando",
}: PageSkeletonProps) {
  return (
    <Card className="space-y-4" aria-busy="true" aria-label={ariaLabel}>
      <div className="skeleton h-6 w-48" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="skeleton h-10" />
        ))}
      </div>
    </Card>
  );
}

import { Card } from "@/components/ui/Card";

type TableSkeletonProps = {
  rows?: number;
  columns?: number;
  "aria-label"?: string;
};

export function TableSkeleton({
  rows = 5,
  columns = 5,
  "aria-label": ariaLabel = "Carregando",
}: TableSkeletonProps) {
  const widths = [24, 24, 16, 16, 14, 12, 10];

  return (
    <Card className="p-0" aria-busy="true" aria-label={ariaLabel}>
      <div className="divide-y divide-border">
        <div className="flex gap-4 px-6 py-4">
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={index}
              className="skeleton h-4"
              style={{ width: `${widths[index % widths.length] * 4}px` }}
            />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="flex items-center gap-4 px-6 py-5">
            {Array.from({ length: columns }).map((_, col) => (
              <div
                key={col}
                className="skeleton h-4"
                style={{ width: `${widths[(row + col) % widths.length] * 4}px` }}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}

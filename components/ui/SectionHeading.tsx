import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-brand-primary",
          align === "center" && "justify-center"
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-brand-primary/40" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-balance font-display text-display-section font-bold text-content-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-content-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

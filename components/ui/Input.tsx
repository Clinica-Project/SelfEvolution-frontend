import { cn } from "@/lib/utils/cn";
import { InputHTMLAttributes, forwardRef, type ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-content-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-md border border-border bg-surface-card px-3 py-2.5 text-sm text-content-primary placeholder:text-content-muted focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-brand-primary/20",
            error && "border-status-error focus:border-status-error focus:ring-status-error/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-status-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

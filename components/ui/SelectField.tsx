import { cn } from "@/lib/utils/cn";
import { SelectHTMLAttributes, forwardRef, type ReactNode } from "react";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  children: ReactNode;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, label, hint, id, children, ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-content-secondary"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full rounded-md border border-border bg-surface-card px-3 py-2.5 text-sm text-content-primary focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {hint && <p className="text-xs text-content-muted">{hint}</p>}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

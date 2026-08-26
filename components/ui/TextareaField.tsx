import { cn } from "@/lib/utils/cn";
import { TextareaHTMLAttributes, forwardRef } from "react";

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  optional?: boolean;
  hint?: string;
};

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ className, label, optional = false, hint, id, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-content-secondary"
          >
            {label}
            {optional && (
              <span className="ml-1 font-normal text-content-muted">
                (opcional)
              </span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-md border border-border bg-surface-card px-3 py-2.5 text-sm leading-relaxed text-content-primary placeholder:text-content-muted focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60",
            className
          )}
          {...props}
        />
        {hint && <p className="text-xs text-content-muted">{hint}</p>}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";

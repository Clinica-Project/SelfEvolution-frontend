import { cn } from "@/lib/utils/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

const variants = {
  primary:
    "bg-brand-primary text-content-inverse hover:bg-brand-primary-dark focus-visible:ring-brand-primary",
  secondary:
    "border border-brand-primary bg-transparent text-brand-primary hover:bg-surface-muted focus-visible:ring-brand-primary",
  info: "bg-brand-secondary text-content-inverse hover:opacity-90 focus-visible:ring-brand-secondary",
  ghost:
    "bg-transparent text-brand-primary hover:bg-surface-muted focus-visible:ring-brand-primary",
  danger:
    "bg-status-error text-content-inverse hover:opacity-90 focus-visible:ring-status-error",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-expo active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export function buttonVariants(variant: keyof typeof variants = "primary") {
  return cn(
    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-expo active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variants[variant]
  );
}

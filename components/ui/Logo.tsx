import { Link } from "@/lib/link";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  href?: string;
  size?: "sm" | "md";
};

const sizes = {
  sm: {
    mark: "h-7 sm:h-8",
    word: "text-[15px] font-semibold sm:text-[17px]",
    tag: "text-[9px] sm:text-[10px]",
    gap: "-ml-1",
    nudge: "translate-y-px",
  },
  md: {
    mark: "h-8",
    word: "text-xl font-semibold",
    tag: "text-[11px]",
    gap: "-ml-1",
    nudge: "translate-y-px",
  },
} as const;

export function Logo({
  className,
  showTagline = false,
  href = "/",
  size = "sm",
}: LogoProps) {
  const s = sizes[size];

  const content = (
    <span className={cn("inline-flex items-end", className)}>
      <img
        src="/logo-psi.png"
        alt=""
        width={422}
        height={380}
        className={cn("w-auto shrink-0 select-none", s.mark, s.nudge)}
      />
      <span className={cn("flex flex-col justify-center leading-none", s.gap)}>
        <span
          className={cn(
            "font-display lowercase tracking-[-0.03em] text-brand-primary",
            s.word
          )}
        >
          elfevolution
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-0.5 font-sans font-normal tracking-[-0.01em] text-content-secondary",
              s.tag
            )}
          >
            clínica interdisciplinar
          </span>
        )}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label="SelfEvolution — clínica interdisciplinar"
        className="inline-flex shrink-0"
      >
        {content}
      </Link>
    );
  }

  return content;
}

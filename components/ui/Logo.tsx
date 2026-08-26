import { Link } from "@/lib/link";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  href?: string;
};

export function Logo({ className, showTagline = true, href = "/" }: LogoProps) {
  const content = (
    <div className={cn("flex flex-col", className)}>
      <span className="font-display text-xl font-medium lowercase tracking-tight text-brand-primary">
        selfevolution
      </span>
      {showTagline && (
        <span className="text-xs font-normal text-content-secondary">
          clínica interdisciplinar
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
}

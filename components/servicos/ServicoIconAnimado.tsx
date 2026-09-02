import { InstitucionalIcon } from "@/components/institucional/InstitucionalIcon";
import type { InstitucionalIconName } from "@/lib/content/institucional";
import { cn } from "@/lib/utils/cn";

type ServicoIconAnimadoProps = {
  name: InstitucionalIconName;
  className?: string;
};

const hoverMove: Partial<Record<InstitucionalIconName, string>> = {
  brain: "group-hover:animate-icon-pulse",
  activity: "transition-transform duration-500 ease-expo group-hover:rotate-12",
  puzzle: "transition-transform duration-500 ease-expo group-hover:rotate-[-8deg] group-hover:scale-110",
  "graduation-cap": "transition-transform duration-500 ease-expo group-hover:-translate-y-1",
  blocks: "group-hover:animate-icon-pulse",
  salad: "transition-transform duration-700 ease-expo group-hover:rotate-12",
};

function WaveBars({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      <rect
        x="4"
        y="4"
        width="3.2"
        height="16"
        rx="1.4"
        className="origin-center scale-y-75 [transform-box:fill-box] group-hover:animate-icon-wave"
      />
      <rect
        x="10.4"
        y="4"
        width="3.2"
        height="16"
        rx="1.4"
        className="origin-center scale-y-90 [transform-box:fill-box] group-hover:animate-icon-wave group-hover:[animation-delay:-0.28s]"
      />
      <rect
        x="16.8"
        y="4"
        width="3.2"
        height="16"
        rx="1.4"
        className="origin-center scale-y-60 [transform-box:fill-box] group-hover:animate-icon-wave group-hover:[animation-delay:-0.52s]"
      />
    </svg>
  );
}

export function ServicoIconAnimado({ name, className }: ServicoIconAnimadoProps) {
  if (name === "audio-lines") {
    return <WaveBars className={className} />;
  }

  return (
    <span className={cn("inline-flex h-full w-full", hoverMove[name])}>
      <InstitucionalIcon name={name} className={cn("h-full w-full", className)} />
    </span>
  );
}

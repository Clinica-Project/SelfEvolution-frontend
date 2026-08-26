import { cn } from "@/lib/utils/cn";

const PALETTE = [
  "bg-brand-primary/12 text-brand-primary",
  "bg-brand-secondary/12 text-brand-secondary",
  "bg-status-success/12 text-status-success",
  "bg-brand-accent-yellow/25 text-content-primary",
  "bg-status-info/12 text-status-info",
] as const;

function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

function corDoNome(nome: string): string {
  let hash = 0;
  for (let i = 0; i < nome.length; i++) {
    hash = (hash * 31 + nome.charCodeAt(i)) | 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

type PatientAvatarProps = {
  nome: string;
  size?: "md" | "lg";
  className?: string;
};

/** Avatar com iniciais; a cor de fundo é estável por nome (hash simples). */
export function PatientAvatar({ nome, size = "md", className }: PatientAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "md" && "h-11 w-11 text-sm",
        size === "lg" && "h-20 w-20 font-display text-2xl",
        corDoNome(nome),
        className
      )}
    >
      {iniciais(nome)}
    </span>
  );
}

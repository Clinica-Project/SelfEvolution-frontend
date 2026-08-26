import { ChevronDown, LogOut, Search } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useRouter } from "@/hooks/useRouter";
import { useAuth } from "@/lib/auth/context";
import { ROLE_LABELS } from "@/lib/auth/permissions";
import { cn } from "@/lib/utils/cn";

type DashboardHeaderProps = {
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  className?: string;
};

export function DashboardHeader({ onMenuClick, onSearchClick, className }: DashboardHeaderProps) {
  const { role, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  const roleLabel = role ? ROLE_LABELS[role] : null;
  const inicial = roleLabel?.charAt(0) ?? "";

  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface-card px-4 shadow-header lg:px-6",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex rounded-md p-2 text-brand-primary transition-colors duration-200 ease-expo hover:bg-surface-muted lg:hidden"
          aria-label="Abrir menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="lg:hidden">
          <Logo href="/dashboard" showTagline={false} />
        </div>

        <button
          type="button"
          onClick={onSearchClick}
          disabled={!onSearchClick}
          title={onSearchClick ? "Buscar" : "Busca disponível em breve"}
          className={cn(
            "hidden items-center gap-2.5 rounded-md border border-border bg-surface-muted/60 px-3 py-2 text-sm text-content-muted transition-colors duration-200 ease-expo md:flex",
            onSearchClick
              ? "hover:border-brand-primary/40 hover:text-content-secondary"
              : "cursor-not-allowed opacity-70"
          )}
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Buscar…
          <kbd className="ml-4 rounded-sm border border-border bg-surface-card px-1.5 py-0.5 text-[10px] font-medium text-content-muted">
            Ctrl K
          </kbd>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2.5 rounded-md px-3 py-2 text-sm text-content-secondary transition-colors duration-200 ease-expo hover:bg-surface-muted sm:flex">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-semibold text-brand-primary"
          >
            {inicial}
          </span>
          {roleLabel ?? "…"}
          <ChevronDown className="h-4 w-4 text-content-muted" />
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-content-secondary transition-colors duration-200 ease-expo hover:bg-status-error/10 hover:text-status-error"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}

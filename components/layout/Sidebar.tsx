import { Link } from "@/lib/link";
import { usePathname } from "@/hooks/usePathname";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { useAuth } from "@/lib/auth/context";
import { ROLE_LABELS } from "@/lib/auth/permissions";
import { useMounted } from "@/hooks/useMounted";
import {
  dashboardNavItems,
  NAV_SECTION_ORDER,
} from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

function SidebarNav({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { role } = useAuth();

  const visibleItems = dashboardNavItems.filter(
    (item) => !item.adminOnly || role === "ADMIN"
  );

  const sections = NAV_SECTION_ORDER.map((section) => ({
    section,
    items: visibleItems.filter((item) => item.section === section),
  })).filter((grupo) => grupo.items.length > 0);

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-border bg-gradient-to-b from-surface-card to-surface-muted/40",
        className
      )}
    >
      <div className="border-b border-border px-5 py-5">
        <Logo href="/dashboard" showTagline={false} />
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
        {sections.map(({ section, items }) => (
          <div key={section}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-content-muted">
              {section}
            </p>
            <div className="flex flex-col gap-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 ease-expo",
                      isActive
                        ? "bg-brand-primary text-content-inverse shadow-sm before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-full before:bg-brand-accent-yellow before:content-['']"
                        : "text-content-secondary hover:bg-surface-muted hover:text-brand-primary"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200 ease-expo",
                        !isActive && "group-hover:scale-110"
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.adminOnly && (
                      <Badge variant="admin" className="text-[10px] uppercase tracking-wide">
                        Admin
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {role && (
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-md bg-surface-card/80 px-3 py-2.5 shadow-inset-border">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-xs font-semibold text-brand-primary"
            >
              {ROLE_LABELS[role].charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-content-primary">
                {ROLE_LABELS[role]}
              </p>
              <p className="text-xs text-content-muted">Conta ativa</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <aside
        className={cn(
          "flex h-full w-64 shrink-0 flex-col border-r border-border bg-gradient-to-b from-surface-card to-surface-muted/40",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return <SidebarNav className={className} onNavigate={onNavigate} />;
}

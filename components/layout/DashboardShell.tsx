import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { Sidebar } from "@/components/layout/Sidebar";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { cn } from "@/lib/utils/cn";

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  // Monta a palette só na primeira abertura: hooks de dados rodam 1x por sessão
  const [paletteMounted, setPaletteMounted] = useState(false);

  function openPalette() {
    setPaletteMounted(true);
    setPaletteOpen(true);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteMounted(true);
        setPaletteOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-surface-background">
      <DashboardHeader
        onMenuClick={() => setMobileOpen(true)}
        onSearchClick={openPalette}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-content-primary/30"
              aria-label="Fechar menu"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full shadow-md">
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <main
          className={cn(
            "grain-overlay flex-1 overflow-y-auto bg-gradient-to-b from-brand-secondary/5 to-transparent px-page py-6 lg:px-8"
          )}
        >
          {children}
        </main>
      </div>

      {paletteMounted && (
        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      )}
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicMotionRoot } from "@/components/layout/PublicMotionRoot";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicMotionRoot />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-surface-card focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-brand-primary focus:shadow-md"
      >
        Pular para o conteúdo
      </a>
      <PublicHeader />
      <main id="conteudo" className="page-enter flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}

import { Outlet } from "react-router-dom";
import { AuthGuard } from "@/lib/auth/AuthGuard";
import { DashboardShell } from "@/components/layout/DashboardShell";

export function DashboardLayout() {
  return (
    <AuthGuard>
      <DashboardShell>
        <Outlet />
      </DashboardShell>
    </AuthGuard>
  );
}

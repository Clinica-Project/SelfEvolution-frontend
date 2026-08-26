import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/context";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-background">
      <div className="flex flex-col items-center gap-3 text-content-secondary">
        <Loader2
          className="h-6 w-6 animate-spin text-brand-primary"
          aria-hidden="true"
        />
        <p className="text-sm">Verificando sessão…</p>
      </div>
    </div>
  );
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

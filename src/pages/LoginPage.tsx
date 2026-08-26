import { FloatingOrbs } from "@/components/home/FloatingOrbs";
import { LoginBrandPanel } from "@/components/auth/LoginBrandPanel";
import { LoginForm } from "@/components/auth/LoginForm";

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col lg:flex-row">
      <LoginBrandPanel />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-page py-12 lg:border-l lg:border-border/70 lg:bg-white/40 lg:px-8">
        <FloatingOrbs variant="soft" className="hidden lg:block" />
        <LoginForm />
      </main>
    </div>
  );
}

import { Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/dashboard/EmptyState";

export function UsuariosPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Administração"
        title="Usuários"
        description="Gestão de acessos e perfis da clínica."
      />
      <EmptyState
        icon={Users}
        title="Em desenvolvimento"
        description="Módulo exclusivo para Administrador — cadastro de psicólogos em breve."
      />
    </div>
  );
}

import { FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/dashboard/EmptyState";

export function DocumentosPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Clínica"
        title="Documentos"
        description="Modelos e arquivos clínicos da clínica."
      />
      <EmptyState
        icon={FileText}
        title="Em desenvolvimento"
        description="Em breve você poderá gerenciar modelos de documentos, termos e relatórios clínicos por aqui."
      />
    </div>
  );
}

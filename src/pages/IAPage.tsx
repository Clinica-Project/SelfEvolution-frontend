import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/dashboard/EmptyState";

export function IAPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Inteligência"
        title="IA Clínica"
        description="Recursos de apoio à decisão clínica com inteligência artificial."
      />
      <EmptyState
        icon={Sparkles}
        title="Em desenvolvimento"
        description="Em breve a IA vai ajudar a resumir evoluções e sugerir pontos de atenção do acompanhamento."
      />
    </div>
  );
}

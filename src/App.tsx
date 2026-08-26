import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/lib/auth/context";
import { PublicLayout } from "@/src/layouts/PublicLayout";
import { AuthLayout } from "@/src/layouts/AuthLayout";
import { DashboardLayout } from "@/src/layouts/DashboardLayout";
import { HomePage } from "@/src/pages/HomePage";
import { SobrePage } from "@/src/pages/SobrePage";
import { ServicosPage } from "@/src/pages/ServicosPage";
import { DiferenciaisPage } from "@/src/pages/DiferenciaisPage";
import { LoginPage } from "@/src/pages/LoginPage";
import { CadastroPage } from "@/src/pages/CadastroPage";
import { DashboardPage } from "@/src/pages/DashboardPage";
import { ConsultasPage } from "@/src/pages/ConsultasPage";
import { NovaConsultaPage } from "@/src/pages/NovaConsultaPage";
import { ConsultaDetalhePage } from "@/src/pages/ConsultaDetalhePage";
import { PacientesPage } from "@/src/pages/PacientesPage";
import { NovoPacientePage } from "@/src/pages/NovoPacientePage";
import { PacienteDetalhePage } from "@/src/pages/PacienteDetalhePage";
import { EvolucaoPage } from "@/src/pages/EvolucaoPage";
import { DocumentosPage } from "@/src/pages/DocumentosPage";
import { IAPage } from "@/src/pages/IAPage";
import { UsuariosPage } from "@/src/pages/UsuariosPage";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function DocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles: [RegExp, string][] = [
      [/^\/$/, "SelfEvolution — clínica interdisciplinar"],
      [/^\/sobre$/, "Sobre — SelfEvolution"],
      [/^\/servicos$/, "Serviços — SelfEvolution"],
      [/^\/diferenciais$/, "Diferenciais — SelfEvolution"],
      [/^\/login$/, "Área restrita — SelfEvolution"],
      [/^\/cadastro$/, "Criar conta — SelfEvolution"],
      [/^\/dashboard$/, "Dashboard — SelfEvolution"],
      [/^\/consultas\/nova$/, "Agendar consulta — SelfEvolution"],
      [/^\/consultas\/[^/]+$/, "Detalhe da consulta — SelfEvolution"],
      [/^\/consultas$/, "Consultas — SelfEvolution"],
      [/^\/pacientes\/novo$/, "Novo paciente — SelfEvolution"],
      [/^\/pacientes\/[^/]+\/evolucao$/, "Evolução clínica — SelfEvolution"],
      [/^\/pacientes\/[^/]+$/, "Paciente — SelfEvolution"],
      [/^\/pacientes$/, "Pacientes — SelfEvolution"],
      [/^\/documentos$/, "Documentos — SelfEvolution"],
      [/^\/ia$/, "IA Clínica — SelfEvolution"],
      [/^\/usuarios$/, "Usuários — SelfEvolution"],
    ];
    const match = titles.find(([pattern]) => pattern.test(pathname));
    document.title = match?.[1] ?? "SelfEvolution";
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <DocumentTitle />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/diferenciais" element={<DiferenciaisPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/consultas" element={<ConsultasPage />} />
          <Route path="/consultas/nova" element={<NovaConsultaPage />} />
          <Route path="/consultas/:id" element={<ConsultaDetalhePage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/pacientes/novo" element={<NovoPacientePage />} />
          <Route path="/pacientes/:id" element={<PacienteDetalhePage />} />
          <Route path="/pacientes/:id/evolucao" element={<EvolucaoPage />} />
          <Route path="/documentos" element={<DocumentosPage />} />
          <Route path="/ia" element={<IAPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/lib/auth/context";
import { PublicLayout } from "@/src/layouts/PublicLayout";
import { HomePage } from "@/src/pages/HomePage";
import { SobrePage } from "@/src/pages/SobrePage";
import { ServicosPage } from "@/src/pages/ServicosPage";
import { NotFoundPage } from "@/src/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function DocumentTitle() {
  useEffect(() => {
    document.title = "SelfEvolution";
  }, []);

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
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

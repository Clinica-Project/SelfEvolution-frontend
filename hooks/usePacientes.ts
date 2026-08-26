import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { parseApiError } from "@/lib/api/errors";
import { listarPacientes } from "@/lib/api/pacientes";
import type { PacienteResponse } from "@/types/paciente";

type UsePacientesResult = {
  data: PacienteResponse[];
  loading: boolean;
  error: string | null;
  /**
   * false quando GET /pacientes não está disponível no backend (404/405) —
   * nesse caso a UI deve usar um campo de UUID como fallback.
   */
  supported: boolean;
  refresh: () => Promise<void>;
};

export function usePacientes(enabled = true): UsePacientesResult {
  const [data, setData] = useState<PacienteResponse[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const pacientes = await listarPacientes();
      setData(pacientes);
      setSupported(true);
    } catch (err) {
      const status = isAxiosError(err) ? err.response?.status : null;
      // Endpoint de listagem ainda não existe no backend (ver lib/api/pacientes.ts)
      if (status === 404 || status === 405) {
        setSupported(false);
      } else {
        setError(parseApiError(err));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) void refresh();
  }, [enabled, refresh]);

  return { data, loading, error, supported, refresh };
}

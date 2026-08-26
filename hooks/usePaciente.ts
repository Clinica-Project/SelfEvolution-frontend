import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { parseApiError } from "@/lib/api/errors";
import { buscarPaciente } from "@/lib/api/pacientes";
import type { PacienteResponse } from "@/types/paciente";

type UsePacienteResult = {
  data: PacienteResponse | null;
  loading: boolean;
  error: string | null;
  errorStatus: number | null;
  refresh: () => Promise<void>;
};

export function usePaciente(id: string | undefined): UsePacienteResult {
  const [data, setData] = useState<PacienteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setErrorStatus(null);
    try {
      setData(await buscarPaciente(id));
    } catch (err) {
      setError(parseApiError(err));
      setErrorStatus(isAxiosError(err) ? (err.response?.status ?? null) : null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, errorStatus, refresh };
}

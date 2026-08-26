import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { buscarConsulta } from "@/lib/api/consultas";
import { parseApiError } from "@/lib/api/errors";
import type { ConsultaResponse } from "@/types/consulta";

type UseConsultaResult = {
  data: ConsultaResponse | null;
  loading: boolean;
  error: string | null;
  /** Status HTTP do erro (403, 404…), se houver. */
  errorStatus: number | null;
  refresh: () => Promise<void>;
  /** Atualiza o estado local após uma mutação bem-sucedida. */
  setData: (consulta: ConsultaResponse) => void;
};

export function useConsulta(id: string | undefined): UseConsultaResult {
  const [data, setDataState] = useState<ConsultaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setErrorStatus(null);
    try {
      setDataState(await buscarConsulta(id));
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

  return {
    data,
    loading,
    error,
    errorStatus,
    refresh,
    setData: setDataState,
  };
}

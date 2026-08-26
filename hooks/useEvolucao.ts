import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { buscarEvolucao } from "@/lib/api/evolucoes";
import { parseApiError } from "@/lib/api/errors";
import type { EvolucaoClinicaResponse } from "@/types/evolucao";

type UseEvolucaoResult = {
  /** Evolução existente (modo edição) ou null (modo criação). */
  evolucao: EvolucaoClinicaResponse | null;
  loading: boolean;
  /** Erro real (403, 500…). O 404 não é erro: indica modo criação. */
  error: string | null;
  errorStatus: number | null;
  refresh: () => Promise<void>;
  setEvolucao: (evolucao: EvolucaoClinicaResponse) => void;
};

export function useEvolucao(consultaId: string | undefined): UseEvolucaoResult {
  const [evolucao, setEvolucaoState] =
    useState<EvolucaoClinicaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    if (!consultaId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setErrorStatus(null);
    try {
      setEvolucaoState(await buscarEvolucao(consultaId));
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 404) {
        // Sem evolução ainda → modo criação
        setEvolucaoState(null);
      } else {
        setError(parseApiError(err));
        setErrorStatus(
          isAxiosError(err) ? (err.response?.status ?? null) : null
        );
      }
    } finally {
      setLoading(false);
    }
  }, [consultaId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    evolucao,
    loading,
    error,
    errorStatus,
    refresh,
    setEvolucao: setEvolucaoState,
  };
}

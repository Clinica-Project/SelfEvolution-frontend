import { useCallback, useEffect, useState } from "react";
import { listarConsultas } from "@/lib/api/consultas";
import { parseApiError } from "@/lib/api/errors";
import type {
  ConsultaResponse,
  ListarConsultasParams,
} from "@/types/consulta";

type UseConsultasResult = {
  data: ConsultaResponse[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export function useConsultas(
  params?: ListarConsultasParams
): UseConsultasResult {
  const [data, setData] = useState<ConsultaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pacienteId = params?.pacienteId;
  const psicologoId = params?.psicologoId;

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const consultas = await listarConsultas({ pacienteId, psicologoId });
      setData(consultas);
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  }, [pacienteId, psicologoId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}

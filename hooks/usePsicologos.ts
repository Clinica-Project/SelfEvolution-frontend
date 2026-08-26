import { useCallback, useEffect, useState } from "react";
import { parseApiError } from "@/lib/api/errors";
import { listarPsicologos } from "@/lib/api/psicologos";
import type { PsicologoResponse } from "@/types/psicologo";

type UsePsicologosResult = {
  data: PsicologoResponse[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export function usePsicologos(enabled = true): UsePsicologosResult {
  const [data, setData] = useState<PsicologoResponse[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await listarPsicologos());
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) void refresh();
  }, [enabled, refresh]);

  return { data, loading, error, refresh };
}

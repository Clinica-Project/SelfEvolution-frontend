import { useEffect, useState } from "react";

/** Só true após a hidratação no client — evita hooks de router antes do Layout Router montar. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

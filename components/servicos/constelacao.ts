export type NodePoint = { x: number; y: number; label: string };

/** Coordenadas em % do diagrama (desktop). */
export const NODES_DESKTOP: NodePoint[] = [
  { x: 18, y: 28, label: "Psicologia" },
  { x: 48, y: 14, label: "Neuro" },
  { x: 82, y: 24, label: "Reabilitação" },
  { x: 16, y: 64, label: "Psicopedagogia" },
  { x: 50, y: 50, label: "ABA" },
  { x: 84, y: 58, label: "Fono" },
  { x: 64, y: 78, label: "Nutrição" },
];

/** Coordenadas em % do diagrama (mobile, mais alto). */
export const NODES_MOBILE: NodePoint[] = [
  { x: 50, y: 10, label: "Psicologia" },
  { x: 18, y: 26, label: "Neuro" },
  { x: 82, y: 28, label: "Reabilitação" },
  { x: 20, y: 48, label: "Psicopedagogia" },
  { x: 78, y: 50, label: "ABA" },
  { x: 24, y: 70, label: "Fono" },
  { x: 76, y: 74, label: "Nutrição" },
];

/** Arestas não dirigidas derivadas do grafo clínico. */
export const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 5],
  [4, 5],
  [4, 6],
];

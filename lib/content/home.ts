export type HomeIconName =
  | "brain"
  | "activity"
  | "puzzle"
  | "graduation-cap"
  | "blocks"
  | "audio-lines"
  | "salad"
  | "users"
  | "monitor-smartphone"
  | "heart-handshake";

export type Service = {
  title: string;
  description: string;
  icon: HomeIconName;
};

export const services: Service[] = [
  {
    title: "Psicologia",
    description:
      "Acompanhamento emocional e comportamental em todas as fases da vida.",
    icon: "brain",
  },
  {
    title: "Avaliação neuropsicológica",
    description:
      "Investigação cognitiva com rigor clínico e devolutiva acolhedora.",
    icon: "activity",
  },
  {
    title: "Reabilitação cognitiva",
    description: "Estímulo de funções cognitivas com plano individualizado.",
    icon: "puzzle",
  },
  {
    title: "Psicopedagogia",
    description: "Apoio à aprendizagem e ao desenvolvimento escolar.",
    icon: "graduation-cap",
  },
  {
    title: "Terapia ABA",
    description:
      "Intervenção baseada em evidências para habilidades do dia a dia.",
    icon: "blocks",
  },
  {
    title: "Fonoaudiologia",
    description: "Cuidado com comunicação, linguagem, voz e deglutição.",
    icon: "audio-lines",
  },
  {
    title: "Nutrição",
    description: "Orientação alimentar integrada ao cuidado interdisciplinar.",
    icon: "salad",
  },
];

export type Differential = {
  title: string;
  description: string;
  icon: HomeIconName;
};

export const differentials: Differential[] = [
  {
    title: "Abordagem interdisciplinar",
    description:
      "Especialistas que conversam entre si para olhar o cuidado de forma completa e humanizada.",
    icon: "users",
  },
  {
    title: "Online e presencial",
    description:
      "Flexibilidade de agenda com a mesma qualidade clínica em ambos os formatos.",
    icon: "monitor-smartphone",
  },
  {
    title: "Todas as fases da vida",
    description:
      "Acompanhamento para crianças, adolescentes, adultos e idosos com acolhimento em cada etapa.",
    icon: "heart-handshake",
  },
];

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: 500, prefix: "+", label: "famílias acolhidas" },
  { value: 7, label: "especialidades integradas" },
  { value: 100, suffix: "%", label: "equipe registrada" },
];

/** Termos exibidos no marquee acima do grid de serviços. */
export const marqueeTerms = [
  "Psicologia",
  "Neuropsicologia",
  "Reabilitação cognitiva",
  "Psicopedagogia",
  "Terapia ABA",
  "Fonoaudiologia",
  "Nutrição",
];

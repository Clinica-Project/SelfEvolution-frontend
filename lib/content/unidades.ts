export const WHATSAPP_URL = "https://wa.me/5511976854141";

export type UnidadeCity = "São Paulo" | "Guarulhos";

export type UnidadeSpaceId = "atendimento" | "psicologia" | "infancia";

export type UnidadeSpace = {
  id: UnidadeSpaceId;
  label: string;
  description: string;
};

export type UnidadeLandmark = {
  title: string;
  detail: string;
};

export type UnidadeStructure = {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
  highlights: string[];
};

export type Unidade = {
  slug: string;
  name: string;
  city: UnidadeCity;
  neighborhood: string;
  address: string;
  mapQuery: string;
  heroImage: string;
  heroAlt: string;
  subtitle: string;
  intro: string;
  landmarks: UnidadeLandmark[];
  spaces: UnidadeSpace[];
  structure: UnidadeStructure[];
  nearby: string[];
};

export const SPACE_ATENDIMENTO: UnidadeSpace = {
  id: "atendimento",
  label: "Atendimento",
  description:
    "Salas preparadas para o cuidado interdisciplinar, com privacidade e conforto.",
};

export const SPACE_PSICOLOGIA: UnidadeSpace = {
  id: "psicologia",
  label: "Psicologia",
  description: "Salas silenciosas, pensadas para escuta, sigilo e presença.",
};

export const SPACE_INFANCIA: UnidadeSpace = {
  id: "infancia",
  label: "Infância",
  description:
    "Espaço pensado para crianças e responsáveis, no ritmo de cada idade.",
};

const DEFAULT_SUBTITLE =
  "Um espaço calmo para o seu atendimento, com recepção acolhedora e salas preparadas para o cuidado.";

const RECEPCAO_HIGHLIGHTS = [
  "Ambiente climatizado, com café e água à disposição",
  "Wi-Fi e carregadores na espera",
  "Toaletes acessíveis",
];

function imgs(slug: string) {
  const base = `/unidades/${slug}`;
  return {
    hero: `${base}/hero.jpg`,
    recepcao: `${base}/recepcao.jpg`,
    sala: `${base}/sala.jpg`,
    psico: `${base}/psico.jpg`,
    kids: `${base}/kids.jpg`,
  };
}

function structureFor(
  slug: string,
  name: string,
  opts?: { psico?: boolean; kids?: boolean }
): UnidadeStructure[] {
  const i = imgs(slug);
  const items: UnidadeStructure[] = [
    {
      id: "recepcao",
      label: "Recepção",
      description:
        "Uma recepção acolhedora, com espera calma para você chegar com tempo e ser recebido com cuidado.",
      image: i.recepcao,
      imageAlt: `Recepção da unidade ${name}`,
      highlights: RECEPCAO_HIGHLIGHTS,
    },
    {
      id: "sala",
      label: "Salas de atendimento",
      description:
        "Salas reservadas para o encontro clínico — luz suave, sigilo e espaço para o que precisa ser dito.",
      image: i.sala,
      imageAlt: `Sala de atendimento na unidade ${name}`,
      highlights: [
        "Ambiente reservado e climatizado",
        "Pensado para escuta e acompanhamento",
        "Estrutura para o cuidado interdisciplinar",
      ],
    },
  ];

  if (opts?.psico) {
    items.push({
      id: "psico",
      label: "Salas de psicologia",
      description:
        "Salas dedicadas à escuta psicológica, com privacidade para o trabalho terapêutico.",
      image: i.psico,
      imageAlt: `Sala de psicologia na unidade ${name}`,
      highlights: [
        "Privacidade para a sessão",
        "Ambiente silencioso",
        "Conforto para o tempo da terapia",
      ],
    });
  }

  if (opts?.kids) {
    items.push({
      id: "kids",
      label: "Espaço infância",
      description:
        "Estrutura pensada para acolher crianças e responsáveis, no ritmo de cada idade.",
      image: i.kids,
      imageAlt: `Espaço infância na unidade ${name}`,
      highlights: [
        "Recepção adaptada para famílias",
        "Salas preparadas para o cuidado infantil",
        "Acolhimento também para quem acompanha",
      ],
    });
  }

  return items;
}

function unit(
  partial: Omit<Unidade, "heroImage" | "heroAlt" | "structure" | "subtitle"> & {
    subtitle?: string;
    psico?: boolean;
    kids?: boolean;
    extraStructure?: UnidadeStructure[];
  }
): Unidade {
  const { psico, kids, subtitle, extraStructure, ...rest } = partial;
  const i = imgs(rest.slug);
  return {
    ...rest,
    subtitle: subtitle ?? DEFAULT_SUBTITLE,
    heroImage: i.hero,
    heroAlt: `Unidade ${rest.name} — ${rest.neighborhood}`,
    structure: [
      ...structureFor(rest.slug, rest.name, { psico, kids }),
      ...(extraStructure ?? []),
    ],
  };
}

export const unidades: Unidade[] = [
  unit({
    slug: "angelica",
    name: "Angélica",
    city: "São Paulo",
    neighborhood: "Bela Vista",
    address: "Av. Angélica, 2491 — 9º andar — Bela Vista, São Paulo — SP",
    mapQuery: "Avenida Angélica, 2491, Bela Vista, São Paulo, SP, Brasil",
    intro:
      "Na Bela Vista, a unidade Angélica fica em um ponto de fácil acesso à Paulista e à região dos hospitais. Um espaço pensado para o atendimento chegar com calma, sigilo e acolhimento.",
    landmarks: [
      { title: "Estação Paulista", detail: "Cerca de 5 minutos da estação de metrô" },
      { title: "Hospital Sabará", detail: "Cerca de 5 minutos" },
      { title: "Hospital Sírio-Libanês", detail: "Cerca de 10 minutos" },
      { title: "Hospital das Clínicas", detail: "A cerca de 3 quadras" },
    ],
    spaces: [SPACE_ATENDIMENTO],
    nearby: ["brigadeiro", "brigadeiro-psico", "paulista", "pinheiros"],
  }),
  unit({
    slug: "brigadeiro",
    name: "Brigadeiro",
    city: "São Paulo",
    neighborhood: "Bela Vista",
    address:
      "R. Cincinato Braga, 340 — 6º e 10º andar — Bela Vista, São Paulo — SP",
    mapQuery: "Rua Cincinato Braga, 340, Bela Vista, São Paulo, SP, Brasil",
    intro:
      "A poucos passos da Avenida Paulista e da estação Brigadeiro, esta unidade reúne salas de atendimento em um prédio de fácil acesso para quem vem de metrô, carro ou a pé.",
    landmarks: [
      { title: "Estação Brigadeiro", detail: "Cerca de 2 minutos do metrô" },
      { title: "Hospital Santa Catarina", detail: "Cerca de 2 minutos" },
      { title: "Hospital Pro Matre", detail: "Cerca de 3 minutos" },
      { title: "Hospital Oswaldo Cruz", detail: "Cerca de 4 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO],
    nearby: ["angelica", "brigadeiro-psico", "paulista", "vila-mariana"],
  }),
  unit({
    slug: "brigadeiro-psico",
    name: "Brigadeiro Psicologia",
    city: "São Paulo",
    neighborhood: "Bela Vista",
    address: "R. Cincinato Braga, 340 — 5º andar — Bela Vista, São Paulo — SP",
    mapQuery: "Rua Cincinato Braga, 340, Bela Vista, São Paulo, SP, Brasil",
    subtitle:
      "Um andar dedicado à escuta psicológica, no mesmo endereço da unidade Brigadeiro.",
    intro:
      "No mesmo prédio da Brigadeiro, o 5º andar é voltado à psicologia: salas silenciosas, recepção acolhedora e a mesma facilidade de acesso à Paulista e ao metrô.",
    landmarks: [
      { title: "Estação Brigadeiro", detail: "Cerca de 2 minutos do metrô" },
      { title: "Hospital Santa Catarina", detail: "Cerca de 2 minutos" },
      { title: "Avenida Paulista", detail: "A poucos minutos a pé" },
      { title: "Hospital Oswaldo Cruz", detail: "Cerca de 4 minutos" },
    ],
    spaces: [SPACE_PSICOLOGIA],
    nearby: ["brigadeiro", "angelica", "paulista", "vila-mariana"],
    psico: true,
  }),
  unit({
    slug: "ibirapuera",
    name: "Ibirapuera",
    city: "São Paulo",
    neighborhood: "Vila Clementino",
    address: "R. Agostinho Rodrigues Filho, 550 — Vila Clementino, São Paulo — SP",
    mapQuery:
      "Rua Agostinho Rodrigues Filho, 550, Vila Clementino, São Paulo, SP, Brasil",
    subtitle:
      "Atendimento perto do Parque Ibirapuera, com espaço pensado também para crianças e famílias.",
    intro:
      "Na Vila Clementino, a unidade Ibirapuera combina acesso à linha Lilás do metrô com uma estrutura pensada para o cuidado de adultos e de infâncias — salas de atendimento e espaço para crianças e responsáveis.",
    landmarks: [
      { title: "Estação AACD-Servidor", detail: "Cerca de 400 metros da linha Lilás" },
      { title: "UNIFESP", detail: "Cerca de 4 minutos da Escola Paulista de Medicina" },
      { title: "Hospital Edmundo Vasconcelos", detail: "Cerca de 5 minutos" },
      { title: "Parque Ibirapuera", detail: "A poucos minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_INFANCIA],
    nearby: ["vila-mariana", "moema", "vila-olimpia", "brigadeiro"],
    kids: true,
  }),
  unit({
    slug: "itaim",
    name: "Itaim",
    city: "São Paulo",
    neighborhood: "Itaim Bibi",
    address: "R. Joaquim Floriano, 413 — 9º andar — Itaim Bibi, São Paulo — SP",
    mapQuery: "Rua Joaquim Floriano, 413, Itaim Bibi, São Paulo, SP, Brasil",
    intro:
      "No Itaim Bibi, a unidade fica entre a Faria Lima e a Vila Olímpia — um endereço discreto, com boa oferta de transporte e estacionamento na região.",
    landmarks: [
      { title: "Avenida Faria Lima", detail: "A poucos minutos" },
      { title: "Vila Olímpia", detail: "Acesso rápido ao bairro" },
      { title: "Hospital São Luiz", detail: "Cerca de 10 minutos" },
      { title: "Parque do Povo", detail: "A poucos minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO],
    nearby: ["vila-olimpia", "market-place", "pinheiros", "paulista"],
  }),
  unit({
    slug: "market-place",
    name: "Market Place",
    city: "São Paulo",
    neighborhood: "Vila Cordeiro",
    address:
      "Av. Dr. Chucri Zaidan, 940 — 3º andar — Vila Cordeiro, São Paulo — SP",
    mapQuery:
      "Avenida Doutor Chucri Zaidan, 940, Vila Cordeiro, São Paulo, SP, Brasil",
    intro:
      "Na região da Berrini, a unidade Market Place fica em um complexo de fácil acesso para quem trabalha ou mora na zona sul — com salas de atendimento e de psicologia.",
    landmarks: [
      { title: "Shopping Market Place", detail: "No mesmo complexo" },
      { title: "Avenida das Nações Unidas", detail: "Acesso direto à Berrini" },
      { title: "Ponte Estaiada", detail: "A poucos minutos" },
      { title: "Vila Olímpia", detail: "Cerca de 10 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_PSICOLOGIA],
    nearby: ["itaim", "vila-olimpia", "moema", "pinheiros"],
    psico: true,
  }),
  unit({
    slug: "moema",
    name: "Moema",
    city: "São Paulo",
    neighborhood: "Indianópolis",
    address: "Av. dos Carinás, 185 — 2º andar — Indianópolis, São Paulo — SP",
    mapQuery: "Avenida dos Carinás, 185, Indianópolis, São Paulo, SP, Brasil",
    intro:
      "Em Moema, a unidade fica perto do Parque Ibirapuera e do metrô — um bairro residencial e de serviços, com ruas calmas para chegar ao atendimento.",
    landmarks: [
      { title: "Parque Ibirapuera", detail: "A poucos minutos" },
      { title: "Estação Moema", detail: "Acesso à linha Lilás do metrô" },
      { title: "Avenida Ibirapuera", detail: "A poucos minutos" },
      { title: "Shopping Ibirapuera", detail: "Cerca de 10 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO],
    nearby: ["ibirapuera", "itaim", "vila-olimpia", "vila-mariana"],
  }),
  unit({
    slug: "paulista",
    name: "Paulista",
    city: "São Paulo",
    neighborhood: "Bela Vista",
    address: "Av. Paulista, 2064 — 21º andar — Bela Vista, São Paulo — SP",
    mapQuery: "Avenida Paulista, 2064, Bela Vista, São Paulo, SP, Brasil",
    intro:
      "No Center 3, no coração da Paulista, a unidade oferece vista da avenida e acesso imediato ao metrô Consolação — um ponto central para quem vem de várias regiões da cidade.",
    landmarks: [
      { title: "Estação Consolação", detail: "Cerca de 1 minuto do metrô" },
      { title: "Shopping Center 3", detail: "No mesmo edifício" },
      { title: "Hospital Sírio-Libanês", detail: "Cerca de 7 minutos" },
      { title: "Hospital 9 de Julho", detail: "Cerca de 6 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_PSICOLOGIA],
    nearby: ["angelica", "brigadeiro", "itaim", "pinheiros"],
    psico: true,
  }),
  unit({
    slug: "perdizes",
    name: "Perdizes",
    city: "São Paulo",
    neighborhood: "Perdizes",
    address: "Av. Antártica, 675 — 19º e 20º andar — Perdizes, São Paulo — SP",
    mapQuery: "Avenida Antártica, 675, Perdizes, São Paulo, SP, Brasil",
    intro:
      "Em Perdizes, a unidade fica entre a PUC, o Allianz Parque e a zona oeste — um endereço alto, com boa vista e fácil ligação à Vila Madalena e à Paulista.",
    landmarks: [
      { title: "PUC-SP", detail: "A poucos minutos do campus Perdizes" },
      { title: "Allianz Parque", detail: "Cerca de 10 minutos" },
      { title: "Estação Palmeiras-Barra Funda", detail: "Acesso à linha vermelha" },
      { title: "Vila Madalena", detail: "Cerca de 15 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_PSICOLOGIA],
    nearby: ["vila-madalena", "angelica", "paulista", "pinheiros"],
    psico: true,
  }),
  unit({
    slug: "pinheiros",
    name: "Pinheiros",
    city: "São Paulo",
    neighborhood: "Pinheiros",
    address: "Av. Brig. Faria Lima, 1461 — 6º andar — Pinheiros, São Paulo — SP",
    mapQuery:
      "Avenida Brigadeiro Faria Lima, 1461, Pinheiros, São Paulo, SP, Brasil",
    intro:
      "Na Faria Lima, a unidade Pinheiros fica entre o Largo da Batata e a Vila Madalena — um eixo com metrô, ônibus e uma rede viva de ruas e serviços.",
    landmarks: [
      { title: "Estação Faria Lima", detail: "A poucos minutos da linha 4-Amarela" },
      { title: "Largo da Batata", detail: "Acesso a ônibus e metrô" },
      { title: "Vila Madalena", detail: "Cerca de 10 minutos" },
      { title: "Instituto Butantan", detail: "Cerca de 15 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_PSICOLOGIA],
    nearby: ["vila-madalena", "perdizes", "itaim", "paulista"],
    psico: true,
  }),
  unit({
    slug: "tatuape",
    name: "Tatuapé",
    city: "São Paulo",
    neighborhood: "Tatuapé",
    address: "R. Vilela, 665 — 8º andar — Tatuapé, São Paulo — SP",
    mapQuery: "Rua Vilela, 665, Tatuapé, São Paulo, SP, Brasil",
    intro:
      "Na zona leste, a unidade Tatuapé fica perto do metrô e do shopping da região — um ponto prático para quem vive ou trabalha entre o centro e a Dutra.",
    landmarks: [
      { title: "Estação Tatuapé", detail: "Metrô e trem a poucos minutos" },
      { title: "Shopping Metrô Tatuapé", detail: "A poucos minutos" },
      { title: "Parque do Povo", detail: "Área de lazer do bairro" },
      { title: "Radial Leste", detail: "Acesso rápido à via" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_PSICOLOGIA],
    nearby: ["angelica", "vila-mariana", "brigadeiro", "guarulhos"],
    psico: true,
  }),
  unit({
    slug: "vila-madalena",
    name: "Vila Madalena",
    city: "São Paulo",
    neighborhood: "Vila Madalena",
    address: "Rua Harmonia, 1323, loja 02 — Vila Madalena, São Paulo — SP",
    mapQuery: "Rua Harmonia, 1323, Vila Madalena, São Paulo, SP, Brasil",
    intro:
      "Em um dos pontos mais altos do bairro, a unidade da Vila Madalena oferece atmosfera de rua viva e fácil acesso à estação de metrô — o endereço presencial da clínica em São Paulo.",
    landmarks: [
      { title: "Estação Vila Madalena", detail: "Cerca de 4 minutos do metrô" },
      { title: "Rua Harmonia", detail: "No coração do bairro" },
      { title: "Hospital São Camilo", detail: "Cerca de 12 minutos" },
      { title: "Hospital Sancta Maggiore", detail: "Cerca de 11 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_PSICOLOGIA],
    nearby: ["perdizes", "angelica", "paulista", "pinheiros"],
    psico: true,
  }),
  unit({
    slug: "vila-mariana",
    name: "Vila Mariana",
    city: "São Paulo",
    neighborhood: "Vila Mariana",
    address:
      "R. Domingos de Morais, 2781 — 14º andar — Vila Mariana, São Paulo — SP",
    mapQuery: "Rua Domingos de Morais, 2781, Vila Mariana, São Paulo, SP, Brasil",
    intro:
      "Na Vila Mariana, a unidade fica sobre um eixo de comércio e metrô, perto do Ibirapuera e da região da UNIFESP — um endereço alto, com boa ligação à zona sul e ao centro.",
    landmarks: [
      { title: "Estação Vila Mariana", detail: "A poucos minutos da linha 1-Azul" },
      { title: "Estação Santa Cruz", detail: "Acesso à linha 5-Lilás" },
      { title: "Hospital São Paulo", detail: "Cerca de 10 minutos" },
      { title: "Parque Ibirapuera", detail: "A poucos minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO],
    nearby: ["ibirapuera", "brigadeiro", "moema", "paulista"],
  }),
  unit({
    slug: "vila-olimpia",
    name: "Vila Olímpia",
    city: "São Paulo",
    neighborhood: "Vila Olímpia",
    address: "R. Gomes de Carvalho, 1356 — 5º andar — Vila Olímpia, São Paulo — SP",
    mapQuery: "Rua Gomes de Carvalho, 1356, Vila Olímpia, São Paulo, SP, Brasil",
    intro:
      "Na Vila Olímpia, a unidade fica entre escritórios, o shopping do bairro e a Berrini — um ponto conveniente para quem encaixa o atendimento no ritmo do trabalho.",
    landmarks: [
      { title: "Shopping Vila Olímpia", detail: "A poucos minutos" },
      { title: "Berrini", detail: "Acesso rápido à avenida" },
      { title: "Parque do Povo", detail: "A poucos minutos" },
      { title: "Itaim Bibi", detail: "Cerca de 10 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_PSICOLOGIA],
    nearby: ["itaim", "market-place", "pinheiros", "moema"],
    psico: true,
  }),
  unit({
    slug: "guarulhos",
    name: "Guarulhos",
    city: "Guarulhos",
    neighborhood: "Jardim Guarulhos",
    address: "R. Abraham Lincoln, 292 — Jardim Guarulhos, Guarulhos — SP",
    mapQuery:
      "Rua Abraham Lincoln, 292, Jardim Guarulhos, Guarulhos, SP, Brasil",
    subtitle:
      "A unidade da clínica em Guarulhos — acolhimento presencial perto de casa, com a mesma escuta de sempre.",
    intro:
      "No Jardim Guarulhos, este é o endereço da clínica na cidade: um espaço próprio, com salas para o cuidado interdisciplinar e fácil acesso ao centro de Guarulhos.",
    landmarks: [
      { title: "Jardim Guarulhos", detail: "No bairro, com acesso local" },
      { title: "Centro de Guarulhos", detail: "A poucos minutos" },
      { title: "Rodovia Presidente Dutra", detail: "Ligação rápida a São Paulo" },
      { title: "Shopping Maia", detail: "Cerca de 15 minutos" },
    ],
    spaces: [SPACE_ATENDIMENTO, SPACE_PSICOLOGIA],
    nearby: ["tatuape", "angelica", "vila-madalena", "paulista"],
    extraStructure: [
      {
        id: "consultorio",
        label: "Consultório",
        description:
          "Sala de atendimento com poltronas para o encontro presencial — um espaço reservado para escuta, avaliação e acompanhamento.",
        image: "/unidades/guarulhos/consultorio.jpg",
        imageAlt:
          "Consultório da unidade Guarulhos, com poltronas e mesa de atendimento",
        highlights: [
          "Poltronas para o atendimento presencial",
          "Ambiente reservado e climatizado",
          "Estrutura para o cuidado interdisciplinar",
        ],
      },
      {
        id: "consultorio-2",
        label: "Sala clínica",
        description:
          "O mesmo consultório em outro ângulo: mesa de trabalho, climatização e o espaço necessário para o atendimento do dia a dia.",
        image: "/unidades/guarulhos/consultorio-2.jpg",
        imageAlt:
          "Sala clínica da unidade Guarulhos, com mesa de atendimento e poltrona",
        imageFit: "contain",
        highlights: [
          "Mesa de trabalho para avaliação e registros",
          "Ambiente climatizado",
          "Privacidade para a sessão",
        ],
      },
    ],
  }),
];

export const unidadesIndex = {
  meta: {
    title: "Unidades | SelfEvolution",
    description:
      "Encontre uma unidade da SelfEvolution em São Paulo e Guarulhos. Atendimento presencial com acolhimento, e online para todo o Brasil.",
  },
  eyebrow: "Unidades",
  title: "Encontre uma unidade",
  subtitle:
    "Presencial em São Paulo e Guarulhos. Online para todo o Brasil. Escolha o endereço mais próximo e fale com a equipe pelo WhatsApp.",
};

export const unidadeCities: UnidadeCity[] = ["São Paulo", "Guarulhos"];

const bySlug = new Map(unidades.map((item) => [item.slug, item]));

export function getUnidade(slug: string | undefined): Unidade | undefined {
  if (!slug) return undefined;
  return bySlug.get(slug);
}

export function unidadesByCity(city: UnidadeCity): Unidade[] {
  return unidades.filter((item) => item.city === city);
}

export function getNearbyUnidades(unit: Unidade): Unidade[] {
  return unit.nearby
    .map((slug) => bySlug.get(slug))
    .filter((item): item is Unidade => Boolean(item));
}

export function unidadeWhatsappHref(name: string) {
  const text = encodeURIComponent(
    `Olá! Gostaria de agendar um atendimento na unidade ${name}.`
  );
  return `${WHATSAPP_URL}?text=${text}`;
}

export function unidadePath(slug: string) {
  return `/unidades/${slug}`;
}

export function unidadePageTitle(unit: Unidade) {
  return `Unidade ${unit.name} | SelfEvolution`;
}

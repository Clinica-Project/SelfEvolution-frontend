/* ---------------------------------- tipos --------------------------------- */

export type InstitucionalIconName =
  | "brain"
  | "activity"
  | "puzzle"
  | "graduation-cap"
  | "blocks"
  | "audio-lines"
  | "salad"
  | "baby"
  | "school"
  | "user-round"
  | "hand-heart"
  | "home"
  | "heart-handshake"
  | "lightbulb"
  | "compass"
  | "users"
  | "shield-check"
  | "monitor-smartphone"
  | "calendar-check"
  | "lock";

export type Passo = {
  titulo: string;
  descricao: string;
  image?: string;
  imageAlt?: string;
};

export type Valor = {
  titulo: string;
  descricao: string;
  icon: InstitucionalIconName;
  accent: string;
};

export type Publico = {
  titulo: string;
  descricao: string;
  icon: InstitucionalIconName;
  image?: string;
  imageAlt?: string;
};

export type ServicoDetalhado = {
  titulo: string;
  slug: string;
  descricao: string;
  paraQuem: string;
  oQueEsperar: string;
  formatos: string[];
  icon: InstitucionalIconName;
  /** Índices de especialidades que conversam com esta no diagrama. */
  relacionados: number[];
  image?: string;
  imageAlt?: string;
};

export type DiferencialDetalhado = {
  titulo: string;
  descricao: string;
  beneficio: string;
  icon: InstitucionalIconName;
  accent: string;
};

export type Hero = {
  eyebrow: string;
  titulo: string;
  subtitulo: string;
};

export type Cta = {
  titulo: string;
  descricao: string;
  label: string;
  href: string;
  secondaryLabel: string;
  secondaryHref: string;
  image?: string;
  imageAlt?: string;
};

const ctaPadrao: Cta = {
  titulo: "Pronto para dar o próximo passo?",
  descricao:
    "Fale com a nossa equipe para entender qual caminho de cuidado faz sentido para você ou para quem você ama. Profissionais da clínica acessam o sistema por aqui.",
  label: "Acessar sistema",
  href: "/login",
  secondaryLabel: "Falar com a clínica",
  secondaryHref: "mailto:contato@selfevolution.com.br",
};

/* ---------------------------------- sobre --------------------------------- */

export const sobreContent = {
  meta: {
    title: "Sobre a Self Evolution — clínica interdisciplinar",
    description:
      "Clínica interdisciplinar em Guarulhos e São Paulo, com atendimento online em todo o Brasil. Psicologia, ABA, neuropsicologia e integração da saúde física e mental.",
  },
  hero: {
    eyebrow: "clínica interdisciplinar",
    titulo: "Cuidado humanizado e inclusivo",
    tituloLinhas: ["Cuidado", "humanizado", "e inclusivo"],
    subtitulo:
      "Nossa clínica multidisciplinar promove a integração da saúde física e mental, oferecendo um cuidado abrangente, humanizado e personalizado para o bem-estar completo de cada paciente.",
  } satisfies Hero & { tituloLinhas: [string, string, string] },
  abertura: {
    image: "/hero/19-espaco.jpg",
    imageAlt: "Sala da clínica com poltronas, luz da janela e um espaço em silêncio",
  },
  historia: {
    eyebrow: "sobre nós",
    titulo: "Olhar para a pessoa como um todo",
    tituloLinhas: ["Olhar para", "a pessoa", "como um todo"],
    paragrafos: [
      "Cuidado em saúde não é sobre atender uma queixa isolada. É sobre olhar para a pessoa como um todo.",
      "Somos uma clínica multidisciplinar dedicada à integração da saúde física e mental, com foco em um cuidado humanizado, acolhedor e inclusivo. Reunimos psicologia, neuropsicologia, psicopedagogia, ABA, fonoaudiologia, nutrição, psiquiatria, medicina da família e terapias integrativas — da infância ao envelhecimento.",
      "Atendemos presencialmente em Guarulhos e em São Paulo, com consultórios de fácil acesso, e online para todo o Brasil. Também acompanhamos empresas que buscam saúde mental, inclusão e bem-estar no trabalho.",
    ],
    fotos: [
      {
        src: "/hero/01-escuta.jpg",
        alt: "Sessão de escuta com caderno e luz natural",
      },
      {
        src: "/hero/02-equipe.jpg",
        alt: "Equipe interdisciplinar reunida em consulta na clínica",
      },
      {
        src: "/hero/17-acompanhar.jpg",
        alt: "Família acompanhada no corredor da clínica",
      },
    ],
  },
  missaoVisao: [
    {
      titulo: "Missão",
      descricao:
        "Promover saúde e bem-estar de forma integrada, humanizada e inclusiva, oferecendo cuidado multidisciplinar para indivíduos e empresas, com foco na saúde física, emocional e comportamental.",
    },
    {
      titulo: "Visão",
      descricao:
        "Humanização, acolhimento, escuta ativa, inclusão, respeito à diversidade, ética e compromisso com o bem-estar integral de pessoas e empresas.",
    },
  ],
  paraQuem: {
    eyebrow: "para quem é",
    titulo: "Cuidado em todas as fases da vida",
    descricao:
      "Acompanhamento interdisciplinar, humano e personalizado — da infância ao envelhecimento, e também no ambiente de trabalho.",
    publicos: [
      {
        titulo: "Crianças",
        descricao:
          "Desenvolvimento, comportamento, linguagem e aprendizagem, com a família por perto.",
        icon: "baby",
        image: "/hero/03-infancia.jpg",
        imageAlt: "Acompanhamento infantil com blocos de madeira",
      },
      {
        titulo: "Adolescentes",
        descricao:
          "Espaço para ser compreendido: menos julgamento, mais diálogo, escuta e cuidado emocional.",
        icon: "school",
        image: "/hero/04-online.jpg",
        imageAlt: "Atendimento em um escritório calmo, com luz baixa",
      },
      {
        titulo: "Adultos",
        descricao:
          "Saúde emocional, relações e equilíbrio no dia a dia — presencial ou online, em todo o Brasil.",
        icon: "user-round",
        image: "/hero/07-psicologia.jpg",
        imageAlt: "Espaço de psicologia com poltrona e luz natural",
      },
      {
        titulo: "Idosos",
        descricao:
          "Avaliação neuropsicológica, estimulação cognitiva e, quando faz sentido, atendimento domiciliar.",
        icon: "hand-heart",
        image: "/hero/08-neuro.jpg",
        imageAlt: "Sala de avaliação neuropsicológica",
      },
      {
        titulo: "Empresas",
        descricao:
          "Bem-estar corporativo, inclusão e saúde mental no trabalho — espaços mais conscientes e acessíveis.",
        icon: "users",
        image: "/hero/02-equipe.jpg",
        imageAlt: "Equipe reunida em um espaço de trabalho da clínica",
      },
    ] satisfies Publico[],
  },
  jornada: {
    eyebrow: "como funciona",
    titulo: "Saúde mental integrativa",
    descricao:
      "Unimos diferentes áreas da saúde para compreender cada indivíduo de forma ampla, com equilíbrio emocional, físico e comportamental.",
    passos: [
      {
        titulo: "Escuta ativa",
        descricao:
          "Valorizamos a escuta ativa, o respeito às individualidades e a construção de um espaço seguro, acolhedor e inclusivo para cada pessoa.",
        image: "/hero/01-escuta.jpg",
        imageAlt: "Sessão de escuta com caderno e luz natural",
      },
      {
        titulo: "Cuidado integral",
        descricao:
          "Unimos psicologia, neuropsicologia, ABA, fonoaudiologia, nutrição e outras especialidades para olhar a pessoa como um todo.",
        image: "/hero/02-equipe.jpg",
        imageAlt: "Equipe interdisciplinar reunida para construir o plano",
      },
      {
        titulo: "Plano personalizado",
        descricao:
          "Cada plano de cuidado respeita história, rotina e necessidades individuais — para pessoas e também para empresas.",
        image: "/hero/16-chegar.jpg",
        imageAlt: "Entrada da clínica, o primeiro passo de quem chega",
      },
      {
        titulo: "Acompanhamento contínuo",
        descricao:
          "Trabalhamos o cuidado contínuo da saúde mental, incentivando hábitos saudáveis, equilíbrio emocional e desenvolvimento pessoal no dia a dia.",
        image: "/hero/18-evoluir.jpg",
        imageAlt: "Corredor da clínica, o cuidado que segue no tempo",
      },
    ] satisfies Passo[],
  },
  valores: {
    eyebrow: "nossos valores",
    titulo: "O que guia cada atendimento",
    valores: [
      {
        titulo: "Humanização",
        descricao:
          "Cuidado humanizado, acolhedor e inclusivo — com atenção especial à diversidade e às necessidades de cada pessoa.",
        icon: "heart-handshake",
        accent: "text-brand-accent-coral bg-brand-accent-coral/10",
      },
      {
        titulo: "Acolhimento",
        descricao:
          "Um espaço seguro para histórias, identidades e contextos individuais, da clínica ao ambiente de trabalho.",
        icon: "hand-heart",
        accent: "text-brand-secondary bg-brand-secondary/10",
      },
      {
        titulo: "Escuta ativa",
        descricao:
          "Menos julgamento, mais curiosidade. Escuta que respeita o tempo, os limites e a singularidade de cada um.",
        icon: "compass",
        accent: "text-brand-accent-teal bg-brand-accent-teal/15",
      },
      {
        titulo: "Inclusão",
        descricao:
          "Cuidado respeitoso para pessoas LGBTQIAPN+, questões de gênero e raça, e acolhimento de pessoas com deficiência.",
        icon: "users",
        accent: "text-brand-primary bg-brand-primary/10",
      },
      {
        titulo: "Ética",
        descricao:
          "Compromisso com o bem-estar integral de pessoas e empresas, com respeito à diversidade em cada atendimento.",
        icon: "shield-check",
        accent: "text-brand-primary bg-brand-primary/10",
      },
    ] satisfies Valor[],
  },
  contato: {
    instagram: "https://www.instagram.com/selfevolution_clinica/",
    instagramHandle: "@selfevolution_clinica",
    whatsapp: "https://wa.me/5511976854141",
    whatsappLabel: "(11) 97685-4141",
    whatsappAlt: "(11) 96012-2082",
    unidades: [
      "São Paulo — Rua Harmonia, 1323, loja 02, Vila Madalena",
      "Guarulhos — R. Abraham Lincoln, 292, Jardim Guarulhos",
    ],
  },
  cta: {
    ...ctaPadrao,
    titulo: "Vamos conversar?",
    descricao:
      "Presencial em Guarulhos e São Paulo, online para todo o Brasil. Fale com a equipe pelo WhatsApp.",
    label: "WhatsApp da clínica",
    href: "https://wa.me/5511976854141",
    secondaryLabel: "@selfevolution_clinica",
    secondaryHref: "https://www.instagram.com/selfevolution_clinica/",
    image: "/hero/13-cta.jpg",
    imageAlt: "Canto da clínica com poltrona, lamparina e luz baixa",
  } satisfies Cta,
};

/* --------------------------------- serviços -------------------------------- */

export const servicosContent = {
  meta: {
    title: "Serviços — psicologia, neuropsicologia, ABA, fono e mais | SelfEvolution",
    description:
      "Especialidades integradas na SelfEvolution: psicologia, avaliação neuropsicológica, reabilitação cognitiva, psicopedagogia, terapia ABA, fonoaudiologia e nutrição — online e presencial.",
  },
  hero: {
    eyebrow: "nossos serviços",
    titulo: "Especialidades que trabalham juntas",
    tituloLinhas: ["Especialidades", "que trabalham", "juntas"],
    subtitulo:
      "Mente, comportamento, aprendizagem, comunicação e alimentação — cuidadas por uma equipe que conversa entre si e constrói um plano único para cada pessoa.",
  } satisfies Hero & { tituloLinhas: [string, string, string] },
  intro: {
    eyebrow: "cuidado integrado",
    titulo: "Um plano, várias especialidades",
    descricao:
      "Você não precisa montar o quebra-cabeça sozinho. Depois da escuta inicial, a nossa equipe indica quais serviços fazem sentido — e eles se comunicam ao longo de todo o acompanhamento.",
  },
  servicos: [
    {
      titulo: "Psicologia",
      slug: "psicologia",
      descricao:
        "Acompanhamento emocional e comportamental com escuta ativa e plano terapêutico individualizado. O processo respeita o ritmo de cada pessoa e usa abordagens baseadas em evidências.",
      paraQuem:
        "Crianças, adolescentes, adultos e idosos que buscam apoio emocional, manejo de ansiedade, autoconhecimento ou acompanhamento em fases de mudança.",
      oQueEsperar:
        "Sessões regulares com objetivos combinados, devolutivas claras e revisão periódica do plano terapêutico.",
      formatos: ["Online", "Presencial"],
      icon: "brain",
      relacionados: [1, 3, 4, 5],
      image: "/hero/07-psicologia.jpg",
      imageAlt: "Sala de psicologia com poltrona e luz natural",
    },
    {
      titulo: "Avaliação neuropsicológica",
      slug: "neuropsicologia",
      descricao:
        "Investigação aprofundada de atenção, memória, linguagem e outras funções cognitivas, com instrumentos padronizados e olhar clínico criterioso.",
      paraQuem:
        "Quem precisa entender dificuldades de atenção, memória ou aprendizagem — por indicação médica, escolar ou busca própria da família.",
      oQueEsperar:
        "Sessões de avaliação, análise dos resultados e devolutiva acolhedora com relatório e orientações práticas.",
      formatos: ["Presencial"],
      icon: "activity",
      relacionados: [0, 2, 3],
      image: "/hero/08-neuro.jpg",
      imageAlt: "Espaço de avaliação neuropsicológica",
    },
    {
      titulo: "Reabilitação cognitiva",
      slug: "reabilitacao",
      descricao:
        "Estimulação de funções como atenção, memória e planejamento por meio de um programa estruturado e individualizado, acompanhado de perto pela equipe.",
      paraQuem:
        "Pessoas com queixas cognitivas após avaliação, em quadros de desenvolvimento, envelhecimento ou reabilitação.",
      oQueEsperar:
        "Plano de estímulo com metas definidas, exercícios progressivos e acompanhamento da evolução ao longo do tempo.",
      formatos: ["Online", "Presencial"],
      icon: "puzzle",
      relacionados: [0, 1],
      image: "/hero/09-reabilitacao.jpg",
      imageAlt: "Atividade de reabilitação cognitiva",
    },
    {
      titulo: "Psicopedagogia",
      slug: "psicopedagogia",
      descricao:
        "Apoio ao processo de aprendizagem, identificando como cada pessoa aprende melhor e construindo estratégias junto com a família e a escola.",
      paraQuem:
        "Crianças e adolescentes com dificuldades escolares, e adultos que desejam reorganizar seus processos de aprendizagem.",
      oQueEsperar:
        "Avaliação psicopedagógica, plano de intervenção e comunicação próxima com a escola quando fizer sentido.",
      formatos: ["Online", "Presencial"],
      icon: "graduation-cap",
      relacionados: [0, 1, 4, 5],
      image: "/hero/10-psicopedagogia.jpg",
      imageAlt: "Acompanhamento psicopedagógico",
    },
    {
      titulo: "Terapia ABA",
      slug: "aba",
      descricao:
        "Intervenção baseada em análise do comportamento aplicada, voltada ao desenvolvimento de habilidades de comunicação, socialização e autonomia no dia a dia.",
      paraQuem:
        "Principalmente crianças e adolescentes no espectro autista ou com outras necessidades de desenvolvimento.",
      oQueEsperar:
        "Programa individualizado com metas mensuráveis, registro de evolução e orientação contínua à família.",
      formatos: ["Presencial"],
      icon: "blocks",
      relacionados: [0, 3, 5, 6],
      image: "/hero/11-aba.jpg",
      imageAlt: "Sessão de terapia ABA",
    },
    {
      titulo: "Fonoaudiologia",
      slug: "fonoaudiologia",
      descricao:
        "Cuidado com comunicação, linguagem, fala, voz e deglutição em todas as idades — da primeira infância ao envelhecimento.",
      paraQuem:
        "Crianças com atrasos de fala ou linguagem, adultos com demandas de voz e pessoas com dificuldades de deglutição.",
      oQueEsperar:
        "Avaliação fonoaudiológica, plano terapêutico específico e exercícios práticos para casa.",
      formatos: ["Online", "Presencial"],
      icon: "audio-lines",
      relacionados: [0, 3, 4],
      image: "/hero/14-fono.jpg",
      imageAlt: "Atendimento de fonoaudiologia",
    },
    {
      titulo: "Nutrição",
      slug: "nutricao",
      descricao:
        "Orientação alimentar integrada ao cuidado da clínica, respeitando a relação de cada pessoa com a comida e a rotina da família.",
      paraQuem:
        "Quem busca reorganizar a alimentação — incluindo seletividade alimentar infantil e demandas ligadas a outras terapias em andamento.",
      oQueEsperar:
        "Avaliação nutricional, plano alimentar realista e acompanhamento alinhado com as demais especialidades.",
      formatos: ["Online", "Presencial"],
      icon: "salad",
      relacionados: [0, 4],
      image: "/hero/15-nutricao.jpg",
      imageAlt: "Consulta de nutrição",
    },
  ] satisfies ServicoDetalhado[],
  cta: {
    ...ctaPadrao,
    titulo: "Não sabe por onde começar?",
    descricao:
      "Não tem problema — é para isso que estamos aqui. Fale com a nossa equipe e vamos indicar juntos a melhor porta de entrada para o seu cuidado.",
    label: "WhatsApp da clínica",
    href: "https://wa.me/5511976854141",
    secondaryLabel: "Acessar sistema",
    secondaryHref: "/login",
  } satisfies Cta,
};

/* ------------------------------- diferenciais ------------------------------ */

export const diferenciaisContent = {
  meta: {
    title: "Diferenciais — por que escolher a SelfEvolution",
    description:
      "Equipe interdisciplinar que discute os casos em conjunto, atendimento online e presencial, profissionais registrados, agilidade no primeiro contato e privacidade em cada etapa do cuidado.",
  },
  hero: {
    eyebrow: "por que selfevolution",
    titulo: "Um jeito diferente de cuidar",
    subtitulo:
      "Estrutura clínica com olhar humano: especialidades que conversam entre si, caminhos claros e acolhimento do primeiro contato ao acompanhamento contínuo.",
  } satisfies Hero,
  diferenciais: [
    {
      titulo: "Interdisciplinaridade de verdade",
      descricao:
        "Nossos profissionais discutem os casos em conjunto e constroem um plano de cuidado compartilhado — não são consultórios isolados dentro do mesmo endereço.",
      beneficio:
        "Você não precisa repetir sua história para cada especialista nem coordenar as terapias por conta própria.",
      icon: "users",
      accent: "text-brand-primary bg-brand-primary/10",
    },
    {
      titulo: "Online e presencial",
      descricao:
        "Atendimento nos dois formatos, com a mesma qualidade clínica e critérios claros sobre o que funciona melhor em cada caso.",
      beneficio:
        "Flexibilidade para encaixar o cuidado na sua rotina, sem abrir mão do vínculo com a equipe.",
      icon: "monitor-smartphone",
      accent: "text-brand-secondary bg-brand-secondary/10",
    },
    {
      titulo: "Todas as fases da vida",
      descricao:
        "Da primeira infância ao envelhecimento, a equipe acompanha cada etapa com a especialidade e a linguagem adequadas.",
      beneficio:
        "Uma família inteira pode ser cuidada no mesmo lugar, por profissionais que se comunicam entre si.",
      icon: "heart-handshake",
      accent: "text-brand-accent-teal bg-brand-accent-teal/15",
    },
    {
      titulo: "Profissionais registrados",
      descricao:
        "Todos os profissionais possuem registro ativo em seus conselhos e atuam com métodos baseados em evidências.",
      beneficio:
        "Segurança de saber quem cuida de você — com ética, técnica e transparência.",
      icon: "shield-check",
      accent: "text-brand-primary bg-brand-primary/10",
    },
    {
      titulo: "Primeiro contato sem burocracia",
      descricao:
        "Do primeiro contato à primeira sessão, o caminho é direto: você fala com a equipe, entende as opções e já sai com os próximos passos definidos.",
      beneficio:
        "Menos espera e menos incerteza justamente no momento em que buscar ajuda já exige coragem.",
      icon: "calendar-check",
      accent: "text-brand-secondary bg-brand-secondary/10",
    },
    {
      titulo: "Privacidade e acolhimento",
      descricao:
        "Sigilo profissional em todas as etapas e um ambiente pensado para que cada pessoa se sinta segura para falar de si.",
      beneficio:
        "Sua história é tratada com o respeito e a confidencialidade que ela merece.",
      icon: "lock",
      accent: "text-brand-accent-teal bg-brand-accent-teal/15",
    },
  ] satisfies DiferencialDetalhado[],
  jornada: {
    eyebrow: "como é na prática",
    titulo: "A jornada de quem chega até nós",
    descricao:
      "Diferencial bom é o que aparece no dia a dia. É assim que o cuidado acontece na SelfEvolution.",
    passos: [
      {
        titulo: "Você entra em contato",
        descricao:
          "Por e-mail ou WhatsApp, conta brevemente o que está buscando — sem formulários intermináveis.",
      },
      {
        titulo: "Escuta inicial",
        descricao:
          "Um profissional acolhe a sua demanda, entende o contexto e esclarece formatos, especialidades e expectativas.",
      },
      {
        titulo: "Plano compartilhado",
        descricao:
          "A equipe discute o caso em conjunto e apresenta um plano de cuidado claro, com as especialidades indicadas.",
      },
      {
        titulo: "Evolução acompanhada",
        descricao:
          "O progresso é registrado e revisado periodicamente — e você participa das decisões em cada etapa.",
      },
    ] satisfies Passo[],
  },
  cta: {
    ...ctaPadrao,
    titulo: "Venha conhecer esse jeito de cuidar",
    descricao:
      "Fale com a nossa equipe e experimente um cuidado que enxerga você por inteiro — do primeiro contato ao acompanhamento contínuo.",
  } satisfies Cta,
};

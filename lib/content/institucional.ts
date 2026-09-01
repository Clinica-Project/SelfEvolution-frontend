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
  descricao: string;
  paraQuem: string;
  oQueEsperar: string;
  formatos: string[];
  icon: InstitucionalIconName;
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
    title: "Sobre a SelfEvolution — clínica interdisciplinar de desenvolvimento humano",
    description:
      "Conheça a história, a missão e o jeito de cuidar da SelfEvolution: uma clínica interdisciplinar que une psicologia, neuropsicologia, psicopedagogia, ABA, fonoaudiologia e nutrição em um só lugar.",
  },
  hero: {
    eyebrow: "sobre a selfevolution",
    titulo: "Cuidar é um processo compartilhado",
    subtitulo:
      "Somos uma clínica interdisciplinar dedicada a acompanhar pessoas e famílias em todas as fases da vida — com escuta, ciência e presença em cada etapa.",
  } satisfies Hero,
  abertura: {
    image: "/hero/19-espaco.jpg",
    imageAlt: "Sala da clínica com poltronas, luz da janela e um espaço em silêncio",
  },
  historia: {
    eyebrow: "por que existimos",
    titulo: "Uma clínica que conversa entre si",
    paragrafos: [
      "Quem busca cuidado para si ou para a família costuma encontrar um caminho fragmentado: cada especialidade em um lugar, profissionais que não se falam e informações que se perdem entre consultas.",
      "A SelfEvolution nasceu para mudar isso. Reunimos psicologia, avaliação neuropsicológica, reabilitação cognitiva, psicopedagogia, terapia ABA, fonoaudiologia e nutrição em uma mesma equipe — que discute os casos em conjunto e constrói um plano de cuidado único para cada pessoa.",
      "Acreditamos que evoluir é um processo compartilhado: entre especialidades, entre profissional e paciente, e entre a clínica e a família.",
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
        "Oferecer cuidado interdisciplinar acessível e humanizado, unindo rigor clínico e acolhimento em cada etapa do desenvolvimento.",
    },
    {
      titulo: "Visão",
      descricao:
        "Ser referência em acompanhamento integrado — um espaço em que pacientes, famílias e profissionais evoluem juntos, com clareza e confiança.",
    },
  ],
  paraQuem: {
    eyebrow: "para quem é",
    titulo: "Cuidado em todas as fases da vida",
    descricao:
      "Cada fase traz suas próprias perguntas. Nossa equipe acompanha cada uma delas com a especialidade certa.",
    publicos: [
      {
        titulo: "Crianças",
        descricao:
          "Desenvolvimento, comportamento, linguagem e aprendizagem — com orientação próxima à família.",
        icon: "baby",
        image: "/hero/03-infancia.jpg",
        imageAlt: "Acompanhamento infantil com blocos de madeira",
      },
      {
        titulo: "Adolescentes",
        descricao:
          "Emoções, identidade, vida escolar e social em uma fase de muitas transformações.",
        icon: "school",
        image: "/hero/04-online.jpg",
        imageAlt: "Atendimento em um escritório calmo, com luz baixa",
      },
      {
        titulo: "Adultos",
        descricao:
          "Saúde emocional, relações, trabalho e qualidade de vida no dia a dia.",
        icon: "user-round",
        image: "/hero/07-psicologia.jpg",
        imageAlt: "Espaço de psicologia com poltrona e luz natural",
      },
      {
        titulo: "Idosos",
        descricao:
          "Memória, autonomia e bem-estar, com avaliação e estimulação cognitiva.",
        icon: "hand-heart",
        image: "/hero/08-neuro.jpg",
        imageAlt: "Sala de avaliação neuropsicológica",
      },
      {
        titulo: "Famílias",
        descricao:
          "Orientação para quem acompanha de perto — porque cuidar de quem cuida também importa.",
        icon: "home",
        image: "/hero/17-acompanhar.jpg",
        imageAlt: "Família acompanhada no corredor da clínica",
      },
    ] satisfies Publico[],
  },
  jornada: {
    eyebrow: "como funciona",
    titulo: "Do primeiro contato ao acompanhamento",
    descricao:
      "Um caminho claro, sem burocracia desnecessária — você sabe o que esperar em cada etapa.",
    passos: [
      {
        titulo: "Primeiro contato",
        descricao:
          "Você fala com a nossa equipe, conta o que está buscando e tira dúvidas sobre formatos e especialidades.",
        image: "/hero/16-chegar.jpg",
        imageAlt: "Entrada da clínica, o primeiro passo de quem chega",
      },
      {
        titulo: "Acolhimento e avaliação",
        descricao:
          "Um profissional realiza a escuta inicial e, quando indicado, avaliações específicas para entender o quadro como um todo.",
        image: "/hero/01-escuta.jpg",
        imageAlt: "Sessão de escuta com caderno e luz natural",
      },
      {
        titulo: "Plano de cuidado",
        descricao:
          "A equipe define em conjunto as especialidades e a frequência indicadas — e explica tudo em linguagem clara.",
        image: "/hero/02-equipe.jpg",
        imageAlt: "Equipe interdisciplinar reunida para construir o plano",
      },
      {
        titulo: "Acompanhamento contínuo",
        descricao:
          "O plano é revisitado ao longo do tempo, com evolução registrada e comunicação constante com você e sua família.",
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
        titulo: "Acolhimento",
        descricao:
          "Cada história é recebida sem julgamento, com escuta ativa e respeito ao tempo de cada pessoa.",
        icon: "heart-handshake",
        accent: "text-brand-accent-coral bg-brand-accent-coral/10",
      },
      {
        titulo: "Ciência",
        descricao:
          "Prática baseada em evidências, com avaliação criteriosa e métodos reconhecidos em cada especialidade.",
        icon: "lightbulb",
        accent: "text-brand-secondary bg-brand-secondary/10",
      },
      {
        titulo: "Clareza",
        descricao:
          "Linguagem simples, devolutivas compreensíveis e combinados transparentes — sem jargão desnecessário.",
        icon: "compass",
        accent: "text-brand-accent-teal bg-brand-accent-teal/15",
      },
      {
        titulo: "Colaboração",
        descricao:
          "Especialidades que conversam entre si e incluem a família como parte ativa do cuidado.",
        icon: "users",
        accent: "text-brand-primary bg-brand-primary/10",
      },
      {
        titulo: "Ética",
        descricao:
          "Equipe registrada nos conselhos profissionais, com sigilo e responsabilidade em cada decisão.",
        icon: "shield-check",
        accent: "text-brand-primary bg-brand-primary/10",
      },
    ] satisfies Valor[],
  },
  cta: {
    ...ctaPadrao,
    titulo: "Vamos conversar?",
    descricao:
      "Conte para a nossa equipe o que você está buscando. Vamos indicar o melhor caminho de cuidado para você ou para a sua família.",
    label: "Fale com a clínica",
    href: "mailto:contato@selfevolution.com.br",
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
    subtitulo:
      "Mente, comportamento, aprendizagem, comunicação e alimentação — cuidadas por uma equipe que conversa entre si e constrói um plano único para cada pessoa.",
  } satisfies Hero,
  intro: {
    eyebrow: "cuidado integrado",
    titulo: "Um plano, várias especialidades",
    descricao:
      "Você não precisa montar o quebra-cabeça sozinho. Depois da escuta inicial, a nossa equipe indica quais serviços fazem sentido — e eles se comunicam ao longo de todo o acompanhamento.",
  },
  servicos: [
    {
      titulo: "Psicologia",
      descricao:
        "Acompanhamento emocional e comportamental com escuta ativa e plano terapêutico individualizado. O processo respeita o ritmo de cada pessoa e usa abordagens baseadas em evidências.",
      paraQuem:
        "Crianças, adolescentes, adultos e idosos que buscam apoio emocional, manejo de ansiedade, autoconhecimento ou acompanhamento em fases de mudança.",
      oQueEsperar:
        "Sessões regulares com objetivos combinados, devolutivas claras e revisão periódica do plano terapêutico.",
      formatos: ["Online", "Presencial"],
      icon: "brain",
    },
    {
      titulo: "Avaliação neuropsicológica",
      descricao:
        "Investigação aprofundada de atenção, memória, linguagem e outras funções cognitivas, com instrumentos padronizados e olhar clínico criterioso.",
      paraQuem:
        "Quem precisa entender dificuldades de atenção, memória ou aprendizagem — por indicação médica, escolar ou busca própria da família.",
      oQueEsperar:
        "Sessões de avaliação, análise dos resultados e devolutiva acolhedora com relatório e orientações práticas.",
      formatos: ["Presencial"],
      icon: "activity",
    },
    {
      titulo: "Reabilitação cognitiva",
      descricao:
        "Estimulação de funções como atenção, memória e planejamento por meio de um programa estruturado e individualizado, acompanhado de perto pela equipe.",
      paraQuem:
        "Pessoas com queixas cognitivas após avaliação, em quadros de desenvolvimento, envelhecimento ou reabilitação.",
      oQueEsperar:
        "Plano de estímulo com metas definidas, exercícios progressivos e acompanhamento da evolução ao longo do tempo.",
      formatos: ["Online", "Presencial"],
      icon: "puzzle",
    },
    {
      titulo: "Psicopedagogia",
      descricao:
        "Apoio ao processo de aprendizagem, identificando como cada pessoa aprende melhor e construindo estratégias junto com a família e a escola.",
      paraQuem:
        "Crianças e adolescentes com dificuldades escolares, e adultos que desejam reorganizar seus processos de aprendizagem.",
      oQueEsperar:
        "Avaliação psicopedagógica, plano de intervenção e comunicação próxima com a escola quando fizer sentido.",
      formatos: ["Online", "Presencial"],
      icon: "graduation-cap",
    },
    {
      titulo: "Terapia ABA",
      descricao:
        "Intervenção baseada em análise do comportamento aplicada, voltada ao desenvolvimento de habilidades de comunicação, socialização e autonomia no dia a dia.",
      paraQuem:
        "Principalmente crianças e adolescentes no espectro autista ou com outras necessidades de desenvolvimento.",
      oQueEsperar:
        "Programa individualizado com metas mensuráveis, registro de evolução e orientação contínua à família.",
      formatos: ["Presencial"],
      icon: "blocks",
    },
    {
      titulo: "Fonoaudiologia",
      descricao:
        "Cuidado com comunicação, linguagem, fala, voz e deglutição em todas as idades — da primeira infância ao envelhecimento.",
      paraQuem:
        "Crianças com atrasos de fala ou linguagem, adultos com demandas de voz e pessoas com dificuldades de deglutição.",
      oQueEsperar:
        "Avaliação fonoaudiológica, plano terapêutico específico e exercícios práticos para casa.",
      formatos: ["Online", "Presencial"],
      icon: "audio-lines",
    },
    {
      titulo: "Nutrição",
      descricao:
        "Orientação alimentar integrada ao cuidado da clínica, respeitando a relação de cada pessoa com a comida e a rotina da família.",
      paraQuem:
        "Quem busca reorganizar a alimentação — incluindo seletividade alimentar infantil e demandas ligadas a outras terapias em andamento.",
      oQueEsperar:
        "Avaliação nutricional, plano alimentar realista e acompanhamento alinhado com as demais especialidades.",
      formatos: ["Online", "Presencial"],
      icon: "salad",
    },
  ] satisfies ServicoDetalhado[],
  cta: {
    ...ctaPadrao,
    titulo: "Não sabe por onde começar?",
    descricao:
      "Não tem problema — é para isso que estamos aqui. Fale com a nossa equipe e vamos indicar juntos a melhor porta de entrada para o seu cuidado.",
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

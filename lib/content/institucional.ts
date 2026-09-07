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
    "Fale com a nossa equipe para entender qual caminho de cuidado faz sentido para você ou para quem você ama.",
  label: "WhatsApp da clínica",
  href: "https://wa.me/5511976854141",
  secondaryLabel: "Falar com a clínica",
  secondaryHref: "mailto:silvana.selfevolution@gmail.com",
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
    image: "/hero/sobre-abertura.jpg",
    imageAlt: "Sala de espera da clínica com banco de madeira, luz natural e um espaço em silêncio",
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
        src: "/hero/sobre-historia-consulta.jpg",
        alt: "Consulta à mesa, com caderno e luz natural",
      },
      {
        src: "/hero/sobre-historia.jpg",
        alt: "Equipe interdisciplinar reunida em volta da mesa",
      },
      {
        src: "/hero/sobre-historia-familia.jpg",
        alt: "Adulto e criança caminhando pelo corredor da clínica",
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
        image: "/hero/sobre-criancas.jpg",
        imageAlt: "Criança brincando com brinquedos de madeira, acompanhada pela terapeuta",
      },
      {
        titulo: "Adolescentes",
        descricao:
          "Espaço para ser compreendido: menos julgamento, mais diálogo, escuta e cuidado emocional.",
        icon: "school",
        image: "/hero/sobre-adolescentes.jpg",
        imageAlt: "Adolescente em conversa de escuta na clínica",
      },
      {
        titulo: "Adultos",
        descricao:
          "Saúde emocional, relações e equilíbrio no dia a dia — presencial ou online, em todo o Brasil.",
        icon: "user-round",
        image: "/hero/sobre-adultos.jpg",
        imageAlt: "Sessão de psicologia entre dois adultos, com poltronas e luz natural",
      },
      {
        titulo: "Idosos",
        descricao:
          "Avaliação neuropsicológica, estimulação cognitiva e, quando faz sentido, atendimento domiciliar.",
        icon: "hand-heart",
        image: "/hero/sobre-idosos.jpg",
        imageAlt: "Pessoa idosa em avaliação, escrevendo à mesa com luz natural",
      },
      {
        titulo: "Empresas",
        descricao:
          "Bem-estar corporativo, inclusão e saúde mental no trabalho — espaços mais conscientes e acessíveis.",
        icon: "users",
        image: "/hero/sobre-empresas.jpg",
        imageAlt: "Grupo em círculo em um espaço de trabalho da clínica",
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
        image: "/hero/sobre-escuta.jpg",
        imageAlt: "Sessão de escuta com caderno e luz natural",
      },
      {
        titulo: "Cuidado integral",
        descricao:
          "Unimos psicologia, neuropsicologia, ABA, fonoaudiologia, nutrição e outras especialidades para olhar a pessoa como um todo.",
        image: "/hero/sobre-integral.jpg",
        imageAlt: "Consulta à mesa, construindo o cuidado em conjunto",
      },
      {
        titulo: "Plano personalizado",
        descricao:
          "Cada plano de cuidado respeita história, rotina e necessidades individuais — para pessoas e também para empresas.",
        image: "/hero/sobre-plano.jpg",
        imageAlt: "Mãos reunidas em volta do plano de cuidado",
      },
      {
        titulo: "Acompanhamento contínuo",
        descricao:
          "Trabalhamos o cuidado contínuo da saúde mental, incentivando hábitos saudáveis, equilíbrio emocional e desenvolvimento pessoal no dia a dia.",
        image: "/hero/sobre-acompanhamento.jpg",
        imageAlt: "Adulto e criança caminhando pelo corredor da clínica",
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
      {
        label: "São Paulo — Rua Harmonia, 1323, loja 02, Vila Madalena",
        href: "/unidades/vila-madalena",
      },
      {
        label: "Guarulhos — R. Abraham Lincoln, 292, Jardim Guarulhos",
        href: "/unidades/guarulhos",
      },
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
    image: "/hero/sobre-cta.jpg",
    imageAlt: "Mesa da clínica com lamparina, caderno e luz baixa",
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
      "Mente, comportamento, aprendizagem, comunicação e alimentação, cuidadas por uma equipe que conversa entre si e constrói um plano único para cada pessoa.",
  } satisfies Hero & { tituloLinhas: [string, string, string] },
  intro: {
    eyebrow: "cuidado integrado",
    titulo: "Um plano, várias especialidades",
    descricao:
      "Você não precisa montar o quebra-cabeça sozinho. Depois da escuta inicial, a nossa equipe indica quais serviços fazem sentido, e eles se comunicam ao longo de todo o acompanhamento.",
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
      image: "/hero/servico-psicologia.jpg",
      imageAlt: "Sessão de psicologia com escuta e caderno, em luz natural",
    },
    {
      titulo: "Avaliação neuropsicológica",
      slug: "neuropsicologia",
      descricao:
        "Investigação aprofundada de atenção, memória, linguagem e outras funções cognitivas, com instrumentos padronizados e olhar clínico criterioso.",
      paraQuem:
        "Quem precisa entender dificuldades de atenção, memória ou aprendizagem, por indicação médica, escolar ou busca própria da família.",
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
      image: "/hero/servico-reabilitacao.jpg",
      imageAlt: "Atividade de reabilitação cognitiva com quebra-cabeça de madeira",
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
      image: "/hero/servico-aba.jpg",
      imageAlt: "Sessão de terapia ABA com brinquedos de madeira no chão",
    },
    {
      titulo: "Fonoaudiologia",
      slug: "fonoaudiologia",
      descricao:
        "Cuidado com comunicação, linguagem, fala, voz e deglutição em todas as idades, da primeira infância ao envelhecimento.",
      paraQuem:
        "Crianças com atrasos de fala ou linguagem, adultos com demandas de voz e pessoas com dificuldades de deglutição.",
      oQueEsperar:
        "Avaliação fonoaudiológica, plano terapêutico específico e exercícios práticos para casa.",
      formatos: ["Online", "Presencial"],
      icon: "audio-lines",
      relacionados: [0, 3, 4],
      image: "/hero/servico-fono.jpg",
      imageAlt: "Atendimento de fonoaudiologia com criança e espelho à mesa",
    },
    {
      titulo: "Nutrição",
      slug: "nutricao",
      descricao:
        "Orientação alimentar integrada ao cuidado da clínica, respeitando a relação de cada pessoa com a comida e a rotina da família.",
      paraQuem:
        "Quem busca reorganizar a alimentação, incluindo seletividade alimentar infantil e demandas ligadas a outras terapias em andamento.",
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
    label: "Entre em contato",
    href: "https://wa.me/5511976854141",
    secondaryLabel: "@selfevolution_clinica",
    secondaryHref: "https://www.instagram.com/selfevolution_clinica/",
    image: "/hero/13-cta.jpg",
    imageAlt: "Canto da clínica com poltrona, lamparina e luz baixa",
  } satisfies Cta,
};

export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfype2A6Klr6f7cwxLnZY8Hr9BxfRAZT5suJLXASKsf8dsWIw/viewform";

export const siteMeta = {
  title: "Relay Studio — menos trabalho repetitivo, mais decisão",
  description:
    "A Relay faz o trabalho repetitivo da sua operação, para nas exceções para a sua equipe decidir e registra tudo.",
} as const;

export const siteNavigation = {
  items: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Exemplos", href: "#onde-comecar" },
    { label: "Piloto", href: "#piloto" },
  ],
  action: { label: "Avaliar um piloto", href: "#contato" },
} as const;

export const hero = {
  status: "Primeiros pilotos em validação",
  titleText: "Menos conferir, copiar e cobrar. Mais tempo para decidir.",
  // Cada palavra é animada separadamente; `tone` marca o que sai e o que fica.
  title: [
    [
      { text: "Menos" },
      { text: "conferir", tail: ",", tone: "less" },
      { text: "copiar", tone: "less" },
      { text: "e" },
      { text: "cobrar", tail: ".", tone: "less" },
    ],
    [
      { text: "Mais" },
      { text: "tempo" },
      { text: "para" },
      { text: "decidir", tail: ".", tone: "more" },
    ],
  ],
  lede: "A Relay faz o trabalho repetitivo da sua operação: reúne os dados, confere, prepara e atualiza. Quando algo foge da regra, ela para e espera a sua equipe decidir. Tudo fica registrado.",
  primaryCta: siteNavigation.action.label,
  secondaryCta: "Ver como funciona",
} as const;

export const runDemo = {
  tag: "Exemplo ilustrativo",
  title: "Conferência de repasses",
  cadence: "Toda segunda-feira",
  steps: [
    {
      label: "Reunir pedidos e repasses",
      running: "Lendo as fontes autorizadas",
      done: "Fontes autorizadas lidas",
    },
    {
      label: "Conferir um por um",
      running: "Aplicando as regras combinadas",
      done: "Regras combinadas aplicadas",
    },
    {
      label: "Parar no que não bate",
      running: "Esperando a sua decisão",
      approved: "Aprovado por você",
      returned: "Devolvido por você",
    },
    {
      label: "Executar só o que foi aprovado",
      running: "Executando",
      done: "Ajuste lançado",
      skipped: "Nada foi executado nesse repasse",
    },
    {
      label: "Registrar o que aconteceu",
      running: "Registrando",
      approved: "Registrado: o que foi feito e quem aprovou",
      returned: "Registrado: o que ficou pendente e por quê",
    },
  ],
  exception: {
    title: "Um repasse veio menor que o pedido.",
    body: "A Relay não segue sozinha. A decisão é sua.",
    approve: "Aprovar ajuste",
    return: "Devolver",
  },
  status: [
    "Pronto para começar",
    "Reunindo as informações",
    "Conferindo",
    "Parou. Esperando a sua decisão",
    "Executando",
    "Registrando",
    "Concluído",
  ],
  replay: "Rodar de novo",
} as const;

export const swap = {
  eyebrow: "A troca",
  title: "Tire o repetitivo da frente. Fique com o que pede julgamento.",
  body: "Ninguém entrou na sua equipe para copiar dado de um sistema para outro. Esse trabalho precisa ser feito, mas não precisa ser feito por ela.",
  fromLabel: "Sai da rotina da equipe",
  toLabel: "Fica com a equipe",
  rows: [
    { from: "Procurar números em planilhas", to: "Decidir onde intervir" },
    { from: "Montar o mesmo relatório toda semana", to: "Discutir o resultado" },
    { from: "Conferir documento por documento", to: "Resolver as exceções" },
    { from: "Cobrar atualização de status", to: "Destravar o que parou" },
    { from: "Copiar dados entre sistemas", to: "Decidir com tudo na mão" },
  ],
} as const;

export const howItWorks = {
  eyebrow: "Como funciona",
  title: "Do trabalho manual ao resultado entregue.",
  body: "Quatro passos. Em dois deles quem manda é a sua equipe.",
  steps: [
    {
      index: "01",
      owner: "Você",
      title: "Você escolhe um trabalho",
      detail: "Um só. Que se repete, toma tempo e tem um resultado que dá para conferir.",
    },
    {
      index: "02",
      owner: "Relay",
      title: "A Relay prepara e confere",
      detail: "Reúne as informações das fontes que você autorizou e aplica as regras combinadas com a sua equipe.",
    },
    {
      index: "03",
      owner: "Sua equipe",
      title: "Sua equipe decide as exceções",
      detail: "O que foge da regra não segue sozinho. Para, chega à pessoa responsável e espera a decisão.",
    },
    {
      index: "04",
      owner: "Relay",
      title: "A Relay executa e registra",
      detail: "Só o que foi aprovado é executado. No fim, você vê o que foi feito, o que ficou pendente e quem decidiu o quê.",
    },
  ],
  impact: "A Relay executa. Sua equipe decide.",
} as const;

export const useCaseExamples = {
  eyebrow: "Exemplos",
  title: "Que trabalho toma tempo demais da sua equipe?",
  intro: "Alguns trabalhos que avaliamos para um primeiro piloto:",
  items: [
    {
      title: "Conferir valores",
      body: "Pedidos, pagamentos, repasses e cobranças comparados entre fontes. Sua equipe só olha o que não bate.",
    },
    {
      title: "Fechar relatórios",
      body: "As mesmas informações, das mesmas fontes, toda semana ou todo mês. Prontas para revisão.",
    },
    {
      title: "Cobrar prazos e pendências",
      body: "O que atrasou, quem precisa saber e o que já foi resolvido, sem ninguém correndo atrás.",
    },
    {
      title: "Atualizar sistemas",
      body: "Depois da decisão, as etapas aprovadas são executadas e o que foi feito fica registrado.",
    },
  ],
  boundary: "São exemplos do que avaliamos para um piloto. Não são soluções prontas nem resultados comprovados de clientes.",
} as const;

export const pilotContract = {
  eyebrow: "Piloto",
  title: "Comece por um trabalho só. Amplie se valer a pena.",
  body: "Escolhemos com você um trabalho, o resultado esperado e os limites da Relay. Rodamos um ciclo acompanhado e comparamos o tempo, o custo e a qualidade com o jeito atual de trabalhar.",
  steps: [
    { index: "01", title: "Escolher", body: "Um trabalho frequente, com resultado que dá para conferir." },
    { index: "02", title: "Combinar", body: "Fontes, regras, responsáveis e limites." },
    { index: "03", title: "Rodar", body: "Um ciclo completo, com acompanhamento." },
    { index: "04", title: "Decidir", body: "Continuar, ajustar ou parar, com o resultado na mão." },
  ],
  maturity: "Frequência, prazo, critério de aceite e preço são definidos na avaliação do piloto.",
} as const;

export const contact = {
  title: "Qual trabalho se repete na sua operação?",
  body: "Conte em três respostas. A gente lê, avalia se dá um primeiro piloto e responde.",
  prompts: [
    "Qual trabalho se repete",
    "Com que frequência acontece",
    "Onde ele pesa: tempo, erro ou dinheiro",
  ],
  action: "Descrever um trabalho",
  safety: "Não envie dados pessoais sensíveis, credenciais, documentos, planilhas nem conteúdo operacional real.",
  externalNote: "O formulário abre no Google Forms.",
} as const;

export const footer = {
  tagline: "Trabalhar na coisa certa.",
} as const;

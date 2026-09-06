export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfype2A6Klr6f7cwxLnZY8Hr9BxfRAZT5suJLXASKsf8dsWIw/viewform";

export const operationalStory = {
  hero: {
    kicker: "SOFTWARE PARA EXECUÇÃO OPERACIONAL",
    title: "Reduza o custo do trabalho recorrente sem perder o controle.",
    status: "Primeiros pilotos em validação",
    lede: "A Relay executa etapas manuais e repetitivas, leva as exceções para sua equipe decidir e registra o resultado.",
    primaryCta: "Mostrar um trabalho recorrente",
    secondaryCta: "Entender como funciona",
  },
  title: "Do trabalho manual ao resultado entregue.",
  chapters: [
    {
      stage: "source",
      index: "01",
      verb: "Escolher",
      title: "Escolha um trabalho recorrente",
      detail: "Começamos por uma tarefa manual, frequente e com resultado verificável.",
    },
    {
      stage: "preparation",
      index: "02",
      verb: "Preparar",
      title: "A Relay prepara o trabalho",
      detail: "Reúne informações de fontes autorizadas e aplica as regras combinadas.",
    },
    {
      stage: "approval",
      index: "03",
      verb: "Decidir",
      title: "As exceções chegam à sua equipe",
      detail: "O que exige julgamento humano para. A pessoa responsável decide como seguir.",
    },
    {
      stage: "execution",
      index: "04",
      verb: "Executar",
      title: "Só o que foi autorizado é executado",
      detail: "A Relay conclui as etapas aprovadas e mantém o restante pendente.",
    },
    {
      stage: "result",
      index: "05",
      verb: "Registrar",
      title: "Você recebe o resultado e o registro",
      detail: "Fica claro o que foi concluído, o que continua pendente e quais decisões foram tomadas.",
    },
  ],
  railStates: {
    preparation: { prepared: "preparado", exception: "exceção" },
    approval: { approved: "aprovado", returned: "devolvido" },
  },
  impact: "A Relay executa. Sua equipe decide o que exige julgamento.",
} as const;

export const useCaseExamples = {
  title: "Que trabalho está consumindo tempo demais?",
  intro: "Alguns exemplos que podemos avaliar com você:",
  items: [
    {
      title: "Conferir valores entre fontes",
      body: "Comparar pedidos, pagamentos, repasses ou cobranças e separar o que precisa de atenção.",
    },
    {
      title: "Preparar relatórios recorrentes",
      body: "Reunir informações, aplicar regras combinadas e deixar o resultado pronto para revisão.",
    },
    {
      title: "Acompanhar prazos e pendências",
      body: "Identificar o que está atrasado, avisar as pessoas responsáveis e manter o acompanhamento organizado.",
    },
    {
      title: "Atualizar sistemas depois de uma decisão",
      body: "Executar as etapas aprovadas e registrar o que foi feito e o que continua pendente.",
    },
  ],
  boundary: "Estes são exemplos de trabalhos que podemos avaliar para um piloto. Não são soluções prontas nem resultados comprovados de clientes.",
} as const;

export const pilotContract = {
  title: "Comece por um trabalho. Prove o valor antes de ampliar.",
  body: "Escolhemos com você uma tarefa recorrente, o resultado esperado e os limites da Relay. Rodamos um primeiro ciclo controlado e comparamos o tempo, o custo e a qualidade com a forma atual de trabalhar.",
  steps: [
    { index: "01", title: "Escolher", body: "Um trabalho frequente e verificável." },
    { index: "02", title: "Combinar", body: "Fontes, regras, responsáveis e limites." },
    { index: "03", title: "Testar", body: "Executar um ciclo com acompanhamento." },
    { index: "04", title: "Decidir", body: "Continuar, ajustar ou parar com base no resultado." },
  ],
  maturity: "Frequência, prazo, critério de aceite e preço são definidos durante a avaliação do piloto.",
} as const;

export const siteContent = {
  cta: {
    title: "Tem um trabalho repetitivo tomando o tempo da sua equipe?",
    body: "Conte pra gente o que vocês repetem toda semana ou todo mês. Vamos avaliar se isso pode virar um primeiro piloto.",
    prompts: [
      "Qual trabalho se repete",
      "Com que frequência acontece",
      "Onde ele consome tempo ou dinheiro",
    ],
    action: "Contar como funciona",
    safety: "Não envie dados pessoais sensíveis, credenciais, documentos, planilhas nem conteúdo operacional real.",
    externalNote: "O formulário abre no Google Forms.",
  },
} as const;

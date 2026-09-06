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
  title: "Começar pequeno é parte do método.",
  steps: [
    { index: "01", title: "Escolher um fluxo delimitado", body: "Definir fontes, resultado, responsável e limite de ação." },
    { index: "02", title: "Ensaiar um ciclo controlado", body: "Executar com dados autorizados e exceções visíveis." },
    { index: "03", title: "Decidir com evidência", body: "Continuar, ajustar ou parar depois de conferir o resultado." },
  ],
  limitsTitle: "O limite vem antes da execução.",
  limits: [
    "A fonte e a finalidade são autorizadas.",
    "A exceção chega com contexto para uma pessoa responsável.",
    "A ação externa depende da aprovação definida para o fluxo.",
    "Resultado, decisão e pendências deixam registro.",
  ],
  maturity: "Frequência, SLA, critério de aceite e cobrança continuam em validação.",
  productBoundary: "A demonstração explica a direção do produto; não representa uma operação de cliente.",
} as const;

export const siteContent = {
  cta: {
    eyebrow: "Começar por um fluxo",
    title: "Qual trabalho recorrente ainda termina na sua equipe?",
    body:
      "Descreva o processo sem enviar dados pessoais sensíveis ou conteúdo operacional real. A conversa serve para avaliar se existe um piloto delimitado.",
    action: "Descrever um fluxo",
    externalNote: "O formulário abre no Google Forms.",
  },
  form: {
    label: "Prévia local · nenhum dado é enviado",
    safety:
      "Não envie dados pessoais sensíveis, credenciais, documentos, planilhas nem conteúdo operacional real.",
    submit: "Prévia sem envio",
    fields: [
      { id: "contact", label: "Nome e e-mail de trabalho", kind: "text" },
      { id: "role", label: "Papel na operação", kind: "select", options: ["Operações", "Financeiro", "Direção", "Tecnologia", "Outro"] },
      { id: "flow", label: "Fluxo recorrente", kind: "textarea" },
      { id: "frequency", label: "Frequência", kind: "select", options: ["Diário", "Semanal", "Quinzenal", "Mensal", "Outro ciclo previsível"] },
      { id: "sources", label: "Fontes", kind: "textarea" },
      { id: "result", label: "Resultado esperado", kind: "textarea" },
      { id: "impact", label: "Impacto hoje", kind: "textarea" },
    ],
  },
} as const;

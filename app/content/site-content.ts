export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfype2A6Klr6f7cwxLnZY8Hr9BxfRAZT5suJLXASKsf8dsWIw/viewform";

export const operationalStory = {
  hero: {
    kicker: "Um fluxo delimitado",
    title: "O trabalho anda.",
    accent: "Você entra quando importa.",
    status: "Primeiros fluxos em validação",
    lede: "A Relay prepara, separa exceções e executa apenas o que foi autorizado.",
    primaryCta: "Descrever um fluxo",
    secondaryCta: "Acompanhar uma entrega",
  },
  disclosure: "Demonstração sintética · dados fictícios para explicar o percurso da entrega.",
  productBoundary: "Esta demonstração explica a direção do produto; não representa uma operação de cliente.",
  chapters: [
    { stage: "source", index: "01", verb: "Entra", title: "O trabalho que volta toda semana.", value: "184 pedidos · 184 repasses", detail: "Duas fontes autorizadas entram no ensaio." },
    { stage: "preparation", index: "02", verb: "Separa", title: "O sistema encontra o que não fecha.", value: "179 correspondências · 5 exceções", detail: "Nenhuma ação externa foi tomada." },
    { stage: "approval", index: "03", verb: "Para", title: "A automação sabe onde parar.", value: "3 aprovados · 2 devolvidos", detail: "A decisão do responsável fica registrada." },
    { stage: "execution", index: "04", verb: "Executa", title: "Só o autorizado atravessa.", value: "3 ajustes aplicados", detail: "Os dois itens devolvidos permanecem pendentes." },
    { stage: "result", index: "05", verb: "Prova", title: "O fim deixa evidência.", value: "182 encerrados · 2 pendentes", detail: "Critério conferido · recibo sintético #014." },
  ],
  manifesto: {
    decision: "Você entra quando importa.",
    closing: "Sem caixa-preta. Sem teatro. Com responsabilidade.",
  },
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

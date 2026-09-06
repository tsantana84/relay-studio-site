export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfype2A6Klr6f7cwxLnZY8Hr9BxfRAZT5suJLXASKsf8dsWIw/viewform";

export const siteContent = {
  hero: {
    eyebrow: "Primeiros fluxos em validação",
    title: "O trabalho recorrente termina. Com evidência.",
    lede:
      "Avaliamos um primeiro piloto para executar um fluxo delimitado e devolver resultado, exceções e evidência.",
    primaryCta: "Descrever um fluxo",
    secondaryCta: "Ver uma entrega",
    note: "Para líderes de operações e financeiro que ainda fecham trabalho importante à mão.",
  },
  recognition: {
    eyebrow: "Onde o trabalho trava",
    title: "Começamos pelo que se repete, pesa e precisa fechar.",
    body:
      "Não é uma promessa de automatizar a empresa inteira. É a escolha de um resultado recorrente que alguém consegue conferir.",
    items: [
      {
        title: "Fechamentos e reconciliações",
        body: "Quando duas ou mais fontes precisam bater antes de o trabalho seguir.",
      },
      {
        title: "Relatórios recorrentes",
        body: "Quando reunir, conferir e explicar mudanças consome o ciclo inteiro.",
      },
      {
        title: "Prazos e pendências",
        body: "Quando o próximo passo depende de cobrança, contexto e registro manual.",
      },
    ],
  },
  pilot: {
    eyebrow: "Um primeiro piloto",
    title: "Começar pequeno é parte do método.",
    stages: [
      { title: "Definir", body: "Escolhemos um fluxo, suas fontes, o resultado e os limites." },
      { title: "Ensaiar", body: "Executamos um ciclo controlado e deixamos as exceções visíveis." },
      { title: "Decidir", body: "Comparamos o resultado e decidimos continuar, ajustar ou parar." },
    ],
    note: "Frequência, SLA, critério de aceite e cobrança continuam em validação.",
  },
  mechanism: {
    eyebrow: "Como a execução é governada",
    title: "A decisão humana vem antes da ação que exige responsabilidade.",
    body:
      "Fontes autorizadas alimentam a preparação. Exceções param no responsável. Só então a execução autorizada produz resultado e recibo.",
    stages: [
      { stage: "source", title: "Fonte autorizada" },
      { stage: "preparation", title: "Preparação" },
      { stage: "approval", title: "Exceção ou aprovação" },
      { stage: "execution", title: "Execução autorizada" },
      { stage: "result", title: "Resultado e recibo" },
    ],
  },
  limits: {
    eyebrow: "Confiança e limites",
    title: "Antes de executar, o limite precisa estar claro.",
    items: [
      "A fonte e a finalidade são autorizadas.",
      "A exceção chega com contexto para uma pessoa responsável.",
      "A ação externa depende da aprovação definida para o fluxo.",
      "Resultado, decisão e pendências deixam registro.",
    ],
    note:
      "A demonstração desta página usa dados fictícios. Ela explica a direção do produto; não representa uma operação de cliente.",
  },
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

export const deliveryProof = {
  label: "Demonstração sintética",
  title: "Fechamento semanal",
  period: "12–16 maio",
  disclosure: "Dados fictícios para demonstrar o percurso da entrega.",
  commercialNote: "Frequência, SLA, critério de aceite e cobrança continuam em validação.",
  stages: [
    { stage: "source", label: "Fontes", value: "184 pedidos · 184 repasses", detail: "Duas fontes autorizadas para o ensaio." },
    { stage: "preparation", label: "Preparação", value: "179 correspondências encontradas", detail: "Cinco divergências foram separadas; nenhuma ação externa foi tomada." },
    { stage: "approval", label: "Exceção e aprovação", value: "3 ajustes aprovados · 2 itens devolvidos", detail: "Decisão registrada pelo responsável financeiro." },
    { stage: "execution", label: "Execução autorizada", value: "3 ajustes aplicados", detail: "Somente o conjunto aprovado seguiu para o fechamento." },
    { stage: "result", label: "Resultado e recibo", value: "182 encerrados · 2 pendentes", detail: "Critério conferido · recibo #014." },
  ],
} as const;

# Relay Studio — direção visual “Arquivo vivo”

**Data:** 2026-08-23  
**Status:** design aprovado em conversa; especificação para revisão  
**Escopo:** redesign visual do site institucional `relay-studio-site`  

## Decisão central

O site manterá integralmente a copy, os anchors, a ordem semântica e o
comportamento do site institucional atual. A mudança será visual: uma direção
editorial orgânica, chamada internamente de **Arquivo vivo**.

“Orgânico” aqui não significa folhas, rostos, ilustrações de mãos ou uma
interface simpática por decoração. A referência interna é anti-human-washing:
qualquer sinal de presença humana deve aparecer como autoria, escolha,
responsabilidade, exceção e evidência — não como promessa abstrata de “IA
humana”.

## O que fica congelado

- Nenhum texto, título, CTA, label ou microcopy será alterado nesta fase.
- Nenhum anchor existente será removido ou renomeado (`#visao`, `#trabalho`,
  `#audit`, `#produto`, `#processo`, `#privacidade` e equivalentes atuais).
- Nenhuma rota, integração, formulário, métrica ou comportamento do audit será
  alterado.
- A primeira implementação deve ser concentrada em `app/globals.css`.
- Alteração de JSX só será aceita se for estritamente apresentacional e não
  mudar o conteúdo renderizado.
- Não serão adicionadas imagens de pessoas, mascotes, avatares, “AI sparkles”
  ou fotografia de banco.

## Princípio anti-human-washing

O site não usará “humano no circuito” como selo de segurança. Sempre que a
composição visual sugerir participação humana, ela deverá tornar legível pelo
menos um destes elementos:

1. o ponto em que o fluxo para;
2. quem responde pela decisão;
3. qual contexto chega para essa pessoa;
4. qual evidência fica depois da decisão.

Essa escolha trata “human-washing” como uma crítica à supervisão humana
meramente simbólica, não como um adjetivo de marca. A literatura recente
questiona o uso indiscriminado de “human in the loop” como atalho de segurança
e também relaciona o termo à antropomorfização de sistemas de IA.

## Direção visual

### Paleta

Preservar os tokens de marca já existentes como base:

| Função | Token atual | Uso na nova direção |
| --- | --- | --- |
| Campo profundo | `--relay-navy` | Hero, transições e contraste institucional |
| Papel | `--relay-paper` | Superfícies editoriais e leitura longa |
| Tinta | `--relay-ink` | Texto principal e bordas |
| Âmbar | `--relay-amber` | Ação, sinal ativo e destaque pontual |

Adicionar dois acentos de baixa saturação, com uso limitado a estado e
contexto:

- **musgo:** fonte autorizada, contexto disponível, etapa em continuidade;
- **argila:** exceção, decisão, responsabilidade ou atenção necessária.

Os novos acentos não devem virar uma paleta pastel nem substituir o navy como
âncora de confiança.

### Matéria e forma

- textura de papel ou granulação extremamente sutil, sempre com contraste
  suficiente para leitura;
- linhas finas, marcadores, índices e notas marginais como linguagem de
  arquivo;
- cantos suavemente arredondados apenas em superfícies de trabalho, evitando
  que toda a página vire uma coleção de cards;
- contornos orgânicos assimétricos em pseudo-elementos, nunca como conteúdo
  essencial;
- ritmo de margens generoso, com spreads editoriais e colunas que quebram a
  grade de maneira controlada;
- nenhum gradiente decorativo sem função semântica.

### Tipografia

Na primeira rodada, preservar as famílias já definidas no brand kit e trabalhar
contraste por escala, peso, largura de coluna e entrelinha. Uma serif editorial
somente poderá ser adicionada depois de validar licença, carregamento e
fallback; não haverá dependência externa para o primeiro experimento.

## Mapeamento das seções atuais

### 1. Hero

Manter o campo navy e a copy atual. A composição ganha mais margem, uma camada
de papel/ruído discreta e um trilho de sinal que parece avançar pelo campo. O
trilho deve pausar visualmente no ponto de exceção, sem inventar nova legenda.

O hero continua grande, mas deixa de ocupar a tela como um bloco isolado: o
rodapé e o início da seção seguinte devem sugerir continuidade material.

### 2. Exemplo de fluxo

Transformar a seção em uma folha de trabalho editorial. Os três passos atuais
viram uma sequência vertical com separadores, índices e uma linha de
continuidade. O conteúdo permanece exatamente o mesmo; a hierarquia visual
deve enfatizar fonte → conferência → entrega.

### 3. Visão e O trabalho

Trocar a sensação de grade de feature por spreads de leitura: uma coluna de
contexto e outra de evidência, alternando alinhamentos. Os quatro exemplos de
trabalho continuam presentes, mas com mais ar e menos molduras repetidas.

### 4. Audit do fluxo

Preservar perguntas, respostas, contagem, pontuação, estados e CTA. A moldura
visual vira um caderno de decisão: papel ligeiramente deslocado, marcador de
progresso, estados claros e um contorno orgânico que não interfere no foco.
Nenhum estado poderá depender apenas de cor.

### 5. A entrega e Como funciona

Usar uma linha de fluxo contínua que se divide quando encontra exceção ou
aprovação. A linha é decorativa; os títulos e textos continuam sendo a fonte
semântica. No mobile, a linha vira uma coluna vertical sem exigir scroll
horizontal.

### 6. Como pensamos, Privacidade e CTA final

Tratar essas seções como o índice e as notas de responsabilidade do arquivo:
blocos mais silenciosos, bordas finas, chamadas curtas e alta legibilidade.
Privacidade não recebe textura ou ornamento que diminua sua seriedade.

## Movimento e estados

- entrada escalonada suave apenas para estabelecer o ritmo editorial;
- trilhos e linhas podem desenhar o percurso uma única vez;
- hover deve revelar relação ou estado, não produzir “mágica”;
- a transição do audit deve comunicar progresso e não recompensa gamificada;
- `prefers-reduced-motion` remove deslocamentos e mantém apenas mudanças de
  estado essenciais;
- foco de teclado permanece visível em todos os links e botões.

## Limites técnicos

- principal arquivo: `app/globals.css`;
- arquivo de conteúdo: `app/page.tsx`, somente se uma classe apresentacional
  for indispensável;
- componente interativo: `app/components/workflow-audit.tsx`, somente para
  classes ou wrappers sem mudança de copy/estado;
- nenhum pacote novo na primeira rodada;
- nenhum asset externo obrigatório;
- nenhum ajuste em `layout.tsx`, metadata, rotas ou integrações.

## Critérios de aceite

1. O texto renderizado antes e depois é idêntico.
2. Todos os anchors e o audit continuam operacionais.
3. A primeira dobra comunica navy/papel/âmbar com os novos acentos sem perder
   contraste WCAG.
4. Desktop, tablet e mobile não criam overflow horizontal.
5. O fluxo e o audit continuam compreensíveis sem depender de cor, textura ou
   animação.
6. `npm run lint`, `npm run build` e `npm test` passam.
7. Uma revisão no navegador cobre pelo menos 1440px, 1024px e 390px de largura.
8. `git diff` confirma que não houve alteração de copy.

## Sequência de implementação posterior

1. Capturar baseline visual e snapshot de copy.
2. Aplicar tokens, superfícies, textura e tipografia sem alterar JSX.
3. Redesenhar hero, fluxo e audit em CSS.
4. Ajustar as seções editoriais e a linha de processo.
5. Validar responsividade, acessibilidade, motion reduction e copy snapshot.
6. Fazer revisão visual no navegador e ajustar somente problemas observados.
7. Rodar os gates do repositório e preparar um PR exclusivamente visual.

## Referências conceituais

- Ben Wilson, Matimba Swana, Peter Winter e Matt Roach, *Humanwashing -- It
  Should Leave You Feeling Dirty* (2026):
  https://arxiv.org/abs/2605.13723
- Vincent Blok, *Anthropomorphization and beyond: conceptualizing humanwashing
  of AI-enabled machines* (2022):
  https://doi.org/10.1007/s00146-022-01492-1


# Benefit-first institutional site copy

## Status

Approved as a content architecture in conversation on 2026-09-06. Tracks
[relay-studio-site #14](https://github.com/tsantana84/relay-studio-site/issues/14).

This specification supersedes the copy and conversion decisions in
`2026-09-06-operational-story-redesign.md`. The existing visual system and
scroll choreography remain the implementation foundation; this increment does
not reopen their art direction.

## Problem

The current page is visually distinctive but its language is too abstract for
an institutional site that needs to explain the solution and capture potential
customers and use cases. Phrases such as “184 pedidos · 184 repasses” and “Duas
fontes autorizadas entram no ensaio” ask the visitor to decode a synthetic story
before understanding the business value.

The conversion path also presents a local form that does not submit data before
offering the real Google Forms link. That extra step looks interactive without
performing the expected action and creates avoidable friction.

## Communication objective

A manager responsible for recurring manual work should understand, in this
order:

1. The Relay can reduce the time and cost of recurring work without removing
   human control.
2. The product is software that executes recurring operational work.
3. The Relay prepares work, stops at exceptions, follows human decisions and
   records the result.
4. The visitor can bring a concrete recurring task for evaluation as a pilot.

The page does not lead with a promise to increase revenue. The current examples
support an efficiency and control claim directly; they do not yet support a
direct revenue claim.

## Voice and writing rules

- Use ordinary Brazilian Portuguese and short, direct sentences.
- Lead headings with the visitor's task or benefit, not an internal metaphor.
- Prefer concrete verbs: escolher, reunir, separar, decidir, executar, receber.
- Explain a technical or governance term only when it changes the visitor's
  understanding or decision.
- Do not invent quantities, receipts, customer outcomes, savings percentages,
  SLAs or adoption signals.
- Use “você” in headings and “sua equipe” when responsibility is shared.
- Treat the examples as work the Relay can evaluate, not as packaged solutions
  or shipped integrations.

These rules apply current plain-language guidance: page purpose should be clear,
headings should describe their section, and calls to action should state the
task. References:

- [W3C — Writing for Web Accessibility](https://www.w3.org/WAI/tips/writing/)
- [W3C — Make the purpose of each page clear](https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p01-clear-purpose/)
- [ONS Service Manual — Plain language](https://service-manual.ons.gov.uk/content/writing-for-users/plain-language)
- [Nielsen Norman Group — Concise, scannable and objective writing](https://www.nngroup.com/articles/applying-writing-guidelines-web-pages/)

## Approved page copy

### Navigation

- `Como funciona`
- `Onde começar`
- `Piloto`
- Action: `Mostrar um trabalho recorrente`

The navigation action links to the final conversion section. It does not imply
that a pilot is already accepted.

### Hero

Kicker:

> SOFTWARE PARA EXECUÇÃO OPERACIONAL

Headline:

> Reduza o custo do trabalho recorrente sem perder o controle.

Supporting copy:

> A Relay executa etapas manuais e repetitivas, leva as exceções para sua equipe
> decidir e registra o resultado.

Maturity label:

> Primeiros pilotos em validação

Primary action:

> Mostrar um trabalho recorrente

Secondary action:

> Entender como funciona

The primary action links to `#contato`; the secondary action links to
`#como-funciona`.

### How it works

Section heading:

> Do trabalho manual ao resultado entregue.

The operational rail remains, but all invented volumes and synthetic receipt
numbers are removed. It tells the following five-step story.

#### 1. Escolha um trabalho recorrente

> Começamos por uma tarefa manual, frequente e com resultado verificável.

#### 2. A Relay prepara o trabalho

> Reúne informações de fontes autorizadas e aplica as regras combinadas.

Rail states: `preparado` and `exceção`.

#### 3. As exceções chegam à sua equipe

> O que exige julgamento humano para. A pessoa responsável decide como seguir.

#### 4. Só o que foi autorizado é executado

> A Relay conclui as etapas aprovadas e mantém o restante pendente.

Rail states: `aprovado` and `devolvido`.

#### 5. Você recebe o resultado e o registro

> Fica claro o que foi concluído, o que continua pendente e quais decisões foram
> tomadas.

Impact line:

> A Relay executa. Sua equipe decide o que exige julgamento.

The old manifesto lines may not remain as separate claims if they duplicate or
interrupt this explanation. Motion can emphasize the approved impact line, but
must not alter its wording or reading order.

### Where to start

Section heading:

> Que trabalho está consumindo tempo demais?

Introductory label:

> Alguns exemplos que podemos avaliar com você:

#### Conferir valores entre fontes

> Comparar pedidos, pagamentos, repasses ou cobranças e separar o que precisa de
> atenção.

#### Preparar relatórios recorrentes

> Reunir informações, aplicar regras combinadas e deixar o resultado pronto para
> revisão.

#### Acompanhar prazos e pendências

> Identificar o que está atrasado, avisar as pessoas responsáveis e manter o
> acompanhamento organizado.

#### Atualizar sistemas depois de uma decisão

> Executar as etapas aprovadas e registrar o que foi feito e o que continua
> pendente.

Evidence boundary adjacent to the examples:

> Estes são exemplos de trabalhos que podemos avaliar para um piloto. Não são
> soluções prontas nem resultados comprovados de clientes.

### Pilot

Section heading:

> Comece por um trabalho. Prove o valor antes de ampliar.

Supporting copy:

> Escolhemos com você uma tarefa recorrente, o resultado esperado e os limites da
> Relay. Rodamos um primeiro ciclo controlado e comparamos o tempo, o custo e a
> qualidade com a forma atual de trabalhar.

The pilot sequence contains four steps.

1. **Escolher** — Um trabalho frequente e verificável.
2. **Combinar** — Fontes, regras, responsáveis e limites.
3. **Testar** — Executar um ciclo com acompanhamento.
4. **Decidir** — Continuar, ajustar ou parar com base no resultado.

Maturity note:

> Frequência, prazo, critério de aceite e preço são definidos durante a avaliação
> do piloto.

The comparison is the pilot method, not a pre-existing customer result. The page
must not publish an expected saving before measurement.

### Conversion

Section heading:

> Tem um trabalho repetitivo tomando o tempo da sua equipe?

Supporting copy:

> Conte pra gente o que vocês repetem toda semana ou todo mês. Vamos avaliar se
> isso pode virar um primeiro piloto.

The section previews what the external form will ask in three short points:

- `Qual trabalho se repete`
- `Com que frequência acontece`
- `Onde ele consome tempo ou dinheiro`

Single action:

> Contar como funciona

The action opens the existing Google Forms URL directly. The non-submitting local
form preview and its fields are removed.

Safety note, visible before or beside the action:

> Não envie dados pessoais sensíveis, credenciais, documentos, planilhas nem
> conteúdo operacional real.

External-destination note:

> O formulário abre no Google Forms.

## Information architecture and component impact

The page order becomes:

1. Hero
2. How it works
3. Where to start
4. Pilot
5. Conversion
6. Footer

`app/content/site-content.ts` remains the single source of page copy. Its data
shape changes to represent the approved sections and no longer exposes invented
metrics or form fields.

Expected component changes:

- `OperationalHero`: replace proposition and actions; preserve visual entrance.
- `OperationalStory`: map the five approved explanatory steps onto the existing
  semantic story and rail.
- `OperationalRail`: replace numeric states with the four approved state labels.
- `ManifestoCut`: remove or adapt it to the approved impact line without adding
  new claims.
- Add a small semantic “Where to start” section using the existing visual
  language, not a generic equal-card grid.
- `PilotContract`: replace the three-step contract with the approved four-step
  pilot method.
- Replace `FlowFormPreview` with a simple conversion handoff component or inline
  section containing the three prompts, safety note and direct external link.
- Update metadata and structured page copy if they repeat the old proposition.

No new animation dependency, backend, analytics, CMS or form provider is added.

## Accessibility and interaction contract

- The H1 communicates the primary benefit without relying on animation.
- Section headings remain meaningful when read out of visual context.
- The five process steps use an ordered list in the document.
- Example headings and descriptions are semantic content, not decorative rail
  labels.
- The direct Google Forms link is keyboard accessible, visibly focused and marked
  as an external destination in nearby text.
- The page remains complete without JavaScript and with
  `prefers-reduced-motion: reduce`.
- No copy is hidden exclusively inside an animated or `aria-hidden` layer.
- The approved wording remains readable without horizontal overflow at 1440,
  1024, 768 and 390 px.

## Validation

Automated gates:

1. Update or add focused tests for the hero promise, ordered process, example
   boundary, pilot maturity, direct form handoff and sensitive-data warning.
2. Add negative assertions for the removed synthetic quantities and the local
   non-submitting form preview.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Run `npm test`.
6. Run `git diff --check`.

Browser gates at `http://localhost:3001`:

1. Verify the complete reading order and direct Google Forms handoff.
2. Inspect 1440, 1024, 768 and 390 px widths for clipping and overflow.
3. Verify keyboard navigation and visible focus.
4. Verify reduced-motion behavior.
5. Verify the page remains understandable with JavaScript disabled.
6. Confirm the existing signature motion still supports, rather than obscures,
   the new copy.

The user sees the local site at the end of the implementation task. One
independent review and at most one correction cycle complete the Issue.

## Non-goals

- Redesigning the approved visual direction
- Adding customer logos, testimonials or unsupported performance metrics
- Claiming production use, packaged integrations, guaranteed savings or revenue
  growth
- Changing the external form provider or collecting submissions locally
- Publishing or deploying the site
- Adding pages beyond the institutional homepage

## Stop condition

Stop when the approved copy is represented faithfully in the implementation,
the misleading synthetic quantities and local form preview are absent, all
available automated and browser gates pass, one independent review/correction
cycle is complete, and the result is visible locally for human approval.

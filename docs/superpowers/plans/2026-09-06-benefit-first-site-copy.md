# Benefit-first institutional site copy implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's abstract synthetic narrative with approved benefit-first copy, concrete candidate use cases, a measurable pilot explanation and one direct Google Forms conversion path.

**Architecture:** Keep the existing static React page, visual language and scroll controller. Continue to centralize public language in `app/content/site-content.ts`, adapt each server-rendered section to that contract, add one semantic use-case section and replace the client-only form preview with a static external handoff. Make the change as three vertical, independently reviewable slices followed by one full browser and quality gate.

**Tech Stack:** React 19, TypeScript 5.9, vinext static export, CSS, Node.js test runner, source-contract tests and rendered-HTML tests.

**Spec:** `docs/superpowers/specs/2026-09-06-benefit-first-site-copy.md`

## Global Constraints

- The approved visual direction and scroll choreography remain; this is not a new art-direction pass.
- Use ordinary Brazilian Portuguese and short, direct sentences.
- Do not invent quantities, receipts, customer outcomes, savings percentages, SLAs or adoption signals.
- Present use cases as work the Relay can evaluate, not packaged solutions or customer proof.
- Keep `app/content/site-content.ts` as the single source of public page copy.
- The Google Forms destination remains the existing `FORM_URL`; do not change provider or collect data locally.
- The direct external link must remain keyboard accessible, visibly focused and accompanied by the sensitive-data warning.
- The page must remain complete without JavaScript and under `prefers-reduced-motion: reduce`.
- Add no animation dependency, backend, analytics or CMS.
- Do not publish, deploy or merge as part of implementation.

---

### Task 1: Benefit-first hero and navigation

**Files:**

- Modify: `tests/site-content-contract.test.mjs`
- Modify: `app/content/site-content.ts`
- Modify: `app/components/operational-hero.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: existing `FORM_URL` and the `operationalStory.hero` object.
- Produces: `operationalStory.hero` with `kicker`, `title`, `status`, `lede`, `primaryCta` and `secondaryCta`; stable anchors `#como-funciona`, `#onde-comecar`, `#piloto` and `#contato` for later tasks.

- [ ] **Step 1: Replace the old hero contract test with a failing benefit-first test**

In `tests/site-content-contract.test.mjs`, replace the existing test named
`copy posiciona uma entrega delimitada sem transformar hipótese em capacidade`
and update the hero maturity assertion so they read:

```js
test("copy abre com benefício econômico, categoria e controle humano", () => {
  assert.match(source, /SOFTWARE PARA EXECUÇÃO OPERACIONAL/);
  assert.match(source, /Reduza o custo do trabalho recorrente sem perder o controle\./);
  assert.match(source, /A Relay executa etapas manuais e repetitivas/);
  assert.match(source, /leva as exceções para sua equipe decidir/);
  assert.match(source, /Mostrar um trabalho recorrente/);
  assert.match(source, /Entender como funciona/);
  assert.doesNotMatch(source, /garantimos|autônom[oa]|qualquer empresa|em produção/i);
});

test("o hero mantém a maturidade junto da promessa", () => {
  assert.match(source, /status: "Primeiros pilotos em validação"/);
  assert.match(heroSource, /operationalStory\.hero\.status/);
});

test("a navegação nomeia as seções e leva a ação principal ao contato", () => {
  for (const label of ["Como funciona", "Onde começar", "Piloto"]) {
    assert.match(heroSource, new RegExp(label));
  }
  assert.match(heroSource, /href="#contato"/);
  assert.match(heroSource, /href="#como-funciona"/);
  assert.doesNotMatch(heroSource, /href="#prova"|href="#limites"/);
});
```

- [ ] **Step 2: Run the focused test and verify the old copy fails it**

Run:

```bash
node --test tests/site-content-contract.test.mjs
```

Expected: FAIL in the new benefit-first test because
`SOFTWARE PARA EXECUÇÃO OPERACIONAL` is absent.

- [ ] **Step 3: Replace the hero copy and remove the split accent contract**

Set `operationalStory.hero` in `app/content/site-content.ts` to:

```ts
hero: {
  kicker: "SOFTWARE PARA EXECUÇÃO OPERACIONAL",
  title: "Reduza o custo do trabalho recorrente sem perder o controle.",
  status: "Primeiros pilotos em validação",
  lede: "A Relay executa etapas manuais e repetitivas, leva as exceções para sua equipe decidir e registra o resultado.",
  primaryCta: "Mostrar um trabalho recorrente",
  secondaryCta: "Entender como funciona",
},
```

Remove the obsolete `accent` key. Do not touch the chapter, pilot or conversion
copy in this task.

- [ ] **Step 4: Adapt the hero markup and anchors**

In `app/components/operational-hero.tsx`, render the title without an `<em>` and
replace the navigation and actions with:

```tsx
<nav className="site-nav" aria-label="Navegação principal">
  <a href="#como-funciona">Como funciona</a>
  <a href="#onde-comecar">Onde começar</a>
  <a href="#piloto">Piloto</a>
  <a className="site-nav__action" href="#contato">Mostrar um trabalho recorrente</a>
</nav>
```

```tsx
<h1 className="operational-hero__title" id="hero-title">
  {operationalStory.hero.title}
</h1>
```

```tsx
<div className="operational-hero__actions">
  <a className="button button--amber" href="#contato">{operationalStory.hero.primaryCta}</a>
  <a className="text-link text-link--light" href="#como-funciona">
    {operationalStory.hero.secondaryCta} <span aria-hidden="true">↓</span>
  </a>
</div>
```

Update `.operational-hero h1` in `app/globals.css` to support the longer
headline with `max-width: 11ch`, `font-size: clamp(4rem, 10vw, 9rem)` and
`line-height: .82`. Add a `.site-nav__action` rule that distinguishes the action
with the existing amber color and preserves the 44 px compact target size.

- [ ] **Step 5: Update the page metadata to match the promise**

In `app/layout.tsx`, retain the title and set the description to:

```ts
description:
  "A Relay executa trabalhos operacionais recorrentes, leva exceções para decisão da equipe e registra o resultado.",
```

- [ ] **Step 6: Run the focused test and lint**

Run:

```bash
node --test tests/site-content-contract.test.mjs
npm run lint
```

Expected: both commands PASS. Rendered-HTML expectations are updated only after
all page sections change in Task 3.

- [ ] **Step 7: Commit the hero slice**

```bash
git add tests/site-content-contract.test.mjs app/content/site-content.ts app/components/operational-hero.tsx app/layout.tsx app/globals.css
git commit -m "feat: lead site copy with operational savings"
```

### Task 2: Concrete process story and candidate use cases

**Files:**

- Modify: `tests/site-content-contract.test.mjs`
- Modify: `app/content/site-content.ts`
- Modify: `app/components/operational-story.tsx`
- Modify: `app/components/operational-rail.tsx`
- Create: `app/components/use-case-examples.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**

- Consumes: stable `#como-funciona` and `#onde-comecar` anchors established in Task 1.
- Produces: `operationalStory.title`, five semantic chapters, `operationalStory.railStates`, `operationalStory.impact` and exported `useCaseExamples`; `OperationalRail` receives explicit `chapters` and `railStates` props rather than parsing prose.

- [ ] **Step 1: Write failing tests for the explanatory story and evidence boundary**

Replace the old story/proof and rail tests in
`tests/site-content-contract.test.mjs` with:

```js
test("a história explica cinco etapas sem métricas inventadas", () => {
  const stages = ["source", "preparation", "approval", "execution", "result"];
  let cursor = -1;
  for (const stage of stages) {
    const next = source.indexOf(`stage: "${stage}"`);
    assert.ok(next > cursor, `${stage} deve vir depois do estágio anterior`);
    cursor = next;
  }
  for (const copy of [
    "Escolha um trabalho recorrente",
    "A Relay prepara o trabalho",
    "As exceções chegam à sua equipe",
    "Só o que foi autorizado é executado",
    "Você recebe o resultado e o registro",
  ]) {
    assert.match(source, new RegExp(copy));
  }
  assert.match(source, /A Relay executa\. Sua equipe decide o que exige julgamento\./);
  assert.doesNotMatch(source, /184 pedidos|179 correspondências|3 aprovados|182 encerrados|recibo sintético #014/);
  assert.match(storySource, /<ol[^>]*className="operational-story__chapters"/);
});

test("o trilho recebe estados explícitos em vez de extrair números da copy", () => {
  for (const label of ["preparado", "exceção", "aprovado", "devolvido"]) {
    assert.match(source, new RegExp(label));
  }
  assert.match(railSource, /railStates\.preparation\.prepared/);
  assert.match(railSource, /railStates\.preparation\.exception/);
  assert.match(railSource, /railStates\.approval\.approved/);
  assert.match(railSource, /railStates\.approval\.returned/);
  assert.doesNotMatch(railSource, /split\(" · "\)|receipt/);
});

test("os exemplos são concretos e aparecem com limite de evidência", () => {
  for (const example of [
    "Conferir valores entre fontes",
    "Preparar relatórios recorrentes",
    "Acompanhar prazos e pendências",
    "Atualizar sistemas depois de uma decisão",
  ]) {
    assert.match(source, new RegExp(example));
  }
  assert.match(source, /podemos avaliar para um piloto/);
  assert.match(source, /Não são soluções prontas nem resultados comprovados de clientes/);
  assert.match(pageSource, /<UseCaseExamples \/>/);
});
```

Add a source read near the other component reads:

```js
const useCasesSource = await readFile(
  new URL("../app/components/use-case-examples.tsx", import.meta.url),
  "utf8",
).catch(() => "");
```

Then add `assert.match(useCasesSource, /aria-labelledby="use-cases-title"/)` to
the examples test.

- [ ] **Step 2: Run the focused test and verify it fails on the first new heading**

Run:

```bash
node --test tests/site-content-contract.test.mjs
```

Expected: FAIL because `Escolha um trabalho recorrente` is absent.

- [ ] **Step 3: Replace the old story data with the approved explanatory contract**

In `app/content/site-content.ts`, retain the approved hero and replace the rest
of `operationalStory` after `hero` with:

```ts
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
```

Delete `disclosure`, `productBoundary` and `manifesto` from this object.

Export the approved examples as:

```ts
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
```

- [ ] **Step 4: Make the story render the approved copy without duplicate claims**

In `app/components/operational-story.tsx`:

- change the section id from `prova` to `como-funciona`;
- render only `operationalStory.title` in the intro;
- remove `chapter.value` and the approval-stage manifesto;
- pass `operationalStory.railStates` to the rail;
- keep one `ManifestoCut` after the scroll and render `operationalStory.impact`.

The central calls should be:

```tsx
<OperationalRail
  chapters={operationalStory.chapters}
  railStates={operationalStory.railStates}
/>
```

```tsx
<span>{chapter.index} / {chapter.verb}</span>
<h3>{chapter.title}</h3>
<p>{chapter.detail}</p>
```

```tsx
<ManifestoCut>{operationalStory.impact}</ManifestoCut>
```

- [ ] **Step 5: Stop deriving rail state from prose**

In `app/components/operational-rail.tsx`, replace the `Chapter` shape and props
with:

```tsx
type Chapter = {
  readonly index: string;
  readonly verb: string;
  readonly stage: string;
};

type RailStates = {
  readonly preparation: { readonly prepared: string; readonly exception: string };
  readonly approval: { readonly approved: string; readonly returned: string };
};

export default function OperationalRail({
  chapters,
  railStates,
}: {
  chapters: readonly Chapter[];
  railStates: RailStates;
}) {
```

Delete all `find`, `split` and receipt derivation. Render the two branch groups
directly from `railStates`, preserving semantic colors:

```tsx
<span className="operational-rail__branch operational-rail__branch--prepared">
  {railStates.preparation.prepared}
</span>
<span className="operational-rail__branch operational-rail__branch--exception">
  {railStates.preparation.exception}
</span>
```

```tsx
<span className="operational-rail__branch operational-rail__branch--approved">
  {railStates.approval.approved}
</span>
<span className="operational-rail__branch operational-rail__branch--returned">
  {railStates.approval.returned}
</span>
```

- [ ] **Step 6: Add the semantic use-case section**

Create `app/components/use-case-examples.tsx`:

```tsx
import { useCaseExamples } from "../content/site-content";

export default function UseCaseExamples() {
  return (
    <section className="use-cases" id="onde-comecar" aria-labelledby="use-cases-title">
      <header className="use-cases__intro">
        <h2 id="use-cases-title">{useCaseExamples.title}</h2>
        <p>{useCaseExamples.intro}</p>
      </header>
      <ol className="use-cases__list">
        {useCaseExamples.items.map((item, index) => (
          <li key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>
      <p className="use-cases__boundary">{useCaseExamples.boundary}</p>
    </section>
  );
}
```

Import it in `app/page.tsx` and place `<UseCaseExamples />` after
`<OperationalStoryMotion />` and before `<PilotContract />`.

- [ ] **Step 7: Adapt the existing visual system to the new semantic content**

In `app/globals.css`:

- remove `.operational-chapter strong` and `.operational-rail__receipt` rules;
- rename `--matched` to `--prepared` and `--pending` to `--returned` in rail selectors;
- keep red for `exception` and `returned`, amber for `prepared` and `approved`;
- add the use-case layout below using the existing paper surface and horizontal-rule rhythm:

```css
.use-cases { padding: clamp(72px, 10vw, 150px) clamp(24px, 5vw, 80px); color: var(--relay-ink); background: var(--relay-paper); }
.use-cases__intro { display: grid; grid-template-columns: minmax(0, 55%) minmax(16rem, 1fr); gap: clamp(32px, 6vw, 100px); align-items: end; }
.use-cases__intro h2 { max-width: 10ch; font-size: clamp(3rem, 7vw, 7rem); line-height: .82; }
.use-cases__list { margin: clamp(48px, 8vw, 96px) 0 0; padding: 0; border-top: 2px solid var(--relay-ink); list-style: none; }
.use-cases__list li { display: grid; grid-template-columns: 8% minmax(15rem, 34%) 1fr; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--relay-line); }
.use-cases__list span { font-family: var(--relay-font-mono); font-size: .72rem; }
.use-cases__list h3 { font-size: clamp(1.7rem, 3vw, 3.2rem); line-height: .9; }
.use-cases__list p { max-width: 40rem; }
.use-cases__boundary { max-width: 52rem; margin-top: 32px; padding-top: 20px; border-top: 5px solid var(--relay-exception); }
```

At `max-width: 768px`, make `.use-cases__intro` and `.use-cases__list li`
single-column. Preserve the numbered sequence and use at least 44 px vertical
spacing between examples.

- [ ] **Step 8: Run focused tests, lint and a build**

Run:

```bash
node --test tests/site-content-contract.test.mjs
npm run lint
npm run build
```

Expected: all PASS. The static build contains the five headings, the four
examples and no invented quantities.

- [ ] **Step 9: Commit the explanation slice**

```bash
git add tests/site-content-contract.test.mjs app/content/site-content.ts app/components/operational-story.tsx app/components/operational-rail.tsx app/components/use-case-examples.tsx app/page.tsx app/globals.css
git commit -m "feat: explain recurring work with concrete examples"
```

### Task 3: Measurable pilot and direct conversion handoff

**Files:**

- Modify: `tests/site-content-contract.test.mjs`
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/content/site-content.ts`
- Modify: `app/components/pilot-contract.tsx`
- Create: `app/components/conversion-handoff.tsx`
- Delete: `app/components/flow-form-preview.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `README.md`
- Modify: `docs/site-form-brief.md`

**Interfaces:**

- Consumes: existing `FORM_URL`, `#piloto` and `#contato` anchors.
- Produces: four-step `pilotContract`, `siteContent.cta.prompts`, a server-rendered `ConversionHandoff` and one direct external submission path.

- [ ] **Step 1: Write failing source-contract tests for pilot and conversion**

In `tests/site-content-contract.test.mjs`, replace the old page/form tests with:

```js
const conversionSource = await readFile(
  new URL("../app/components/conversion-handoff.tsx", import.meta.url),
  "utf8",
).catch(() => "");

test("o piloto mede valor antes de ampliar", () => {
  for (const step of ["Escolher", "Combinar", "Testar", "Decidir"]) {
    assert.match(source, new RegExp(`title: "${step}"`));
  }
  assert.match(source, /comparamos o tempo, o custo e a qualidade/);
  assert.match(source, /Frequência, prazo, critério de aceite e preço são definidos durante a avaliação do piloto/);
  assert.doesNotMatch(source, /SLA, critério de aceite e cobrança continuam em validação/);
});

test("a conversão mostra três perguntas e abre diretamente o formulário real", () => {
  for (const prompt of [
    "Qual trabalho se repete",
    "Com que frequência acontece",
    "Onde ele consome tempo ou dinheiro",
  ]) {
    assert.match(source, new RegExp(prompt));
  }
  assert.match(conversionSource, /href={FORM_URL}/);
  assert.match(conversionSource, /target="_blank"/);
  assert.match(conversionSource, /rel="noreferrer"/);
  assert.match(pageSource, /<ConversionHandoff \/>/);
  assert.doesNotMatch(pageSource, /FlowFormPreview/);
  assert.doesNotMatch(source, /Prévia local|Prévia sem envio|fields:/);
});
```

Remove reads and assertions that require `flow-form-preview.tsx`.

- [ ] **Step 2: Run the focused test and verify the old form contract fails it**

Run:

```bash
node --test tests/site-content-contract.test.mjs
```

Expected: FAIL because the new component source resolves to an empty string or
because the four pilot steps are absent.

- [ ] **Step 3: Replace pilot and conversion content with the approved text**

In `app/content/site-content.ts`, replace `pilotContract` with:

```ts
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
```

Replace `siteContent` with:

```ts
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
```

- [ ] **Step 4: Simplify the pilot component**

In `app/components/pilot-contract.tsx`, render `pilotContract.body` immediately
after the heading, keep the ordered four-step list, render `pilotContract.maturity`
after the list and remove the old limits block. The section remains:

```tsx
<section className="pilot-contract" id="piloto" aria-labelledby="pilot-title">
```

Do not create a second evidence boundary: the maturity note is the relevant
boundary for this section.

- [ ] **Step 5: Replace the fake preview with a server-rendered handoff**

Create `app/components/conversion-handoff.tsx`:

```tsx
import { FORM_URL, siteContent } from "../content/site-content";

export default function ConversionHandoff() {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="contact__body">
        <h2 id="contact-title">{siteContent.cta.title}</h2>
        <p>{siteContent.cta.body}</p>
      </div>
      <div className="conversion-handoff">
        <ol>
          {siteContent.cta.prompts.map((prompt, index) => (
            <li key={prompt}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{prompt}</strong>
            </li>
          ))}
        </ol>
        <p className="conversion-handoff__safety">{siteContent.cta.safety}</p>
        <a className="button button--amber" href={FORM_URL} target="_blank" rel="noreferrer">
          {siteContent.cta.action} <span aria-hidden="true">↗</span>
        </a>
        <p className="conversion-handoff__external-note">{siteContent.cta.externalNote}</p>
      </div>
    </section>
  );
}
```

In `app/page.tsx`, import and render `<ConversionHandoff />` after
`<PilotContract />`; remove the inline contact section and the
`FlowFormPreview` import. Delete `app/components/flow-form-preview.tsx`.

- [ ] **Step 6: Replace form CSS with a direct-handoff layout**

Delete selectors under `.flow-form-preview`, including form fields and checkbox
rules. Add:

```css
.conversion-handoff { grid-column: 2; }
.conversion-handoff ol { margin: 0 0 32px; padding: 0; border-top: 1px solid var(--relay-line-light); list-style: none; }
.conversion-handoff li { display: grid; grid-template-columns: 3rem 1fr; gap: 16px; padding: 20px 0; border-bottom: 1px solid var(--relay-line-light); }
.conversion-handoff li span { color: var(--relay-action); font-family: var(--relay-font-mono); font-size: .68rem; }
.conversion-handoff li strong { font-size: clamp(1.15rem, 2vw, 1.5rem); }
.conversion-handoff__safety, .conversion-handoff__external-note { max-width: 42rem; color: rgba(247, 242, 231, .72); }
.conversion-handoff .button { margin-top: 28px; }
.conversion-handoff__external-note { margin-top: 12px; font-size: .8rem; }
```

At `max-width: 768px`, give `.conversion-handoff` a `margin-top: 54px`. At
`max-width: 420px`, include `.conversion-handoff .button` in the existing 44 px
target-size rule.

- [ ] **Step 7: Update rendered-HTML expectations to the final page contract**

In `tests/rendered-html.test.mjs`:

- change the ordered section ids to
  `["top", "como-funciona", "onde-comecar", "piloto", "contato"]`;
- assert the new metadata description;
- assert the approved hero, five step titles, four example titles, pilot title,
  four pilot step names and conversion heading;
- assert that the Google Forms URL is inside the `#contato` section link with
  `target="_blank"` and `rel="noreferrer"`;
- assert the safety and external-destination notes;
- add negative assertions for `184 pedidos`, `179 correspondências`,
  `recibo sintético #014`, `Prévia local`, `Prévia sem envio`, `<form` and
  `id="formulario"`;
- keep the existing brand, static-export, `lang="pt-BR"`, forbidden product-name
  and localhost assertions.

Replace `assertOperationalStory` with a helper that checks the five stage ids in
order, the approved title and the four explicit rail labels:

```js
function assertOperationalStory(html) {
  const list = html.match(/<ol class="operational-story__chapters"[\s\S]*?<\/ol>/)?.[0] ?? "";
  let cursor = -1;
  for (const stage of ["source", "preparation", "approval", "execution", "result"]) {
    const next = list.indexOf(`data-stage="${stage}"`);
    assert.ok(next > cursor, `${stage} deve vir depois do estágio anterior na lista semântica`);
    cursor = next;
  }
  assert.match(html, /Do trabalho manual ao resultado entregue\./);
  assert.match(html, /A Relay executa\. Sua equipe decide o que exige julgamento\./);
  for (const label of ["preparado", "exceção", "aprovado", "devolvido"]) {
    assert.match(html, new RegExp(`operational-rail__branch[^>]*>${label}`));
  }
}
```

- [ ] **Step 8: Align repository documentation with the real handoff**

In `README.md`, replace the statement that the page contains a preview with:

```md
A única saída externa é a CTA para contar como funciona um trabalho recorrente.
Ela abre diretamente o formulário publicado no Google Forms; a página orienta a
não enviar dados pessoais sensíveis.
```

In `docs/site-form-brief.md`, keep the external form field contract and add under
the status line:

```md
A página institucional não replica estes campos. Ela antecipa somente trabalho,
frequência e impacto e leva a pessoa diretamente ao formulário publicado.
```

- [ ] **Step 9: Run the slice tests and full static render**

Run:

```bash
node --test tests/site-content-contract.test.mjs
npm run lint
npm test
```

Expected: PASS. `npm test` performs a fresh static build before running all
three test files; the output contains no local form.

- [ ] **Step 10: Commit the pilot and conversion slice**

```bash
git add tests/site-content-contract.test.mjs tests/rendered-html.test.mjs app/content/site-content.ts app/components/pilot-contract.tsx app/components/conversion-handoff.tsx app/components/flow-form-preview.tsx app/page.tsx app/globals.css README.md docs/site-form-brief.md
git commit -m "feat: send qualified use cases to the real form"
```

### Task 4: Responsive, fallback and independent-review gate

**Files:**

- Modify if required by evidence: `app/globals.css`
- Modify if required by evidence: `tests/site-content-contract.test.mjs`
- Modify if required by evidence: `tests/rendered-html.test.mjs`
- Verify: all files changed since `main`

**Interfaces:**

- Consumes: complete page contract from Tasks 1–3 and the unchanged
  `OperationalStoryMotion` controller.
- Produces: a locally visible page at `http://localhost:3001` with recorded
  automated, responsive, keyboard, reduced-motion and no-JavaScript evidence.

- [ ] **Step 1: Run the final automated gate once from a clean working tree**

Run:

```bash
npm run lint
npm test
git diff --check main...HEAD
git status --short
```

Expected: lint and all tests PASS; `npm test` includes the required fresh build;
`git diff --check` emits no output; status is clean. If a test fails, fix only
the behavior covered by Issue #14, rerun the failing command and then rerun this
gate because code changed.

- [ ] **Step 2: Start or confirm the local site on port 3001**

Run:

```bash
npm run dev
```

Expected: the development server reports `http://localhost:3001`. If another
healthy process already owns port 3001 and serves this checkout, reuse it.

- [ ] **Step 3: Inspect the page at four agreed widths**

In the local browser, inspect widths 1440, 1024, 768 and 390 px. At each width,
verify:

- hero headline and both actions are fully readable;
- navigation neither overlaps nor causes horizontal scrolling;
- the five steps remain in the approved order;
- rail labels do not collide at desktop/tablet widths;
- all four use cases and the evidence boundary are legible;
- the four pilot steps remain grouped with the maturity note;
- conversion prompts, warning and CTA remain visible;
- `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

Record any width-specific defect before changing CSS. Fix only confirmed
clipping, collision, reading-order or focus defects.

- [ ] **Step 4: Verify keyboard, reduced-motion and no-JavaScript behavior**

Use Tab from the top of the page and confirm every navigation/action link receives
a visible focus outline in reading order. Emulate `prefers-reduced-motion:
reduce` and confirm the story remains complete without sticky choreography.
Disable JavaScript, reload, and confirm the hero, five steps, examples, pilot,
conversion warning and real form link remain in the document.

Expected: no information or path to the form depends on JavaScript or motion.

- [ ] **Step 5: Verify the handoff without submitting or sending data**

Activate `Contar como funciona` and confirm it opens the existing Google Forms
URL in a new tab. Do not type into or submit the external form. Return to the
local page and confirm the nearby warning was visible before activation.

- [ ] **Step 6: Request one independent review**

Use `superpowers:requesting-code-review` with base `main`, head `HEAD`, Issue #14
and the approved spec. The review must check:

- exact approved copy and anchor order;
- absence of invented metrics and fake form UI;
- truthfulness of candidate-use-case and pilot language;
- accessibility/fallback regressions;
- responsive copy collisions.

Apply at most one correction cycle for in-scope findings. A non-critical new
visual experiment or conversion hypothesis becomes a new Issue.

- [ ] **Step 7: Re-run the final gate after any review correction**

If the review produced code changes, run:

```bash
npm run lint
npm test
git diff --check main...HEAD
```

Expected: PASS with no diff-check output. Commit the correction as:

```bash
git add app tests README.md docs
git commit -m "fix: address benefit-first copy review"
```

If the review required no changes, do not create an empty commit.

- [ ] **Step 8: Leave the local site visible for human approval**

Open `http://localhost:3001`, return to the top of the page and leave the tab
visible. Report automated results, browser widths checked, fallback results,
review findings and any SKIP. Do not create a PR until the user approves the
local result.

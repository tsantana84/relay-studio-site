# Relay Site Evidence Editorial Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reviewable, non-published prototype of the Relay Studio institutional site that turns qualified operations and finance leaders toward a first-pilot conversation through honest copy, a synthetic operational proof, and purposeful motion.

**Architecture:** Keep the static React/Vinext page and external Google Form, but replace the current nine-block narrative with seven concise sections. Store approved copy and synthetic data in a typed content module, render the proof as a server component, and add one progressively enhanced client motion controller; without JavaScript or with reduced motion, the complete page remains visible and understandable.

**Tech Stack:** React 19.2.6, TypeScript 5.9.3, Vinext 1.0.0-beta.2, CSS, `IntersectionObserver`, Node `node:test`, existing Relay brand assets.

**Spec:** `ROADMAP.md`

## Global Constraints

- This plan implements only the roadmap phase **Agora — definir e aprovar a nova experiência**.
- Do not merge, deploy, publish, change the external Google Form, add analytics, create a backend, or add packages.
- Label every proof artifact as synthetic; do not imply customer use, production operation, SLA, price, or market validation.
- Preserve the external form URL already present in `app/page.tsx`.
- The operational order is: source → preparation → exception or approval → authorized execution → result and receipt.
- Motion must add meaning to that order and must preserve all content with JavaScript disabled or `prefers-reduced-motion: reduce` enabled.
- Preserve keyboard access, visible focus, semantic heading order, Portuguese `lang`, static export, and the canonical brand SVGs.
- Avoid generic AI-site patterns: centered generic hero, purple gradients, blobs, glassmorphism, repeated rounded cards, abstract icon grids, fictitious dashboards, and decorative motion without narrative purpose.
- The implementation commits are a local prototype for review; they do not authorize adoption of the new homepage, deletion of the audit, merge, or publication.
- Execute each task as its own small Issue/increment under the Relay Delivery contract; stop after its tests and commit pass.
- Start execution from current `origin/main` on a dedicated branch in the canonical checkout. Use a worktree only if genuinely independent parallel work exists.

---

## File map

- **Create:** `app/content/site-content.ts` — single typed source for approved copy, CTA URL, recognition examples, pilot stages, mechanism, limits, and synthetic proof data.
- **Create:** `app/components/delivery-proof.tsx` — semantic server-rendered synthetic delivery artifact.
- **Create:** `app/components/site-motion.tsx` — progressive enhancement that marks visible motion elements; it contains no copy or business state.
- **Create:** `app/components/flow-form-preview.tsx` — interactive local form preview that never transmits data.
- **Create:** `docs/site-form-brief.md` — approved minimal questions, qualification rule, privacy warning, and measurement boundary for the external form.
- **Modify:** `app/page.tsx` — seven-section narrative and semantic composition.
- **Modify:** `app/layout.tsx` — metadata aligned with the honest pilot-stage positioning.
- **Modify:** `app/globals.css` — evidence-editorial layout, component states, responsive behavior, and motion choreography.
- **Preserve unused:** `app/components/workflow-audit.tsx` — remove it from the prototype path but do not delete it before the prototype is approved.
- **Create:** `tests/site-content-contract.test.mjs` — source-level content and claim contract independent of the build.
- **Modify:** `tests/rendered-html.test.mjs` — rendered narrative, ordering, proof, form, static export, and retired-audit contract.
- **Modify:** `package.json` — include every `tests/*.test.mjs` file in the normal test gate.

---

### Task 1: Lock the copy, data, and claim contract

**Files:**
- Create: `tests/site-content-contract.test.mjs`
- Create: `app/content/site-content.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: the form URL currently embedded in `app/page.tsx`.
- Produces: `FORM_URL: string`, `siteContent`, `deliveryProof`, and their inferred readonly TypeScript shapes for Tasks 2 and 3.

- [ ] **Step 1: Write the failing content-contract test**

Create `tests/site-content-contract.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const source = await readFile(new URL("../app/content/site-content.ts", import.meta.url), "utf8");

test("copy posiciona primeiros pilotos sem transformar hipótese em capacidade", () => {
  assert.match(source, /O trabalho recorrente termina\. Com evidência\./);
  assert.match(source, /Primeiros fluxos em validação/);
  assert.match(source, /Demonstração sintética/);
  assert.match(source, /Descrever um fluxo/);
  assert.doesNotMatch(source, /garantimos|autônom[oa]|qualquer empresa|em produção/i);
});

test("prova preserva a ordem de autorização", () => {
  const proofSource = source.slice(source.indexOf("export const deliveryProof"));
  const stages = ["source", "preparation", "approval", "execution", "result"];
  let cursor = -1;
  for (const stage of stages) {
    const next = proofSource.indexOf(`stage: "${stage}"`);
    assert.ok(next > cursor, `${stage} deve vir depois do estágio anterior`);
    cursor = next;
  }
  assert.match(source, /Dados fictícios/);
  assert.match(source, /recibo #014/);
});
```

- [ ] **Step 2: Run the test and verify the missing content module fails**

Run: `node --test tests/site-content-contract.test.mjs`

Expected: FAIL with `ENOENT` for `app/content/site-content.ts`.

- [ ] **Step 3: Create the typed content source**

Create `app/content/site-content.ts` with these exact exports and copy:

```ts
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
    {
      stage: "source",
      label: "Fontes",
      value: "184 pedidos · 184 repasses",
      detail: "Duas fontes autorizadas para o ensaio.",
    },
    {
      stage: "preparation",
      label: "Preparação",
      value: "179 correspondências encontradas",
      detail: "Cinco divergências foram separadas; nenhuma ação externa foi tomada.",
    },
    {
      stage: "approval",
      label: "Exceção e aprovação",
      value: "3 ajustes aprovados · 2 itens devolvidos",
      detail: "Decisão registrada pelo responsável financeiro.",
    },
    {
      stage: "execution",
      label: "Execução autorizada",
      value: "3 ajustes aplicados",
      detail: "Somente o conjunto aprovado seguiu para o fechamento.",
    },
    {
      stage: "result",
      label: "Resultado e recibo",
      value: "182 encerrados · 2 pendentes",
      detail: "Critério conferido · recibo #014.",
    },
  ],
} as const;
```

- [ ] **Step 4: Run the focused contract**

Run: `node --test tests/site-content-contract.test.mjs`

Expected: 2 tests PASS.

- [ ] **Step 5: Include every test file in the normal gate**

In `package.json`, replace the `test` script with:

```json
"test": "npm run build && node --test tests/*.test.mjs"
```

Run: `npm test`

Expected: the build and all five tests across the existing render suite and new content contract PASS.

- [ ] **Step 6: Commit the content contract**

```bash
git add app/content/site-content.ts tests/site-content-contract.test.mjs package.json
git commit -m "content: define evidence-led site narrative"
```

---

### Task 2: Render the synthetic delivery as the first proof

**Files:**
- Create: `app/components/delivery-proof.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `deliveryProof` from `app/content/site-content.ts`.
- Produces: `DeliveryProof(): JSX.Element`, section anchor `#prova`, ordered `data-stage` values, and visible synthetic disclosure for later styling and motion.

- [ ] **Step 1: Replace old proof assertions with the new rendered contract**

In the first test in `tests/rendered-html.test.mjs`, add:

```js
assert.match(html, /id="prova"/);
assert.match(html, /Demonstração sintética/);
assert.match(html, /Dados fictícios para demonstrar o percurso da entrega/);
const proofStart = html.indexOf('id="prova"');
const proofEnd = html.indexOf("</section>", proofStart);
const proof = html.slice(proofStart, proofEnd);
let stageCursor = -1;
for (const stage of ["source", "preparation", "approval", "execution", "result"]) {
  const next = proof.indexOf(`data-stage="${stage}"`);
  assert.ok(next > stageCursor, `${stage} deve vir depois do estágio anterior dentro de #prova`);
  stageCursor = next;
}
assert.match(html, /recibo #014/);
assert.match(html, /Frequência, SLA, critério de aceite e cobrança continuam em validação/);
```

Remove the old `fluxo-exemplo` assertion plus the assertions for “Uma reconciliação não precisa terminar na sua equipe” and the old wording “Frequência, SLA, critério de aceite e cobrança ainda estão em validação”. Leave the remaining old-page assertions until Task 3.

- [ ] **Step 2: Run the integration test and verify the new proof fails**

Run: `npm test`

Expected: FAIL because `#prova` and `Demonstração sintética` are absent.

- [ ] **Step 3: Create the semantic server component**

Create `app/components/delivery-proof.tsx`:

```tsx
import { deliveryProof } from "../content/site-content";

export default function DeliveryProof() {
  return (
    <section className="delivery-proof" id="prova" aria-labelledby="proof-title">
      <div className="delivery-proof__intro" data-motion="reveal">
        <p className="eyebrow eyebrow--ink">{deliveryProof.label}</p>
        <h2 id="proof-title">{deliveryProof.title}</h2>
        <p>{deliveryProof.period}</p>
        <p className="delivery-proof__disclosure">{deliveryProof.disclosure}</p>
      </div>
      <ol className="delivery-ledger" data-motion-sequence="delivery" aria-label="Percurso da entrega sintética">
        {deliveryProof.stages.map((item, index) => (
          <li
            className={`delivery-ledger__row delivery-ledger__row--${item.stage}`}
            data-motion="stage"
            data-stage={item.stage}
            key={item.stage}
          >
            <span className="delivery-ledger__index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{item.label}</h3>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="delivery-proof__commercial-note">{deliveryProof.commercialNote}</p>
    </section>
  );
}
```

- [ ] **Step 4: Replace the old `execution-example` section**

Import `DeliveryProof` in `app/page.tsx`. Replace the complete `<section className="execution-example" ...>` block with:

```tsx
<DeliveryProof />
```

Do not change other sections yet.

- [ ] **Step 5: Run focused and existing checks**

```bash
node --test tests/site-content-contract.test.mjs
npm test
npm run lint
```

Expected: all PASS.

- [ ] **Step 6: Commit the proof component**

```bash
git add app/components/delivery-proof.tsx app/page.tsx tests/rendered-html.test.mjs
git commit -m "feat: show a synthetic operational delivery"
```

---

### Task 3: Replace the old information architecture

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `FORM_URL` and `siteContent` from `app/content/site-content.ts`; `DeliveryProof` from Task 2.
- Produces: anchors `#top`, `#prova`, `#trabalho`, `#piloto`, `#mecanismo`, `#limites`, and `#contato`; no `#audit` or score-based client UI.

- [ ] **Step 1: Rewrite the rendered-page contract before the page**

Replace the old section loop and copy assertions in the first test with:

```js
const sections = ["top", "prova", "trabalho", "piloto", "mecanismo", "limites", "contato"];
let previous = -1;
for (const section of sections) {
  const position = html.indexOf(`id="${section}"`);
  assert.ok(position > previous, `#${section} deve vir depois da seção anterior`);
  previous = position;
}

assert.match(html, /O trabalho recorrente termina\. Com evidência\./);
assert.match(html, /Começamos pelo que se repete, pesa e precisa fechar/);
assert.match(html, /Começar pequeno é parte do método/);
assert.match(html, /A decisão humana vem antes da ação/);
assert.match(html, /Antes de executar, o limite precisa estar claro/);
assert.match(html, /Qual trabalho recorrente ainda termina na sua equipe/);
assert.match(html, /href="#prova">Ver uma entrega/);
assert.match(html, /https:\/\/docs\.google\.com\/forms\/d\/e\//);
assert.doesNotMatch(html, /id="audit"/);
assert.doesNotMatch(html, /Forte candidato|Vale investigar|Ainda não é prioridade/);
```

Keep assertions for `lang`, metadata, brand assets, external-form disclosure, static export, and absence of Relay OS/Web/Sim product names.

- [ ] **Step 2: Run the test and verify the old architecture fails**

Run: `npm test`

Expected: FAIL on the new hero and the presence of `#audit`.

- [ ] **Step 3: Rewrite `app/page.tsx` as seven semantic sections**

Replace `app/page.tsx` with this complete semantic composition:

```tsx
import DeliveryProof from "./components/delivery-proof";
import { FORM_URL, siteContent } from "./content/site-content";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <header className="hero__topline">
          <a className="wordmark" href="#top" aria-label="Relay Studio, início">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="brand/relay-icon-light.svg" alt="" width="28" height="28" />
            <span>Relay Studio</span>
          </a>
          <nav className="site-nav" aria-label="Navegação principal">
            <a href="#prova">Prova</a>
            <a href="#piloto">Primeiro piloto</a>
            <a href="#limites">Limites</a>
          </nav>
        </header>
        <div className="hero__content">
          <div className="hero__copy">
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <h1 id="hero-title">{siteContent.hero.title}</h1>
            <p className="hero__lede">{siteContent.hero.lede}</p>
            <div className="hero__actions">
              <a className="button button--amber" href={FORM_URL} target="_blank" rel="noreferrer">
                {siteContent.hero.primaryCta} <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link text-link--light" href="#prova">
                {siteContent.hero.secondaryCta} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <p className="hero__note">{siteContent.hero.note}</p>
        </div>
      </section>
      <DeliveryProof />
      <section className="recognition" id="trabalho" aria-labelledby="recognition-title">
        <div className="section-intro">
          <p className="eyebrow eyebrow--ink">{siteContent.recognition.eyebrow}</p>
          <h2 id="recognition-title">{siteContent.recognition.title}</h2>
          <p>{siteContent.recognition.body}</p>
        </div>
        <div className="recognition__list">
          {siteContent.recognition.items.map((item, index) => (
            <article className="recognition__item" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pilot" id="piloto" aria-labelledby="pilot-title">
        <div className="section-intro">
          <p className="eyebrow">{siteContent.pilot.eyebrow}</p>
          <h2 id="pilot-title">{siteContent.pilot.title}</h2>
        </div>
        <ol className="pilot__stages">
          {siteContent.pilot.stages.map((stage, index) => (
            <li key={stage.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
        <p className="section-note section-note--light">{siteContent.pilot.note}</p>
      </section>
      <section className="mechanism" id="mecanismo" aria-labelledby="mechanism-title">
        <div className="section-intro">
          <p className="eyebrow eyebrow--ink">{siteContent.mechanism.eyebrow}</p>
          <h2 id="mechanism-title">{siteContent.mechanism.title}</h2>
          <p>{siteContent.mechanism.body}</p>
        </div>
        <ol className="mechanism__rail" aria-label="Ordem de execução governada">
          {siteContent.mechanism.stages.map((stage, index) => (
            <li data-stage={stage.stage} key={stage.stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage.title}</strong>
            </li>
          ))}
        </ol>
      </section>
      <section className="limits" id="limites" aria-labelledby="limits-title">
        <div className="section-intro">
          <p className="eyebrow eyebrow--ink">{siteContent.limits.eyebrow}</p>
          <h2 id="limits-title">{siteContent.limits.title}</h2>
        </div>
        <ul className="limits__list">
          {siteContent.limits.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="limits__note">{siteContent.limits.note}</p>
      </section>
      <section className="contact" id="contato" aria-labelledby="contact-title">
        <div className="contact__body">
          <p className="eyebrow">{siteContent.cta.eyebrow}</p>
          <h2 id="contact-title">{siteContent.cta.title}</h2>
          <p>{siteContent.cta.body}</p>
          <a className="button button--amber" href={FORM_URL} target="_blank" rel="noreferrer">
            {siteContent.cta.action} <span aria-hidden="true">↗</span>
          </a>
          <p className="contact__note">{siteContent.cta.externalNote}</p>
        </div>
      </section>
      <footer className="site-footer">
        <a className="wordmark wordmark--dark" href="#top" aria-label="Relay Studio, início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="brand/relay-icon-dark.svg" alt="" width="28" height="28" />
          <span>Relay Studio</span>
        </a>
        <p>Trabalhar na coisa certa.</p>
        <span>© {new Date().getFullYear()} Relay Studio</span>
      </footer>
    </main>
  );
}
```

- [ ] **Step 4: Remove the audit only from the prototype path**

Remove the `WorkflowAudit` import and rendered `<WorkflowAudit />` from `app/page.tsx`. Preserve `app/components/workflow-audit.tsx` unchanged until the prototype is approved. Confirm `rg -n 'WorkflowAudit|#audit|id="audit"' app/page.tsx tests` finds only assertions intended to prove absence.

- [ ] **Step 5: Align metadata with the approved stage**

In `app/layout.tsx`, keep the title and replace the description with:

```ts
description:
  "A Relay avalia primeiros pilotos de execução operacional para transformar um fluxo recorrente em resultado, exceções e evidência.",
```

- [ ] **Step 6: Run the content, render, lint, and diff checks**

```bash
node --test tests/site-content-contract.test.mjs
npm test
npm run lint
git diff --check
```

Expected: all PASS; `rg -n 'WorkflowAudit|Forte candidato' app` returns no matches.

- [ ] **Step 7: Commit the new information architecture**

```bash
git add app/page.tsx app/layout.tsx tests/rendered-html.test.mjs
git commit -m "feat: focus the site on qualified pilot conversations"
```

---

### Task 4: Define the short-form contract without changing the external form

**Files:**
- Create: `docs/site-form-brief.md`
- Create: `app/components/flow-form-preview.tsx`
- Modify: `app/page.tsx`
- Modify: `tests/rendered-html.test.mjs`
- Modify: `tests/site-content-contract.test.mjs`

**Interfaces:**
- Consumes: `FORM_URL` and the CTA promise from Task 1.
- Produces: seven required inputs including impact, one required safety acknowledgement, a no-submit local preview, a manual qualification rule, and a measurement boundary for a later separately authorized Google Form change.

- [ ] **Step 1: Add a failing brief contract**

Append to `tests/site-content-contract.test.mjs`:

```js
const formBrief = await readFile(new URL("../docs/site-form-brief.md", import.meta.url), "utf8");

test("formulário é curto, qualificável e não pede conteúdo operacional", () => {
  for (const field of ["Nome e e-mail de trabalho", "Papel na operação", "Fluxo recorrente", "Frequência", "Fontes", "Resultado esperado", "Impacto hoje"]) {
    assert.match(formBrief, new RegExp(field));
  }
  assert.match(formBrief, /não envie dados pessoais sensíveis/i);
  assert.match(formBrief, /não classificar automaticamente/i);
  assert.doesNotMatch(formBrief, /anexar|upload|senha|token/i);
});
```

- [ ] **Step 2: Run the contract and verify the brief is missing**

Run: `node --test tests/site-content-contract.test.mjs`

Expected: FAIL with `ENOENT` for `docs/site-form-brief.md`.

- [ ] **Step 3: Create the exact form brief**

Create `docs/site-form-brief.md`:

```markdown
# Formulário — descrever um fluxo

**Status:** contrato de conteúdo para revisão; não altera o Google Form publicado.

## Abertura

Descreva um único trabalho recorrente. Não envie dados pessoais sensíveis, credenciais, documentos, planilhas nem conteúdo operacional real.

## Campos obrigatórios

1. **Nome e e-mail de trabalho** — como podemos responder.
2. **Papel na operação** — Operações; Financeiro; Direção; Tecnologia; Outro.
3. **Fluxo recorrente** — em uma frase, qual trabalho ainda termina na sua equipe?
4. **Frequência** — Diário; Semanal; Quinzenal; Mensal; Outro ciclo previsível.
5. **Fontes** — quais tipos de planilha, documento ou sistema participam? Informe somente nomes ou categorias; não cole dados.
6. **Resultado esperado** — o que precisa existir para alguém considerar o trabalho concluído?
7. **Impacto hoje** — onde o custo aparece: horas, atraso, erro ou retrabalho?

## Confirmação obrigatória

Confirmo que não enviei dados pessoais sensíveis, credenciais nem conteúdo operacional real e aceito receber contato sobre este fluxo.

## Qualificação manual

Uma conversa é qualificável quando há um responsável identificável, recorrência, fontes delimitáveis e resultado conferível. Não classificar automaticamente, não prometer piloto e não interpretar envio como validação de demanda.

## Medição futura

Medir clique no CTA, início e envio somente depois de decisão explícita sobre ferramenta, consentimento e retenção. O conteúdo das respostas não entra em analytics.
```

- [ ] **Step 4: Run the focused contract**

Run: `node --test tests/site-content-contract.test.mjs`

Expected: all content and form brief tests PASS.

- [ ] **Step 5: Add a failing rendered-preview contract**

In the first test in `tests/rendered-html.test.mjs`, add:

```js
assert.match(html, /id="formulario"/);
assert.match(html, /Prévia local · nenhum dado é enviado/);
assert.match(html, /Impacto hoje/);
assert.match(html, /Prévia sem envio/);
assert.match(html, /href="#formulario">Descrever um fluxo/);
```

Run: `npm test`

Expected: FAIL because the local preview and hero anchor do not exist.

- [ ] **Step 6: Create the no-submit form preview**

Create `app/components/flow-form-preview.tsx`:

```tsx
"use client";

import type { FormEvent } from "react";
import { FORM_URL, siteContent } from "../content/site-content";

export default function FlowFormPreview() {
  function preventSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="flow-form-preview" id="formulario">
      <p className="flow-form-preview__label">{siteContent.form.label}</p>
      <p id="form-preview-safety">{siteContent.form.safety}</p>
      <form aria-describedby="form-preview-safety" onSubmit={preventSubmission}>
        {siteContent.form.fields.map((field) => (
          <label htmlFor={`preview-${field.id}`} key={field.id}>
            <span>{field.label}</span>
            {field.kind === "select" ? (
              <select defaultValue="" id={`preview-${field.id}`} required>
                <option disabled value="">Selecione</option>
                {field.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            ) : field.kind === "textarea" ? (
              <textarea id={`preview-${field.id}`} rows={3} required />
            ) : (
              <input id={`preview-${field.id}`} type="text" required />
            )}
          </label>
        ))}
        <label className="flow-form-preview__confirmation">
          <input required type="checkbox" />
          <span>Confirmo que não incluí dados sensíveis ou conteúdo operacional real.</span>
        </label>
        <button className="button button--amber" type="submit">{siteContent.form.submit}</button>
      </form>
      <p className="flow-form-preview__external-note">{siteContent.cta.externalNote}</p>
      <a className="text-link" href={FORM_URL} target="_blank" rel="noreferrer">
        Abrir o formulário atual <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
```

This component accepts typing locally but `preventSubmission` guarantees that neither click nor Enter transmits the entered data.

- [ ] **Step 7: Put the preview in the prototype conversion section**

Import `FlowFormPreview` in `app/page.tsx`. Change the hero primary CTA from `href={FORM_URL}` to `href="#formulario"` and remove `target`/`rel` from that anchor. Remove `FORM_URL` from the `app/page.tsx` import, remove the external button and external note from `.contact__body`, then render `<FlowFormPreview />` inside `#contato`, immediately after `.contact__body`. The preview contains the single preserved external Google Forms link.

- [ ] **Step 8: Run the normal gate and verify no form transmission contract exists**

```bash
npm test
npm run lint
if rg -n 'action=|fetch\(|XMLHttpRequest|sendBeacon' app/components/flow-form-preview.tsx; then exit 1; fi
git diff --check
```

Expected: tests and lint PASS; the transmission scan returns no matches.

- [ ] **Step 9: Commit the form contract and preview**

```bash
git add docs/site-form-brief.md app/components/flow-form-preview.tsx app/page.tsx tests/rendered-html.test.mjs tests/site-content-contract.test.mjs
git commit -m "feat: prototype the qualified-flow form"
```

Stop here: changing the live Google Form is a separate external action and is not authorized by this plan.

---

### Task 5: Build the evidence-editorial visual system

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/site-content-contract.test.mjs`

**Interfaces:**
- Consumes: the semantic classes and `data-stage` attributes from Tasks 2 and 3.
- Produces: tokens `--relay-clay`, `--relay-moss`, section layouts, proof ledger, compact navigation, responsive 900 px and 620 px behavior, and visible focus states.

- [ ] **Step 1: Add a failing CSS contract**

Append to `tests/site-content-contract.test.mjs`:

```js
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("sistema visual reserva cor para ação, exceção e evidência", () => {
  assert.match(css, /--relay-clay\s*:/);
  assert.match(css, /--relay-moss\s*:/);
  assert.match(css, /\.delivery-ledger__row--approval/);
  assert.match(css, /\.delivery-ledger__row--result/);
  assert.match(css, /@media \(max-width: 620px\)/);
  assert.match(css, /:focus-visible/);
});
```

- [ ] **Step 2: Run the contract and verify the new visual hooks fail**

Run: `node --test tests/site-content-contract.test.mjs`

Expected: FAIL because clay, moss, and new proof selectors are absent.

- [ ] **Step 3: Replace obsolete section CSS with the new system**

Keep the reset and brand base, then set these tokens in `:root`:

```css
--relay-navy: #0d1520;
--relay-paper: #f3efe9;
--relay-ink: #111215;
--relay-amber: #e59820;
--relay-clay: #a85f46;
--relay-moss: #66745e;
--relay-line: rgba(17, 18, 21, 0.16);
```

Keep the current font stacks, wordmark, buttons, focus treatment, and hero navy/paper contrast. Replace obsolete section rules with these semantic rules:

```css
.delivery-proof {
  display: grid;
  grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);
  gap: clamp(40px, 8vw, 120px);
  padding: clamp(72px, 10vw, 150px) clamp(24px, 5vw, 80px);
  background: var(--relay-paper);
}

.delivery-ledger { margin: 0; padding: 0; list-style: none; border-top: 4px solid var(--relay-amber); }
.delivery-ledger__row { display: grid; grid-template-columns: 48px 1fr; gap: 18px; padding: 22px 0; border-bottom: 1px solid var(--relay-line); }
.delivery-ledger__row--approval { border-left: 4px solid var(--relay-clay); padding-left: 18px; }
.delivery-ledger__row--result { border-bottom-color: var(--relay-moss); color: var(--relay-moss); }
.recognition, .pilot, .mechanism, .limits, .contact { padding: clamp(72px, 10vw, 150px) clamp(24px, 5vw, 80px); }
.recognition, .limits { background: var(--relay-paper); color: var(--relay-ink); }
.pilot, .contact { background: var(--relay-navy); color: var(--relay-paper); }
.section-intro { max-width: 820px; }
.section-intro h2, .contact h2 { max-width: 760px; font-size: clamp(2.5rem, 6vw, 6.5rem); line-height: .98; }
.section-intro > p:last-child, .contact__body > p { max-width: 640px; margin-top: 24px; }
.hero__note { align-self: end; max-width: 290px; padding-top: 16px; border-top: 1px solid var(--relay-line-light); color: rgba(243, 239, 233, .64); }
.delivery-proof__intro { align-self: start; position: sticky; top: 32px; }
.delivery-proof__intro h2 { font-size: clamp(2.4rem, 5vw, 5.5rem); line-height: .98; }
.delivery-proof__disclosure { margin-top: 28px; color: var(--relay-muted); }
.delivery-ledger__row strong { display: block; margin-top: 8px; font-weight: 600; }
.delivery-ledger__row p { max-width: 560px; margin-top: 6px; color: var(--relay-muted); }
.recognition__list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 72px; border-top: 1px solid var(--relay-line); }
.recognition__item { padding: 24px 28px 12px 0; border-right: 1px solid var(--relay-line); }
.recognition__item:last-child { border-right: 0; padding-right: 0; padding-left: 28px; }
.recognition__item:nth-child(2) { padding-left: 28px; }
.recognition__item h3 { margin-top: 48px; }
.recognition__item p { margin-top: 12px; color: var(--relay-muted); }
.pilot__stages { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin: 72px 0 0; padding: 0; list-style: none; border-top: 1px solid var(--relay-line-light); }
.pilot__stages li { padding: 24px 28px 16px 0; border-right: 1px solid var(--relay-line-light); }
.pilot__stages li + li { padding-left: 28px; }
.pilot__stages li:last-child { border-right: 0; }
.pilot__stages h3 { margin-top: 48px; }
.pilot__stages p { margin-top: 12px; color: rgba(243, 239, 233, .68); }
.section-note--light { margin-top: 56px; color: var(--relay-amber); }
.mechanism { display: grid; grid-template-columns: minmax(0, .9fr) minmax(360px, 1.1fr); gap: clamp(40px, 8vw, 120px); background: #e8e1d8; color: var(--relay-ink); }
.mechanism__rail { margin: 0; padding: 0; list-style: none; border-left: 1px solid var(--relay-line); }
.mechanism__rail li { display: grid; grid-template-columns: 44px 1fr; gap: 16px; padding: 18px 0 18px 24px; border-bottom: 1px solid var(--relay-line); }
.mechanism__rail li[data-stage="approval"] { border-left: 4px solid var(--relay-clay); }
.mechanism__rail li[data-stage="result"] { color: var(--relay-moss); }
.limits { display: grid; grid-template-columns: minmax(0, .9fr) minmax(320px, 1.1fr); gap: clamp(40px, 8vw, 120px); }
.limits__list { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--relay-line); }
.limits__list li { padding: 20px 0; border-bottom: 1px solid var(--relay-line); }
.limits__note { grid-column: 2; padding-left: 18px; border-left: 4px solid var(--relay-clay); color: var(--relay-muted); }
.contact__body { max-width: 900px; }
.contact .button { margin-top: 36px; }
.contact__note { color: rgba(243, 239, 233, .6); }
.flow-form-preview { max-width: 900px; margin-top: 64px; padding-top: 28px; border-top: 1px solid var(--relay-line-light); }
.flow-form-preview__label { color: var(--relay-amber); font-family: var(--relay-font-mono); text-transform: uppercase; }
.flow-form-preview form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; margin-top: 32px; }
.flow-form-preview label { display: grid; gap: 8px; }
.flow-form-preview label:has(textarea), .flow-form-preview__confirmation { grid-column: 1 / -1; }
.flow-form-preview input, .flow-form-preview select, .flow-form-preview textarea { width: 100%; padding: 12px; border: 1px solid var(--relay-line-light); border-radius: 0; color: var(--relay-paper); background: transparent; font: inherit; }
.flow-form-preview__confirmation { display: flex; grid-template-columns: none; align-items: flex-start; }
.flow-form-preview__confirmation input { width: auto; margin-top: 4px; }
.flow-form-preview__external-note { margin-top: 24px; color: rgba(243, 239, 233, .6); }
.flow-form-preview .text-link { margin-top: 24px; color: rgba(243, 239, 233, .7); }
```

Use rules, whitespace, indices, and deliberate asymmetry instead of card grids. Do not use `border-radius` above `8px`, translucent white panels, purple, or decorative gradients. Remove selectors that only served `.audit`, `.execution-example`, `.vision`, `.build`, `.principles`, `.privacy`, and `.interest` after `rg` proves those classes no longer exist in JSX.

- [ ] **Step 4: Implement responsive reading order**

Add these exact responsive overrides after the desktop rules:

```css
@media (max-width: 900px) {
  .delivery-proof, .mechanism, .limits { grid-template-columns: 1fr; }
  .delivery-proof__intro { position: static; }
  .limits__note { grid-column: 1; }
  .recognition__list, .pilot__stages { grid-template-columns: 1fr; }
  .recognition__item, .recognition__item:nth-child(2), .recognition__item:last-child,
  .pilot__stages li, .pilot__stages li + li {
    padding: 24px 0;
    border-right: 0;
    border-bottom: 1px solid var(--relay-line);
  }
}

@media (max-width: 620px) {
  .hero, .delivery-proof, .recognition, .pilot, .mechanism, .limits, .contact { padding-left: 24px; padding-right: 24px; }
  .hero__topline { align-items: flex-start; gap: 20px; }
  .site-nav { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 12px; }
  .hero__content { grid-template-columns: 1fr; min-height: auto; padding: 96px 0 64px; }
  .hero__note { align-self: start; }
  .delivery-ledger__row { grid-template-columns: 34px 1fr; }
  .button { min-height: 44px; }
  .flow-form-preview form { grid-template-columns: 1fr; }
  .flow-form-preview label:has(textarea), .flow-form-preview__confirmation { grid-column: 1; }
  .site-footer { align-items: flex-start; flex-direction: column; gap: 20px; }
}
```

Do not hide the entire navigation at either breakpoint.

- [ ] **Step 5: Run static checks and build**

```bash
node --test tests/site-content-contract.test.mjs
npm run lint
GITHUB_PAGES_BASE_PATH=/relay-studio-site npm run build
node --test tests/rendered-html.test.mjs
git diff --check
```

Expected: all PASS and no references to removed selectors in `app/page.tsx`.

- [ ] **Step 6: Commit the visual system**

```bash
git add app/globals.css tests/site-content-contract.test.mjs
git commit -m "style: establish the evidence editorial system"
```

---

### Task 6: Choreograph operational motion without hiding content

**Files:**
- Create: `app/components/site-motion.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/site-content-contract.test.mjs`

**Interfaces:**
- Consumes: standalone elements marked `data-motion="reveal"` and ordered containers marked `data-motion-sequence`, whose children use `data-motion="stage"` in DOM order.
- Produces: `SiteMotion(): null`; root state `data-motion-ready="true"` and per-element `data-motion-state="visible"`, with each sequence revealed in deterministic order.

- [ ] **Step 1: Add the failing progressive-motion contract**

Append:

```js
const motion = await readFile(new URL("../app/components/site-motion.tsx", import.meta.url), "utf8");

test("motion é progressivo e respeita preferência reduzida", () => {
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /addEventListener\("change"/);
  assert.match(motion, /data-motion-state/);
  assert.match(css, /html\[data-motion-ready="true"\]/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
```

- [ ] **Step 2: Run the contract and verify the controller is missing**

Run: `node --test tests/site-content-contract.test.mjs`

Expected: FAIL with `ENOENT` for `site-motion.tsx`.

- [ ] **Step 3: Create the motion controller**

Create `app/components/site-motion.tsx`:

```tsx
"use client";

import { useEffect } from "react";

export default function SiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const standalone = Array.from(document.querySelectorAll<HTMLElement>('[data-motion="reveal"]'));
    const sequences = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-sequence]"));
    const timers: number[] = [];

    function revealAll() {
      [...standalone, ...sequences].forEach((element) => {
        element.setAttribute("data-motion-state", "visible");
        element.querySelectorAll<HTMLElement>('[data-motion="stage"]').forEach((stage) =>
          stage.setAttribute("data-motion-state", "visible"),
        );
      });
    }

    function handleReducedMotion() {
      if (!reduced.matches) return;
      document.documentElement.removeAttribute("data-motion-ready");
      timers.forEach((timer) => window.clearTimeout(timer));
      revealAll();
    }

    reduced.addEventListener("change", handleReducedMotion);

    function reveal(element: HTMLElement) {
      if (element.hasAttribute("data-motion-sequence")) {
        const stages = Array.from(element.querySelectorAll<HTMLElement>('[data-motion="stage"]'));
        stages.forEach((stage, index) => {
          timers.push(window.setTimeout(() => stage.setAttribute("data-motion-state", "visible"), index * 180));
        });
        return;
      }
      element.setAttribute("data-motion-state", "visible");
    }

    if (reduced.matches || !("IntersectionObserver" in window)) {
      revealAll();
      return () => reduced.removeEventListener("change", handleReducedMotion);
    }

    document.documentElement.setAttribute("data-motion-ready", "true");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.18 },
    );

    [...standalone, ...sequences].forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      reduced.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  return null;
}
```

- [ ] **Step 4: Mount progressive enhancement once**

Import `SiteMotion` in `app/page.tsx` and render `<SiteMotion />` as the first child of `<main>`. Add `data-motion="reveal"` to each section intro. Add `data-motion-sequence="pilot"` and `data-motion-sequence="mechanism"` to their ordered lists and `data-motion="stage"` to each child step. `DeliveryProof` already exposes `data-motion-sequence="delivery"`. Do not move content into the client component and do not observe individual stage rows.

- [ ] **Step 5: Add meaningful state transitions**

Use these base states and extend them for the narrative:

```css
[data-motion] { opacity: 1; transform: none; }

html[data-motion-ready="true"] [data-motion] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 520ms ease, transform 700ms cubic-bezier(.2, .75, .2, 1);
}

html[data-motion-ready="true"] [data-motion="stage"] { transform: translateX(24px); }
html[data-motion-ready="true"] [data-motion-state="visible"] { opacity: 1; transform: none; }

.delivery-ledger__row--approval[data-motion-state="visible"] { transition-delay: 120ms; }
.delivery-ledger__row--result[data-motion-state="visible"] { transition-delay: 180ms; }

@media (prefers-reduced-motion: reduce) {
  html[data-motion-ready="true"] [data-motion] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

Add the proof rail, approval gate, and receipt settlement with these rules:

```css
.delivery-ledger__row { position: relative; }
.delivery-ledger__row::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 18px;
  width: 1px;
  background: var(--relay-line);
  content: "";
  transform: scaleY(1);
  transform-origin: top;
  transition: none;
}
html[data-motion-ready="true"] .delivery-ledger__row::before {
  transform: scaleY(0);
  transition: transform 620ms cubic-bezier(.2, .75, .2, 1);
}
html[data-motion-ready="true"] .delivery-ledger__row[data-motion-state="visible"]::before { transform: scaleY(1); }
.delivery-ledger__row--approval::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--relay-clay);
  content: "";
  transform: scaleY(1);
  transform-origin: top;
  transition: none;
}
html[data-motion-ready="true"] .delivery-ledger__row--approval::after {
  transform: scaleY(0);
  transition: transform 520ms ease 120ms;
}
html[data-motion-ready="true"] .delivery-ledger__row--approval[data-motion-state="visible"]::after { transform: scaleY(1); }
.delivery-ledger__row--result strong {
  display: inline-block;
  transform: none;
  transition: none;
}
html[data-motion-ready="true"] .delivery-ledger__row--result strong {
  transform: rotate(-2deg) translateY(10px);
  transition: transform 540ms cubic-bezier(.2, .75, .2, 1) 180ms;
}
html[data-motion-ready="true"] .delivery-ledger__row--result[data-motion-state="visible"] strong { transform: rotate(-2deg) translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .delivery-ledger__row::before,
  .delivery-ledger__row--approval::after { transform: scaleY(1); transition: none; }
  .delivery-ledger__row--result strong { transform: none; transition: none; }
  html[data-motion-ready="true"] .delivery-ledger__row::before,
  html[data-motion-ready="true"] .delivery-ledger__row--approval::after {
    transform: scaleY(1);
    transition: none;
  }
  html[data-motion-ready="true"] .delivery-ledger__row--result strong {
    transform: none;
    transition: none;
  }
}
```

Do not use infinite animation, cursor-following effects, parallax on body text, or motion that changes reading order.

- [ ] **Step 6: Validate static and enhanced behavior**

```bash
node --test tests/site-content-contract.test.mjs
npm test
npm run lint
git diff --check
```

Expected: all PASS. With JavaScript disabled, every `[data-motion]` element remains visible because hidden states require `html[data-motion-ready="true"]`.

- [ ] **Step 7: Commit the motion layer**

```bash
git add app/components/site-motion.tsx app/page.tsx app/globals.css tests/site-content-contract.test.mjs
git commit -m "feat: choreograph the operational evidence flow"
```

---

### Task 7: Complete the prototype acceptance gate

**Files:**
- Modify only files implicated by observed defects.

**Interfaces:**
- Consumes: complete prototype from Tasks 1–6.
- Produces: a clean, reviewable branch and evidence for founder review; no merge or deployment.

- [ ] **Step 1: Run the repository gate once**

```bash
npm run lint
npm test
GITHUB_PAGES_BASE_PATH=/relay-studio-site npm run build
git diff --check
```

Expected: all PASS. If a check cannot run, record **SKIP** with the exact reason; do not call it PASS.

- [ ] **Step 2: Start the local static prototype**

Run: `npm run dev`

Open: `http://localhost:3001/`

Expected: page title “Relay Studio — execução operacional”; no console error; external form link remains the approved Google Forms URL.

- [ ] **Step 3: Review 1440 px, 1024 px, and 390 px**

At each width, verify:

- hero promise, synthetic label, proof exception, approval, result, and primary CTA are discoverable;
- `document.documentElement.scrollWidth <= window.innerWidth`;
- headings do not clip and body text remains readable;
- the compact mobile navigation keeps Prova, Primeiro piloto, and Limites;
- the local form preview fits without clipping, exposes all seven fields, and keeps its safety warning adjacent;
- the page does not resemble a generic card-based SaaS template.

- [ ] **Step 4: Review keyboard and reduced motion**

Tab through navigation, the seven preview fields, safety checkbox, no-submit button, and external-form link; every focus indicator must be visible and follow DOM order. Fill the preview with fictitious text and press Enter: the page must not navigate and no network request may contain the entered values. While the page is open, switch `prefers-reduced-motion` from normal to `reduce` without reloading; every section and proof row must become visible with no transform or transition. Disable JavaScript; the complete narrative and proof must remain present; the preview may be non-submittable because it is explicitly labeled local.

- [ ] **Step 5: Review the motion story at normal settings**

Scroll from hero through the proof once. Confirm the visual order is source → preparation → exception/approval → authorized execution → result/receipt; approval visibly interrupts the flow; result motion occurs only after execution; no infinite or decorative loop competes with reading.

- [ ] **Step 6: Apply at most one focused correction cycle**

Fix only defects found in Steps 1–5, rerun the affected focused check, then rerun the repository gate once if code changed. Additional non-critical ideas become new Issues.

- [ ] **Step 7: Commit acceptance fixes if needed**

```bash
git add app tests
git commit -m "fix: close site prototype acceptance gaps"
```

Skip this commit when no file changed.

- [ ] **Step 8: Open a draft PR for founder review**

The PR description must list the commits, checks, manual viewport evidence, any **SKIP**, the synthetic-proof disclaimer, and the explicit limits: no merge, deploy, external-form change, analytics, or customer validation. Stop with the draft PR and local preview ready for the founder; do not merge or publish.

---

### Task 8: Prepare the separate comprehension test

**Files:**
- Create: `docs/validation/site-v2-test-kit.md`

**Interfaces:**
- Consumes: founder-approved prototype from Task 7.
- Produces: one fixed moderation script and scoring rule for five independent sessions; it does not authorize participant contact.

- [ ] **Step 1: Confirm the founder checkpoint**

Proceed only after the founder approves the prototype. Participant recruitment and invitations require a separate explicit authorization; do not contact anyone in this task.

- [ ] **Step 2: Create the fixed test kit**

Create `docs/validation/site-v2-test-kit.md` with the following script and rules:

```markdown
# Site v2 — teste de compreensão

## Público

Cinco pessoas com responsabilidade em operações ou financeiro. Registrar somente P1–P5; não guardar nome, empresa, contato, gravação ou exemplo operacional.

## Primeira dobra — 10 segundos

1. O que a Relay entrega?
2. Para quem este serviço parece ter sido feito?
3. Isto já está operando para clientes ou está em validação?
4. Qual seria seu próximo passo se tivesse esse problema?

## Prova operacional

5. Os dados apresentados são reais ou sintéticos?
6. Onde o fluxo parou para uma decisão humana?
7. O que aconteceu somente depois da aprovação?

## Formulário local

8. Que informações você precisaria ter para preencher esta prévia?
9. Existe algo que a página orienta você a não enviar?
10. Sem enviar nada, localize a saída para o formulário atual.

## Dimensões

- Oferta: fluxo recorrente delimitado; resultado, exceções e evidência.
- Público: operações ou financeiro.
- Estágio: primeiros pilotos ou validação, não operação de cliente.
- Ação: descrever um fluxo.
- Prova: dados sintéticos, aprovação humana e execução autorizada posterior.
- Formulário: entende os campos, o limite de dados e localiza a saída externa.

Uma sessão passa somente quando as seis dimensões passam. O gate final exige quatro de cinco sessões aprovadas; não usar média entre dimensões.
```

- [ ] **Step 3: Verify the kit has no personal-data fields or changing script**

```bash
if rg -n 'Nome real|Empresa real|E-mail|Telefone|Gravação' docs/validation/site-v2-test-kit.md; then exit 1; fi
git diff --check
```

Expected: privacy scan returns no match and diff check PASS.

- [ ] **Step 4: Commit the fixed kit**

```bash
git add docs/validation/site-v2-test-kit.md
git commit -m "docs: fix the site comprehension protocol"
```

Stop if the founder has not authorized a recruitment path or no participants are available. Record the test as **SKIP/pendente** in the draft PR; do not treat founder approval as external comprehension evidence.

---

### Task 9: Run five sessions as independent increments

**Files:**
- Create: `docs/validation/site-v2-session-p1.md`
- Create: `docs/validation/site-v2-session-p2.md`
- Create: `docs/validation/site-v2-session-p3.md`
- Create: `docs/validation/site-v2-session-p4.md`
- Create: `docs/validation/site-v2-session-p5.md`

**Interfaces:**
- Consumes: the unchanged script in `docs/validation/site-v2-test-kit.md` and five authorized participants.
- Produces: five anonymized session records, one file and one Relay Delivery Issue per participant.

- [ ] **Step 1: Create five small Issues before the first session**

Create one Issue for each of P1–P5. Each Issue has a 15-minute active-time ceiling, the same script, one session file, and the stop condition “answers and six dimension results recorded”. Do not group recruitment, scheduling, moderation, and synthesis into one Issue.

- [ ] **Step 2: Run P1 and commit only its anonymized record**

Show the first fold, proof, and form preview exactly as directed by the kit. Create `docs/validation/site-v2-session-p1.md` with date, prototype commit, concise paraphrases for questions 1–10, and PASS/FAIL for all six dimensions. Do not include identifying data.

```bash
git add docs/validation/site-v2-session-p1.md
git commit -m "docs: record site comprehension session p1"
```

- [ ] **Step 3: Run P2 and commit only its anonymized record**

Repeat the unchanged kit. Create `docs/validation/site-v2-session-p2.md` with the same observed fields and privacy limits.

```bash
git add docs/validation/site-v2-session-p2.md
git commit -m "docs: record site comprehension session p2"
```

- [ ] **Step 4: Run P3 and commit only its anonymized record**

Repeat the unchanged kit. Create `docs/validation/site-v2-session-p3.md` with the same observed fields and privacy limits.

```bash
git add docs/validation/site-v2-session-p3.md
git commit -m "docs: record site comprehension session p3"
```

- [ ] **Step 5: Run P4 and commit only its anonymized record**

Repeat the unchanged kit. Create `docs/validation/site-v2-session-p4.md` with the same observed fields and privacy limits.

```bash
git add docs/validation/site-v2-session-p4.md
git commit -m "docs: record site comprehension session p4"
```

- [ ] **Step 6: Run P5 and commit only its anonymized record**

Repeat the unchanged kit. Create `docs/validation/site-v2-session-p5.md` with the same observed fields and privacy limits.

```bash
git add docs/validation/site-v2-session-p5.md
git commit -m "docs: record site comprehension session p5"
```

- [ ] **Step 7: Run the privacy scan across all session files**

```bash
if rg -n '[[:alnum:]._%+-]+@[[:alnum:].-]+\.[[:alpha:]]{2,}|Nome real|Empresa real|Telefone|Gravação' docs/validation/site-v2-session-p*.md; then exit 1; fi
git diff --check
```

Expected: privacy scan returns no match and diff check PASS.

---

### Task 10: Synthesize the comprehension decision

**Files:**
- Create: `docs/validation/site-v2-comprehension.md`

**Interfaces:**
- Consumes: the five session files from Task 9.
- Produces: one explicit PASS or FAIL gate; no automatic product or market claim.

- [ ] **Step 1: Count sessions that passed every dimension**

Read P1–P5 and count a participant only when Oferta, Público, Estágio, Ação, Prova, and Formulário are all PASS. Do not average dimensions or infer missing answers.

- [ ] **Step 2: Apply the fixed decision rule**

- PASS: at least four of five complete sessions pass all six dimensions.
- FAIL: fewer than four complete sessions pass all six dimensions.
- SKIP: fewer than five sessions were available; this is unavailable evidence, not a failed message.

- [ ] **Step 3: Write the synthesis from observed results**

Create `docs/validation/site-v2-comprehension.md` with date, prototype commit, status, P1–P5 dimension results, total complete passes, concise evidence, decision, and next Issue if applicable. Use only observed values and leave no field unfilled.

- [ ] **Step 4: Choose one bounded next action**

- PASS: keep the narrative and request a separate decision before entering the roadmap phase Próximo.
- FAIL: identify the single dimension with the most failures and open one Issue for one copy, hierarchy, proof, or form hypothesis.
- SKIP: record why sessions were unavailable and keep the prototype at internal-approval maturity.

- [ ] **Step 5: Validate and commit the synthesis**

```bash
if rg -n '[[:alnum:]._%+-]+@[[:alnum:].-]+\.[[:alpha:]]{2,}|Nome real|Empresa real|Telefone|Gravação' docs/validation/site-v2-comprehension.md; then exit 1; fi
git diff --check
git add docs/validation/site-v2-comprehension.md
git commit -m "docs: record the site comprehension decision"
```

Expected: privacy scan returns no match and diff check PASS. Stop after the evidence commit; do not merge or publish.

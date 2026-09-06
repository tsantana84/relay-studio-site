# Operational Story Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the conventional institutional homepage with a distinctive scroll-controlled operational story that follows one synthetic task from authorized source to recorded receipt.

**Architecture:** Keep the route statically rendered and move narrative content into typed content data consumed by small server components. A single client-only controller writes normalized scroll progress to CSS custom properties; semantic content and the complete reduced-motion/no-JavaScript experience never depend on that controller.

**Tech Stack:** React 19, TypeScript 5.9, Vinext 1.0 beta, CSS custom properties, IntersectionObserver, requestAnimationFrame, Node test runner, `@fontsource-variable/anybody@5.3.0`, and `@fontsource-variable/geologica@5.3.0`.

**Spec:** `docs/superpowers/specs/2026-09-06-operational-story-redesign.md`

## Global Constraints

- The page remains a static route and does not add a backend, CMS, analytics service, form provider, WebGL layer, or general animation framework.
- The approved creative ratio is 80% living operational system and 20% manifesto.
- The synthetic case order is `source → preparation → approval → execution → result`.
- The story must disclose fictitious data and must not imply production use, customer results, or market validation.
- Without JavaScript and with `prefers-reduced-motion: reduce`, all chapters remain visible, complete, and in semantic document order.
- Motion uses transforms, opacity, masks, clip paths, bounded blur, color, shadow, and display-font axes; no whole-section fade-and-rise, bounce, elastic easing, decorative particles, or gratuitous parallax.
- The existing local form preview remains non-submitting, and the explicit Google Forms handoff remains intact.
- New compressed font transfer stays below 180 KB; otherwise use the native body stack and keep only the display font.
- Validate at 1440 px, 1024 px, 768 px, and 390 px with no unintended horizontal overflow.
- End every task with the current branch visible at `http://localhost:3001` for human review.

## File Structure

- `app/content/site-content.ts`: owns all public copy, the five story chapters, synthetic figures, pilot contract, limits, and form configuration.
- `app/components/operational-hero.tsx`: renders the navigation, proposition, initial task signal, and calls to action.
- `app/components/operational-story.tsx`: renders the ordered semantic chapters and delegates rail decoration.
- `app/components/operational-rail.tsx`: renders presentational rail segments, gates, branch labels, and the final receipt.
- `app/components/manifesto-cut.tsx`: renders one short typographic interruption with an accessible text equivalent.
- `app/components/pilot-contract.tsx`: renders pilot steps and limits as one bounded contract.
- `app/components/operational-story-motion.tsx`: owns scroll measurement, active chapter state, and CSS custom property updates.
- `app/components/operational-story-state.mjs`: derives active chapter and normalized progress from measured chapter intervals without touching the DOM.
- `app/components/operational-story-state.d.mts`: gives the pure state module an exact TypeScript interface.
- `app/components/flow-form-preview.tsx`: retains behavior; only class composition and copy references may change.
- `app/page.tsx`: composes the single-page narrative in document order.
- `app/layout.tsx`: links the relative self-hosted font stylesheet and preloads the display face.
- `app/globals.css`: owns the approved visual system, responsive composition, static fallbacks, and motion rendering.
- `tests/site-content-contract.test.mjs`: verifies evidence boundaries, content order, motion architecture source, and CSS fallbacks.
- `tests/rendered-html.test.mjs`: verifies final semantic order, disclosures, form handoff, and rendered static output.

---

### Task 1: Render the static operational story

**Files:**
- Modify: `app/content/site-content.ts`
- Create: `app/components/operational-hero.tsx`
- Create: `app/components/operational-story.tsx`
- Create: `app/components/operational-rail.tsx`
- Create: `app/components/manifesto-cut.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/site-content-contract.test.mjs`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: existing `FORM_URL`, `siteContent.form`, and `deliveryProof` evidence values.
- Produces: `operationalStory.chapters`, `OperationalHero`, `OperationalStory`, `OperationalRail`, and `ManifestoCut`; later tasks add the pilot contract and motion without changing these semantic interfaces.

- [ ] **Step 1: Write failing content-contract tests for the approved sequence**

Add assertions that require one exported story, five stages in order, the human-stop message, the closing manifesto, and the evidence boundary:

```js
const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const storySource = await readFile(new URL("../app/components/operational-story.tsx", import.meta.url), "utf8");

test("a história operacional segue uma tarefa até a evidência", () => {
  const stages = ["source", "preparation", "approval", "execution", "result"];
  let cursor = -1;
  for (const stage of stages) {
    const next = source.indexOf(`stage: "${stage}"`);
    assert.ok(next > cursor, `${stage} deve vir depois do estágio anterior`);
    cursor = next;
  }
  assert.match(source, /Você entra quando importa/);
  assert.match(source, /Sem caixa-preta\. Sem teatro\. Com responsabilidade\./);
  assert.match(source, /Dados fictícios/);
  assert.match(pageSource, /<OperationalHero \/>/);
  assert.match(pageSource, /<OperationalStory \/>/);
  assert.match(storySource, /<ol[^>]*className="operational-story__chapters"/);
});
```

- [ ] **Step 2: Run the focused contract test and confirm the intended failure**

Run:

```bash
node --test tests/site-content-contract.test.mjs
```

Expected: FAIL because `operational-story.tsx`, `operationalStory`, `OperationalHero`, and `OperationalStory` do not exist.

- [ ] **Step 3: Add the typed narrative content**

Keep the current form configuration and export this new shape from `app/content/site-content.ts`:

```ts
export const operationalStory = {
  hero: {
    kicker: "Um fluxo delimitado",
    title: "O trabalho anda.",
    accent: "Você entra quando importa.",
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
```

- [ ] **Step 4: Build the server-rendered story components**

Implement the components with semantic HTML and no client directive. `OperationalStory` must preserve the ordered list even when decoration is absent:

```tsx
export default function OperationalStory() {
  return (
    <section className="operational-story" id="prova" aria-labelledby="story-title" data-operational-story>
      <header className="operational-story__intro">
        <p>{operationalStory.disclosure}</p>
        <h2 id="story-title">Uma tarefa entra. Uma prova sai.</h2>
        <p>{operationalStory.productBoundary}</p>
      </header>
      <div className="operational-story__scroll">
        <div className="operational-story__stage" aria-hidden="true">
          <OperationalRail chapters={operationalStory.chapters} />
        </div>
        <ol className="operational-story__chapters">
          {operationalStory.chapters.map((chapter) => (
            <li className="operational-chapter" data-story-chapter data-stage={chapter.stage} key={chapter.stage}>
              <span>{chapter.index} / {chapter.verb}</span>
              <h3>{chapter.title}</h3>
              <strong>{chapter.value}</strong>
              <p>{chapter.detail}</p>
              {chapter.stage === "approval" ? <ManifestoCut>{operationalStory.manifesto.decision}</ManifestoCut> : null}
            </li>
          ))}
        </ol>
      </div>
      <ManifestoCut>{operationalStory.manifesto.closing}</ManifestoCut>
    </section>
  );
}
```

The entire `.operational-story__stage` is `aria-hidden="true"`; every value and state remains in the ordered chapter text. The stage and chapters are siblings inside `.operational-story__scroll`, so enhanced desktop can keep the stage sticky while semantic chapters remain the scroll intervals. `OperationalHero` links its primary CTA to `#formulario` and its secondary CTA to `#prova`.

- [ ] **Step 5: Compose the new opening and story in the page**

Replace the current hero and `DeliveryProof` usage with:

```tsx
<main>
  <OperationalHero />
  <OperationalStory />
  {/* Existing lower-page pilot, mechanism, limits, contact and footer remain temporarily intact. */}
</main>
```

Do not render `SiteMotion`; Task 3 introduces its replacement. Keep the lower-page sections in their current order so this increment stays complete and reversible.

- [ ] **Step 6: Add a coherent static visual foundation**

Add concrete base selectors to `app/globals.css` so this increment is presentable before motion:

```css
:root {
  --relay-navy: #061321;
  --relay-paper: #f7f2e7;
  --relay-ink: #111416;
  --relay-action: #ffb000;
  --relay-exception: #f2442c;
  --relay-decision: #dfff45;
  --relay-line-light: rgba(247, 242, 231, 0.18);
}

.operational-hero,
.operational-story { color: var(--relay-paper); background: var(--relay-navy); }

.operational-story__chapters { margin: 0; padding: 0; list-style: none; }

.operational-story__stage { position: static; min-height: 18rem; overflow: visible; }

.operational-chapter {
  min-height: 72vh;
  padding: clamp(48px, 8vw, 120px) clamp(24px, 5vw, 80px);
  border-top: 1px solid var(--relay-line-light);
}

.operational-chapter[data-stage="approval"] { color: var(--relay-decision); }
.operational-chapter[data-stage="result"] { color: var(--relay-paper); }
```

Remove only CSS made unreachable by the replaced hero and delivery proof. Leave lower-page styles until Task 2 replaces their markup.

In `tests/site-content-contract.test.mjs`, replace the current hero typography and `.delivery-ledger` selector assertions in this same step with assertions for `.operational-hero h1`, `.operational-story__stage`, `.operational-chapter[data-stage="approval"]`, and the visible-default story layout. Do not leave any Task 1 test requiring CSS removed by Task 1.

- [ ] **Step 7: Update the rendered HTML test for the new opening and sequence**

Require the new IDs and copy, then keep all existing safety assertions:

```js
function assertOperationalStory(html) {
  const list = html.match(/<ol class="operational-story__chapters"[\s\S]*?<\/ol>/)?.[0] ?? "";
  let cursor = -1;
  for (const stage of ["source", "preparation", "approval", "execution", "result"]) {
    const next = list.indexOf(`data-stage="${stage}"`);
    assert.ok(next > cursor, `${stage} deve vir depois do estágio anterior na lista semântica`);
    cursor = next;
  }
  assert.match(html, /Uma tarefa entra\. Uma prova sai\./);
  assert.match(html, /Demonstração sintética/);
  assert.match(html, /não representa uma operação de cliente/);
  assert.match(html, /Você entra quando importa/);
  assert.match(html, /recibo sintético #014/);
  assert.match(html, /id="formulario"/);
  assert.match(html, /https:\/\/docs\.google\.com\/forms\/d\/e\//);
}

assertOperationalStory(html);
```

Call the same helper from the static-export test after reading `dist/client/index.html`; do not validate the stage order against the duplicated decorative rail.

In the same edit, remove the obsolete expectations for the previous hero sentence, `DeliveryProof` ledger markup, and old `#trabalho → #piloto → #mecanismo` section sequence. Retain the language, title, form-safety, external-handoff, brand-asset, and forbidden-product-name assertions.

- [ ] **Step 8: Run focused tests and build**

Run:

```bash
node --test tests/site-content-contract.test.mjs
npm run build
node --test tests/rendered-html.test.mjs
```

Expected: all commands PASS.

- [ ] **Step 9: Present the increment locally**

Keep `npm run dev` serving the branch at `http://localhost:3001`. Inspect desktop at 1440 px and mobile at 390 px, then open the page for the user. Stop for human review before Task 2.

- [ ] **Step 10: Commit the static story**

```bash
git add app/content/site-content.ts app/components/operational-hero.tsx app/components/operational-story.tsx app/components/operational-rail.tsx app/components/manifesto-cut.tsx app/page.tsx app/globals.css tests/site-content-contract.test.mjs tests/rendered-html.test.mjs
git commit -m "feat: tell one operational story"
```

---

### Task 2: Complete the visual system and pilot contract

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/layout.tsx`
- Modify: `PRODUCT.md`
- Create: `public/fonts/anybody-latin-wdth-normal.woff2`
- Create: `public/fonts/geologica-latin-wght-normal.woff2`
- Create: `public/fonts/OFL-Anybody.txt`
- Create: `public/fonts/OFL-Geologica.txt`
- Create: `public/fonts/fonts.css`
- Create: `app/components/pilot-contract.tsx`
- Modify: `app/content/site-content.ts`
- Modify: `app/page.tsx`
- Modify: `app/components/flow-form-preview.tsx`
- Modify: `app/globals.css`
- Delete: `app/components/delivery-proof.tsx`
- Modify: `tests/site-content-contract.test.mjs`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `operationalStory`, `siteContent.form`, `FORM_URL`, and the server components from Task 1.
- Produces: `pilotContract.steps`, `pilotContract.limits`, `PilotContract`, final full-page semantic order, and stable typography tokens consumed by Task 3 motion CSS.

- [ ] **Step 1: Write failing tests for the final page contract and visual tokens**

Require the final composition, font imports, four state colors, and absence of the obsolete component:

```js
const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const fontsCss = await readFile(new URL("../public/fonts/fonts.css", import.meta.url), "utf8");

test("a página final conecta prova, contrato, limites e conversa", () => {
  assert.match(pageSource, /<PilotContract \/>/);
  assert.match(pageSource, /<FlowFormPreview \/>/);
  assert.doesNotMatch(pageSource, /<DeliveryProof \/>/);
  assert.match(source, /Escolher um fluxo delimitado/);
  assert.match(source, /A fonte e a finalidade são autorizadas/);
});

test("o sistema visual usa fontes locais e cores semânticas", () => {
  assert.match(layoutSource, /rel="preload"/);
  assert.match(layoutSource, /fonts\/anybody-latin-wdth-normal\.woff2/);
  assert.match(layoutSource, /fonts\/fonts\.css/);
  assert.match(fontsCss, /@font-face[\s\S]*?Anybody Variable/);
  assert.match(fontsCss, /@font-face[\s\S]*?Geologica Variable/);
  for (const token of ["--relay-action", "--relay-exception", "--relay-decision", "--relay-paper"]) {
    assert.match(css, new RegExp(token));
  }
});
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run:

```bash
node --test tests/site-content-contract.test.mjs
```

Expected: FAIL because `PilotContract`, local font faces, and the display-font preload do not exist.

- [ ] **Step 3: Install pinned font sources and copy only the required Latin assets**

Run:

```bash
npm install --save-dev --save-exact @fontsource-variable/anybody@5.3.0 @fontsource-variable/geologica@5.3.0
mkdir -p public/fonts
cp node_modules/@fontsource-variable/anybody/files/anybody-latin-wdth-normal.woff2 public/fonts/
cp node_modules/@fontsource-variable/geologica/files/geologica-latin-wght-normal.woff2 public/fonts/
cp node_modules/@fontsource-variable/anybody/LICENSE public/fonts/OFL-Anybody.txt
cp node_modules/@fontsource-variable/geologica/LICENSE public/fonts/OFL-Geologica.txt
```

Declare only these two assets in `public/fonts/fonts.css`; the font URLs are relative to that stylesheet so they remain valid on the GitHub Pages subpath:

```css
@font-face {
  font-family: "Anybody Variable";
  src: url("anybody-latin-wdth-normal.woff2") format("woff2-variations");
  font-style: normal;
  font-weight: 100 900;
  font-stretch: 50% 150%;
  font-display: swap;
}

@font-face {
  font-family: "Geologica Variable";
  src: url("geologica-latin-wght-normal.woff2") format("woff2-variations");
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}
```

Set `--relay-font-display: "Anybody Variable", sans-serif` and `--relay-font-body: "Geologica Variable", system-ui, sans-serif` in `app/globals.css`. Add `<link rel="stylesheet" href="fonts/fonts.css" />` and one `<link rel="preload" href="fonts/anybody-latin-wdth-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />` inside `<head>` in `app/layout.tsx`; do not preload the body face. If the two font requests exceed 184,320 transferred bytes on a cold-cache Portuguese page load, remove Geologica, its package and copied files, restore the native body stack, and update the test to require that native fallback.

- [ ] **Step 4: Add pilot-contract content and component**

Add this exact content shape:

```ts
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
```

Render steps as `<ol>` and limits as `<ul>` inside one `section#piloto`. Wrap the limits heading and list in an element with `id="limites"` so the existing navigation target remains valid. Keep the maturity and product-boundary statements adjacent to the steps.

- [ ] **Step 5: Finish the page composition**

Compose only these top-level sections after Task 2:

```tsx
<main>
  <OperationalHero />
  <OperationalStory />
  <PilotContract />
  <section className="contact" id="contato" aria-labelledby="contact-title">
    {/* existing safe CTA copy */}
    <FlowFormPreview />
  </section>
  <footer className="site-footer">...</footer>
</main>
```

Remove the obsolete recognition, pilot, mechanism, and limits markup from `page.tsx`. Delete `delivery-proof.tsx` after confirming no imports remain.

Update `PRODUCT.md` in the same task so its narrative description states that the page follows one synthetic task from authorized sources through preparation, human approval, authorized execution, and recorded result before the pilot contract, limits, and conversion.

Replace the remaining source tests for `.recognition`, `.mechanism`, old reveal attributes, and their obsolete color tokens in the same edit. Task 1 already migrated the hero and delivery-ledger assertions. Add rendered assertions for both `href="#limites"` and `id="limites"` so the navigation contract cannot drift when the sections are consolidated.

- [ ] **Step 6: Implement the approved 80/20 visual system**

Use the approved tokens and these committed typography rules:

```css
h1, h2, h3, .manifesto-cut {
  font-family: var(--relay-font-display);
  font-variation-settings: "wdth" 72, "wght" 820;
}

.operational-hero h1 {
  max-width: 8ch;
  font-size: clamp(4.8rem, 13vw, 12rem);
  line-height: 0.74;
  letter-spacing: -0.075em;
}

.manifesto-cut {
  overflow: hidden;
  padding: clamp(14px, 2vw, 28px) clamp(24px, 5vw, 80px);
  color: var(--relay-ink);
  background: var(--relay-decision);
  font-size: clamp(2.3rem, 7vw, 7.5rem);
  line-height: 0.78;
  text-transform: uppercase;
}

.operational-chapter[data-stage="preparation"] { --stage-color: var(--relay-exception); }
.operational-chapter[data-stage="approval"] { --stage-color: var(--relay-decision); }
.operational-chapter[data-stage="execution"] { --stage-color: var(--relay-action); }
.operational-chapter[data-stage="result"] { --stage-color: var(--relay-paper); }
```

Use asymmetric 70/30 or 80/20 splits, squared geometry, the persistent rail, and one receipt object. Do not add rounded feature cards, gradient text, glass panels, decorative side stripes, or repeated tiny uppercase eyebrows.

- [ ] **Step 7: Restyle the pilot, limits, form, and footer without changing behavior**

The pilot contract uses warm paper, black type, and strong horizontal rules. The form remains navy with paper inputs and visible focus. Retain `preventSubmission`, its safety confirmation checkbox, `target="_blank"`, and `rel="noreferrer"` exactly.

- [ ] **Step 8: Run tests, build, and verify the font budget**

Run:

```bash
npm run lint
npm test
stat -f '%z %N' public/fonts/*.woff2
rg -n 'fonts/(anybody|geologica)-latin' dist/client/index.html dist/client/_next/static
```

Expected: lint PASS, the build inside `npm test` PASS, all tests PASS, and the two copied WOFF2 files total less than 184,320 bytes. In a cold-cache browser load, confirm that only those two font URLs are requested and that the display face is preloaded. Block both requests once and confirm the hero, accented Portuguese text, manifesto, and 390 px layout do not overlap or clip.

- [ ] **Step 9: Present the visual-system increment locally**

Keep the branch visible at `http://localhost:3001`. Inspect the complete static page at 1440 px and 390 px, then open it for the user. Stop for human review before Task 3.

- [ ] **Step 10: Commit the completed static experience**

```bash
git add package.json package-lock.json app/layout.tsx PRODUCT.md public/fonts app/components/pilot-contract.tsx app/content/site-content.ts app/page.tsx app/components/flow-form-preview.tsx app/globals.css tests/site-content-contract.test.mjs tests/rendered-html.test.mjs
git add -u app/components/delivery-proof.tsx
git commit -m "style: establish the living system direction"
```

---

### Task 3: Drive the story with scroll progress

**Files:**
- Create: `app/components/operational-story-state.mjs`
- Create: `app/components/operational-story-state.d.mts`
- Create: `app/components/operational-story-motion.tsx`
- Modify: `app/components/operational-story.tsx`
- Modify: `app/components/operational-rail.tsx`
- Modify: `app/components/manifesto-cut.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Delete: `app/components/site-motion.tsx`
- Create: `tests/operational-story-state.test.mjs`
- Modify: `tests/site-content-contract.test.mjs`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `[data-operational-hero]`, `[data-operational-story]`, child `[data-story-chapter][data-stage]` elements, `[data-story-rail]`, and the stable scroll wrapper from Task 1.
- Produces: `deriveStoryState(anchorY, storyTop, storyHeight, chapters)`, story CSS variables `--story-progress`, `--chapter-progress`, `--chapter-index`, `data-active-stage`, and independent `data-motion-state="ready"` attributes on the hero and story roots.

- [ ] **Step 1: Write failing behavior tests for chapter state derivation**

Create `tests/operational-story-state.test.mjs`:

```js
import assert from "node:assert/strict";
import { test } from "node:test";
import { deriveStoryState } from "../app/components/operational-story-state.mjs";

const chapters = [
  { top: 1000, height: 800, stage: "source" },
  { top: 1800, height: 800, stage: "preparation" },
  { top: 2600, height: 800, stage: "approval" },
  { top: 3400, height: 800, stage: "execution" },
  { top: 4200, height: 800, stage: "result" },
];

test("deriva limites e progresso usando intervalos reais dos capítulos", () => {
  assert.deepEqual(deriveStoryState(900, 1000, 4000, chapters), {
    overallProgress: 0,
    chapterIndex: 0,
    chapterProgress: 0,
    activeStage: "source",
  });
  assert.equal(deriveStoryState(1400, 1000, 4000, chapters).chapterProgress, 0.5);
  assert.equal(deriveStoryState(1850, 1000, 4000, chapters).activeStage, "preparation");
  assert.deepEqual(deriveStoryState(6000, 1000, 4000, chapters), {
    overallProgress: 1,
    chapterIndex: 4,
    chapterProgress: 1,
    activeStage: "result",
  });
});
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run:

```bash
node --test tests/operational-story-state.test.mjs
```

Expected: FAIL because `operational-story-state.mjs` does not exist.

- [ ] **Step 3: Implement and type the pure state function**

Create `app/components/operational-story-state.mjs`:

```js
const clamp = (value) => Math.min(1, Math.max(0, value));

export function deriveStoryState(anchorY, storyTop, storyHeight, chapters) {
  if (chapters.length === 0) {
    return { overallProgress: 0, chapterIndex: 0, chapterProgress: 0, activeStage: "source" };
  }

  let chapterIndex = 0;
  for (let index = 0; index < chapters.length; index += 1) {
    if (anchorY >= chapters[index].top) chapterIndex = index;
  }
  const chapter = chapters[chapterIndex];
  return {
    overallProgress: clamp((anchorY - storyTop) / Math.max(1, storyHeight)),
    chapterIndex,
    chapterProgress: clamp((anchorY - chapter.top) / Math.max(1, chapter.height)),
    activeStage: chapter.stage,
  };
}
```

Create `app/components/operational-story-state.d.mts` with exact exported `ChapterMetric`, `StoryState`, and function declarations matching the JavaScript implementation.

- [ ] **Step 4: Run the behavior test and confirm GREEN**

Run:

```bash
node --test tests/operational-story-state.test.mjs
```

Expected: 1 test PASS.

- [ ] **Step 5: Write failing source-contract tests for lifecycle safeguards**

Replace the obsolete `SiteMotion` assertions in `tests/site-content-contract.test.mjs` with source checks for every required branch:

```js
const motion = await readFile(new URL("../app/components/operational-story-motion.tsx", import.meta.url), "utf8");

test("o controlador suspende trabalho e preserva fallback", () => {
  assert.match(motion, /if \(!\("IntersectionObserver" in window\)\) return/);
  assert.match(motion, /if \(!visible \|\| reduced\.matches \|\| frame\) return/);
  assert.match(motion, /cancelAnimationFrame/);
  assert.match(motion, /document\.fonts\.ready/);
  assert.match(motion, /data-active-stage|activeStage/);
  assert.match(motion, /removeProperty\("--story-progress"\)/);
  assert.match(css, /@media \(min-width: 769px\) and \(prefers-reduced-motion: no-preference\)/);
  assert.doesNotMatch(css, /cubic-bezier\([^)]*1\.5/);
});
```

Run `node --test tests/site-content-contract.test.mjs`; expect FAIL because the new controller does not exist.

- [ ] **Step 6: Implement one client scroll controller**

Create a client component with these exact lifecycle rules:

```tsx
"use client";

import { useEffect } from "react";
import { deriveStoryState, type ChapterMetric } from "./operational-story-state.mjs";

export default function OperationalStoryMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-operational-story]");
    const hero = document.querySelector<HTMLElement>("[data-operational-hero]");
    if (!root) return;
    if (!("IntersectionObserver" in window)) return;

    const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-story-chapter]"));
    if (chapters.length === 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let disposed = false;
    let storyTop = 0;
    let storyHeight = 1;
    let metrics: ChapterMetric[] = [];

    const measure = () => {
      metrics = chapters.map((chapter) => {
        const rect = chapter.getBoundingClientRect();
        return {
          top: window.scrollY + rect.top,
          height: rect.height,
          stage: chapter.dataset.stage ?? "source",
        };
      });
      storyTop = metrics[0].top;
      const finalChapter = metrics[metrics.length - 1];
      storyHeight = finalChapter.top + finalChapter.height - storyTop;
    };
    const render = () => {
      frame = 0;
      if (!visible || reduced.matches) return;
      const state = deriveStoryState(
        window.scrollY + window.innerHeight * 0.5,
        storyTop,
        storyHeight,
        metrics,
      );
      root.style.setProperty("--story-progress", state.overallProgress.toFixed(4));
      root.style.setProperty("--chapter-index", String(state.chapterIndex));
      root.style.setProperty("--chapter-progress", state.chapterProgress.toFixed(4));
      root.dataset.activeStage = state.activeStage;
    };
    const requestRender = () => {
      if (!visible || reduced.matches || frame) return;
      frame = window.requestAnimationFrame(render);
    };
    const cancelFrame = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };
    const clearEnhancement = () => {
      cancelFrame();
      root.removeAttribute("data-motion-state");
      root.removeAttribute("data-active-stage");
      root.style.removeProperty("--story-progress");
      root.style.removeProperty("--chapter-index");
      root.style.removeProperty("--chapter-progress");
      hero?.removeAttribute("data-motion-state");
    };
    const handleResize = () => {
      measure();
      requestRender();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { cancelFrame(); return; }
      if (reduced.matches) return;
      root.dataset.motionState = "ready";
      measure();
      requestRender();
    });
    const handlePreferenceChange = () => {
      if (reduced.matches) {
        clearEnhancement();
      } else {
        hero?.setAttribute("data-motion-state", "ready");
        if (visible) {
          root.dataset.motionState = "ready";
          measure();
          requestRender();
        }
      }
    };

    if (!reduced.matches) hero?.setAttribute("data-motion-state", "ready");
    observer.observe(root);
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    reduced.addEventListener("change", handlePreferenceChange);
    document.fonts.ready.then(() => {
      if (!disposed && visible && !reduced.matches) handleResize();
    });
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", handleResize);
      reduced.removeEventListener("change", handlePreferenceChange);
      clearEnhancement();
    };
  }, []);

  return null;
}
```

- [ ] **Step 7: Connect the hero and story to the controller**

Add `data-operational-hero` to the hero root and `data-story-rail` to the decorative rail; Task 1 already supplies `data-story-chapter` and `data-stage`. Render `<OperationalStoryMotion />` once inside `<main>`. Do not move copy into the client component.

- [ ] **Step 8: Implement the scroll choreography behind one enhancement condition**

Base styles keep the stage and chapters in normal flow without clipping. Put every sticky or clip-based rule behind the exact desktop/no-preference/ready condition:

```css
@media (min-width: 769px) and (prefers-reduced-motion: no-preference) {
  .operational-story[data-motion-state="ready"] .operational-story__scroll {
    position: relative;
  }
  .operational-story[data-motion-state="ready"] .operational-story__stage {
    position: sticky;
    top: 0;
    height: 100svh;
    overflow: clip;
  }
  .operational-story[data-motion-state="ready"] .operational-rail__active {
    transform: scaleX(var(--story-progress));
    transform-origin: left center;
  }
  .operational-hero[data-motion-state="ready"] .operational-hero__title {
    animation: operational-hero-enter 650ms cubic-bezier(.16, 1, .3, 1) both;
  }
}
```

Map each visual state with explicit selectors such as `.operational-story[data-active-stage="approval"]`; do not attempt unsupported equality checks against numeric CSS variables. Use transforms and clip paths for the two manifesto cuts, and show the receipt only for `data-active-stage="result"`.

- [ ] **Step 9: Keep all fallback modes in the base layout**

Default CSS is the visible document-flow layout:

```css
.operational-story__stage { position: static; min-height: 18rem; overflow: visible; }
.operational-story__chapters { display: grid; }
.manifesto-cut { clip-path: none; transform: none; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Do not add a `no-js` bootstrap class. Missing JavaScript, missing `IntersectionObserver`, mobile widths, and reduced motion never match the enhanced sticky selector.

- [ ] **Step 10: Run focused and rendered tests**

Run:

```bash
node --test tests/operational-story-state.test.mjs tests/site-content-contract.test.mjs
npm run build
node --test tests/rendered-html.test.mjs
```

Expected: all commands PASS, and rendered HTML still contains every chapter and disclosure.

- [ ] **Step 11: Verify motion and lifecycle locally**

At `http://localhost:3001`, verify with browser tooling:

1. At 1440 px, the rail advances continuously and each chapter changes state at the correct scroll range.
2. The approval gate stops visually before execution proceeds.
3. The two pending items remain visible through the result.
4. The manifesto appears only at the decision and closing peaks.
5. With reduced motion enabled, all chapters render statically and completely.
6. Scroll remains responsive and no interaction waits for the animation.
7. Switching reduced motion on cancels enhancement; switching it off restores the current chapter.
8. With `window.IntersectionObserver` disabled before hydration, the page stays complete and static.
9. Scrolling while the story is offscreen does not schedule animation frames.
10. Blocking both font requests does not shift chapter state away from its semantic content.

Open the page for the user and stop for human review before Task 4.

- [ ] **Step 12: Commit the motion system**

```bash
git add app/components/operational-story-state.mjs app/components/operational-story-state.d.mts app/components/operational-story-motion.tsx app/components/operational-story.tsx app/components/operational-rail.tsx app/components/manifesto-cut.tsx app/page.tsx app/globals.css tests/operational-story-state.test.mjs tests/site-content-contract.test.mjs tests/rendered-html.test.mjs
git add -u app/components/site-motion.tsx
git commit -m "feat: drive the operational story with scroll"
```

---

### Task 4: Harden responsive behavior, accessibility, and delivery

**Files:**
- Modify: `app/components/operational-hero.tsx`
- Modify: `app/components/operational-story.tsx`
- Modify: `app/components/operational-rail.tsx`
- Modify: `app/components/pilot-contract.tsx`
- Modify: `app/components/flow-form-preview.tsx`
- Modify: `app/globals.css`
- Modify: `tests/site-content-contract.test.mjs`
- Modify: `tests/rendered-html.test.mjs`
- Modify: `docs/superpowers/specs/2026-09-06-operational-story-redesign.md` only if implementation reveals a factual mismatch

**Interfaces:**
- Consumes: the completed static page and motion contract from Tasks 1–3.
- Produces: final responsive, accessible, reviewed branch ready for PR; no new public component interface.

- [ ] **Step 1: Add failing tests for the remaining accessibility contracts**

Require the story label, hidden decorative rail, safe form, focus styling, reduced-motion query, and mobile breakpoint:

```js
assert.match(storySource, /aria-labelledby="story-title"/);
assert.match(storySource, /aria-hidden="true"/);
assert.match(css, /:focus-visible/);
assert.match(css, /@media \(max-width:\s*768px\)/);
assert.match(css, /@media \(max-width:\s*420px\)/);
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
assert.match(html, /Confirmo que não enviei dados pessoais sensíveis/);
assert.match(html, /target="_blank"/);
assert.match(html, /rel="noreferrer"/);
```

- [ ] **Step 2: Run focused tests and confirm any missing contracts fail**

Run:

```bash
node --test tests/site-content-contract.test.mjs tests/rendered-html.test.mjs
```

Expected: the 420 px target assertion FAILS because Task 2 intentionally stops at the broad static composition. If the implementation already satisfies every new contract, record that GREEN result and proceed to browser validation; do not invent a failing assertion.

- [ ] **Step 3: Implement mobile as a vertical story, not a scaled desktop scene**

At 768 px, disable horizontal chapter composition and render a vertical rail. At 420 px, reduce headline scale and outer padding while preserving at least 44 px interactive targets:

```css
@media (max-width: 768px) {
  .operational-story__stage { position: static; min-height: auto; }
  .operational-story__chapters { display: grid; grid-template-columns: 1fr; }
  .operational-rail { inset: 0 auto 0 24px; width: 2px; height: auto; }
  .operational-chapter { min-height: 72svh; padding-left: 58px; }
}

@media (max-width: 420px) {
  .operational-hero,
  .operational-chapter,
  .pilot-contract,
  .contact { padding-inline: 20px; }
  .operational-hero h1 { font-size: clamp(4rem, 23vw, 6.2rem); }
  .button, .site-nav a { min-height: 44px; }
}
```

Adapt rail positioning to the actual component markup. Never create horizontal page overflow to preserve an effect.

- [ ] **Step 4: Verify contrast, focus, semantics, and static reading order**

Use browser inspection to confirm body text reaches 4.5:1 and large text reaches 3:1. Increase text lightness or background darkness when a pair is close. Tab through navigation, calls to action, all form fields, confirmation, submit preview, and external handoff. Confirm visual order matches DOM order.

- [ ] **Step 5: Verify JavaScript-disabled and reduced-motion modes**

Disable JavaScript in the browser and reload. Confirm hero, all five chapters, pilot contract, limits, form, and footer remain readable. Re-enable JavaScript, emulate reduced motion, and confirm no sticky trap, clip-hidden text, font-axis animation, or long transition remains.

- [ ] **Step 6: Run the complete automated gate once**

Run:

```bash
npm run lint
npm test
git diff --check origin/main...HEAD
```

Expected: lint PASS, build inside `npm test` PASS, all Node tests PASS, and diff check PASS. Record unavailable browser checks as SKIP rather than PASS.

- [ ] **Step 7: Inspect all target widths locally**

At `http://localhost:3001`, inspect 1440 px, 1024 px, 768 px, and 390 px. At each width confirm:

- no unintended horizontal overflow;
- headline and manifesto text are not clipped;
- the rail connects the correct states;
- approval visibly precedes execution;
- receipt and pending items are readable;
- form controls fit and remain usable.

Open the final local page for the user and stop for explicit human approval.

- [ ] **Step 8: Commit the hardening pass**

```bash
git add app/components/operational-hero.tsx app/components/operational-story.tsx app/components/operational-rail.tsx app/components/pilot-contract.tsx app/components/flow-form-preview.tsx app/globals.css tests/site-content-contract.test.mjs tests/rendered-html.test.mjs docs/superpowers/specs/2026-09-06-operational-story-redesign.md
git commit -m "fix: harden the operational story experience"
```

- [ ] **Step 9: Run one independent review and one correction cycle**

Ask the reviewer to compare `origin/main...HEAD` against the spec, prioritizing broken behavior, accessibility, performance, evidence overclaiming, and responsive failures. Apply one bounded correction cycle for Critical or Important findings, rerun the affected checks, and create a separate Issue for additional non-critical experiments.

- [ ] **Step 10: Prepare the review handoff**

Push the branch and open a PR linked to Issue #12. Include exact automated results, browser widths checked, reduced-motion and JavaScript-disabled status, local human approval status, and the explicit boundary that the case is synthetic rather than customer or production evidence. Move Issue #12 to Review; do not merge or deploy without explicit user authorization.

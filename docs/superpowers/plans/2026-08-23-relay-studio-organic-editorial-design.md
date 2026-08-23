# Relay Studio Organic Editorial Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (\`- [ ]\`) syntax.

**Goal:** Redesign the Relay Studio institutional site into the approved “Arquivo vivo” organic editorial direction without changing copy, anchors, semantics, or behavior.

**Architecture:** Keep the existing one-page React/Vinext structure and implement the first pass as a CSS-led visual layer. Existing semantic sections and the interactive workflow audit remain the source of truth; visual states use existing classes, pseudo-elements, borders, spacing, and motion-safe transitions.

**Tech Stack:** React 19, Vinext, TypeScript, CSS, Node \`node:test\`, existing brand-kit SVG assets, and the browser for responsive visual acceptance.

**Spec:** \`docs/superpowers/specs/2026-08-23-relay-studio-organic-editorial-design.md\`

## Global Constraints

- Do not change any copy, title, CTA, label, anchor, form URL, or rendered text.
- Keep page order and semantics; visual hierarchy may change without changing document meaning.
- Make the first implementation in \`app/globals.css\`; modify JSX only for a presentational class or wrapper that cannot be expressed in CSS.
- Do not add packages, external fonts, remote images, people photography, avatars, mascots, or AI-themed decoration.
- Preserve keyboard focus, \`aria-pressed\`, live regions, reduced-motion behavior, and mobile reading order.
- Use a dedicated branch/worktree named \`codex/organic-editorial-site\` from \`main\`; do not implement on \`feat/workflow-audit\`.
- Keep each task independently reviewable and commit after its passing test cycle.
- Do not deploy or publish from this plan; finish with a PR-ready local branch and verification report.

## File Map

- **Modify:** \`app/globals.css\` — tokens, surfaces, editorial layout, organic rules, state styling, responsive rules, and motion.
- **Do not modify unless strictly necessary:** \`app/page.tsx\` — page copy and section structure remain frozen.
- **Do not modify unless strictly necessary:** \`app/components/workflow-audit.tsx\` — audit state machine remains unchanged; only a presentational class may be added if CSS cannot target an existing element.
- **Create:** \`tests/design-contract.test.mjs\` — lightweight contract checks for frozen copy anchors and required visual CSS hooks.
- **Use without changing:** \`tests/rendered-html.test.mjs\` — rendered copy, anchors, brand assets, and static build contract.

## Task 1: Establish the visual contract and global material layer

**Files:**
- Create: \`tests/design-contract.test.mjs\`
- Modify: \`app/globals.css\`

**Interfaces:**
- Consumes: existing CSS custom properties and existing page selectors.
- Produces: \`--relay-moss\`, \`--relay-clay\`, paper/grain surfaces, and CSS hooks for later tasks without JSX changes.

- [ ] **Step 1: Write the failing design-contract test**

Create \`tests/design-contract.test.mjs\`:

~~~js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("a direção Arquivo vivo tem tokens e camadas sem mudar a copy", () => {
  assert.match(css, /--relay-moss\\s*:/);
  assert.match(css, /--relay-clay\\s*:/);
  assert.match(css, /\\.hero::before/);
  assert.match(css, /\\.execution-example::before/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(page, /Seu time decide\\. A Relay executa o trabalho recorrente\\./);
  assert.match(page, /Uma reconciliação não precisa terminar na sua equipe\\./);
  assert.match(page, /O trabalho que pesa na sua equipe tem perfil para ser executado pela Relay\\?/);
});
~~~

- [ ] **Step 2: Run the contract to verify it fails**

Run: \`node --test tests/design-contract.test.mjs\`

Expected: FAIL because the new accent tokens and material pseudo-elements do not exist yet.

- [ ] **Step 3: Add the minimal global visual layer**

In \`:root\`, add low-saturation tokens without removing current brand tokens:

~~~css
--relay-moss: #68745e;
--relay-clay: #b86f50;
--relay-paper-shadow: rgba(17, 18, 21, 0.08);
~~~

Add a non-semantic texture layer to \`body\`, \`.hero\`, \`.execution-example\`, and \`.section--paper\` with pseudo-elements or background gradients. Keep texture opacity below \`0.08\`, set \`pointer-events: none\`, and preserve \`isolation\`/stacking order so content stays selectable and readable.

- [ ] **Step 4: Run the contract and existing HTML checks**

~~~bash
node --test tests/design-contract.test.mjs
npm run build
node --test tests/rendered-html.test.mjs
~~~

Expected: all commands pass; rendered text and anchors remain unchanged.

- [ ] **Step 5: Commit the global layer**

~~~bash
git add app/globals.css tests/design-contract.test.mjs
git commit -m "style: establish organic editorial material layer"
~~~

## Task 2: Redesign the hero and first proof section

**Files:**
- Modify: \`app/globals.css\`
- Test: \`tests/design-contract.test.mjs\`

**Interfaces:**
- Consumes: Task 1 tokens and existing \`.hero\`, \`.hero__content\`, \`.signal-rail\`, and \`.execution-example\` selectors.
- Produces: navy/paper continuity, a readable process rail, and a paper-worksheet treatment for the reconciliation example.

- [ ] **Step 1: Extend the visual contract**

~~~js
test("hero e exemplo de fluxo têm tratamento editorial", () => {
  assert.match(css, /\\.hero__content/);
  assert.match(css, /\\.signal-rail__line/);
  assert.match(css, /\\.execution-example__step/);
  assert.match(css, /\\.execution-example__note/);
});
~~~

- [ ] **Step 2: Run the focused contract**

Run: \`node --test tests/design-contract.test.mjs\`

Expected: PASS for existing selectors and fail only if a selector was accidentally removed.

- [ ] **Step 3: Style the hero as a deep field with a living signal**

Keep \`.hero\` navy and preserve dimensions, then:
- use subtle radial/linear paper grain in \`.hero::before\`;
- add a low-contrast contour rule in \`.hero::after\` that cannot overlap text;
- keep amber as the strongest action color;
- use moss for non-active rail segments and amber only for the active marker;
- make rail spacing slightly asymmetric but readable;
- keep the existing \`reveal\` animation and reduce its travel distance;
- leave wordmark, nav, title, lede, thesis, and CTA text untouched.

- [ ] **Step 4: Turn the reconciliation section into a paper worksheet**

Style \`.execution-example\` and \`.execution-example__inner\` as a warm paper surface that visually overlaps the hero boundary slightly without changing document order. Use one vertical rule for \`.execution-example__steps\`; style each \`.execution-example__step\` with an index, title, and description separated by a hairline. Use clay only for an existing attention/validation selector; do not invent status copy.

- [ ] **Step 5: Validate the first fold in the browser**

At widths 1440px, 1024px, and 390px, verify:
- no horizontal overflow;
- hero title and CTA remain readable;
- active rail marker is distinguishable without color alone;
- paper transition does not hide focused links;
- first three reconciliation steps remain in order.

- [ ] **Step 6: Run checks and commit**

~~~bash
node --test tests/design-contract.test.mjs
npm run build
git diff -- app/page.tsx app/components/workflow-audit.tsx
git add app/globals.css tests/design-contract.test.mjs
git commit -m "style: shape hero and workflow proof as living archive"
~~~

Expected: JSX diff is empty; build and contract pass.

## Task 3: Apply the editorial spread to the middle sections

**Files:**
- Modify: \`app/globals.css\`
- Test: \`tests/design-contract.test.mjs\`

**Interfaces:**
- Consumes: Task 1 tokens and Task 2 surfaces.
- Produces: archive rhythm for \`#visao\`, \`#trabalho\`, \`#produto\`, \`#processo\`, and \`#principios\` without changing content.

- [ ] **Step 1: Add section-level contract checks**

~~~js
test("as seções editoriais preservam os estados de papel e navy", () => {
  assert.match(css, /\\.section--paper/);
  assert.match(css, /\\.section--navy/);
  assert.match(css, /\\.work-item/);
  assert.match(css, /\\.capability/);
  assert.match(css, /\\.process-step/);
  assert.match(css, /\\.principle/);
});
~~~

- [ ] **Step 2: Replace repeated feature-card rhythm with editorial spreads**

Update existing selectors:
- alternate column alignment for \`.vision__body\`, \`.work__body\`, and \`.build__body\`;
- reduce repeated box shadows; let separators, indices, and whitespace carry hierarchy;
- apply small \`:nth-child\` offsets only above the mobile breakpoint;
- use moss/clay on borders or index marks to distinguish context from exception;
- keep each title and paragraph in its current semantic element.

- [ ] **Step 3: Draw the process as a continuous operational line**

Use \`.process-list\` and \`.process-step\` to create a connected vertical/horizontal rule. The rule is decorative; each step remains a heading and paragraph. At mobile width, switch to one-column line and remove transforms that could create overflow.

- [ ] **Step 4: Keep principles legible as an index**

Style \`.principles__grid\` and \`.principle\` as quiet archival notes: thin border, clear number, generous line-height, and one accent mark. Do not add testimonials or illustrations.

- [ ] **Step 5: Validate copy and layout**

~~~bash
node --test tests/design-contract.test.mjs
npm run build
node --test tests/rendered-html.test.mjs
~~~

In the browser, inspect \`#visao\`, \`#trabalho\`, \`#produto\`, \`#processo\`, and \`#principios\` at 1440px and 390px. Confirm \`document.documentElement.scrollWidth <= window.innerWidth\`.

- [ ] **Step 6: Commit the middle-section treatment**

~~~bash
git add app/globals.css tests/design-contract.test.mjs
git commit -m "style: turn operational sections into editorial spreads"
~~~

## Task 4: Restyle the audit without touching its state machine

**Files:**
- Modify: \`app/globals.css\`
- Do not modify: \`app/components/workflow-audit.tsx\` unless a presentational class is strictly required.
- Test: \`tests/rendered-html.test.mjs\` and browser interaction review.

**Interfaces:**
- Consumes: existing \`answers\`, \`aria-pressed\`, live-region, CTA, and reset behavior.
- Produces: a decision-notebook treatment where progress, selected choices, and provisional reading remain explicit.

- [ ] **Step 1: Capture a behavioral baseline**

Run: \`npm run build && node --test tests/rendered-html.test.mjs\`

Then in the browser click \`Sim\` and \`Não\` on one question and record:
- selected button has \`aria-pressed="true"\`;
- other button has \`aria-pressed="false"\`;
- progress updates;
- provisional reading updates;
- \`Refazer audit\` resets state.

- [ ] **Step 2: Style the audit as a decision notebook**

Update \`.audit\`, \`.audit__panel\`, \`.audit-question\`, \`.audit-choice\`, \`.audit-choice--selected\`, and \`.audit-result\`:
- preserve the navy section;
- put the question panel on a warm paper surface;
- use border weight, inset marker, and text weight in addition to color for selected states;
- keep progress near the introduction;
- keep the external CTA primary and reset secondary;
- keep the irregular contour behind content with \`pointer-events: none\`.

- [ ] **Step 3: Validate interaction and accessibility**

At 390px, keyboard through every audit button and the CTA. Confirm focus is visible, selected state is understandable without color, and the live result remains readable. With reduced motion enabled, confirm no content is hidden or delayed.

- [ ] **Step 4: Run checks and commit**

~~~bash
npm run build
node --test tests/rendered-html.test.mjs
git diff -- app/page.tsx app/components/workflow-audit.tsx
git add app/globals.css
git commit -m "style: make workflow audit a visible decision notebook"
~~~

Expected: no copy or audit logic diff.

## Task 5: Finish responsive, motion, and accessibility hardening

**Files:**
- Modify: \`app/globals.css\`
- Test: \`tests/design-contract.test.mjs\`

**Interfaces:**
- Consumes: visual layers from Tasks 1–4.
- Produces: stable behavior at desktop, tablet, mobile, and reduced-motion settings.

- [ ] **Step 1: Add hardening assertions**

~~~js
test("o sistema visual mantém acessibilidade e responsividade", () => {
  assert.match(css, /prefers-reduced-motion\\s*:\\s*reduce/);
  assert.match(css, /focus-visible/);
  assert.match(css, /@media \\(max-width: 900px\\)/);
  assert.match(css, /@media \\(max-width: 620px\\)/);
});
~~~

- [ ] **Step 2: Harden breakpoints**

At \`max-width: 900px\`, collapse editorial spreads into readable single-column groups while keeping indices aligned. At \`max-width: 620px\`, reduce decorative offsets, keep buttons tappable, preserve existing nav behavior, and remove pseudo-elements that could create horizontal scrolling.

- [ ] **Step 3: Harden motion and focus**

Keep the existing \`prefers-reduced-motion\` block as the final override. Add \`transform: none\` and \`transition-duration: 0.01ms\` for decorative layers under reduced motion. Verify every new pseudo-element has \`pointer-events: none\`; verify \`:focus-visible\` remains above contour layers.

- [ ] **Step 4: Run complete local gates**

~~~bash
node --test tests/design-contract.test.mjs
npm run lint
npm run build
npm test
git diff --check
~~~

Expected: all commands pass and \`npm test\` confirms the rendered HTML contract.

- [ ] **Step 5: Commit responsive hardening**

~~~bash
git add app/globals.css tests/design-contract.test.mjs
git commit -m "style: harden organic editorial responsive states"
~~~

## Task 6: Browser review and PR handoff

**Files:**
- Review only: \`app/globals.css\`, \`app/page.tsx\`, \`app/components/workflow-audit.tsx\`, \`tests/design-contract.test.mjs\`

- [ ] **Step 1: Run browser review at fixed viewports**

Review the canonical local site at 1440px, 1024px, and 390px. Check hero, workflow example, audit, process line, privacy section, and final CTA. Record a visual defect before editing; do not adjust based on taste alone after the first pass.

- [ ] **Step 2: Prove copy immutability**

~~~bash
git diff main...HEAD -- app/page.tsx app/components/workflow-audit.tsx
git diff main...HEAD --check
~~~

Expected: no copy/logic diff and no whitespace errors.

- [ ] **Step 3: Verify branch and worktree boundary**

~~~bash
git branch --show-current
git status --short --branch
git worktree list
~~~

Expected: current branch is \`codex/organic-editorial-site\`, only the dedicated worktree contains the redesign, and no unrelated worktree changed.

- [ ] **Step 4: Prepare the PR**

~~~bash
git log --oneline main..HEAD
git push -u origin codex/organic-editorial-site
gh pr create --base main --head codex/organic-editorial-site \\
  --title "style: give Relay Studio an organic editorial system" \\
  --body-file /tmp/relay-studio-organic-editorial-pr.md
~~~

The PR body must state: copy unchanged, CSS-led implementation, no new dependencies/assets, browser widths reviewed, and the exact commands from Task 5.

## Final Verification Checklist

- [ ] Approved spec implemented without changing copy or behavior.
- [ ] Anti-human-washing principle is visible through decision, exception, context, and evidence affordances rather than claims.
- [ ] First fold and workflow example read as one continuous archive.
- [ ] Audit selection, progress, reset, live region, and CTA still work.
- [ ] Desktop, tablet, mobile, keyboard focus, and reduced motion are reviewed.
- [ ] \`npm run lint\`, \`npm run build\`, \`npm test\`, and \`git diff --check\` pass.
- [ ] Dedicated branch/worktree is clean and PR targets \`main\`.


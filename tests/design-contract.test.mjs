import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("a direção Arquivo vivo tem tokens e camadas sem mudar a copy", () => {
  assert.match(css, /--relay-moss\s*:/);
  assert.match(css, /--relay-clay\s*:/);
  assert.match(css, /--relay-paper-shadow\s*:/);
  assert.match(css, /body::before/);
  assert.match(css, /\.hero::before/);
  assert.match(css, /\.execution-example::before/);
  assert.match(css, /\.section--paper::before/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(page, /Seu time decide\. A Relay executa o trabalho recorrente\./);
  assert.match(page, /Uma reconciliação não precisa terminar na sua equipe\./);
  assert.match(page, /Começamos por fluxos recorrentes em que o resultado é claro e o trabalho manual é alto\./);
});

test("hero e exemplo de fluxo têm tratamento editorial", () => {
  assert.match(css, /\.hero__content/);
  assert.match(css, /\.hero::after/);
  assert.match(css, /\.signal-rail__line::after/);
  assert.match(css, /\.signal-rail__marker--active/);
  assert.match(
    css,
    /\.signal-rail__marker--active\s*\{[^}]*outline:\s*1px\s+solid\s+var\(--relay-paper\)/s,
  );
  assert.doesNotMatch(
    css,
    /\.signal-rail__line::after\s*\{[^}]*var\(--relay-amber\)/s,
  );
  assert.match(css, /\.execution-example__inner/);
  assert.match(css, /margin-top:\s*clamp\(-48px,\s*-4vw,\s*-24px\)/);
  assert.match(css, /\.execution-example__steps/);
  assert.match(css, /border-left:\s*1px\s+solid\s+var\(--relay-line\)/);
  assert.match(css, /\.execution-example__step::before/);
  assert.match(css, /\.execution-example__note/);
});

test("as seções editoriais viram spreads e índice sem mudar a semântica", () => {
  assert.match(css, /\.section--paper/);
  assert.match(css, /\.section--navy/);
  assert.match(css, /\.vision__body,\s*\.work__body,\s*\.build__body/);
  assert.match(css, /\.work-item:nth-child\(even\)/);
  assert.match(
    css,
    /\.work-item:nth-child\(odd\)\s*\{[^}]*transform:\s*translateX\(clamp\(-18px,\s*-1\.2vw,\s*-8px\)\);/s,
  );
  assert.match(css, /\.capability:nth-child\(odd\)/);
  assert.match(
    css,
    /\.capability:nth-child\(odd\)\s*\{[^}]*transform:\s*translateX\(clamp\(-24px,\s*-1\.6vw,\s*-12px\)\);/s,
  );
  assert.match(css, /\.process-list::before/);
  assert.match(css, /\.process-step::before/);
  assert.match(css, /\.principle::before/);
  assert.match(css, /\.principles__grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)[^}]*gap:/s);
  assert.match(css, /@media \(max-width:\s*620px\)\s*\{[\s\S]*\.work-item:nth-child\(even\),[\s\S]*transform:\s*none;/);
  assert.match(css, /@media \(max-width:\s*620px\)\s*\{[\s\S]*\.process-list::before[\s\S]*left:\s*15px;/);
});

test("o sistema visual mantém acessibilidade e responsividade", () => {
  assert.match(css, /prefers-reduced-motion\s*:\s*reduce/);
  assert.match(css, /focus-visible/);
  assert.match(css, /@media \(max-width:\s*900px\)/);
  assert.match(css, /@media \(max-width:\s*620px\)/);
  assert.match(
    css,
    /@media \(max-width:\s*900px\)\s*\{[\s\S]*\.vision__detail[\s\S]*grid-template-columns:\s*1fr;/,
  );
  assert.match(
    css,
    /@media \(max-width:\s*620px\)\s*\{[\s\S]*\.hero::after[\s\S]*display:\s*none;/,
  );
  assert.match(
    css,
    /@media \(max-width:\s*620px\)\s*\{[\s\S]*\.audit::before[\s\S]*display:\s*none;/,
  );
  assert.match(
    css,
    /\.button:focus-visible,\s*\.text-link:focus-visible,\s*\.audit-choice:focus-visible,\s*\.audit-reset:focus-visible,\s*\.audit-result__actions \.button:focus-visible\s*\{[^}]*z-index:\s*2;/s,
  );
  assert.match(
    css,
    /@media \(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*\.hero::after,\s*\.signal-rail__line::after,\s*\.audit::before,\s*\.audit__panel::after[\s\S]*transform:\s*none\s*!important;/s,
  );
  assert.match(
    css,
    /@media \(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*transition-duration:\s*0\.01ms\s*!important;/s,
  );
  assert.match(
    css,
    /\.audit-choice\s*\{[^}]*min-height:\s*44px;/s,
  );
});

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

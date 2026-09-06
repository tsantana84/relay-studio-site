import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const source = await readFile(new URL("../app/content/site-content.ts", import.meta.url), "utf8");
const formBrief = await readFile(new URL("../docs/site-form-brief.md", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const motion = await readFile(new URL("../app/components/site-motion.tsx", import.meta.url), "utf8");
const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

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

test("formulário é curto, qualificável e não pede conteúdo operacional", () => {
  for (const field of ["Nome e e-mail de trabalho", "Papel na operação", "Fluxo recorrente", "Frequência", "Fontes", "Resultado esperado", "Impacto hoje"]) {
    assert.match(formBrief, new RegExp(field));
  }
  assert.match(formBrief, /não envie dados pessoais sensíveis/i);
  assert.match(formBrief, /não classificar automaticamente/i);
  assert.doesNotMatch(formBrief, /anexar|upload|senha|token/i);
});

test("sistema visual reserva cor para ação, exceção e evidência", () => {
  assert.match(css, /--relay-clay\s*:/);
  assert.match(css, /--relay-moss\s*:/);
  assert.match(css, /\.delivery-ledger__row--approval/);
  assert.match(css, /\.delivery-ledger__row--result/);
  assert.match(css, /@media \(max-width: 620px\)/);
  assert.match(css, /:focus-visible/);
});

test("tipografia e texto editorial preservam legibilidade na superfície de papel", () => {
  const heroHeading = css.match(/\.hero h1\s*{([^}]*)}/)?.[1] ?? "";
  assert.match(heroHeading, /font-size:\s*clamp\([^;]*,\s*6rem\)/);
  assert.match(heroHeading, /letter-spacing:\s*-0\.04em/);
  assert.match(css, /--relay-muted-ink\s*:/);
  assert.match(css, /--relay-moss-ink\s*:/);
  assert.match(css, /\.delivery-ledger__row p\s*{[^}]*color:\s*var\(--relay-muted-ink\)/);
  assert.match(css, /\.delivery-ledger__row--result p\s*{[^}]*color:\s*var\(--relay-moss-ink\)/);
  assert.match(css, /\.mechanism__rail li\[data-stage="result"\]\s*{[^}]*color:\s*var\(--relay-moss-ink\)/);
});

test("exceções usam limites horizontais e o sistema respeita movimento reduzido", () => {
  assert.doesNotMatch(css, /border-left:\s*4px solid var\(--relay-clay\)/);
  assert.match(css, /\.delivery-ledger__row--approval\s*{[^}]*background:/);
  assert.match(css, /\.mechanism__rail li\[data-stage="approval"\]\s*{[^}]*background:/);
  assert.match(css, /\.limits__note\s*{[^}]*border-top:\s*4px solid var\(--relay-clay\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior:\s*auto/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition-duration:\s*0\.01ms/);
});

test("motion é progressivo e respeita preferência reduzida", () => {
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /addEventListener\("change"/);
  assert.match(motion, /data-motion-state/);
  assert.match(css, /html\[data-motion-ready="true"\]/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("motion não deixa conteúdo oculto ao desmontar nem anima copy editorial", () => {
  assert.match(
    motion,
    /return \(\) => \{[\s\S]*?document\.documentElement\.removeAttribute\("data-motion-ready"\)[\s\S]*?revealAll\(\)/,
  );
  assert.doesNotMatch(pageSource, /data-motion="reveal"/);
  assert.doesNotMatch(css, /rotate\(/);
});

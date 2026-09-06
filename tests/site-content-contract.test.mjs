import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const source = await readFile(new URL("../app/content/site-content.ts", import.meta.url), "utf8");
const formBrief = await readFile(new URL("../docs/site-form-brief.md", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
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

test("copy posiciona uma entrega delimitada sem transformar hipótese em capacidade", () => {
  assert.match(source, /O trabalho anda\./);
  assert.match(source, /Um fluxo delimitado/);
  assert.match(source, /Demonstração sintética/);
  assert.match(source, /Descrever um fluxo/);
  assert.doesNotMatch(source, /garantimos|autônom[oa]|qualquer empresa|em produção/i);
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
  assert.match(css, /--relay-action\s*:/);
  assert.match(css, /--relay-decision\s*:/);
  assert.match(css, /\.operational-chapter\[data-stage="approval"\]/);
  assert.match(css, /\.operational-chapter\[data-stage="result"\]/);
  assert.match(css, /@media \(max-width: 620px\)/);
  assert.match(css, /:focus-visible/);
});

test("tipografia e texto editorial preservam legibilidade na superfície de papel", () => {
  const heroHeading = css.match(/\.operational-hero h1\s*{([^}]*)}/)?.[1] ?? "";
  assert.match(heroHeading, /font-size:\s*clamp\(/);
  assert.match(heroHeading, /line-height:\s*\.86/);
  assert.match(css, /--relay-muted-ink\s*:/);
  assert.match(css, /\.operational-story__stage\s*{[^}]*position:\s*static/);
  assert.match(css, /\.operational-story__chapters\s*{[^}]*list-style:\s*none/);
  assert.match(css, /\.operational-chapter\s*{[^}]*min-height:\s*72vh/);
});

test("exceções usam limites horizontais e o sistema respeita movimento reduzido", () => {
  assert.doesNotMatch(css, /border-left:\s*4px solid var\(--relay-exception\)/);
  assert.match(css, /\.operational-chapter\[data-stage="approval"\]\s*{[^}]*color:/);
  assert.match(css, /\.mechanism__rail li\[data-stage="approval"\]\s*{[^}]*background:/);
  assert.match(css, /\.limits__note\s*{[^}]*border-top:\s*4px solid var\(--relay-clay\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior:\s*auto/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition-duration:\s*0\.01ms/);
});

test("a história fica visível sem melhoria progressiva", () => {
  assert.doesNotMatch(pageSource, /SiteMotion/);
  assert.doesNotMatch(css, /html\[data-motion-ready="true"\]/);
  assert.doesNotMatch(css, /rotate\(/);
});

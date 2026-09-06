import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const source = await readFile(new URL("../app/content/site-content.ts", import.meta.url), "utf8");
const formBrief = await readFile(new URL("../docs/site-form-brief.md", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const storySource = await readFile(new URL("../app/components/operational-story.tsx", import.meta.url), "utf8");
const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const fontsCss = await readFile(new URL("../public/fonts/fonts.css", import.meta.url), "utf8");

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
  assert.match(source, /dados fictícios/i);
  assert.match(pageSource, /<OperationalHero \/>/);
  assert.match(pageSource, /<OperationalStory \/>/);
  assert.match(storySource, /<ol[^>]*className="operational-story__chapters"/);
});

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
  assert.match(heroHeading, /line-height:\s*\.74/);
  assert.match(css, /--relay-font-body:\s*"Geologica Variable"/);
  assert.match(css, /@media \(max-width: 768px\)[\s\S]*?\.operational-story__stage\s*{[^}]*position:\s*static/);
  assert.match(css, /\.operational-story__chapters\s*{[^}]*list-style:\s*none/);
  assert.match(css, /\.operational-chapter\s*{[^}]*min-height:\s*72vh/);
});

test("o contrato usa limites horizontais e o sistema respeita movimento reduzido", () => {
  assert.doesNotMatch(css, /border-left:\s*4px solid var\(--relay-exception\)/);
  assert.match(css, /\.operational-chapter\[data-stage="approval"\]\s*{[^}]*color:/);
  assert.match(css, /\.pilot-contract__limits\s*{[^}]*border-top:\s*5px solid var\(--relay-exception\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior:\s*auto/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition-duration:\s*0\.01ms/);
});

test("a história fica visível sem melhoria progressiva", () => {
  assert.doesNotMatch(pageSource, /SiteMotion/);
  assert.doesNotMatch(css, /html\[data-motion-ready="true"\]/);
  assert.doesNotMatch(css, /rotate\(/);
});

test("a abertura não cria overflow horizontal no viewport mobile", () => {
  const mobileCss = css.slice(css.indexOf("@media (max-width: 620px)"));
  assert.match(mobileCss, /\.operational-hero__topline\s*{[^}]*flex-wrap:\s*wrap/);
  assert.match(mobileCss, /\.site-nav\s*{[^}]*width:\s*100%[^}]*justify-content:\s*flex-start/);
  assert.match(mobileCss, /\.operational-hero__content\s*{[^}]*width:\s*100%[^}]*max-width:\s*100%/);
  assert.match(mobileCss, /\.operational-hero__lede\s*{[^}]*max-width:\s*100%[^}]*overflow-wrap:\s*break-word/);
});

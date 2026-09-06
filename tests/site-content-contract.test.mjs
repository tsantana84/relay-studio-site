import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const source = await readFile(new URL("../app/content/site-content.ts", import.meta.url), "utf8");
const formBrief = await readFile(new URL("../docs/site-form-brief.md", import.meta.url), "utf8");
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const heroSource = await readFile(new URL("../app/components/operational-hero.tsx", import.meta.url), "utf8");
const storySource = await readFile(new URL("../app/components/operational-story.tsx", import.meta.url), "utf8");
const railSource = await readFile(new URL("../app/components/operational-rail.tsx", import.meta.url), "utf8");
const useCasesSource = await readFile(
  new URL("../app/components/use-case-examples.tsx", import.meta.url),
  "utf8",
).catch(() => "");
const manifestoSource = await readFile(new URL("../app/components/manifesto-cut.tsx", import.meta.url), "utf8");
const layoutSource = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const fontsCss = await readFile(new URL("../public/fonts/fonts.css", import.meta.url), "utf8");
const motion = await readFile(new URL("../app/components/operational-story-motion.tsx", import.meta.url), "utf8");

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

test("o manifesto move conteúdo interno sem deslocar sua caixa", () => {
  assert.match(manifestoSource, /className="manifesto-cut__text"/);
  const enhancedCss = css.slice(css.indexOf("@media (min-width: 769px) and (prefers-reduced-motion: no-preference)"));
  assert.doesNotMatch(enhancedCss, /\.manifesto-cut\s*{[^}]*transform:/);
  assert.match(enhancedCss, /\.manifesto-cut__text\s*{[^}]*transform:/);
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
  assert.match(useCasesSource, /aria-labelledby="use-cases-title"/);
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
  assert.match(heroHeading, /line-height:\s*\.82/);
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

test("a experiência final preserva semântica, foco e fallbacks responsivos", () => {
  assert.match(storySource, /aria-labelledby="story-title"/);
  assert.match(storySource, /aria-hidden="true"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width:\s*768px\)/);
  assert.match(css, /@media \(max-width:\s*420px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("o breakpoint compacto mantém texto e alvos interativos dentro do viewport", () => {
  assert.match(css, /\.contact h2\s*{[^}]*max-width:\s*10ch[^}]*font-size:\s*clamp\(2\.5rem,\s*5vw,\s*5\.5rem\)[^}]*overflow-wrap:\s*normal/);
  const compactCss = css.slice(css.indexOf("@media (max-width: 420px)"));
  assert.match(compactCss, /\.site-nav a[^}]*min-width:\s*44px/);
  assert.match(compactCss, /\.flow-form-preview__confirmation input\s*{[^}]*width:\s*44px[^}]*height:\s*44px/);
  const mobileCss = css.slice(css.indexOf("@media (max-width: 620px)"));
  assert.match(mobileCss, /\.pilot-contract__steps h3\s*{[^}]*max-width:\s*14ch[^}]*font-variation-settings:\s*"wdth" 90[^}]*line-height:\s*1\.05/);
});

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

test("a abertura não cria overflow horizontal no viewport mobile", () => {
  const mobileCss = css.slice(css.indexOf("@media (max-width: 620px)"));
  assert.match(mobileCss, /\.operational-hero__topline\s*{[^}]*flex-wrap:\s*wrap/);
  assert.match(mobileCss, /\.site-nav\s*{[^}]*width:\s*100%[^}]*justify-content:\s*flex-start/);
  assert.match(mobileCss, /\.operational-hero__content\s*{[^}]*width:\s*100%[^}]*max-width:\s*100%/);
  assert.match(mobileCss, /\.operational-hero__lede\s*{[^}]*max-width:\s*100%[^}]*overflow-wrap:\s*break-word/);
});

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), "utf8");

const source = await read("app/content/site-content.ts");
const formBrief = await read("docs/site-form-brief.md");
const css = await read("app/globals.css");
const pageSource = await read("app/page.tsx");
const layoutSource = await read("app/layout.tsx");
const fontsCss = await read("public/fonts/fonts.css");
const headerSource = await read("app/components/site-header.tsx");
const heroSource = await read("app/components/hero.tsx");
const conversionSource = await read("app/components/conversion-handoff.tsx");
const demoSource = await read("app/components/run-demo.tsx");
const howSource = await read("app/components/how-it-works.tsx");
const marqueeSource = await read("app/components/marquee.tsx");
const motionKit = await read("app/components/motion-kit.tsx");

test("a abertura fala do benefício e mantém a maturidade junto da promessa", () => {
  assert.match(source, /titleText: "Menos conferir, copiar e cobrar\. Mais tempo para decidir\."/);
  assert.match(source, /status: "Primeiros pilotos em validação"/);
  assert.match(source, /ela para e espera a sua equipe decidir/);
  assert.match(heroSource, /hero\.status/);
  assert.match(heroSource, /hero\.lede/);
});

test("a copy não promete o que a evidência não sustenta", () => {
  assert.doesNotMatch(source, /garantimos|autônom[oa]|qualquer empresa|em produção|mágica|substitui|zero humanos|sem risco/i);
  assert.doesNotMatch(source, /Relay (OS|Web|Sim)/);
  // Nada de quantidades, percentuais ou resultados de clientes inventados.
  assert.doesNotMatch(source, /\d+\s?%|R\$|\d+ (pedidos|repasses|clientes|horas)/);
});

test("o exemplo interativo é identificado como ilustração e para na exceção", () => {
  assert.match(source, /tag: "Exemplo ilustrativo"/);
  assert.match(source, /A Relay não segue sozinha\. A decisão é sua\./);
  for (const label of ["Aprovar ajuste", "Devolver", "Nada foi executado nesse repasse"]) {
    assert.match(source, new RegExp(label));
  }
  // A execução só avança além da exceção por uma decisão da pessoa.
  assert.doesNotMatch(demoSource, /PHASE_DURATION[^;]*\b3:/);
  assert.match(demoSource, /onClick=\{\(\) => decide\("approved"\)\}/);
  assert.match(demoSource, /onClick=\{\(\) => decide\("returned"\)\}/);
  assert.match(demoSource, /aria-live="polite"/);
});

test("a história explica quatro passos e quem responde por cada um", () => {
  for (const title of [
    "Você escolhe um trabalho",
    "A Relay prepara e confere",
    "Sua equipe decide as exceções",
    "A Relay executa e registra",
  ]) {
    assert.match(source, new RegExp(title));
  }
  assert.match(source, /impact: "A Relay executa\. Sua equipe decide\."/);
  assert.match(howSource, /<ol className="how__steps">/);
});

test("os exemplos aparecem com limite de evidência", () => {
  for (const example of ["Conferir valores", "Fechar relatórios", "Cobrar prazos e pendências", "Atualizar sistemas"]) {
    assert.match(source, new RegExp(example));
  }
  assert.match(source, /Não são soluções prontas nem resultados comprovados de clientes/);
});

test("o piloto mede valor antes de ampliar", () => {
  for (const step of ["Escolher", "Combinar", "Rodar", "Decidir"]) {
    assert.match(source, new RegExp(`title: "${step}"`));
  }
  assert.match(source, /comparamos o tempo, o custo e a qualidade/);
  assert.match(source, /Frequência, prazo, critério de aceite e preço são definidos na avaliação do piloto/);
});

test("a conversão mostra três perguntas e abre diretamente o formulário real", () => {
  for (const prompt of ["Qual trabalho se repete", "Com que frequência acontece", "Onde ele pesa"]) {
    assert.match(source, new RegExp(prompt));
  }
  assert.match(source, /Não envie dados pessoais sensíveis, credenciais, documentos, planilhas nem conteúdo operacional real\./);
  assert.match(conversionSource, /href={FORM_URL}/);
  assert.match(conversionSource, /target="_blank"/);
  assert.match(conversionSource, /rel="noreferrer"/);
  assert.match(pageSource, /<ConversionHandoff \/>/);
});

test("a navegação nomeia as seções e leva a ação principal ao contato", () => {
  for (const [label, href] of [["Como funciona", "#como-funciona"], ["Exemplos", "#onde-comecar"], ["Piloto", "#piloto"]]) {
    assert.match(source, new RegExp(`label: "${label}", href: "${href}"`));
  }
  assert.match(source, /action: \{ label: "Avaliar um piloto", href: "#contato" \}/);
  assert.match(headerSource, /siteNavigation\.items\.map/);
  assert.match(headerSource, /siteNavigation\.action\.href/);
});

test("formulário externo mantém o contrato de qualificação e segurança", () => {
  for (const field of ["Nome e e-mail de trabalho", "Papel na operação", "Fluxo recorrente", "Frequência", "Fontes", "Resultado esperado", "Impacto hoje"]) {
    assert.match(formBrief, new RegExp(field));
  }
  assert.match(formBrief, /não envie dados pessoais sensíveis/i);
  assert.match(formBrief, /não classificar automaticamente/i);
  assert.doesNotMatch(formBrief, /anexar|upload|senha|token/i);
});

test("o sistema visual usa fontes locais e a paleta da marca", () => {
  assert.match(layoutSource, /fonts\/anybody-latin-wdth-normal\.woff2/);
  assert.match(layoutSource, /fonts\/fonts\.css/);
  assert.match(fontsCss, /@font-face[\s\S]*?Anybody Variable/);
  assert.match(fontsCss, /@font-face[\s\S]*?Geologica Variable/);
  for (const [token, value] of [
    ["--relay-navy", "#061321"],
    ["--relay-paper", "#f7f2e7"],
    ["--relay-action", "#ffb000"],
    ["--relay-exception", "#f2442c"],
    ["--relay-decision", "#dfff45"],
  ]) {
    assert.match(css, new RegExp(`${token}:\\s*${value}`));
  }
  assert.doesNotMatch(css, /backdrop-filter|border-radius/);
});

test("o conteúdo continua legível sem JavaScript e com movimento reduzido", async () => {
  assert.match(layoutSource, /<noscript>[\s\S]*\[data-motion\]\{opacity:1!important;transform:none!important\}/);
  // Todo componente que nasce escondido precisa do marcador que o <noscript> desfaz.
  for (const file of ["motion-kit.tsx", "hero-headline.tsx", "swap-list.tsx", "pilot-contract.tsx"]) {
    assert.match(await read(`app/components/${file}`), /data-motion/, file);
  }
  assert.match(motionKit, /<MotionConfig reducedMotion="user">/);
  assert.match(pageSource, /<MotionRoot>/);
  assert.match(marqueeSource, /if \(reduced\) return/);
  assert.match(howSource, /data-live/);
  assert.match(css, /\.how\[data-live="true"\] \.how__step\[data-reached="false"\]/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior:\s*auto/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?animation-duration:\s*0\.01ms/);
});

test("foco visível e breakpoints móveis estão definidos", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width: 960px\)/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /@media \(max-width: 420px\)/);
  assert.match(css, /main\s*{[^}]*overflow-x:\s*clip/);
  assert.match(css, /\.run__choice\s*{[^}]*min-height:\s*44px/);
});

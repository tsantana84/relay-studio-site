import assert from "node:assert/strict";
import { once } from "node:events";
import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vinextBin = path.join(projectRoot, "node_modules", ".bin", "vinext");
const port = 3107;

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
  assert.match(html, /operational-rail__branch operational-rail__branch--matched">179 correspondências/);
  assert.match(html, /operational-rail__branch operational-rail__branch--exception">5 exceções/);
  assert.match(html, /operational-rail__branch operational-rail__branch--approved">3 aprovados/);
  assert.match(html, /operational-rail__branch operational-rail__branch--pending">2 devolvidos/);
  assert.match(html, /operational-rail__receipt">Critério conferido · recibo sintético #014 · 182 encerrados · 2 pendentes/);
}

async function waitForServer(url, timeoutMs = 15_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Servidor não respondeu em ${timeoutMs}ms: ${url}`);
}

test("home renderiza a presença institucional completa", async () => {
  const server = spawn(vinextBin, ["start", "--port", String(port)], {
    cwd: projectRoot,
    stdio: "ignore",
  });

  try {
    const response = await waitForServer(`http://127.0.0.1:${port}/`);
    const html = await response.text();

    assert.match(html, /<html lang="pt-BR">/);
    assert.match(html, /<title>Relay Studio — execução operacional<\/title>/);
    assert.match(
      html,
      /<meta name="description" content="A Relay avalia primeiros pilotos de execução operacional para transformar um fluxo recorrente em resultado, exceções e evidência\."\/>/,
    );
    assert.match(html, /Relay Studio/);
    const sections = ["top", "prova", "piloto", "contato"];
    let previous = -1;
    for (const section of sections) {
      const position = html.indexOf(`id="${section}"`);
      assert.ok(position > previous, `#${section} deve vir depois da seção anterior`);
      previous = position;
    }

    assert.match(html, /O trabalho anda\./);
    const hero = html.slice(html.indexOf('id="top"'), html.indexOf('id="prova"'));
    assert.match(hero, /Primeiros fluxos em validação/);
    assert.match(html, /Começar pequeno é parte do método/);
    assert.match(html, /O limite vem antes da execução/);
    assert.match(html, /Qual trabalho recorrente ainda termina na sua equipe/);
    assert.match(html, /href="#prova">Acompanhar uma entrega/);
    assert.match(html, /href="#limites">Limites/);
    assert.match(html, /id="limites"/);
    assert.match(html, /id="formulario"/);
    assert.match(html, /Prévia local · nenhum dado é enviado/);
    assert.match(html, /Impacto hoje/);
    assert.match(html, /Prévia sem envio/);
    assert.match(html, /Confirmo que não enviei dados pessoais sensíveis, credenciais nem conteúdo operacional real\./);
    assert.match(html, /target="_blank"/);
    assert.match(html, /rel="noreferrer"/);
    assert.match(html, /href="#formulario">Descrever um fluxo/);
    const primaryCtaStart = html.indexOf('href="#formulario"');
    const primaryCtaEnd = html.indexOf("</a>", primaryCtaStart);
    const primaryCta = html.slice(primaryCtaStart, primaryCtaEnd);
    assert.doesNotMatch(primaryCta, /↗/);
    assert.match(html, /https:\/\/docs\.google\.com\/forms\/d\/e\//);
    assert.doesNotMatch(html, /id="audit"/);
    assert.doesNotMatch(html, /Forte candidato|Vale investigar|Ainda não é prioridade/);
    assertOperationalStory(html);
    assert.match(html, /Frequência, SLA, critério de aceite e cobrança continuam em validação/);
    assert.match(html, /enviar dados pessoais sensíveis/);
    assert.match(html, /https:\/\/docs\.google\.com\/forms\/d\/e\//);
    assert.match(html, /O formulário abre no Google Forms/);
    assert.doesNotMatch(html, /localhost:3000/);
    assert.doesNotMatch(html, /#construir/);
    assert.doesNotMatch(html, /Construir junto/);
    assert.doesNotMatch(html, /id="estado"/);

    assert.doesNotMatch(html, /Relay OS/);
    assert.doesNotMatch(html, /Relay Web/);
    assert.doesNotMatch(html, /Relay Sim/);
  } finally {
    server.kill("SIGTERM");
    await once(server, "exit").catch(() => undefined);
  }
});

test("o brand kit canônico contém os assets usados pela página", async () => {
  const lightIcon = await readFile(path.join(projectRoot, "public", "brand", "relay-icon-light.svg"), "utf8");
  const darkIcon = await readFile(path.join(projectRoot, "public", "brand", "relay-icon-dark.svg"), "utf8");

  assert.match(lightIcon, /<svg/);
  assert.match(darkIcon, /<svg/);
});

test("o build produz uma saída estática para o GitHub Pages", async () => {
  const staticHtml = await readFile(path.join(projectRoot, "dist", "client", "index.html"), "utf8");

  assert.match(staticHtml, /<html lang="pt-BR">/);
  assert.match(staticHtml, /_next\/static/);
  assert.match(staticHtml, /brand\/relay-icon-light\.svg/);
  assert.match(staticHtml, /https:\/\/docs\.google\.com\/forms\/d\/e\//);
  assertOperationalStory(staticHtml);
});

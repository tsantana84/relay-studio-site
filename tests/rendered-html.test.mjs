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
    const sections = ["top", "prova", "trabalho", "piloto", "mecanismo", "limites", "contato"];
    let previous = -1;
    for (const section of sections) {
      const position = html.indexOf(`id="${section}"`);
      assert.ok(position > previous, `#${section} deve vir depois da seção anterior`);
      previous = position;
    }

    assert.match(html, /O trabalho recorrente termina\. Com evidência\./);
    assert.match(html, /Começamos pelo que se repete, pesa e precisa fechar/);
    assert.match(html, /Começar pequeno é parte do método/);
    assert.match(html, /A decisão humana vem antes da ação/);
    assert.match(html, /Antes de executar, o limite precisa estar claro/);
    assert.match(html, /Qual trabalho recorrente ainda termina na sua equipe/);
    assert.match(html, /href="#prova">Ver uma entrega/);
    assert.match(html, /id="formulario"/);
    assert.match(html, /Prévia local · nenhum dado é enviado/);
    assert.match(html, /Impacto hoje/);
    assert.match(html, /Prévia sem envio/);
    assert.match(html, /href="#formulario">Descrever um fluxo/);
    assert.match(html, /https:\/\/docs\.google\.com\/forms\/d\/e\//);
    assert.doesNotMatch(html, /id="audit"/);
    assert.doesNotMatch(html, /Forte candidato|Vale investigar|Ainda não é prioridade/);
    assert.match(html, /Demonstração sintética/);
    assert.match(html, /Dados fictícios para demonstrar o percurso da entrega/);
    const proofStart = html.indexOf('id="prova"');
    const proofEnd = html.indexOf("</section>", proofStart);
    const proof = html.slice(proofStart, proofEnd);
    let stageCursor = -1;
    for (const stage of ["source", "preparation", "approval", "execution", "result"]) {
      const next = proof.indexOf(`data-stage="${stage}"`);
      assert.ok(next > stageCursor, `${stage} deve vir depois do estágio anterior dentro de #prova`);
      stageCursor = next;
    }
    assert.match(html, /recibo #014/);
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
});

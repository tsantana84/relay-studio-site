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
    assert.match(html, /Relay Studio/);
    for (const section of ["visao", "trabalho", "audit", "produto", "processo", "principios", "privacidade", "interesse"]) {
      assert.match(html, new RegExp(`id="${section}"`));
    }
    assert.match(html, /id="prova"/);
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
    assert.match(html, /SaaS de execução operacional/);
    assert.match(html, /Seu time decide/);
    assert.match(html, /A Relay executa/);
    assert.match(html, /Ver como entregamos/);
    assert.match(html, /Avaliar um fluxo/);
    assert.match(html, /href="#audit">Avaliar um fluxo/);
    assert.match(html, /Audit do fluxo/);
    assert.match(html, /Esse trabalho acontece toda semana/);
    assert.match(html, /Comece pelo primeiro sinal/);
    assert.match(html, /Descrever este fluxo/);
    assert.match(html, /não envia suas respostas/);
    assert.match(html, /Fontes autorizadas/);
    assert.match(html, /trabalhando na coisa certa/);
    assert.match(html, /direitos de acesso, exportação e/);
    assert.match(html, /Descrever um fluxo/);
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

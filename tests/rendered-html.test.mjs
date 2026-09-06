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
  assert.match(html, /Do trabalho manual ao resultado entregue\./);
  assert.match(html, /A Relay executa\. Sua equipe decide o que exige julgamento\./);
  for (const label of ["preparado", "exceção", "aprovado", "devolvido"]) {
    assert.match(html, new RegExp(`operational-rail__branch[^>]*>${label}`));
  }
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
      /<meta name="description" content="A Relay executa trabalhos operacionais recorrentes, leva exceções para decisão da equipe e registra o resultado\."\/>/,
    );
    assert.match(html, /Relay Studio/);
    const sections = ["top", "como-funciona", "onde-comecar", "piloto", "contato"];
    let previous = -1;
    for (const section of sections) {
      const position = html.indexOf(`id="${section}"`);
      assert.ok(position > previous, `#${section} deve vir depois da seção anterior`);
      previous = position;
    }

    assert.match(html, /Reduza o custo do trabalho recorrente sem perder o controle\./);
    assert.match(html, /Primeiros pilotos em validação/);
    for (const title of [
      "Escolha um trabalho recorrente",
      "A Relay prepara o trabalho",
      "As exceções chegam à sua equipe",
      "Só o que foi autorizado é executado",
      "Você recebe o resultado e o registro",
    ]) {
      assert.match(html, new RegExp(title));
    }
    for (const example of [
      "Conferir valores entre fontes",
      "Preparar relatórios recorrentes",
      "Acompanhar prazos e pendências",
      "Atualizar sistemas depois de uma decisão",
    ]) {
      assert.match(html, new RegExp(example));
    }
    assert.match(
      html,
      /Estes são exemplos de trabalhos que podemos avaliar para um piloto\. Não são soluções prontas nem resultados comprovados de clientes\./,
    );
    assert.match(html, /Comece por um trabalho\. Prove o valor antes de ampliar\./);
    for (const step of ["Escolher", "Combinar", "Testar", "Decidir"]) {
      assert.match(html, new RegExp(`>${step}<`));
    }
    assert.match(html, /Tem um trabalho repetitivo tomando o tempo da sua equipe\?/);
    const contact = html.slice(html.indexOf('id="contato"'), html.indexOf("</section>", html.indexOf('id="contato"')));
    assert.match(contact, /href="https:\/\/docs\.google\.com\/forms\/d\/e\//);
    assert.match(contact, /target="_blank"/);
    assert.match(contact, /rel="noreferrer"/);
    assert.match(contact, /Não envie dados pessoais sensíveis, credenciais, documentos, planilhas nem conteúdo operacional real\./);
    assert.match(contact, /O formulário abre no Google Forms\./);
    assert.doesNotMatch(html, /id="audit"/);
    assert.doesNotMatch(html, /Forte candidato|Vale investigar|Ainda não é prioridade/);
    assertOperationalStory(html);
    assert.match(html, /Frequência, prazo, critério de aceite e preço são definidos durante a avaliação do piloto\./);
    for (const forbidden of ["184 pedidos", "179 correspondências", "recibo sintético #014", "Prévia local", "Prévia sem envio", "<form", 'id="formulario"']) {
      assert.doesNotMatch(html, new RegExp(forbidden));
    }
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

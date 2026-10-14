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

function assertStory(html) {
  const list = html.match(/<ol class="how__steps"[\s\S]*?<\/ol>/)?.[0] ?? "";
  let cursor = -1;
  for (const title of [
    "Você escolhe um trabalho",
    "A Relay prepara e confere",
    "Sua equipe decide as exceções",
    "A Relay executa e registra",
  ]) {
    const next = list.indexOf(title);
    assert.ok(next > cursor, `"${title}" deve vir depois do passo anterior na lista semântica`);
    cursor = next;
  }
  assert.match(html, /Do trabalho manual ao resultado entregue\./);
  assert.match(html, /A Relay executa\. Sua equipe decide\./);
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
    assert.match(html, /<title>Relay Studio — menos trabalho repetitivo, mais decisão<\/title>/);
    assert.match(
      html,
      /<meta name="description" content="A Relay faz o trabalho repetitivo da sua operação, para nas exceções para a sua equipe decidir e registra tudo\."\/>/,
    );
    const sections = ["top", "como-funciona", "onde-comecar", "piloto", "contato"];
    let previous = -1;
    for (const section of sections) {
      const position = html.indexOf(`id="${section}"`);
      assert.ok(position > previous, `#${section} deve vir depois da seção anterior`);
      previous = position;
    }

    assert.match(html, /<h1[^>]*aria-label="Menos conferir, copiar e cobrar\. Mais tempo para decidir\."/);
    assert.match(html, /Primeiros pilotos em validação/);
    assert.match(html, /<noscript><style>\[data-motion\]/);
    // O exemplo chega legível no HTML estático, identificado como ilustração.
    assert.match(html, /Exemplo ilustrativo/);
    for (const step of [
      "Reunir pedidos e repasses",
      "Conferir um por um",
      "Parar no que não bate",
      "Executar só o que foi aprovado",
      "Registrar o que aconteceu",
    ]) {
      assert.match(html, new RegExp(step));
    }
    for (const row of ["Procurar números em planilhas", "Decidir onde intervir", "Copiar dados entre sistemas"]) {
      assert.match(html, new RegExp(row));
    }
    for (const example of ["Conferir valores", "Fechar relatórios", "Cobrar prazos e pendências", "Atualizar sistemas"]) {
      assert.match(html, new RegExp(example));
    }
    assert.match(html, /Não são soluções prontas nem resultados comprovados de clientes\./);
    assert.match(html, /Comece por um trabalho só\. Amplie se valer a pena\./);
    for (const step of ["Escolher", "Combinar", "Rodar", "Decidir"]) {
      assert.match(html, new RegExp(`>${step}<`));
    }
    assert.match(html, /Frequência, prazo, critério de aceite e preço são definidos na avaliação do piloto\./);
    assert.match(html, /Qual trabalho se repete na sua operação\?/);
    const contact = html.slice(html.indexOf('id="contato"'), html.indexOf("</section>", html.indexOf('id="contato"')));
    assert.match(contact, /href="https:\/\/docs\.google\.com\/forms\/d\/e\//);
    assert.match(contact, /target="_blank"/);
    assert.match(contact, /rel="noreferrer"/);
    assert.match(contact, /Não envie dados pessoais sensíveis, credenciais, documentos, planilhas nem conteúdo operacional real\./);
    assert.match(contact, /O formulário abre no Google Forms\./);
    assertStory(html);
    for (const forbidden of ["184 pedidos", "179 correspondências", "recibo sintético #014", "<form", 'id="audit"']) {
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
  assertStory(staticHtml);
});

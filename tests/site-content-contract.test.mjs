import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const source = await readFile(new URL("../app/content/site-content.ts", import.meta.url), "utf8");

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

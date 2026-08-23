import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

test("a direção Arquivo vivo tem tokens e camadas sem mudar a copy", () => {
  assert.match(css, /--relay-moss\s*:/);
  assert.match(css, /--relay-clay\s*:/);
  assert.match(css, /\.hero::before/);
  assert.match(css, /\.execution-example::before/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(page, /Seu time decide\. A Relay executa o trabalho recorrente\./);
  assert.match(page, /Uma reconciliação não precisa terminar na sua equipe\./);
  assert.match(page, /Começamos por fluxos recorrentes em que o resultado é claro e o trabalho manual é alto\./);
});

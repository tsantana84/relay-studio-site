# Task 1 — contrato de conteúdo e claims

## Arquivos alterados

- `app/content/site-content.ts`: adicionados `FORM_URL`, `siteContent` e `deliveryProof`, com objetos `as const` para preservar os literais e shapes readonly inferidos.
- `tests/site-content-contract.test.mjs`: adicionados dois testes de contrato editorial e ordem da prova.
- `package.json`: o script `test` agora executa o build e todos os testes `tests/*.test.mjs`.

## Decisões tomadas

- Mantida literalmente a copy definida no brief, incluindo o posicionamento como primeiros fluxos em validação e os limites de demonstração sintética.
- Mantida a sequência de prova `source → preparation → approval → execution → result`, com autorização humana antes da execução.
- Mantida a URL de formulário fornecida no brief como única `FORM_URL`.

## Validação

- `node --test tests/site-content-contract.test.mjs` — PASS; 2 testes, 2 aprovados, 0 falhas.
- `npm test` — PASS; build concluído e 5 testes, 5 aprovados, 0 falhas.
- `git diff --check` — PASS; nenhum erro de whitespace.

## Commit

- `93f63b4 content: define evidence-led site narrative`.

## Limitações e preocupações

- O módulo de conteúdo foi criado para consumo pelas Tasks 2 e 3; a integração visual ainda não faz parte desta tarefa.
- A prova é explicitamente sintética e não constitui evidência de operação de cliente, produção ou validação comercial.

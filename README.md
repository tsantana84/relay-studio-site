# Relay Studio — site institucional

Presença institucional local da Relay Studio. Este projeto fala pela empresa e pela
tese de trabalho confiável; a landing de produto e parcerias permanece em
`../relay-site`.

## Rodar localmente

Requer Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Abra `http://localhost:3001/`. O institucional não aponta para a landing de
produto/parcerias. A única saída externa é a CTA para contar como funciona um trabalho recorrente.
Ela abre diretamente o formulário publicado no Google Forms; a página orienta a
não enviar dados pessoais sensíveis.

## Verificar

```bash
npm run lint
npm run build
npm test
```

`npm run build` gera a saída estática em `dist/client/`. Para simular um site de
projeto do GitHub Pages localmente:

```bash
GITHUB_PAGES_BASE_PATH=/nome-do-repositorio npm run build
```

O build de publicação usa `output: "export"`. O workflow em
`.github/workflows/deploy-pages.yml` usa o `base_path` resolvido pelo GitHub Pages,
cobrindo tanto sites de projeto (`/<repositório>`) quanto domínios personalizados e
sites pessoais/organizacionais na raiz. No GitHub, selecione **Settings → Pages →
GitHub Actions** como fonte de publicação.

Durante o trabalho local, `public/brand` é um symlink para `../relay-studio-brand-kit`,
a fonte canônica dos assets da marca. Como o GitHub Pages faz checkout apenas deste
repositório, o workflow materializa em `public/brand` os dois SVGs usados pela página a
partir dos snapshots verificados em `.github/brand/`. Alterações de identidade devem
continuar sendo feitas no brand kit canônico e depois refletidas nesses dois assets de
deploy.

## Publicação

O site está publicado em
https://tsantana84.github.io/relay-studio-site/. O formulário de interesse é um recurso
externo publicado separadamente no Google Forms.

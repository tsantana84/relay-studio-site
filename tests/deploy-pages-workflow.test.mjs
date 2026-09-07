import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workflow = await readFile(new URL('../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8');

function stepBlock(name) {
  const start = workflow.indexOf(`      - name: ${name}`);
  const next = workflow.indexOf('\n      - name:', start + 1);
  return workflow.slice(start, next === -1 ? workflow.length : next);
}

test('resolves the Pages base path before checks and build', () => {
  const configure = workflow.indexOf('uses: actions/configure-pages@v5');
  const checks = workflow.indexOf('- name: Run checks');
  const build = workflow.indexOf('- name: Build static site');

  assert.notEqual(configure, -1, 'workflow must configure GitHub Pages');
  assert.ok(configure < checks, 'Pages must be configured before checks');
  assert.ok(configure < build, 'Pages must be configured before the build');
  assert.match(workflow, /id: pages[\s\S]*uses: actions\/configure-pages@v5/);
  assert.match(stepBlock('Run checks'), /env:\s*\n\s+GITHUB_PAGES_BASE_PATH:\s*\$\{\{ steps\.pages\.outputs\.base_path \}\}/);
  assert.match(stepBlock('Build static site'), /env:\s*\n\s+GITHUB_PAGES_BASE_PATH:\s*\$\{\{ steps\.pages\.outputs\.base_path \}\}/);
  assert.doesNotMatch(workflow, /GITHUB_REPOSITORY#\*\//, 'base path must not be calculated from the repository name');
});

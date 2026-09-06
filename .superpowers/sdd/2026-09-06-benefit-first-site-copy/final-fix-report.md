# Final fix report — Issue #14

Base reviewed: `7788a798d7cec8a15cc36efa5ed46aa757545ae8`.

## Scope

- Centralized the navigation labels and destinations in `app/content/site-content.ts` as `siteNavigation`.
- Made `OperationalHero` render its navigation from that contract; no navigation copy remains in its JSX.
- Added a rendered, production-HTML assertion for the exact use-case evidence boundary.

## RED

1. After updating `tests/site-content-contract.test.mjs`, `node --test tests/site-content-contract.test.mjs` failed exactly in `a navegação nomeia as seções e leva a ação principal ao contato`: the new `siteNavigation` data contract did not yet exist.
2. The evidence-boundary behavior already existed before its regression assertion was added, so it was demonstrated with a controlled mutation. I temporarily reduced the boundary to its first sentence, ran `npm run build`, then ran `node --test --test-name-pattern='presença institucional completa' tests/rendered-html.test.mjs`. It failed on the new exact-boundary assertion against the production HTML. The approved sentence was restored immediately afterward.

## GREEN and verification

- `node --test tests/site-content-contract.test.mjs` — PASS, 18 tests.
- `npm run build && node --test tests/rendered-html.test.mjs` — PASS; build completed and 3 rendered/static HTML tests passed.
- `npm run lint` — PASS.
- `npm test` — PASS; fresh static build completed and 22 tests passed.
- `git diff --check` — PASS.

## Self-review

Reviewed the final diff for the four authorized implementation/test files. The hero consumes the centralized item and action contract, while the action label reuses the hero's existing primary-CTA value in the same content module. The rendered assertion exercises the built production HTML rather than only source text.

## Deferred checks

- Google Forms opening: **SKIP**.
- Browser reduced-motion emulation: **SKIP**.
- Browser with JavaScript disabled: **SKIP**.

These remain deferred exactly as recorded in the SDD ledger; this correction does not claim them as PASS or alter the system to simulate them.

# Task 2 report — hero and first proof section

## Scope

- Modified `app/globals.css` only.
- Extended `tests/design-contract.test.mjs` with Task 2-specific editorial hooks.
- Left `app/page.tsx` unchanged.
- No `app/components/workflow-audit.tsx` file exists in this worktree, so the JSX freeze check was limited to the existing `app/page.tsx`.

## Red → Green evidence

1. Added Task 2 contract assertions for:
   - `.hero::after`
   - `.signal-rail__line::after`
   - `.signal-rail__marker--active`
   - active marker outline treatment
   - `.execution-example__inner`
   - negative overlap margin on the worksheet
   - `.execution-example__steps` vertical rule
   - `.execution-example__step::before`
   - `.execution-example__note`
2. Ran `node --test tests/design-contract.test.mjs`.
   - First run: failed on missing `.hero::after`.
3. Implemented the CSS-only treatment in `app/globals.css`.
4. Re-ran `node --test tests/design-contract.test.mjs`.
   - Result: 2 tests passed, 0 failed.
5. Tightened the contract after review so the active-marker outline is anchored to `.signal-rail__marker--active` and the decorative `.signal-rail__line::after` explicitly rejects amber.
6. Re-ran `node --test tests/design-contract.test.mjs`.
   - First run after tightening: failed because `.signal-rail__line::after` still used amber.
7. Removed amber from the decorative rail pseudo-element and kept amber only on `.signal-rail__marker--active`.
8. Re-ran the full gate set.

## Visual changes

- Deepened the hero field while preserving the navy base, frozen copy, anchors, and layout semantics.
- Added a low-contrast contour rule in `.hero::after` placed away from the text column.
- Reworked the signal rail so inactive segments read as moss-toned continuity and the active state is distinguishable by shape and outline, not color alone.
- After review, removed amber from the decorative rail pseudo-element so amber remains exclusive to `.signal-rail__marker--active`; the rail halo now uses moss/neutral treatment.
- Reduced reveal travel distance from `15px` to `10px`.
- Turned the reconciliation proof into a paper worksheet with a slight overlap into the hero boundary, warm surface treatment, a single vertical process rule, step hairlines, and clay reserved for the existing validation note.
- Added responsive adjustments so the contour/worksheet treatment collapses without introducing horizontal overflow in CSS intent.

## Verification

- `node --test tests/design-contract.test.mjs`
  - Pass
- `npm run build`
  - Pass
- `node --test tests/rendered-html.test.mjs`
  - First run failed with local server startup timeout at `http://127.0.0.1:3107/`
  - Second run passed: 3 tests passed, 0 failed
- Review-fix rerun on 2026-08-23:
  - `node --test tests/design-contract.test.mjs` passed
  - `npm run build` passed
  - `node --test tests/rendered-html.test.mjs` first rerun failed again with the same startup timeout at `http://127.0.0.1:3107/`
  - `node --test tests/rendered-html.test.mjs` second rerun passed: 3 tests passed, 0 failed
- `git diff -- app/page.tsx`
  - Empty
- `git diff -- app/page.tsx`
  - Still empty after the review fix

## Concerns

- I did not complete the manual browser review at `1440px`, `1024px`, and `390px` because no browser automation step was used in this task. The CSS was adjusted to avoid overflow and preserve reading order, but those exact viewport checks still need visual confirmation.
- The manual browser review at `1440px`, `1024px`, and `390px` is still not verified. That evidence remains pending and must stay open for the visual gate in Task 6.
- The rendered HTML gate showed one startup flake before passing on rerun. No markup regression was indicated after reproduction.
- The rendered HTML gate showed the same startup flake again during the review-fix cycle before passing on rerun. No markup regression was indicated after reproduction.

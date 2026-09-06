import assert from "node:assert/strict";
import { test } from "node:test";
import { deriveStoryState } from "../app/components/operational-story-state.mjs";

const chapters = [
  { top: 1000, height: 800, stage: "source" },
  { top: 1800, height: 800, stage: "preparation" },
  { top: 2600, height: 800, stage: "approval" },
  { top: 3400, height: 800, stage: "execution" },
  { top: 4200, height: 800, stage: "result" },
];

test("deriva limites e progresso usando intervalos reais dos capítulos", () => {
  assert.deepEqual(deriveStoryState(900, 1000, 4000, chapters), {
    overallProgress: 0,
    chapterIndex: 0,
    chapterProgress: 0,
    activeStage: "source",
  });
  assert.equal(deriveStoryState(1400, 1000, 4000, chapters).chapterProgress, 0.5);
  assert.equal(deriveStoryState(1850, 1000, 4000, chapters).activeStage, "preparation");
  assert.deepEqual(deriveStoryState(6000, 1000, 4000, chapters), {
    overallProgress: 1,
    chapterIndex: 4,
    chapterProgress: 1,
    activeStage: "result",
  });
});

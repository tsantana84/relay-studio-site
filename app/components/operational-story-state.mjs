const clamp = (value) => Math.min(1, Math.max(0, value));

export function deriveStoryState(anchorY, storyTop, storyHeight, chapters) {
  if (chapters.length === 0) {
    return { overallProgress: 0, chapterIndex: 0, chapterProgress: 0, activeStage: "source" };
  }

  let chapterIndex = 0;
  for (let index = 0; index < chapters.length; index += 1) {
    if (anchorY >= chapters[index].top) chapterIndex = index;
  }

  const chapter = chapters[chapterIndex];
  return {
    overallProgress: clamp((anchorY - storyTop) / Math.max(1, storyHeight)),
    chapterIndex,
    chapterProgress: clamp((anchorY - chapter.top) / Math.max(1, chapter.height)),
    activeStage: chapter.stage,
  };
}

export type ChapterMetric = {
  top: number;
  height: number;
  stage: string;
};

export type StoryState = {
  overallProgress: number;
  chapterIndex: number;
  chapterProgress: number;
  activeStage: string;
};

export function deriveStoryState(
  anchorY: number,
  storyTop: number,
  storyHeight: number,
  chapters: readonly ChapterMetric[],
): StoryState;

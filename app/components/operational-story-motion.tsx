"use client";

import { useEffect } from "react";
import { deriveStoryState, type ChapterMetric } from "./operational-story-state.mjs";

export default function OperationalStoryMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-operational-story]");
    const hero = document.querySelector<HTMLElement>("[data-operational-hero]");
    if (!root) return;
    if (!("IntersectionObserver" in window)) return;

    const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-story-chapter]"));
    if (chapters.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;
    let disposed = false;
    let storyTop = 0;
    let storyHeight = 1;
    let metrics: ChapterMetric[] = [];

    const measure = () => {
      metrics = chapters.map((chapter) => {
        const rect = chapter.getBoundingClientRect();
        return {
          top: window.scrollY + rect.top,
          height: rect.height,
          stage: chapter.dataset.stage ?? "source",
        };
      });
      storyTop = metrics[0].top;
      const finalChapter = metrics[metrics.length - 1];
      storyHeight = finalChapter.top + finalChapter.height - storyTop;
    };

    const render = () => {
      frame = 0;
      if (!visible || reduced.matches) return;
      const state = deriveStoryState(
        window.scrollY + window.innerHeight * 0.5,
        storyTop,
        storyHeight,
        metrics,
      );
      root.style.setProperty("--story-progress", state.overallProgress.toFixed(4));
      root.style.setProperty("--chapter-index", String(state.chapterIndex));
      root.style.setProperty("--chapter-progress", state.chapterProgress.toFixed(4));
      root.dataset.activeStage = state.activeStage;
    };

    const requestRender = () => {
      if (!visible || reduced.matches || frame) return;
      frame = window.requestAnimationFrame(render);
    };

    const cancelFrame = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const clearEnhancement = () => {
      cancelFrame();
      root.removeAttribute("data-motion-state");
      root.removeAttribute("data-active-stage");
      root.style.removeProperty("--story-progress");
      root.style.removeProperty("--chapter-index");
      root.style.removeProperty("--chapter-progress");
      hero?.removeAttribute("data-motion-state");
    };

    const handleResize = () => {
      measure();
      requestRender();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelFrame();
        return;
      }
      if (reduced.matches) return;
      root.dataset.motionState = "ready";
      measure();
      requestRender();
    });

    const handlePreferenceChange = () => {
      if (reduced.matches) {
        clearEnhancement();
        return;
      }
      hero?.setAttribute("data-motion-state", "ready");
      if (visible) {
        root.dataset.motionState = "ready";
        measure();
        requestRender();
      }
    };

    if (!reduced.matches) hero?.setAttribute("data-motion-state", "ready");
    observer.observe(root);
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    reduced.addEventListener("change", handlePreferenceChange);
    document.fonts.ready.then(() => {
      if (!disposed && visible && !reduced.matches) handleResize();
    });

    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", handleResize);
      reduced.removeEventListener("change", handlePreferenceChange);
      clearEnhancement();
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

export default function SiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const standalone = Array.from(document.querySelectorAll<HTMLElement>('[data-motion="reveal"]'));
    const sequences = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-sequence]"));
    const timers: number[] = [];

    function revealAll() {
      [...standalone, ...sequences].forEach((element) => {
        element.setAttribute("data-motion-state", "visible");
        element.querySelectorAll<HTMLElement>('[data-motion="stage"]').forEach((stage) =>
          stage.setAttribute("data-motion-state", "visible"),
        );
      });
    }

    function handleReducedMotion() {
      if (!reduced.matches) return;
      document.documentElement.removeAttribute("data-motion-ready");
      timers.forEach((timer) => window.clearTimeout(timer));
      revealAll();
    }

    reduced.addEventListener("change", handleReducedMotion);

    function reveal(element: HTMLElement) {
      if (element.hasAttribute("data-motion-sequence")) {
        const stages = Array.from(element.querySelectorAll<HTMLElement>('[data-motion="stage"]'));
        stages.forEach((stage, index) => {
          timers.push(window.setTimeout(() => stage.setAttribute("data-motion-state", "visible"), index * 180));
        });
        return;
      }
      element.setAttribute("data-motion-state", "visible");
    }

    if (reduced.matches || !("IntersectionObserver" in window)) {
      revealAll();
      return () => {
        document.documentElement.removeAttribute("data-motion-ready");
        revealAll();
        reduced.removeEventListener("change", handleReducedMotion);
      };
    }

    document.documentElement.setAttribute("data-motion-ready", "true");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.18 },
    );

    [...standalone, ...sequences].forEach((element) => observer.observe(element));
    return () => {
      document.documentElement.removeAttribute("data-motion-ready");
      revealAll();
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      reduced.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  return null;
}

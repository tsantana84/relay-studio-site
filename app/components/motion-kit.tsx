"use client";

import { MotionConfig, motion } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// `reducedMotion="user"` desliga transform e layout para quem pede menos movimento.
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Todo elemento que nasce escondido leva `data-motion`: sem JavaScript, o
// <noscript> do layout devolve opacidade e posição.
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      data-motion
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="visually-hidden">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="out"
        whileInView="in"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ staggerChildren: 0.07, delayChildren: delay }}
      >
        {words.map((word, index) => (
          <span className="word" key={`${word}-${index}`}>
            <motion.span
              className="word__inner"
              data-motion
              variants={{ out: { y: "110%" }, in: { y: 0 } }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

"use client";

import { motion } from "motion/react";
import { hero } from "../content/site-content";
import { EASE_OUT } from "./motion-kit";

type Word = { readonly text: string; readonly tail?: string; readonly tone?: "less" | "more" };

const sentences: readonly (readonly Word[])[] = hero.title;
const wordOffsets = sentences.map((_, index) =>
  sentences.slice(0, index).reduce((total, sentence) => total + sentence.length, 0),
);
const lessWords = sentences.flat().filter((word) => word.tone === "less");
const ENTER_DELAY = 0.15;
const ENTER_STAGGER = 0.06;
const STRIKE_START = 1.25;

export default function HeroHeadline() {
  return (
    <h1 className="hero__title" id="hero-title" aria-label={hero.titleText}>
      {sentences.map((sentence, sentenceIndex) => (
        <span className="hero__sentence" aria-hidden="true" key={sentenceIndex}>
          {sentence.map((word, wordIndex) => {
            const strikeDelay = STRIKE_START + lessWords.indexOf(word) * 0.22;
            return (
              <span className="word" key={word.text}>
                <motion.span
                  className="word__inner"
                  data-motion
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: EASE_OUT,
                    delay: ENTER_DELAY + (wordOffsets[sentenceIndex] + wordIndex) * ENTER_STAGGER,
                  }}
                >
                  {word.tone === "less" ? (
                    <motion.span
                      className="word__less"
                      animate={{ color: "rgba(247, 242, 231, 0.46)" }}
                      transition={{ duration: 0.5, delay: strikeDelay }}
                    >
                      {word.text}
                      <motion.span
                        className="word__strike"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: EASE_OUT, delay: strikeDelay }}
                      />
                    </motion.span>
                  ) : word.tone === "more" ? (
                    <span className="word__more">{word.text}</span>
                  ) : (
                    word.text
                  )}
                  {word.tail}
                </motion.span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

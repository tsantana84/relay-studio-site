"use client";

import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { howItWorks } from "../content/site-content";
import { EASE_OUT, Reveal } from "./motion-kit";

export default function HowItWorks() {
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 55%", "end 55%"] });

  // Só esmaece as etapas futuras quando o JavaScript está acompanhando o scroll.
  useEffect(() => {
    const node = section.current;
    node?.setAttribute("data-live", "true");
    return () => node?.removeAttribute("data-live");
  }, []);

  return (
    <section className="how" id="como-funciona" aria-labelledby="how-title" ref={section}>
      <div className="how__inner">
        <div className="how__aside">
          <Reveal>
            <p className="eyebrow">{howItWorks.eyebrow}</p>
            <h2 id="how-title">{howItWorks.title}</h2>
            <p className="how__body">{howItWorks.body}</p>
          </Reveal>
          <div className="how__count" aria-hidden="true">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span
                key={active}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                {howItWorks.steps[active].index}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="how__list" ref={list}>
          <span className="how__track" aria-hidden="true" />
          <motion.span className="how__fill" style={{ scaleY: scrollYProgress }} aria-hidden="true" />
          <ol className="how__steps">
            {howItWorks.steps.map((step, index) => (
              <motion.li
                className="how__step"
                data-reached={index <= active}
                key={step.index}
                onViewportEnter={() => setActive(index)}
                viewport={{ margin: "-50% 0px -50% 0px" }}
              >
                <p className="how__owner">
                  <span>{step.index}</span>
                  <span className="how__owner-tag" data-owner={step.owner === "Relay" ? "relay" : "team"}>{step.owner}</span>
                </p>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

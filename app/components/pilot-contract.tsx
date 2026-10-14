"use client";

import { motion } from "motion/react";
import { pilotContract } from "../content/site-content";
import { EASE_OUT, Reveal } from "./motion-kit";

export default function PilotContract() {
  return (
    <section className="pilot" id="piloto" aria-labelledby="pilot-title">
      <div className="pilot__inner">
        <Reveal className="section-head">
          <p className="eyebrow">{pilotContract.eyebrow}</p>
          <h2 id="pilot-title">{pilotContract.title}</h2>
          <p className="section-head__body">{pilotContract.body}</p>
        </Reveal>
        <motion.div
          className="pilot__timeline"
          initial="out"
          whileInView="in"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.span
            className="pilot__line"
            data-motion
            aria-hidden="true"
            variants={{ out: { scaleX: 0 }, in: { scaleX: 1 } }}
            transition={{ duration: 1.3, ease: EASE_OUT }}
          />
          <ol className="pilot__steps">
            {pilotContract.steps.map((step) => (
              <motion.li
                className="pilot__step"
                data-motion
                key={step.index}
                variants={{ out: { opacity: 0, y: 24 }, in: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
              >
                <span className="pilot__index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
        <Reveal>
          <p className="fine-print">{pilotContract.maturity}</p>
        </Reveal>
      </div>
    </section>
  );
}

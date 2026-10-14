"use client";

import { motion } from "motion/react";
import { swap } from "../content/site-content";
import { EASE_OUT } from "./motion-kit";

export default function SwapList() {
  return (
    <div className="swap__table">
      <div className="swap__labels" aria-hidden="true">
        <span>{swap.fromLabel}</span>
        <span />
        <span>{swap.toLabel}</span>
      </div>
      <ul className="swap__rows">
        {swap.rows.map((row) => (
          <motion.li
            className="swap__row"
            key={row.from}
            initial="out"
            whileInView="in"
            viewport={{ once: true, margin: "0px 0px -18% 0px" }}
            transition={{ staggerChildren: 0.18 }}
          >
            <p className="swap__from">
              <span className="visually-hidden">{swap.fromLabel}: </span>
              <motion.span
                className="swap__from-text"
                variants={{ out: { backgroundSize: "0% 2px" }, in: { backgroundSize: "100% 2px" } }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                {row.from}
              </motion.span>
            </p>
            <motion.span
              className="swap__arrow"
              aria-hidden="true"
              data-motion
              variants={{ out: { opacity: 0, x: -16 }, in: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              →
            </motion.span>
            <motion.p
              className="swap__to"
              data-motion
              variants={{ out: { opacity: 0, x: 24 }, in: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <span className="visually-hidden">{swap.toLabel}: </span>
              {row.to}
            </motion.p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { runDemo } from "../content/site-content";
import { EASE_OUT } from "./motion-kit";

type Decision = "approved" | "returned";
type Status = "pending" | "running" | "done" | "waiting" | "approved" | "returned" | "skipped";

// Fases: 0 parado, 1 reunir, 2 conferir, 3 esperando decisão, 4 executar, 5 registrar, 6 concluído.
const WAITING = 3;
const FINISHED = 6;
const EXCEPTION_STEP = 2;
const EXECUTION_STEP = 3;
const PHASE_DURATION: Readonly<Record<number, number>> = { 0: 900, 1: 1500, 2: 1900, 4: 1500, 5: 1300 };

function statusOf(step: number, phase: number, decision: Decision | null): Status {
  const runningPhase = step + 1;
  if (phase < runningPhase) return "pending";
  if (step === EXCEPTION_STEP) return phase === WAITING ? "waiting" : (decision ?? "approved");
  if (phase === runningPhase) return "running";
  if (step === EXECUTION_STEP && decision === "returned") return "skipped";
  return "done";
}

function noteOf(step: number, status: Status, decision: Decision | null) {
  const copy: Readonly<Record<string, string>> = runDemo.steps[step];
  if (status === "pending") return "";
  if (status === "running" || status === "waiting") return copy.running;
  if (status === "done") return copy.done ?? (decision ? copy[decision] : "");
  return copy[status] ?? "";
}

function StepIcon({ status }: { status: Status }) {
  const checked = status === "done" || status === "approved";
  return (
    <span className="run__icon" data-status={status} aria-hidden="true">
      {checked ? (
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
          <motion.path
            d="M3 8.5 6.5 12 13 4.5"
            stroke="currentColor"
            strokeWidth="2.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </svg>
      ) : status === "waiting" ? "!" : status === "returned" ? "↩" : status === "skipped" ? "–" : null}
    </span>
  );
}

export default function RunDemo() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.35 });
  const [phase, setPhase] = useState(0);
  const [decision, setDecision] = useState<Decision | null>(null);

  useEffect(() => {
    const duration = PHASE_DURATION[phase];
    if (!inView || duration === undefined) return;
    const timer = window.setTimeout(() => setPhase((current) => current + 1), duration);
    return () => window.clearTimeout(timer);
  }, [inView, phase]);

  function decide(next: Decision) {
    setDecision(next);
    setPhase(WAITING + 1);
  }

  function replay() {
    setDecision(null);
    setPhase(0);
  }

  return (
    <div className="run" ref={root} data-phase={phase}>
      <header className="run__head">
        <p className="run__tag">{runDemo.tag}</p>
        <p className="run__title">{runDemo.title}</p>
        <p className="run__cadence">{runDemo.cadence}</p>
      </header>
      <div className="run__meter" aria-hidden="true">
        <motion.span
          className="run__meter-fill"
          initial={false}
          animate={{ scaleX: phase / FINISHED }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        />
      </div>
      <ol className="run__steps">
        {runDemo.steps.map((step, index) => {
          const status = statusOf(index, phase, decision);
          return (
            <li className="run__step" data-status={status} key={step.label}>
              <StepIcon status={status} />
              <div className="run__body">
                <p className="run__label">{step.label}</p>
                <p className="run__note">{noteOf(index, status, decision)}</p>
                <AnimatePresence initial={false}>
                  {status === "waiting" ? (
                    <motion.div
                      className="run__exception"
                      key="exception"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                    >
                      <div className="run__exception-inner">
                        <p className="run__exception-title">{runDemo.exception.title}</p>
                        <p>{runDemo.exception.body}</p>
                        <div className="run__choices">
                          <button className="run__choice run__choice--approve" type="button" onClick={() => decide("approved")}>
                            {runDemo.exception.approve}
                          </button>
                          <button className="run__choice" type="button" onClick={() => decide("returned")}>
                            {runDemo.exception.return}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>
      <footer className="run__foot">
        <p className="run__status" aria-live="polite">{runDemo.status[phase]}</p>
        {phase === FINISHED ? (
          <button className="run__replay" type="button" onClick={replay}>
            {runDemo.replay} <span aria-hidden="true">↻</span>
          </button>
        ) : null}
      </footer>
    </div>
  );
}

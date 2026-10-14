"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

const COPIES = 4;
const BASE_SPEED = 3; // % da faixa por segundo; uma cópia ocupa 100 / COPIES.

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export default function Marquee({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const offset = useMotionValue(0);
  const direction = useRef(-1);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(offset, (value) => `${wrap(-100 / COPIES, 0, value)}%`);

  // A faixa acelera e inverte com o scroll; parada, segue em ritmo constante.
  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const scrollBoost = boost.get();
    if (scrollBoost < 0) direction.current = 1;
    else if (scrollBoost > 0) direction.current = -1;
    const step = BASE_SPEED * (delta / 1000);
    offset.set(offset.get() + direction.current * step * (1 + Math.abs(scrollBoost)));
  });

  return (
    <div className="marquee">
      <p className="visually-hidden">{text}</p>
      <motion.div className="marquee__track" style={{ x }} aria-hidden="true">
        {Array.from({ length: COPIES }, (_, index) => (
          <span className="marquee__item" key={index}>
            {text} <span className="marquee__mark" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

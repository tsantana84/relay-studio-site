"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useState } from "react";
import { siteNavigation } from "../content/site-content";

export default function SiteHeader() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 24));

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="site-header__inner">
        <a className="wordmark" href="#top" aria-label="Relay Studio, início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="brand/relay-icon-light.svg" alt="" width="28" height="28" />
          <span>Relay Studio</span>
        </a>
        <nav className="site-nav" aria-label="Navegação principal">
          {siteNavigation.items.map((item) => (
            <a className="site-nav__link" href={item.href} key={item.href}>{item.label}</a>
          ))}
          <a className="button button--amber button--small" href={siteNavigation.action.href}>
            {siteNavigation.action.label}
          </a>
        </nav>
      </div>
      <motion.span className="site-header__progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  );
}

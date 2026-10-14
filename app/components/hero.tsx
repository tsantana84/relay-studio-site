import { hero, siteNavigation } from "../content/site-content";
import HeroHeadline from "./hero-headline";
import { Reveal } from "./motion-kit";
import RunDemo from "./run-demo";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <Reveal y={12}>
            <p className="status"><span className="status__dot" aria-hidden="true" />{hero.status}</p>
          </Reveal>
          <HeroHeadline />
          <Reveal delay={0.55}>
            <p className="hero__lede">{hero.lede}</p>
          </Reveal>
          <Reveal className="hero__actions" delay={0.7}>
            <a className="button button--amber" href={siteNavigation.action.href}>
              {hero.primaryCta} <span className="button__arrow" aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#como-funciona">
              {hero.secondaryCta} <span className="text-link__arrow" aria-hidden="true">↓</span>
            </a>
          </Reveal>
        </div>
        <Reveal className="hero__demo" delay={0.45} y={40}>
          <RunDemo />
        </Reveal>
      </div>
    </section>
  );
}

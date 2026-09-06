import { operationalStory } from "../content/site-content";

export default function OperationalHero() {
  return (
    <section className="operational-hero" id="top" aria-labelledby="hero-title" data-operational-hero>
      <header className="operational-hero__topline">
        <a className="wordmark" href="#top" aria-label="Relay Studio, início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="brand/relay-icon-light.svg" alt="" width="28" height="28" />
          <span>Relay Studio</span>
        </a>
        <nav className="site-nav" aria-label="Navegação principal">
          <a href="#prova">Prova</a>
          <a href="#piloto">Primeiro piloto</a>
          <a href="#limites">Limites</a>
        </nav>
      </header>
      <div className="operational-hero__content">
        <p className="eyebrow">{operationalStory.hero.kicker}</p>
        <h1 className="operational-hero__title" id="hero-title">{operationalStory.hero.title} <em>{operationalStory.hero.accent}</em></h1>
        <p className="operational-hero__status">{operationalStory.hero.status}</p>
        <p className="operational-hero__lede">{operationalStory.hero.lede}</p>
        <div className="operational-hero__actions">
          <a className="button button--amber" href="#formulario">{operationalStory.hero.primaryCta}</a>
          <a className="text-link text-link--light" href="#prova">{operationalStory.hero.secondaryCta} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}

import { operationalStory, siteNavigation } from "../content/site-content";

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
          {siteNavigation.items.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
          <a className="site-nav__action" href={siteNavigation.action.href}>
            {siteNavigation.action.label}
          </a>
        </nav>
      </header>
      <div className="operational-hero__content">
        <p className="eyebrow">{operationalStory.hero.kicker}</p>
        <h1 className="operational-hero__title" id="hero-title">
          {operationalStory.hero.title}
        </h1>
        <p className="operational-hero__status">{operationalStory.hero.status}</p>
        <p className="operational-hero__lede">{operationalStory.hero.lede}</p>
        <div className="operational-hero__actions">
          <a className="button button--amber" href="#contato">{operationalStory.hero.primaryCta}</a>
          <a className="text-link text-link--light" href="#como-funciona">
            {operationalStory.hero.secondaryCta} <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

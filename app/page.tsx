import DeliveryProof from "./components/delivery-proof";
import FlowFormPreview from "./components/flow-form-preview";
import { siteContent } from "./content/site-content";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <header className="hero__topline">
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
        <div className="hero__content">
          <div className="hero__copy">
            <p className="eyebrow">{siteContent.hero.eyebrow}</p>
            <h1 id="hero-title">{siteContent.hero.title}</h1>
            <p className="hero__lede">{siteContent.hero.lede}</p>
            <div className="hero__actions">
              <a className="button button--amber" href="#formulario">
                {siteContent.hero.primaryCta}
              </a>
              <a className="text-link text-link--light" href="#prova">
                {siteContent.hero.secondaryCta} <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <p className="hero__note">{siteContent.hero.note}</p>
        </div>
      </section>
      <DeliveryProof />
      <section className="recognition" id="trabalho" aria-labelledby="recognition-title">
        <div className="section-intro">
          <p className="eyebrow eyebrow--ink">{siteContent.recognition.eyebrow}</p>
          <h2 id="recognition-title">{siteContent.recognition.title}</h2>
          <p>{siteContent.recognition.body}</p>
        </div>
        <div className="recognition__list">
          {siteContent.recognition.items.map((item, index) => (
            <article className="recognition__item" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pilot" id="piloto" aria-labelledby="pilot-title">
        <div className="section-intro">
          <p className="eyebrow">{siteContent.pilot.eyebrow}</p>
          <h2 id="pilot-title">{siteContent.pilot.title}</h2>
        </div>
        <ol className="pilot__stages">
          {siteContent.pilot.stages.map((stage, index) => (
            <li key={stage.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
        <p className="section-note section-note--light">{siteContent.pilot.note}</p>
      </section>
      <section className="mechanism" id="mecanismo" aria-labelledby="mechanism-title">
        <div className="section-intro">
          <p className="eyebrow eyebrow--ink">{siteContent.mechanism.eyebrow}</p>
          <h2 id="mechanism-title">{siteContent.mechanism.title}</h2>
          <p>{siteContent.mechanism.body}</p>
        </div>
        <ol className="mechanism__rail" aria-label="Ordem de execução governada">
          {siteContent.mechanism.stages.map((stage, index) => (
            <li data-stage={stage.stage} key={stage.stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage.title}</strong>
            </li>
          ))}
        </ol>
      </section>
      <section className="limits" id="limites" aria-labelledby="limits-title">
        <div className="section-intro">
          <p className="eyebrow eyebrow--ink">{siteContent.limits.eyebrow}</p>
          <h2 id="limits-title">{siteContent.limits.title}</h2>
        </div>
        <ul className="limits__list">
          {siteContent.limits.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <p className="limits__note">{siteContent.limits.note}</p>
      </section>
      <section className="contact" id="contato" aria-labelledby="contact-title">
        <div className="contact__body">
          <p className="eyebrow">{siteContent.cta.eyebrow}</p>
          <h2 id="contact-title">{siteContent.cta.title}</h2>
          <p>{siteContent.cta.body}</p>
        </div>
        <FlowFormPreview />
      </section>
      <footer className="site-footer">
        <a className="wordmark wordmark--dark" href="#top" aria-label="Relay Studio, início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="brand/relay-icon-dark.svg" alt="" width="28" height="28" />
          <span>Relay Studio</span>
        </a>
        <p>Trabalhar na coisa certa.</p>
        <span>© {new Date().getFullYear()} Relay Studio</span>
      </footer>
    </main>
  );
}

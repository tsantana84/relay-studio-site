import FlowFormPreview from "./components/flow-form-preview";
import OperationalHero from "./components/operational-hero";
import OperationalStory from "./components/operational-story";
import PilotContract from "./components/pilot-contract";
import { siteContent } from "./content/site-content";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <OperationalHero />
      <OperationalStory />
      <PilotContract />
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

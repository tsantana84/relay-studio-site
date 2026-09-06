import ConversionHandoff from "./components/conversion-handoff";
import OperationalHero from "./components/operational-hero";
import OperationalStoryMotion from "./components/operational-story-motion";
import OperationalStory from "./components/operational-story";
import PilotContract from "./components/pilot-contract";
import UseCaseExamples from "./components/use-case-examples";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <OperationalHero />
      <OperationalStory />
      <OperationalStoryMotion />
      <UseCaseExamples />
      <PilotContract />
      <ConversionHandoff />
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

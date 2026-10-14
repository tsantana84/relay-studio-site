import ConversionHandoff from "./components/conversion-handoff";
import Hero from "./components/hero";
import HowItWorks from "./components/how-it-works";
import Marquee from "./components/marquee";
import { MotionRoot, RevealWords } from "./components/motion-kit";
import PilotContract from "./components/pilot-contract";
import SiteHeader from "./components/site-header";
import SwapSection from "./components/swap-section";
import UseCaseExamples from "./components/use-case-examples";
import { footer, howItWorks } from "./content/site-content";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <MotionRoot>
      <SiteHeader />
      <main>
        <Hero />
        <SwapSection />
        <HowItWorks />
        <Marquee text={howItWorks.impact} />
        <UseCaseExamples />
        <PilotContract />
        <ConversionHandoff />
      </main>
      <footer className="site-footer">
        <p className="site-footer__tagline"><RevealWords text={footer.tagline} /></p>
        <div className="site-footer__meta">
          <a className="wordmark" href="#top" aria-label="Relay Studio, início">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="brand/relay-icon-dark.svg" alt="" width="28" height="28" />
            <span>Relay Studio</span>
          </a>
          <span>© {new Date().getFullYear()} Relay Studio</span>
        </div>
      </footer>
    </MotionRoot>
  );
}

import { swap } from "../content/site-content";
import { Reveal } from "./motion-kit";
import SwapList from "./swap-list";

export default function SwapSection() {
  return (
    <section className="swap" aria-labelledby="swap-title">
      <div className="swap__inner">
        <Reveal className="section-head">
          <p className="eyebrow">{swap.eyebrow}</p>
          <h2 id="swap-title">{swap.title}</h2>
          <p className="section-head__body">{swap.body}</p>
        </Reveal>
        <SwapList />
      </div>
    </section>
  );
}

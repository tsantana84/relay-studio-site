import { operationalStory } from "../content/site-content";
import ManifestoCut from "./manifesto-cut";
import OperationalRail from "./operational-rail";

export default function OperationalStory() {
  return (
    <section className="operational-story" id="como-funciona" aria-labelledby="story-title" data-operational-story>
      <header className="operational-story__intro">
        <h2 id="story-title">{operationalStory.title}</h2>
      </header>
      <div className="operational-story__scroll">
        <div className="operational-story__stage" aria-hidden="true">
          <OperationalRail chapters={operationalStory.chapters} railStates={operationalStory.railStates} />
        </div>
        <ol className="operational-story__chapters">
          {operationalStory.chapters.map((chapter) => (
            <li className="operational-chapter" data-story-chapter data-stage={chapter.stage} key={chapter.stage}>
              <span>{chapter.index} / {chapter.verb}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <ManifestoCut>{operationalStory.impact}</ManifestoCut>
    </section>
  );
}

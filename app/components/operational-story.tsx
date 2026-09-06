import { operationalStory } from "../content/site-content";
import ManifestoCut from "./manifesto-cut";
import OperationalRail from "./operational-rail";

export default function OperationalStory() {
  return (
    <section className="operational-story" id="prova" aria-labelledby="story-title" data-operational-story>
      <header className="operational-story__intro">
        <p>{operationalStory.disclosure}</p>
        <h2 id="story-title">Uma tarefa entra. Uma prova sai.</h2>
        <p>{operationalStory.productBoundary}</p>
      </header>
      <div className="operational-story__scroll">
        <div className="operational-story__stage" aria-hidden="true">
          <OperationalRail chapters={operationalStory.chapters} />
        </div>
        <ol className="operational-story__chapters">
          {operationalStory.chapters.map((chapter) => (
            <li className="operational-chapter" data-story-chapter data-stage={chapter.stage} key={chapter.stage}>
              <span>{chapter.index} / {chapter.verb}</span>
              <h3>{chapter.title}</h3>
              <strong>{chapter.value}</strong>
              <p>{chapter.detail}</p>
              {chapter.stage === "approval" ? <ManifestoCut>{operationalStory.manifesto.decision}</ManifestoCut> : null}
            </li>
          ))}
        </ol>
      </div>
      <ManifestoCut>{operationalStory.manifesto.closing}</ManifestoCut>
    </section>
  );
}

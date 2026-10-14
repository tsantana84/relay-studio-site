import { useCaseExamples } from "../content/site-content";
import { Reveal } from "./motion-kit";

export default function UseCaseExamples() {
  return (
    <section className="cases" id="onde-comecar" aria-labelledby="use-cases-title">
      <div className="cases__inner">
        <Reveal className="section-head">
          <p className="eyebrow">{useCaseExamples.eyebrow}</p>
          <h2 id="use-cases-title">{useCaseExamples.title}</h2>
          <p className="section-head__body">{useCaseExamples.intro}</p>
        </Reveal>
        <ol className="cases__list">
          {useCaseExamples.items.map((item, index) => (
            <li key={item.title}>
              <Reveal className="cases__item" delay={index * 0.06} y={20}>
                <span className="cases__index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <p className="fine-print">{useCaseExamples.boundary}</p>
        </Reveal>
      </div>
    </section>
  );
}

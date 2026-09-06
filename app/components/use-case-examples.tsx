import { useCaseExamples } from "../content/site-content";

export default function UseCaseExamples() {
  return (
    <section className="use-cases" id="onde-comecar" aria-labelledby="use-cases-title">
      <header className="use-cases__intro">
        <h2 id="use-cases-title">{useCaseExamples.title}</h2>
        <p>{useCaseExamples.intro}</p>
      </header>
      <ol className="use-cases__list">
        {useCaseExamples.items.map((item, index) => (
          <li key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>
      <p className="use-cases__boundary">{useCaseExamples.boundary}</p>
    </section>
  );
}

import { pilotContract } from "../content/site-content";

export default function PilotContract() {
  return (
    <section className="pilot-contract" id="piloto" aria-labelledby="pilot-title">
      <div className="pilot-contract__intro">
        <h2 id="pilot-title">{pilotContract.title}</h2>
        <p>{pilotContract.body}</p>
      </div>
      <ol className="pilot-contract__steps">
        {pilotContract.steps.map((step) => (
          <li key={step.index}>
            <span>{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="pilot-contract__maturity">{pilotContract.maturity}</p>
    </section>
  );
}

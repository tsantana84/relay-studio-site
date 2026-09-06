import { deliveryProof } from "../content/site-content";

export default function DeliveryProof() {
  return (
    <section className="delivery-proof" id="prova" aria-labelledby="proof-title">
      <div className="delivery-proof__intro" data-motion="reveal">
        <p className="eyebrow eyebrow--ink">{deliveryProof.label}</p>
        <h2 id="proof-title">{deliveryProof.title}</h2>
        <p>{deliveryProof.period}</p>
        <p className="delivery-proof__disclosure">{deliveryProof.disclosure}</p>
      </div>
      <ol className="delivery-ledger" data-motion-sequence="delivery" aria-label="Percurso da entrega sintética">
        {deliveryProof.stages.map((item, index) => (
          <li
            className={`delivery-ledger__row delivery-ledger__row--${item.stage}`}
            data-motion="stage"
            data-stage={item.stage}
            key={item.stage}
          >
            <span className="delivery-ledger__index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{item.label}</h3>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="delivery-proof__commercial-note">{deliveryProof.commercialNote}</p>
    </section>
  );
}

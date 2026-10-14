import { FORM_URL, contact } from "../content/site-content";
import { Reveal } from "./motion-kit";

export default function ConversionHandoff() {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="contact__inner">
        <Reveal className="contact__body">
          <h2 id="contact-title">{contact.title}</h2>
          <p>{contact.body}</p>
        </Reveal>
        <div className="contact__handoff">
          <ol className="contact__prompts">
            {contact.prompts.map((prompt, index) => (
              <li key={prompt}>
                <Reveal className="contact__prompt" delay={index * 0.08} y={16}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{prompt}</strong>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal delay={0.2}>
            <a className="button button--navy button--large" href={FORM_URL} target="_blank" rel="noreferrer">
              {contact.action} <span className="button__arrow" aria-hidden="true">↗</span>
            </a>
            <p className="contact__note">{contact.externalNote} {contact.safety}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

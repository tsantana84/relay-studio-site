import { FORM_URL, siteContent } from "../content/site-content";

export default function ConversionHandoff() {
  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="contact__body">
        <h2 id="contact-title">{siteContent.cta.title}</h2>
        <p>{siteContent.cta.body}</p>
      </div>
      <div className="conversion-handoff">
        <ol>
          {siteContent.cta.prompts.map((prompt, index) => (
            <li key={prompt}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{prompt}</strong>
            </li>
          ))}
        </ol>
        <p className="conversion-handoff__safety">{siteContent.cta.safety}</p>
        <a className="button button--amber" href={FORM_URL} target="_blank" rel="noreferrer">
          {siteContent.cta.action} <span aria-hidden="true">↗</span>
        </a>
        <p className="conversion-handoff__external-note">{siteContent.cta.externalNote}</p>
      </div>
    </section>
  );
}

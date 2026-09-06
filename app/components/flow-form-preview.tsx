"use client";

import type { FormEvent } from "react";
import { FORM_URL, siteContent } from "../content/site-content";

export default function FlowFormPreview() {
  function preventSubmission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="flow-form-preview" id="formulario">
      <p className="flow-form-preview__label">{siteContent.form.label}</p>
      <p id="form-preview-safety">{siteContent.form.safety}</p>
      <form aria-describedby="form-preview-safety" onSubmit={preventSubmission}>
        {siteContent.form.fields.map((field) => (
          <label htmlFor={`preview-${field.id}`} key={field.id}>
            <span>{field.label}</span>
            {field.kind === "select" ? (
              <select defaultValue="" id={`preview-${field.id}`} required>
                <option disabled value="">Selecione</option>
                {field.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            ) : field.kind === "textarea" ? (
              <textarea id={`preview-${field.id}`} rows={3} required />
            ) : (
              <input id={`preview-${field.id}`} type="text" required />
            )}
          </label>
        ))}
        <label className="flow-form-preview__confirmation">
          <input required type="checkbox" />
          <span>Confirmo que não enviei dados pessoais sensíveis, credenciais nem conteúdo operacional real.</span>
        </label>
        <button className="button button--amber" type="submit">{siteContent.form.submit}</button>
      </form>
      <p className="flow-form-preview__external-note">{siteContent.cta.externalNote}</p>
      <a className="text-link" href={FORM_URL} target="_blank" rel="noreferrer">
        Abrir o formulário atual <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

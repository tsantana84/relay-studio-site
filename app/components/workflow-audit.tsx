"use client";

import { useMemo, useState } from "react";

const questions = [
  "Esse trabalho acontece toda semana ou em ciclos previsíveis?",
  "Alguém precisa copiar informações de uma fonte para outra?",
  "As fontes, permissões e regras do trabalho podem ser delimitadas?",
  "Existe um resultado esperado que alguém consegue conferir?",
  "O custo aparece em horas, atrasos, erros ou retrabalho?",
  "O trabalho consegue separar o repetível das decisões que continuam humanas?",
  "O fluxo termina em uma entrega ou ação concreta, e não apenas em uma sugestão?",
  "Hoje esse processo depende demais de uma pessoa que sabe tudo de memória?",
];

const outcomes = [
  {
    minimum: 0,
    label: "Ainda não é prioridade",
    description:
      "Há poucos sinais de um fluxo repetível e conferível. Talvez exista outra parte da operação com um problema mais claro para começar.",
  },
  {
    minimum: 3,
    label: "Vale investigar",
    description:
      "Há sinais de trabalho manual recorrente. Uma conversa sobre fontes, exceções e definição de pronto ajuda a entender o potencial real.",
  },
  {
    minimum: 6,
    label: "Forte candidato",
    description:
      "O fluxo parece ter repetição, fronteiras e um resultado verificável — boas condições para avaliar um primeiro piloto.",
  },
];

export default function WorkflowAudit() {
  const [answers, setAnswers] = useState<Array<boolean | undefined>>(
    () => Array.from({ length: questions.length }, () => undefined),
  );

  const answered = answers.filter((answer) => answer !== undefined).length;
  const score = answers.filter(Boolean).length;
  const outcome = useMemo(() => {
    if (answered === 0) {
      return {
        label: "Comece pelo primeiro sinal",
        description: "Responda pensando em um único fluxo para receber uma leitura provisória.",
      };
    }

    return [...outcomes].reverse().find((item) => score >= item.minimum) ?? outcomes[0];
  }, [answered, score]);

  function answerQuestion(index: number, value: boolean) {
    setAnswers((current) => current.map((answer, questionIndex) => (questionIndex === index ? value : answer)));
  }

  function resetAudit() {
    setAnswers(Array.from({ length: questions.length }, () => undefined));
  }

  return (
    <section className="section section--navy audit" id="audit" aria-labelledby="audit-title">
      <div className="section__index section__index--light">03 / Audit do fluxo</div>
      <div className="audit__body">
        <div className="audit__intro">
          <p className="eyebrow">Uma primeira leitura</p>
          <h2 id="audit-title">O trabalho que pesa na sua equipe tem perfil para ser executado pela Relay?</h2>
          <p>
            Responda pensando em um único processo recorrente. O audit não pede e-mail e não envia
            suas respostas: ele serve para organizar a conversa sobre onde existe um fluxo possível.
          </p>
          <div className="audit__progress" aria-live="polite">
            <span>{answered} de {questions.length} respondidas</span>
            <span>{score} sinais</span>
          </div>
        </div>

        <div className="audit__panel">
          <ol className="audit-list">
            {questions.map((question, index) => (
              <li className="audit-question" key={question}>
                <span className="audit-question__number">{String(index + 1).padStart(2, "0")}</span>
                <div className="audit-question__content">
                  <h3>{question}</h3>
                  <div className="audit-question__actions" role="group" aria-label={`Responder: ${question}`}>
                    <button
                      className={answers[index] === true ? "audit-choice audit-choice--selected" : "audit-choice"}
                      type="button"
                      aria-pressed={answers[index] === true}
                      onClick={() => answerQuestion(index, true)}
                    >
                      Sim
                    </button>
                    <button
                      className={answers[index] === false ? "audit-choice audit-choice--selected" : "audit-choice"}
                      type="button"
                      aria-pressed={answers[index] === false}
                      onClick={() => answerQuestion(index, false)}
                    >
                      Não
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="audit-result" aria-live="polite">
            <div>
              <span className="audit-result__label">Leitura provisória</span>
              <h3>{outcome.label}</h3>
              <p>{outcome.description}</p>
            </div>
            <div className="audit-result__actions">
              <a
                className="button button--amber"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfype2A6Klr6f7cwxLnZY8Hr9BxfRAZT5suJLXASKsf8dsWIw/viewform"
                target="_blank"
                rel="noreferrer"
              >
                Descrever este fluxo <span aria-hidden="true">↗</span>
              </a>
              <button className="text-link text-link--light audit-reset" type="button" onClick={resetAudit}>
                Refazer audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

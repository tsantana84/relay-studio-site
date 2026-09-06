import WorkflowAudit from "./components/workflow-audit";
import DeliveryProof from "./components/delivery-proof";

const workExamples = [
  {
    number: "01",
    title: "Relatórios que precisam fechar",
    description: "Reunir dados dispersos, conferir o que mudou e devolver uma leitura pronta para decisão.",
  },
  {
    number: "02",
    title: "Reconciliações e conferências",
    description: "Comparar fontes, separar o que bate do que não bate e entregar as exceções para revisão.",
  },
  {
    number: "03",
    title: "Documentos e propostas",
    description: "Reunir o contexto, preparar uma primeira versão e encaminhar o que precisa de revisão.",
  },
  {
    number: "04",
    title: "Prazos e acompanhamentos",
    description: "Identificar o que está pendente, organizar o próximo passo e registrar o que foi feito.",
  },
];

const capabilities = [
  {
    number: "01",
    name: "Execução",
    description: "Ler fontes autorizadas, aplicar as regras do processo e produzir o resultado combinado.",
  },
  {
    number: "02",
    name: "Aprovação",
    description: "Encaminhar exceções e aprovações a quem responde pelo processo.",
  },
  {
    number: "03",
    name: "Evidência",
    description: "Registrar entradas, decisões e resultado para que cada entrega possa ser conferida.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Fontes autorizadas",
    description: "A operação define as fontes, permissões e regras que o fluxo pode usar.",
  },
  {
    number: "02",
    title: "Trabalho executado",
    description: "A Relay reúne contexto, aplica o processo e monta o resultado recorrente.",
  },
  {
    number: "03",
    title: "Exceção ou aprovação",
    description: "Quando uma decisão pede experiência ou responsabilidade, ela chega a uma pessoa com o contexto necessário.",
  },
  {
    number: "04",
    title: "Resultado registrado",
    description: "A entrega, a decisão e a evidência ficam registradas para consulta e para o próximo ciclo.",
  },
];

const principles = [
  {
    number: "01",
    title: "Contexto antes de ação",
    description: "Uma boa ação começa por entender o que está acontecendo.",
  },
  {
    number: "02",
    title: "Evidência antes de fluência",
    description: "Uma resposta convincente precisa ser conferível.",
  },
  {
    number: "03",
    title: "Exceções para julgamento humano",
    description: "O sistema cuida do repetível e deixa as decisões difíceis visíveis.",
  },
  {
    number: "04",
    title: "Auditoria como parte do trabalho",
    description: "Registrar o que aconteceu faz parte do trabalho.",
  },
];

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__topline">
          <a className="wordmark" href="#top" aria-label="Relay Studio, início">
            {/* The icon is served from the symlinked canonical brand kit. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="brand/relay-icon-light.svg" alt="" width="28" height="28" />
            <span>Relay Studio</span>
          </a>
          <nav className="site-nav" aria-label="Navegação principal">
            <a href="#visao">Visão</a>
            <a href="#trabalho">O trabalho</a>
            <a href="#audit">Audit</a>
            <a href="#produto">A entrega</a>
            <a href="#processo">Como funciona</a>
            <a href="#privacidade">Privacidade</a>
          </nav>
        </div>

        <div className="hero__content" id="top">
          <div className="hero__copy reveal reveal--one">
            <p className="eyebrow">Relay Studio / SaaS de execução operacional</p>
            <h1 id="hero-title">Seu time decide. A Relay executa o trabalho recorrente.</h1>
            <p className="hero__lede">
              A Relay Studio é um SaaS que transforma dados autorizados e regras da sua operação
              em trabalho concluído, verificável e pronto para a próxima decisão.
            </p>
            <p className="hero__thesis">
              Execução recorrente. Exceções sob controle. Trabalho na coisa certa.
            </p>
            <div className="hero__actions">
              <a className="button button--amber" href="#visao">
                Ver como entregamos
                <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link text-link--light" href="#audit">
                Avaliar um fluxo <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="signal-rail reveal reveal--two" aria-label="Da fonte autorizada ao resultado">
            <div className="signal-rail__line" aria-hidden="true" />
            <div className="signal-rail__item">
              <span className="signal-rail__marker">01</span>
              <span>Fonte</span>
            </div>
            <div className="signal-rail__item">
              <span className="signal-rail__marker">02</span>
              <span>Execução</span>
            </div>
            <div className="signal-rail__item">
              <span className="signal-rail__marker signal-rail__marker--active">03</span>
              <span>Resultado</span>
            </div>
          </div>
        </div>

        <div className="hero__footer">
          <p>O trabalho recorrente não precisa parar na sua equipe.</p>
          <span aria-hidden="true">↓</span>
        </div>
      </section>

      <DeliveryProof />

      <section className="section section--paper vision" id="visao" aria-labelledby="vision-title">
        <div className="section__index">01 / Visão</div>
        <div className="vision__body">
          <p className="eyebrow eyebrow--ink">A entrega</p>
          <h2 id="vision-title">Software que informa é útil. Software que executa muda o ritmo da operação.</h2>
          <div className="vision__detail">
            <p>
              Em muitas operações, o software reúne dados, mas a equipe ainda precisa buscar,
              conferir, copiar, cobrar e fechar o trabalho. O custo não está apenas na informação
              espalhada. Está no tempo entre saber o que fazer e ver o resultado pronto.
            </p>
            <p>
              A Relay ocupa essa camada de execução. Recebe dados de fontes autorizadas, segue as
              regras do processo, produz o resultado e chama uma pessoa quando há uma exceção ou
              decisão que exige responsabilidade. Não é mais uma tela para administrar: você assina
              a execução de um fluxo recorrente.
            </p>
          </div>
          <p className="statement">
            Menos tempo operando ferramentas. Mais resultado entregue e mais tempo trabalhando na
            coisa certa.
          </p>
        </div>
      </section>

      <section className="section section--paper work" id="trabalho" aria-labelledby="work-title">
        <div className="section__index">02 / O trabalho</div>
        <div className="work__body">
          <div className="work__intro">
            <p className="eyebrow eyebrow--ink">Onde começamos</p>
            <h2 id="work-title">Começamos por fluxos recorrentes em que o resultado é claro e o trabalho manual é alto.</h2>
            <p>
              A Relay não começa tentando automatizar a empresa inteira. Começa por um trabalho
              delimitado, com fontes conhecidas, regras claras e uma definição de pronto que alguém
              consegue conferir.
            </p>
          </div>
          <div className="work-list">
            {workExamples.map((example) => (
              <article className="work-item" key={example.number}>
                <span className="work-item__number">{example.number}</span>
                <div>
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="section-note">
            Esses fluxos estão em validação comercial. A lista indica onde estamos procurando um
            primeiro resultado repetível; não é um catálogo pronto para qualquer empresa.
          </p>
        </div>
      </section>

      <WorkflowAudit />

      <section className="section section--navy build" id="produto" aria-labelledby="build-title">
        <div className="section__index section__index--light">04 / A entrega</div>
        <div className="build__body">
          <div className="build__intro">
            <p className="eyebrow">O que você recebe</p>
            <h2 id="build-title">Você define o resultado. A Relay cuida da execução.</h2>
            <p>
              O SaaS transforma um processo recorrente em um fluxo operado com contexto, regras,
              aprovação e registro. A equipe não precisa administrar mais uma automação para obter
              o resultado.
            </p>
          </div>
          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability" key={capability.name}>
                <span className="capability__number">{capability.number}</span>
                <div>
                  <h3>{capability.name}</h3>
                  <p>{capability.description}</p>
                </div>
                <span className="capability__arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper process" id="processo" aria-labelledby="process-title">
        <div className="section__index">05 / Como funciona</div>
        <div className="process__body">
          <div className="process__intro">
            <p className="eyebrow eyebrow--ink">O mecanismo de entrega</p>
            <h2 id="process-title">Cada fluxo termina em trabalho concluído, não apenas em uma sugestão.</h2>
            <p>
              A Relay executa o que é repetível, leva as exceções para julgamento humano e deixa
              uma evidência do que aconteceu.
            </p>
          </div>
          <ol className="process-list">
            {processSteps.map((step) => (
              <li className="process-step" key={step.number}>
                <span className="process-step__number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <span className="process-step__arrow" aria-hidden="true">→</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section section--paper principles"
        id="principios"
        aria-labelledby="principles-title"
      >
        <div className="section__index">06 / Como pensamos</div>
        <div className="principles__body">
          <div className="principles__intro">
            <p className="eyebrow eyebrow--ink">Como construímos</p>
            <h2 id="principles-title">Execução só escala quando pode ser conferida.</h2>
            <p>
              Um resultado operacional precisa ter fonte, limite, responsável e uma forma clara de
              verificar se ficou pronto.
            </p>
          </div>
          <div className="principles__grid">
            {principles.map((principle) => (
              <article className="principle" key={principle.number}>
                <span className="principle__number">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy privacy" id="privacidade" aria-labelledby="privacy-title">
        <div className="section__index section__index--light">07 / Privacidade</div>
        <div className="privacy__body">
          <div className="privacy__intro">
            <p className="eyebrow">LGPD / responsabilidade operacional</p>
            <h2 id="privacy-title">Executar trabalho também exige responsabilidade sobre os dados.</h2>
          </div>
          <div className="privacy__detail">
            <p className="privacy__statement">
              Como SaaS de execução operacional, a Relay trata dados dentro da finalidade,
              permissões e regras definidas para cada fluxo. A base inclui direitos de acesso,
              exportação e eliminação, retenção por tenant, mascaramento e trilha de auditoria.
            </p>
            <p>
              Antes da produção, Relay e cliente definem a finalidade, a base legal e a
              responsabilidade de cada parte. O controlador continua responsável pelos dados na
              fonte. O sistema deixa visível e rastreável o tratamento que realiza.
            </p>
          </div>
          <div className="privacy__grid">
            <article className="privacy-card">
              <span className="privacy-card__label">No sistema</span>
              <p>Acesso controlado, direitos do titular, retenção configurável, mascaramento e auditoria.</p>
            </article>
            <article className="privacy-card">
              <span className="privacy-card__label">Com cada operação</span>
              <p>Definimos finalidade, papéis, suboperadores, prazos e responsabilidades antes da produção.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--paper interest" id="interesse" aria-labelledby="interest-title">
        <div className="section__index">08 / Começar por um fluxo</div>
        <div className="interest__body">
          <div className="interest__intro">
            <p className="eyebrow eyebrow--ink">Primeiros fluxos em validação</p>
            <h2 id="interest-title">Qual trabalho recorrente sua equipe ainda precisa executar à mão?</h2>
          </div>
          <div className="interest__detail">
            <p>
              A Relay começa com uma operação delimitada: fontes autorizadas, regras conhecidas,
              resultado esperado e exceções que precisam de uma pessoa.
            </p>
            <p>
              Se isso acontece aí, conte como o trabalho acontece hoje. A conversa serve para
              avaliar se existe um fluxo que a Relay possa executar de forma recorrente e verificável.
            </p>
            <a
              className="button button--navy"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfype2A6Klr6f7cwxLnZY8Hr9BxfRAZT5suJLXASKsf8dsWIw/viewform"
              target="_blank"
              rel="noreferrer"
            >
              Descrever um fluxo <span aria-hidden="true">↗</span>
            </a>
            <p className="interest__note">O formulário abre no Google Forms. Não envie dados pessoais sensíveis.</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <a className="wordmark wordmark--dark" href="#top" aria-label="Relay Studio, início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="brand/relay-icon-dark.svg" alt="" width="28" height="28" />
          <span>Relay Studio</span>
        </a>
        <p>Trabalhar na coisa certa.</p>
        <span>© {new Date().getFullYear()} Relay Studio</span>
      </footer>
    </main>
  );
}

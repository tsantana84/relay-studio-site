const workExamples = [
  {
    number: "01",
    title: "Relatórios que precisam fechar",
    description: "Reunir dados dispersos, conferir o que mudou e entregar uma leitura pronta para decisão.",
  },
  {
    number: "02",
    title: "Reconciliações e conferências",
    description: "Encontrar divergências antes que elas virem retrabalho, atraso ou uma decisão errada.",
  },
  {
    number: "03",
    title: "Documentos e propostas",
    description: "Transformar contexto espalhado em um primeiro documento que alguém consegue revisar.",
  },
  {
    number: "04",
    title: "Prazos e acompanhamentos",
    description: "Tirar o próximo passo da memória de alguém e dar visibilidade ao que está pendente.",
  },
];

const capabilities = [
  {
    number: "01",
    name: "Contexto",
    description: "Reunir dados autorizados e evidências antes de pedir uma decisão.",
  },
  {
    number: "02",
    name: "Preparação",
    description: "Transformar informação dispersa em um entregável ou próximo passo revisável.",
  },
  {
    number: "03",
    name: "Confiança",
    description: "Deixar exceções à vista. Pedir aprovação quando a decisão exigir alguém. Registrar o que aconteceu.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Fonte autorizada",
    description: "O trabalho começa nos dados e sistemas que a operação escolheu usar.",
  },
  {
    number: "02",
    title: "Trabalho preparado",
    description: "O sistema organiza o contexto, aplica regras e monta uma primeira versão.",
  },
  {
    number: "03",
    title: "Exceção ou aprovação",
    description: "Quando uma decisão pede experiência ou responsabilidade, ela chega a uma pessoa com o contexto necessário.",
  },
  {
    number: "04",
    title: "Ação registrada",
    description: "A decisão e o resultado ficam registrados para consulta e para o próximo ciclo.",
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
            <a href="#processo">Como funciona</a>
            <a href="#privacidade">Privacidade</a>
          </nav>
        </div>

        <div className="hero__content" id="top">
          <div className="hero__copy reveal reveal--one">
            <p className="eyebrow">Relay Studio / sistemas para operações</p>
            <h1 id="hero-title">Mais tempo trabalhando na coisa certa.</h1>
            <p className="hero__lede">
              Construímos sistemas para operações que perdem tempo reunindo informação, conferindo
              dados e perseguindo o próximo passo.
            </p>
            <p className="hero__thesis">
              Contexto organizado. Trabalho preparado. Exceções visíveis.
            </p>
            <div className="hero__actions">
              <a className="button button--amber" href="#visao">
                Entender a visão
                <span aria-hidden="true">↓</span>
              </a>
              <a className="text-link text-link--light" href="#trabalho">
                Ver o trabalho <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="signal-rail reveal reveal--two" aria-label="Da informação à confiança">
            <div className="signal-rail__line" aria-hidden="true" />
            <div className="signal-rail__item">
              <span className="signal-rail__marker">01</span>
              <span>Contexto</span>
            </div>
            <div className="signal-rail__item">
              <span className="signal-rail__marker">02</span>
              <span>Trabalho</span>
            </div>
            <div className="signal-rail__item">
              <span className="signal-rail__marker signal-rail__marker--active">03</span>
              <span>Confiança</span>
            </div>
          </div>
        </div>

        <div className="hero__footer">
          <p>O próximo passo merece mais do que uma informação perdida.</p>
          <span aria-hidden="true">↓</span>
        </div>
      </section>

      <section className="section section--paper vision" id="visao" aria-labelledby="vision-title">
        <div className="section__index">01 / Visão</div>
        <div className="vision__body">
          <p className="eyebrow eyebrow--ink">Onde o trabalho emperra</p>
          <h2 id="vision-title">
            Quando a informação demora mais que a decisão, o trabalho perde ritmo.
          </h2>
          <div className="vision__detail">
            <p>
              Em muitas operações, as pessoas passam boa parte do dia movendo informação entre
              ferramentas, conferindo o que já deveria estar claro e cobrando o próximo passo. A
              decisão chega tarde, uma exceção passa batida e o trabalho que importa fica para
              depois.
            </p>
            <p>
              A Relay Studio ajuda a separar o trabalho repetível das decisões que pedem
              julgamento. O sistema organiza o contexto, prepara o próximo passo e deixa as
              exceções à vista. A responsabilidade continua com as pessoas.
            </p>
          </div>
          <p className="statement">
            Menos tempo procurando, conferindo e repassando informação. Mais tempo trabalhando na
            coisa certa.
          </p>
        </div>
      </section>

      <section className="section section--paper work" id="trabalho" aria-labelledby="work-title">
        <div className="section__index">02 / O trabalho</div>
        <div className="work__body">
          <div className="work__intro">
            <p className="eyebrow eyebrow--ink">O que estamos testando</p>
            <h2 id="work-title">Começamos pelo trabalho que não deveria depender de alguém perseguindo informação.</h2>
            <p>
              Relatórios, reconciliações, documentos, prazos e acompanhamentos pedem contexto, repetem
              padrões e precisam terminar em um resultado que alguém consiga conferir.
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
            Estamos investigando esses tipos de trabalho. Eles ainda não são promessas prontas
            para qualquer empresa.
          </p>
        </div>
      </section>

      <section className="section section--navy build" id="produto" aria-labelledby="build-title">
        <div className="section__index section__index--light">03 / O que construímos</div>
        <div className="build__body">
          <div className="build__intro">
            <p className="eyebrow">O que muda na operação</p>
            <h2 id="build-title">Conectamos contexto, preparação, aprovação e registro.</h2>
            <p>
              A ideia é preparar o próximo passo, deixá-lo verificável e fazer a operação avançar
              com clareza.
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
        <div className="section__index">04 / Como funciona</div>
        <div className="process__body">
          <div className="process__intro">
            <p className="eyebrow eyebrow--ink">O mecanismo de confiança</p>
            <h2 id="process-title">O trabalho chega preparado para a próxima decisão.</h2>
            <p>
              O sistema cuida do que se repete. A pessoa entra quando há uma exceção ou decisão.
              Cada passagem fica registrada.
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
        <div className="section__index">05 / Como pensamos</div>
        <div className="principles__body">
          <div className="principles__intro">
            <p className="eyebrow eyebrow--ink">Como construímos</p>
            <h2 id="principles-title">A precisão começa com limites claros.</h2>
            <p>
              Uma operação confiável precisa de limites claros, evidência suficiente e espaço para
              as pessoas decidirem quando a situação pede.
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
        <div className="section__index section__index--light">06 / Privacidade</div>
        <div className="privacy__body">
          <div className="privacy__intro">
            <p className="eyebrow">LGPD / responsabilidade operacional</p>
            <h2 id="privacy-title">Confiança também é saber o que acontece com os dados.</h2>
          </div>
          <div className="privacy__detail">
            <p className="privacy__statement">
              O Relay foi construído para operar sob a LGPD. O sistema inclui direitos de acesso,
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
        <div className="section__index">07 / Vamos conversar</div>
        <div className="interest__body">
          <div className="interest__intro">
            <p className="eyebrow eyebrow--ink">Primeiros fluxos em validação</p>
            <h2 id="interest-title">Existe uma operação que você gostaria de tirar do caminho?</h2>
          </div>
          <div className="interest__detail">
            <p>
              Estamos procurando operações que perdem tempo reunindo informação, conferindo dados
              e perseguindo o próximo passo.
            </p>
            <p>Se isso acontece aí, conte como o problema aparece no seu dia a dia.</p>
            <a
              className="button button--navy"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfype2A6Klr6f7cwxLnZY8Hr9BxfRAZT5suJLXASKsf8dsWIw/viewform"
              target="_blank"
              rel="noreferrer"
            >
              Manifestar interesse <span aria-hidden="true">↗</span>
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

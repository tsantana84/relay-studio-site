# Roadmap canônico — site institucional Relay Studio

**Issue de acompanhamento:** [relay-os#68](https://github.com/tsantana84/relay-os/issues/68)  
**Status:** direção aprovada em conversa; roadmap canônico para revisão. Não é prova de produção nem de validação com clientes.

Este documento substitui o plano branch-only **“Arquivo vivo” de 2026-08-23**, que congelava copy e audit. A direção editorial permanece como linguagem visual, mas a narrativa, a prova e a conversão passam a ser governadas por este roadmap.

## Resultado buscado

Gerar conversas qualificadas para os primeiros pilotos com líderes de operações e financeiro. A CTA principal é um formulário curto para a pessoa descrever um fluxo recorrente; não há promessa de preço, prazo, automação ou resultado antes de entendimento e aprovação humana.

## Verdade do site

| Classificação | O que pode ser comunicado |
| --- | --- |
| **Existe hoje** | Site institucional estático, audit local, CTA para formulário externo e um exemplo textual de fluxo candidato. O site ainda não mostra uma entrega operacional completa. |
| **Em construção** | Roadmap aprovado para revisar narrativa, composição, prova sintética, motion e qualificação de conversas. Nenhuma dessas mudanças está publicada. |
| **Hipótese** | Líderes de operações/financeiro reconhecerão seus fluxos na prova e enviarão contexto suficiente para uma conversa útil. |
| **Visão** | Relay transforma contexto autorizado em trabalho governado: fonte, preparação, exceção ou aprovação, execução autorizada, resultado e recibo permanecem legíveis. |

Não apresentar a demonstração sintética como entrega em produção, caso de cliente ou validação de mercado.

## Tese narrativa e prova

Ordem obrigatória da página: **promessa honesta → prova → reconhecimento → primeiro piloto → mecanismo → confiança e limites → conversão**.

A prova central é uma entrega sintética explicitamente rotulada. Ela deve mostrar, em uma única leitura, **fontes**, **resultado**, **exceções**, **aprovação** e **recibo**. Cada elemento precisa indicar o que é dado sintético, o que depende de fonte autorizada e em que ponto uma decisão humana é exigida. Não usar frases que façam o mecanismo parecer autônomo ou inevitável.

## Direção de experiência

“Evidência editorial”: um documento operacional vivo, autoral e legível — não um template de SaaS nem um site com aparência de IA gerada. Navy e papel estruturam leitura e confiança; âmbar marca ação/sinal ativo; argila é reservada a exceção e responsabilidade; musgo, a evidência e continuidade de fonte.

Motion é parte da identidade: coreografar **fonte → preparação → exceção ou aprovação → execução autorizada → resultado e recibo**, sempre reforçando a sequência e nunca escondendo estado. Respeitar `prefers-reduced-motion`, preservando conteúdo, ordem e compreensão sem animação. Acesso por teclado, contraste, foco e leitura móvel são requisitos de aceite, não polimento posterior.

Evitar explicitamente hero genérico centralizado, gradientes roxos, blobs, glassmorphism, sequência de cards arredondados, ícones abstratos, dashboard fictício, texto intercambiável com qualquer startup e animações sem função narrativa. O artefato operacional não é decoração: seus dados sintéticos, hierarquia e estados precisam formar uma entrega plausível e conferível.

## Escopo e limites

Incluído: uma landing institucional, prova sintética rotulada, formulário curto, linguagem editorial, estados de exceção/aprovação/recibo e definição da medição mínima necessária para aprender com a conversão.

Fora de escopo: blog, CMS, múltiplas landings, preço inventado, 3D pesado, novo backend e catálogo de automações.

## Sequência de entrega

Cada fase abaixo contém incrementos próprios, independentes e encerráveis. Copy, prova, formulário, protótipo, implementação e validação externa não devem ser agrupados em uma única Issue. Cada incremento segue o limite ativo e os critérios de parada do contrato do workspace.

### Agora — definir e aprovar a nova experiência

1. Fixar a arquitetura de informação e a copy orientada à narrativa acima, revisando todo enunciado que sugira capacidade não comprovada.
2. Projetar a prova sintética como artefato operacional com rótulos, fontes, resultado, exceção, aprovação e recibo.
3. Desenhar a composição editorial e o storyboard de motion para fonte → preparação → exceção ou aprovação → execução autorizada → resultado e recibo, incluindo experiência móvel e modo reduzido.
4. Definir o formulário curto, os critérios de qualificação e a medição mínima necessária, sem escolher ou contratar novos serviços nesta fase.
5. Produzir um protótipo responsivo de alta fidelidade com copy real, prova, CTA e estados principais.

**Gate observável:** o fundador aprova copy, primeira dobra, prova, formulário e coreografia de motion. Em um incremento separado de teste moderado, pelo menos quatro de cinco pessoas do público-alvo identificam o que a Relay entrega, para quem, o estágio da oferta e o próximo passo; reconhecem a prova como sintética e conseguem apontar a exceção e a aprovação. Sem participantes disponíveis, registrar esse teste como **SKIP/pendente**; a aprovação interna não o substitui.

**Critério de parada:** parar no protótipo aprovado. Não iniciar implementação, publicação, novas páginas ou integrações dentro deste incremento.

### Próximo — construir e publicar a primeira versão

1. Implementar a página aprovada em incrementos pequenos, preservando conteúdo sem JavaScript e usando dependências mínimas para motion.
2. Substituir ou retirar o audit atual do caminho principal; sua lógica de pontuação não será reutilizada sem uma decisão própria.
3. Manter o formulário externo na primeira versão, pedindo somente descrição do fluxo, frequência, fontes, resultado esperado, impacto e contato. Não solicitar dados pessoais sensíveis nem conteúdo operacional real.
4. Implementar somente a medição aprovada na fase anterior, distinguindo eventos de navegação do conteúdo enviado pelo visitante.
5. Validar renderização, links, responsividade, teclado, contraste, desempenho, movimento reduzido e ausência de promessas acima da evidência.
6. Abrir PR para revisão. Merge e publicação continuam fora do escopo sem autorização explícita.

**Gate observável:** testes focados e build passam; não há overflow nos viewports acordados; todo conteúdo permanece utilizável com movimento reduzido; a prova e o formulário passam novamente pelo teste de compreensão; o diff e a revisão de claims não introduzem capacidade não comprovada.

**Critério de parada:** parar com a PR pronta e a evidência registrada. Não fazer merge, publicar ou ampliar o escopo dentro do mesmo incremento.

### Depois — aprender com visitantes reais

1. Revisar conversas e envios para descobrir se o visitante descreve um fluxo recorrente, um resultado conferível e um responsável sem coleta adicional excessiva. Considerar uma submissão qualificada quando trouxer papel do interessado, fluxo recorrente, frequência, fontes, resultado esperado e consentimento de contato, sem dados sensíveis.
2. Entrevistar líderes de operações/financeiro que aceitarem conversar, separando entendimento da página, intenção comercial e validação real de demanda.
3. Testar uma variação controlada de copy, prova ou reconhecimento por vez somente quando houver uma dúvida observada.
4. Trocar gradualmente a prova sintética por evidência real apenas quando houver autorização, contexto suficiente e uma afirmação que possa ser sustentada.
5. Considerar páginas específicas, SEO ou conteúdo contínuo somente para fluxos que demonstrarem demanda recorrente.

**Gate observável:** avaliar os primeiros cinco envios qualificados ou os primeiros 30 dias após publicação, o que ocorrer primeiro. O gate produz uma decisão explícita de manter, revisar ou abandonar a mensagem. Cinco envios qualificáveis são sinal de qualificação; não comprovam produto, mercado, SLA ou resultado operacional. Se não houver tráfego ou envios suficientes, registrar aquisição como **inconclusiva**, não a mensagem como fracassada.

**Critério de parada:** se a linguagem, a prova ou o formulário não reduzirem ambiguidade, registrar a hipótese falha antes de testar nova mensagem. Não abrir blog, CMS, catálogo, backend ou novas landings sem evidência de necessidade e decisão explícita de escopo.

## Dependências, riscos e controles

| Item | Dependência ou risco | Controle |
| --- | --- | --- |
| Prova | Confusão entre dado sintético e capacidade real | Rótulo persistente, limites próximos ao artefato e revisão de claims. |
| Formulário | Coleta excessiva ou envio de dados sensíveis | Perguntas mínimas, aviso claro e rota externa já aprovada; não criar backend. |
| Motion | Movimento reduzir entendimento, acessibilidade ou desempenho | Sequência semântica disponível estática, `prefers-reduced-motion` e teste em viewport móvel. |
| Conversão | Volume sem qualidade ou qualidade sem volume | Definir antes da instrumentação quais sinais são necessários e revisar manualmente a qualificação, sem transformar métricas em prova de mercado. |
| Linguagem visual | Estética de template/IA enfraquecer confiança | Revisão editorial contra referências genéricas; cada cor, linha e movimento deve ter função operacional. |

## Validação por incremento

Cada incremento deve ter uma mudança observável, testes focados de renderização/links e uma revisão visual em 1440 px, 1024 px e 390 px, além de teclado e movimento reduzido. Marcar evidência indisponível como **SKIP**, nunca **PASS**. Publicação, novos serviços, coleta adicional de dados e qualquer integração externa exigem decisão explícita separada.

# Operational Story Redesign

## Status

Approved in conversation on 2026-09-06. Tracks [relay-studio-site #12](https://github.com/tsantana84/relay-studio-site/issues/12).

## Problem

The current site communicates the offer accurately, but it presents that content as a conventional sequence of sections. Its motion is limited to opacity and translation reveals, so it neither explains the product nor creates a memorable Relay-specific experience.

This redesign is architectural, not a polish pass. It changes the page from a stack of claims into one scroll-controlled operational story.

## Outcome

A visitor follows one synthetic recurring task from authorized source to recorded result:

1. A recurring task enters.
2. The system separates matches from exceptions.
3. An exception stops at a responsible person.
4. Only approved work proceeds.
5. The result closes with evidence and pending items.

The page must remain honest about maturity. It demonstrates a product direction with fictitious data; it does not imply production operation, customer results, or market validation.

## Creative direction

The approved personality is **80% living operational system and 20% manifesto**.

- The operational system is the structure: a persistent rail, changing state, explicit gates, and a final receipt.
- The manifesto is punctuation: two or three short typographic interruptions at narrative peaks.
- The design is technical, precise, and confident. It must not resemble a generic SaaS template or a fictional dashboard.
- The signature moment is the task travelling through the page and changing state under scroll control.

The chosen approach is a scroll-controlled operational film. Independent section animations would be easier but less memorable. WebGL would increase spectacle while adding performance and accessibility risk without improving the explanation enough.

## Narrative architecture

### Opening: recognition

The opening establishes one idea at extreme scale: recurring work should move without hiding responsibility. A short entrance of at most 700 ms resolves the wordmark, headline, and initial task signal. Interaction is never blocked. “Primeiros fluxos em validação” remains adjacent to the promise.

The hero must not use a generic centered headline, product metric, or decorative dashboard. It introduces the same task that continues through the rest of the page.

### Chapter 1: source

Two authorized synthetic sources enter the rail. The visitor sees the bounded input and the fictitious-data disclosure before any result claim.

### Chapter 2: preparation

The rail separates 179 matches from five exceptions. Motion expresses separation and state change. Copy states that no external action has occurred.

### Chapter 3: human decision

The rail stops. Three adjustments are approved and two are returned. The responsible human decision becomes the visual focal point instead of a footnote.

The first manifesto cut lands here: **“Você entra quando importa.”**

### Chapter 4: authorized execution

Only the approved branch crosses the gate. The two returned items remain visibly pending rather than disappearing from the story.

### Chapter 5: result and receipt

The rail resolves into 182 closed items, two pending items, and synthetic receipt `#014`. The receipt is a semantic result summary, not decorative paper. The page states beside this evidence that the demonstration explains product direction and does not represent a customer operation.

The second manifesto cut closes the sequence: **“Sem caixa-preta. Sem teatro. Com responsabilidade.”**

### Pilot and conversion

After the proof, the page shifts from demonstration to a compact pilot contract:

- choose one bounded recurring flow;
- authorize its sources and limits;
- rehearse one controlled cycle;
- compare the result and decide whether to continue, adjust, or stop.

The limits remain adjacent to this contract. The final question — “Qual trabalho recorrente ainda termina na sua equipe?” — leads to the existing safe form preview and Google Forms handoff.

## Visual system

### Typography

- Use a self-hosted Latin WOFF2 variable display face with meaningful width and weight axes. The approved direction uses **Anybody** for large headlines and manifesto cuts.
- Use a self-hosted Latin WOFF2 build of **Geologica** for body and operational labels if the cold-cache transfer stays within the font budget. If it does not, retain the native body stack and reserve the distinctive face for display.
- Animate type width only in the signature sequence. Body copy never changes shape while being read.
- Preserve readable line lengths and strong size contrast. Small operational labels remain concise rather than becoming repeated section eyebrows.

### Color

- Deep navy is the operational field, not an empty background.
- Warm paper represents proof and readable evidence.
- Amber marks active work and authorized progression.
- Safety red marks exceptions.
- Acid green appears only in manifesto cuts and the human-decision interruption.

Color never carries state alone; labels, shape, and copy provide redundant meaning.

### Composition

- One continuous rail connects the main chapters.
- The page uses asymmetric tension and large scale jumps instead of a centered hero and repeated equal cards.
- Evidence stays readable as text and ordered lists beneath the choreography.
- Mobile becomes a vertical rail with the same state order. It is not a scaled-down desktop composition.

## Motion system

Scroll is the timeline. A short opening establishes the scene; after that, the visitor controls progression.

Motion materials are limited to:

- transforms and opacity for positioning and state entry;
- clip paths and masks for manifesto cuts and rail reveals;
- the display font's width and weight axes for headline state changes;
- bounded blur only during the opening focus pull;
- color and shadow changes for active, exception, approval, and result states.

The page must not use whole-section fade-and-rise reveals, bounce or elastic easing, decorative particles, gratuitous parallax, or floating cards.

Use natural deceleration curves. Feedback stays within 100–300 ms, layout transitions within 300–500 ms, and the one opening entrance within 500–700 ms.

## Technical architecture

### Server-rendered structure

`app/page.tsx` remains a static route. It composes semantic server-rendered chapters so the story, proof, limits, and form are complete before client JavaScript runs. The story contains an always-readable ordered list and a sibling decorative stage; the stage is never the only carrier of evidence.

`app/content/site-content.ts` becomes the single source for the narrative copy and synthetic figures. Existing evidence boundaries and form safety text remain explicit.

### Components

- `OperationalHero`: wordmark, proposition, task signal, and entry actions.
- `OperationalStory`: semantic ordered chapters for source, preparation, approval, execution, and receipt, plus a sibling visual stage inside one scroll wrapper.
- `OperationalRail`: presentational rail, branches, gates, and state labels. It consumes progress through CSS custom properties and does not own business copy.
- `ManifestoCut`: the two deliberate typographic interruptions.
- `PilotContract`: pilot steps and limits in one compact sequence.
- Existing `FlowFormPreview`: retained, restyled only where needed to fit the new system.
- `OperationalStoryMotion`: the only client controller for scroll progress and active chapter state.

Components remain small and independently understandable. The client controller must not contain page copy or render the page's semantic content.

### Scroll controller

Use platform APIs rather than adding an animation dependency:

- passive scroll and resize listeners;
- one `requestAnimationFrame` update at a time;
- document-space bounds for each semantic chapter, invalidated on resize and after fonts load;
- normalized overall and per-chapter progress derived from the chapter containing a viewport anchor and written to CSS custom properties;
- `IntersectionObserver` to suspend work when the story is outside the viewport.

No layout-driving property is animated casually. On enhanced desktop only, sticky positioning establishes the decorative stage; transforms, masks, and font axes render progress. Mobile, reduced-motion, missing-observer, and no-JavaScript modes remain in normal document flow.

### Failure and fallback behavior

- Without JavaScript, every chapter renders in document order with its final readable state.
- With `prefers-reduced-motion: reduce`, sticky choreography is disabled and all chapters render as a static vertical narrative.
- If the display font fails, the fallback stack preserves line breaks and avoids overlap.
- If `IntersectionObserver` is unavailable, the controller does not enable enhancement and keeps the static complete state.
- Scroll scheduling stops while the story is offscreen or reduced motion is active, and all controller-owned state is removed during cleanup.
- The Google Forms handoff remains an explicit external link; the local preview sends no data.

## Accessibility and responsive behavior

- Keyboard focus remains visible on navigation, calls to action, form controls, and the external handoff.
- The reading order matches the visual order.
- All text meets the existing contrast requirements; muted text is tested on its actual tinted background.
- Animation never blocks interaction or hides required content.
- State changes are not announced on every scroll frame. Static labels provide the accessible equivalent.
- Desktop validation targets 1440 px and 1024 px widths. Mobile validation targets 768 px and 390 px widths.
- No viewport may have unintended horizontal overflow.

## Performance budget

- No general-purpose animation library.
- Self-hosted font assets must contain only the required Latin glyph range. Preload only the display face used above the fold.
- Total new font transfer on a cold-cache Portuguese page load should remain below 180 KB compressed; emitted but unrequested subsets do not count toward this budget.
- The controller performs at most one visual update per animation frame and stops when offscreen.
- Expensive blur and shadow effects remain bounded to isolated elements.

## Validation

Automated gates:

1. `npm run lint`
2. `npm run build`
3. `npm test`
4. Focused source tests for narrative order, synthetic disclosure, form handoff, and reduced-motion fallback

Browser gates at `http://localhost:3001`:

1. Opening and scroll choreography at 1440 px and 1024 px
2. Vertical mobile story at 768 px and 390 px
3. Keyboard-only navigation and visible focus
4. Reduced-motion emulation
5. JavaScript-disabled content order
6. No unintended horizontal overflow
7. Form preview and external handoff unchanged in behavior

The user sees the local site at the end of each implementation increment. One independent review and one correction cycle complete the Issue.

## Non-goals

- Production deployment or publication
- Customer-data ingestion
- Claims of production use or customer validation
- A new backend, analytics service, CMS, or form provider
- WebGL, 3D, video backgrounds, decorative particles, or a general animation framework
- Additional pages beyond the institutional homepage

## Stop condition

Stop when the single-page operational story matches the approved direction, passes the automated and browser gates, survives one independent review/correction cycle, and is available locally for human approval. Any additional visual experiment or external comprehension study becomes a separate Issue.

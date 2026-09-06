type Chapter = {
  readonly index: string;
  readonly verb: string;
  readonly stage: string;
};

type RailStates = {
  readonly preparation: { readonly prepared: string; readonly exception: string };
  readonly approval: { readonly approved: string; readonly returned: string };
};

export default function OperationalRail({
  chapters,
  railStates,
}: {
  chapters: readonly Chapter[];
  railStates: RailStates;
}) {

  return (
    <div className="operational-rail" data-story-rail>
      <div className="operational-rail__line" />
      <div className="operational-rail__active" />
      <ol className="operational-rail__stops">
        {chapters.map((chapter) => (
          <li data-stage={chapter.stage} key={chapter.stage}>
            <span>{chapter.index}</span>
            <strong>{chapter.verb}</strong>
          </li>
        ))}
      </ol>
      <div className="operational-rail__branches">
        <div className="operational-rail__branch-group operational-rail__branch-group--preparation">
          <span className="operational-rail__branch operational-rail__branch--prepared">
            {railStates.preparation.prepared}
          </span>
          <span className="operational-rail__branch operational-rail__branch--exception">
            {railStates.preparation.exception}
          </span>
        </div>
        <div className="operational-rail__branch-group operational-rail__branch-group--approval">
          <span className="operational-rail__branch operational-rail__branch--approved">
            {railStates.approval.approved}
          </span>
          <span className="operational-rail__branch operational-rail__branch--returned">
            {railStates.approval.returned}
          </span>
        </div>
      </div>
    </div>
  );
}

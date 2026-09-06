type Chapter = {
  readonly index: string;
  readonly verb: string;
  readonly stage: string;
  readonly value: string;
  readonly detail: string;
};

export default function OperationalRail({ chapters }: { chapters: readonly Chapter[] }) {
  const preparation = chapters.find((chapter) => chapter.stage === "preparation");
  const approval = chapters.find((chapter) => chapter.stage === "approval");
  const result = chapters.find((chapter) => chapter.stage === "result");
  const [matched, exceptions] = preparation?.value.split(" · ") ?? [];
  const [approved, pending] = approval?.value.split(" · ") ?? [];
  const receipt = result ? `${result.detail.replace(/\.$/, "")} · ${result.value}` : "";

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
          <span className="operational-rail__branch operational-rail__branch--matched">{matched}</span>
          <span className="operational-rail__branch operational-rail__branch--exception">{exceptions}</span>
        </div>
        <div className="operational-rail__branch-group operational-rail__branch-group--approval">
          <span className="operational-rail__branch operational-rail__branch--approved">{approved}</span>
          <span className="operational-rail__branch operational-rail__branch--pending">{pending}</span>
        </div>
      </div>
      <p className="operational-rail__receipt">{receipt}</p>
    </div>
  );
}

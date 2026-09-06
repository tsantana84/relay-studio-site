type Chapter = {
  readonly index: string;
  readonly verb: string;
  readonly stage: string;
};

export default function OperationalRail({ chapters }: { chapters: readonly Chapter[] }) {
  return (
    <div className="operational-rail">
      <div className="operational-rail__line" />
      <ol className="operational-rail__stops">
        {chapters.map((chapter) => (
          <li data-stage={chapter.stage} key={chapter.stage}>
            <span>{chapter.index}</span>
            <strong>{chapter.verb}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

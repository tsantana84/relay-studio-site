type Chapter = {
  readonly index: string;
  readonly verb: string;
  readonly stage: string;
};

export default function OperationalRail({ chapters }: { chapters: readonly Chapter[] }) {
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
      <p className="operational-rail__receipt">Recibo sintético #014 · 182 encerrados · 2 pendentes</p>
    </div>
  );
}

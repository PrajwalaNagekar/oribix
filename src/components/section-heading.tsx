export function SectionHeading({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className={`eyebrow ${light ? "text-primary-foreground/70" : "text-primary"}`}>{eyebrow}</p>}
      <h2 className={`section-title mt-2 ${light ? "text-primary-foreground" : "text-foreground"}`}>{title}</h2>
      {body && (
        <p className={`mt-3 text-base leading-7 ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
          {body}
        </p>
      )}
    </div>
  );
}

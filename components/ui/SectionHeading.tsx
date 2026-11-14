type HeadingLevel = "h2" | "h3";

interface SectionHeadingProps {
  className?: string;
  description?: string;
  eyebrow: string;
  headingLevel?: HeadingLevel;
  id?: string;
  title: string;
}

export default function SectionHeading({
  className,
  description,
  eyebrow,
  headingLevel = "h2",
  id,
  title,
}: SectionHeadingProps) {
  const Heading = headingLevel;
  const classes = ["ui-section-heading", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <p className="ui-section-heading__eyebrow">{eyebrow}</p>

      <Heading className="ui-section-heading__title" id={id}>
        {title}
      </Heading>

      {description ? (
        <p className="ui-section-heading__description">{description}</p>
      ) : null}
    </div>
  );
}

export function SectionHeadingStyles() {
  return (
    <style>{`
      .ui-section-heading {
        min-width: 0;
        max-width: 680px;
      }

      .ui-section-heading__eyebrow {
        margin: 0 0 0.65rem;
        color: var(--color-primary);
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 0.09em;
        line-height: 1.4;
        text-transform: uppercase;
      }

      .ui-section-heading__title {
        margin: 0;
      }

      .ui-section-heading__description {
        margin: 0.7rem 0 0;
        color: var(--color-muted);
        line-height: 1.7;
      }
    `}</style>
  );
}
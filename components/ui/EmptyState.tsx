import type { ReactNode } from "react";

import { ButtonLink } from "./Button";

type EmptyStateHeadingLevel = "h2" | "h3" | "h4";

interface EmptyStateAction {
  href: string;
  label: string;
}

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: EmptyStateAction;
  headingLevel?: EmptyStateHeadingLevel;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  headingLevel = "h2",
  className,
}: EmptyStateProps) {
  const Heading = headingLevel;
  const classes = ["ui-empty-state", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      {icon ? (
        <span className="ui-empty-state__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}

      <Heading className="ui-empty-state__title">
        {title}
      </Heading>

      {description ? (
        <p className="ui-empty-state__description">{description}</p>
      ) : null}

      {action ? (
        <div className="ui-empty-state__action">
          <ButtonLink href={action.href} variant="primary">
            {action.label}
          </ButtonLink>
        </div>
      ) : null}
    </section>
  );
}

export function EmptyStateStyles() {
  return (
    <style>{`
      .ui-empty-state {
        min-width: 0;
        padding: clamp(1.5rem, 4vw, 2.5rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--color-surface);
        color: var(--color-text);
        border: 1px dashed var(--color-border);
        border-radius: var(--radius-section);
        box-shadow: var(--shadow-section);
        text-align: center;
      }

      .ui-empty-state__icon {
        width: 52px;
        height: 52px;
        margin-bottom: 1rem;
        display: grid;
        place-items: center;
        background: var(--color-primary-soft);
        color: var(--color-primary);
        border-radius: 50%;
      }

      .ui-empty-state__icon svg {
        width: 27px;
        height: 27px;
        display: block;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.8;
      }

      .ui-empty-state__title {
        margin: 0;
      }

      .ui-empty-state__description {
        max-width: 560px;
        margin: 0.7rem 0 0;
        color: var(--color-muted);
        line-height: 1.7;
      }

      .ui-empty-state__action {
        margin-top: 1.25rem;
      }

      @media (max-width: 600px) {
        .ui-empty-state {
          padding: 1.25rem;
        }

        .ui-empty-state__action,
        .ui-empty-state__action .ui-button {
          width: 100%;
        }
      }
    `}</style>
  );
}
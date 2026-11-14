import Link from "next/link";
import type { ReactNode } from "react";

interface NavigationCardProps {
  className?: string;
  description: string;
  href: string;
  icon?: ReactNode;
  linkLabel: string;
  title: string;
}

export default function NavigationCard({
  className,
  description,
  href,
  icon,
  linkLabel,
  title,
}: NavigationCardProps) {
  const classes = ["ui-navigation-card", className]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      {icon ? (
        <span className="ui-navigation-card__icon">{icon}</span>
      ) : null}

      <h3 className="ui-navigation-card__title">{title}</h3>
      <p className="ui-navigation-card__description">{description}</p>

      <Link className="ui-navigation-card__link" href={href}>
        <span>{linkLabel}</span>

        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M4 10h12M11 5l5 5-5 5" />
        </svg>
      </Link>
    </article>
  );
}

export function NavigationCardStyles() {
  return (
    <style>{`
      .ui-navigation-card {
        min-width: 0;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-section);
        box-shadow: var(--shadow-section);
        transition:
          border-color 220ms ease,
          box-shadow 220ms ease,
          transform 220ms cubic-bezier(0.2, 0.75, 0.25, 1);
      }

      .ui-navigation-card:hover {
        border-color: var(--color-primary);
        box-shadow: 0 12px 28px rgb(32 55 43 / 12%);
        transform: translateY(-2px);
      }

      .ui-navigation-card:focus-within {
        border-color: var(--color-primary);
        box-shadow: 0 12px 28px rgb(32 55 43 / 12%);
      }

      .ui-navigation-card__icon {
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        color: var(--color-primary);
        background: var(--color-primary-soft);
        border-radius: 12px;
        transition:
          background-color 220ms ease,
          transform 220ms cubic-bezier(0.2, 0.75, 0.25, 1);
      }

      .ui-navigation-card:hover .ui-navigation-card__icon {
        background: var(--color-primary-soft);
        transform: scale(1.04);
      }

      .ui-navigation-card__icon svg {
        width: 25px;
        height: 25px;
        display: block;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.8;
      }

      .ui-navigation-card__title {
        margin: 1rem 0 0;
      }

      .ui-navigation-card__description {
        margin: 0.65rem 0 0;
        color: var(--color-muted);
        line-height: 1.65;
      }

      .ui-navigation-card__link {
        margin-top: auto;
        padding-top: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        color: var(--color-primary);
        border-radius: 4px;
        font-weight: 700;
        text-underline-offset: 4px;
        transition: color 180ms ease;
      }

      .ui-navigation-card__link:hover {
        color: var(--color-primary-hover);
      }

      .ui-navigation-card__link:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 3px;
      }

      .ui-navigation-card__link svg {
        width: 17px;
        height: 17px;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.8;
        transition: transform 180ms ease;
      }

      .ui-navigation-card__link:hover svg {
        transform: translateX(2px);
      }

      @media (max-width: 600px) {
        .ui-navigation-card {
          padding: 1rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ui-navigation-card,
        .ui-navigation-card__icon,
        .ui-navigation-card__link,
        .ui-navigation-card__link svg {
          transition: none;
        }

        .ui-navigation-card:hover,
        .ui-navigation-card:hover .ui-navigation-card__icon,
        .ui-navigation-card__link:hover svg {
          transform: none;
        }
      }
    `}</style>
  );
}
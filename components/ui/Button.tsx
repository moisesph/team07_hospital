import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary";

interface SharedButtonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

type ButtonLinkProps = SharedButtonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children" | "className">;

interface ButtonProps
  extends SharedButtonProps,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "children" | "className"
    > {
  type?: "button" | "submit" | "reset";
}

function getButtonClassName(
  variant: ButtonVariant,
  className?: string,
): string {
  return ["ui-button", `ui-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");
}

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={getButtonClassName(variant, className)}
      {...props}
    >
      <span className="ui-button__label">{children}</span>

      <svg
        className="ui-button__icon"
        viewBox="0 0 20 20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M4 10h12M11 5l5 5-5 5" />
      </svg>
    </Link>
  );
}

export default function Button({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName(variant, className)}
      type={type}
      {...props}
    >
      <span className="ui-button__label">{children}</span>
    </button>
  );
}

export function ButtonStyles() {
  return (
    <style>{`
      .ui-button {
        min-height: 44px;
        padding: 0.7rem 1.05rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border: 1px solid transparent;
        border-radius: var(--radius-control);
        font: inherit;
        font-weight: 700;
        line-height: 1.4;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        transition:
          background-color 180ms ease,
          border-color 180ms ease,
          color 180ms ease,
          box-shadow 220ms ease,
          transform 180ms ease;
      }

      .ui-button--primary {
        background: var(--color-primary);
        color: #ffffff;
      }

      .ui-button--primary:hover:not(:disabled) {
        background: var(--color-primary-hover);
        color: #ffffff;
        box-shadow: 0 8px 18px rgb(45 106 79 / 18%);
        transform: translateY(-2px);
      }

      .ui-button--secondary {
        background: var(--color-surface);
        color: var(--color-primary);
        border-color: var(--color-border);
      }

      .ui-button--secondary:hover:not(:disabled) {
        background: var(--color-primary-soft);
        color: var(--color-primary-hover);
        border-color: var(--color-primary);
        box-shadow: 0 8px 18px rgb(32 55 43 / 9%);
        transform: translateY(-2px);
      }

      .ui-button:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        transform: none;
      }

      .ui-button:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 3px;
      }

      .ui-button__label {
        min-width: 0;
      }

      .ui-button__icon {
        width: 18px;
        height: 18px;
        flex: 0 0 18px;
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.8;
        transition: transform 180ms ease;
      }

      .ui-button:hover .ui-button__icon {
        transform: translateX(2px);
      }

      @media (prefers-reduced-motion: reduce) {
        .ui-button,
        .ui-button__icon {
          transition: none;
        }

        .ui-button:hover,
        .ui-button:hover .ui-button__icon {
          transform: none;
        }
      }
    `}</style>
  );
}
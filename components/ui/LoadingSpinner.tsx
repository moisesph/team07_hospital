interface LoadingSpinnerProps {
  label?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export default function LoadingSpinner({
  label = "Loading, please wait.",
  size = "medium",
  className,
}: LoadingSpinnerProps) {
  const classes = [
    "ui-loading-spinner",
    `ui-loading-spinner--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="status">
      <span
        className="ui-loading-spinner__graphic"
        aria-hidden="true"
      />
      <span className="ui-loading-spinner__label">{label}</span>
    </div>
  );
}

export function LoadingSpinnerStyles() {
  return (
    <style>{`
      .ui-loading-spinner {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.7rem;
        color: var(--color-muted);
        font-weight: 600;
        line-height: 1.4;
      }

      .ui-loading-spinner__graphic {
        width: 1.5rem;
        height: 1.5rem;
        flex: 0 0 auto;
        display: block;
        border: 3px solid var(--color-primary-soft);
        border-top-color: var(--color-primary);
        border-radius: 50%;
        animation: ui-loading-spinner-rotate 800ms linear infinite;
      }

      .ui-loading-spinner--small {
        gap: 0.5rem;
        font-size: 0.85rem;
      }

      .ui-loading-spinner--small .ui-loading-spinner__graphic {
        width: 1.1rem;
        height: 1.1rem;
        border-width: 2px;
      }

      .ui-loading-spinner--large {
        gap: 0.85rem;
        font-size: 1rem;
      }

      .ui-loading-spinner--large .ui-loading-spinner__graphic {
        width: 2rem;
        height: 2rem;
        border-width: 4px;
      }

      .ui-loading-spinner__label {
        min-width: 0;
      }

      @keyframes ui-loading-spinner-rotate {
        to {
          transform: rotate(360deg);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .ui-loading-spinner__graphic {
          animation: none;
          border-color: var(--color-primary);
          border-right-color: var(--color-primary-soft);
        }
      }
    `}</style>
  );
}
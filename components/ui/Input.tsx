import type { InputHTMLAttributes } from "react";

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "aria-describedby" | "aria-invalid" | "id"
  > {
  id: string;
  label: string;
  helpText?: string;
  errorMessage?: string;
  describedBy?: string;
  invalid?: boolean;
  containerClassName?: string;
  inputClassName?: string;
}

function combineIds(
  ...ids: Array<string | undefined>
): string | undefined {
  const combinedIds = ids.filter(
    (id): id is string => Boolean(id?.trim()),
  );

  return combinedIds.length > 0 ? combinedIds.join(" ") : undefined;
}

export default function Input({
  id,
  label,
  helpText,
  errorMessage,
  describedBy,
  invalid,
  required,
  disabled,
  containerClassName,
  inputClassName,
  ...inputProps
}: InputProps) {
  const helpTextId = helpText ? `${id}-help` : undefined;
  const errorMessageId = errorMessage ? `${id}-error` : undefined;
  const isInvalid = Boolean(errorMessage) || invalid === true;

  const fieldClassName = ["ui-input", inputClassName]
    .filter(Boolean)
    .join(" ");

  const wrapperClassName = [
    "ui-field",
    isInvalid ? "ui-field--invalid" : undefined,
    disabled ? "ui-field--disabled" : undefined,
    containerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      <label className="ui-field__label" htmlFor={id}>
        {label}
        {required ? (
          <span className="ui-field__required" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      <input
        {...inputProps}
        id={id}
        className={fieldClassName}
        required={required}
        disabled={disabled}
        aria-describedby={combineIds(
          describedBy,
          helpTextId,
          errorMessageId,
        )}
        aria-invalid={isInvalid || undefined}
      />

      {helpText ? (
        <p className="ui-field__help" id={helpTextId}>
          {helpText}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="ui-field__error" id={errorMessageId}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

export function InputStyles() {
  return (
    <style>{`
      .ui-field {
        min-width: 0;
        display: grid;
        gap: 0.45rem;
      }

      .ui-field__label {
        color: var(--color-text);
        font-weight: 600;
        line-height: 1.4;
      }

      .ui-field__required {
        margin-left: 0.2rem;
        color: var(--color-danger);
      }

      .ui-input {
        width: 100%;
        min-width: 0;
        min-height: 44px;
        padding: 0.7rem 0.9rem;
        background: var(--color-surface);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-control);
        font: inherit;
        line-height: 1.4;
        transition:
          border-color 180ms ease,
          box-shadow 180ms ease,
          background-color 180ms ease;
      }

      .ui-input::placeholder {
        color: var(--color-muted);
        opacity: 1;
      }

      .ui-input:hover:not(:disabled) {
        border-color: var(--color-primary);
      }

      .ui-input:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 2px;
        border-color: var(--color-primary);
      }

      .ui-input[aria-invalid="true"] {
        border-color: var(--color-danger);
      }

      .ui-input[aria-invalid="true"]:focus-visible {
        outline-color: var(--color-danger);
      }

      .ui-input:disabled {
        background: var(--color-background);
        color: var(--color-muted);
        cursor: not-allowed;
        opacity: 0.7;
      }

      .ui-field__help,
      .ui-field__error {
        margin: 0;
        font-size: 0.84rem;
        line-height: 1.5;
      }

      .ui-field__help {
        color: var(--color-muted);
      }

      .ui-field__error {
        color: var(--color-danger);
        font-weight: 600;
      }

      .ui-field--disabled .ui-field__label {
        color: var(--color-muted);
      }

      @media (prefers-reduced-motion: reduce) {
        .ui-input {
          transition: none;
        }
      }
    `}</style>
  );
}
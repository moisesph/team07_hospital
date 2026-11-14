import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "aria-describedby" | "aria-invalid" | "children" | "id"
  > {
  id: string;
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  helpText?: string;
  errorMessage?: string;
  describedBy?: string;
  invalid?: boolean;
  containerClassName?: string;
  selectClassName?: string;
}

function combineIds(
  ...ids: Array<string | undefined>
): string | undefined {
  const combinedIds = ids.filter(
    (id): id is string => Boolean(id?.trim()),
  );

  return combinedIds.length > 0 ? combinedIds.join(" ") : undefined;
}

export default function Select({
  id,
  label,
  options,
  placeholder,
  helpText,
  errorMessage,
  describedBy,
  invalid,
  required,
  disabled,
  value,
  defaultValue,
  containerClassName,
  selectClassName,
  ...selectProps
}: SelectProps) {
  const helpTextId = helpText ? `${id}-help` : undefined;
  const errorMessageId = errorMessage ? `${id}-error` : undefined;
  const isInvalid = Boolean(errorMessage) || invalid === true;
  const isControlled = value !== undefined;

  const initialDefaultValue =
    !isControlled && defaultValue === undefined && placeholder
      ? ""
      : defaultValue;

  const fieldClassName = ["ui-select", selectClassName]
    .filter(Boolean)
    .join(" ");

  const wrapperClassName = [
    "ui-field",
    "ui-select-field",
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

      <div className="ui-select-field__control">
        <select
          {...selectProps}
          id={id}
          className={fieldClassName}
          required={required}
          disabled={disabled}
          value={isControlled ? value : undefined}
          defaultValue={isControlled ? undefined : initialDefaultValue}
          aria-describedby={combineIds(
            describedBy,
            helpTextId,
            errorMessageId,
          )}
          aria-invalid={isInvalid || undefined}
        >
          {placeholder ? (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          ) : null}

          {options.map((option) => (
            <option
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <svg
          className="ui-select-field__icon"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </div>

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

export function SelectStyles() {
  return (
    <style>{`
      .ui-select-field {
        min-width: 0;
        display: grid;
        gap: 0.45rem;
      }

      .ui-select-field .ui-field__label {
        color: var(--color-text);
        font-weight: 600;
        line-height: 1.4;
      }

      .ui-select-field .ui-field__required {
        margin-left: 0.2rem;
        color: var(--color-danger);
      }

      .ui-select-field__control {
        position: relative;
        min-width: 0;
      }

      .ui-select {
        width: 100%;
        min-width: 0;
        min-height: 44px;
        padding: 0.7rem 2.5rem 0.7rem 0.9rem;
        appearance: none;
        background: var(--color-surface);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-control);
        font: inherit;
        line-height: 1.4;
        cursor: pointer;
        transition:
          border-color 180ms ease,
          box-shadow 180ms ease,
          background-color 180ms ease;
      }

      .ui-select:hover:not(:disabled) {
        border-color: var(--color-primary);
      }

      .ui-select:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 2px;
        border-color: var(--color-primary);
      }

      .ui-select[aria-invalid="true"] {
        border-color: var(--color-danger);
      }

      .ui-select[aria-invalid="true"]:focus-visible {
        outline-color: var(--color-danger);
      }

      .ui-select:disabled {
        background: var(--color-background);
        color: var(--color-muted);
        cursor: not-allowed;
        opacity: 0.7;
      }

      .ui-select-field__icon {
        position: absolute;
        top: 50%;
        right: 0.85rem;
        width: 18px;
        height: 18px;
        pointer-events: none;
        fill: none;
        stroke: var(--color-muted);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.8;
        transform: translateY(-50%);
      }

      .ui-select:focus-visible + .ui-select-field__icon {
        stroke: var(--color-primary);
      }

      .ui-select-field .ui-field__help,
      .ui-select-field .ui-field__error {
        margin: 0;
        font-size: 0.84rem;
        line-height: 1.5;
      }

      .ui-select-field .ui-field__help {
        color: var(--color-muted);
      }

      .ui-select-field .ui-field__error {
        color: var(--color-danger);
        font-weight: 600;
      }

      .ui-select-field.ui-field--disabled .ui-field__label {
        color: var(--color-muted);
      }

      @media (prefers-reduced-motion: reduce) {
        .ui-select {
          transition: none;
        }
      }
    `}</style>
  );
}
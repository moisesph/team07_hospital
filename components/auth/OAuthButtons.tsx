// components/auth/OAuthButtons.tsx

import type { OAuthProviderOption } from "../../lib/auth/auth";

interface OAuthButtonsProps {
  providers: OAuthProviderOption[];
  disabled: boolean;
  hint?: string;
}

/** Google, GitHub, and Facebook buttons. They skip browser validation because the server checks what they need. */
export default function OAuthButtons({
  providers,
  disabled,
  hint,
}: OAuthButtonsProps) {
  if (providers.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 grid gap-3">
      <p className="m-0 flex items-center gap-3 text-sm text-(--color-muted) before:h-px before:flex-1 before:bg-(--color-border) after:h-px after:flex-1 after:bg-(--color-border)">
        or
      </p>

      {hint ? <p className="m-0 text-sm text-(--color-muted)">{hint}</p> : null}

      {providers.map(({ id, name }) => (
        <button
          key={id}
          type="submit"
          name="provider"
          value={id}
          formNoValidate
          disabled={disabled}
          className="min-h-11 cursor-pointer rounded-(--radius-control) border border-(--color-border) bg-(--color-surface) px-4 py-2 font-bold text-(--color-text) transition-colors hover:border-(--color-primary) hover:bg-(--color-primary-soft) focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--color-primary) disabled:cursor-not-allowed disabled:opacity-55 motion-reduce:transition-none"
        >
          Continue with {name}
        </button>
      ))}
    </div>
  );
}
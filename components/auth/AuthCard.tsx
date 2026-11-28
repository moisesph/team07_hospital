// components/auth/AuthCard.tsx

import type { ReactNode } from "react";

interface AuthCardProps {
  titleId: string;
  title: string;
  description: string;
  alert: string | null | undefined;
  footer: ReactNode;
  children: ReactNode;
}

/** Shared card for the Login and Sign up pages. */
export default function AuthCard({
  titleId,
  title,
  description,
  alert,
  footer,
  children,
}: AuthCardProps) {
  return (
    <section
      aria-labelledby={titleId}
      className="rounded-(--radius-section) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-section) sm:p-10"
    >
      <p className="m-0 mb-2 text-xs font-bold tracking-[0.09em] text-(--color-primary) uppercase">
        Patient Services Portal
      </p>
      <h1 id={titleId} className="m-0">
        {title}
      </h1>
      <p className="mt-2 mb-0 text-(--color-muted)">{description}</p>

      {alert ? (
        <p
          role="alert"
          className="mt-5 mb-0 rounded-(--radius-control) border border-(--color-danger) bg-red-50 px-4 py-3 text-sm font-semibold text-(--color-danger)"
        >
          {alert}
        </p>
      ) : null}

      {children}

      <div className="mt-6 grid gap-2 border-t border-(--color-border) pt-5 text-sm">
        {footer}
      </div>
    </section>
  );
}
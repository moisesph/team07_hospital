// components/auth/AccountPanel.tsx

import { linkProviderAction, signOutAction } from "../../lib/auth/actions";
import type { OAuthProviderOption } from "../../lib/auth/auth";
import type { UserRole } from "../../lib/auth/schemas";
import type { AppUser } from "../../lib/auth/users";
import Button from "../ui/Button";
import AuthCard from "./AuthCard";

const ROLE_LABELS: Record<UserRole, string> = {
  patient: "Patient",
  pending_doctor: "Doctor (waiting for approval)",
  doctor: "Doctor",
  admin: "Administrator",
};

interface AccountPanelProps {
  user: AppUser;
  providers: OAuthProviderOption[];
  linkedProviders: string[];
  successMessage: string | null;
  errorMessage: string | null;
}

/** Shows the signed-in user's profile, sign-in options, and Sign out. */
export default function AccountPanel({
  user,
  providers,
  linkedProviders,
  successMessage,
  errorMessage,
}: AccountPanelProps) {
  const linked = new Set(linkedProviders);
  const details = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Role", value: ROLE_LABELS[user.role] },
  ];

  return (
    <AuthCard
      titleId="account-title"
      title="My account"
      description="Your profile and the ways you can sign in."
      alert={errorMessage}
      footer={
        <form action={signOutAction}>
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      }
    >
      {successMessage ? (
        <p
          role="status"
          className="mt-5 mb-0 rounded-(--radius-control) border border-(--color-primary) bg-(--color-primary-soft) px-4 py-3 text-sm font-semibold text-(--color-primary)"
        >
          {successMessage}
        </p>
      ) : null}

      {user.role === "pending_doctor" ? (
        <p className="mt-5 mb-0 rounded-(--radius-control) border border-(--color-border) bg-(--color-background) px-4 py-3 text-sm">
          Your doctor account is waiting for an administrator to approve it.
          Until then, you cannot see patient information.
        </p>
      ) : null}

      <dl className="mt-6 mb-0 grid gap-4">
        {details.map(({ label, value }) => (
          <div key={label} className="grid gap-1 sm:grid-cols-[8rem_1fr]">
            <dt className="font-semibold text-(--color-muted)">{label}</dt>
            <dd className="m-0 break-words">{value}</dd>
          </div>
        ))}
      </dl>

      {providers.length > 0 ? (
        <section
          aria-labelledby="sign-in-options-title"
          className="mt-6 border-t border-(--color-border) pt-5"
        >
          <h2 id="sign-in-options-title" className="m-0 text-lg">
            Sign-in options
          </h2>
          <p className="mt-1 mb-0 text-sm text-(--color-muted)">
            Connect a provider to sign in without your password.
          </p>

          <ul className="m-0 mt-4 grid list-none gap-3 p-0">
            {providers.map(({ id, name }) => (
              <li
                key={id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-(--radius-control) border border-(--color-border) px-4 py-3"
              >
                <span className="font-semibold">{name}</span>

                {linked.has(id) ? (
                  <span className="text-sm font-semibold text-(--color-primary)">
                    Connected
                  </span>
                ) : (
                  <form action={linkProviderAction}>
                    <input type="hidden" name="provider" value={id} />
                    <Button type="submit" variant="secondary">
                      Connect {name}
                    </Button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </AuthCard>
  );
}
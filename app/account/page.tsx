// app/account/page.tsx

import { redirect } from "next/navigation";
import { Suspense } from "react";

import AccountPanel from "../../components/auth/AccountPanel";
import { ButtonStyles } from "../../components/ui/Button";
import { getOAuthProviderOptions } from "../../lib/auth/auth";
import { getCurrentUser } from "../../lib/auth/current-user";
import { getAuthErrorMessage } from "../../lib/auth/error-messages";
import { getLinkedProviders } from "../../lib/auth/users";

interface AccountPageProps {
  searchParams: Promise<{
    linked?: string | string[];
    error?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

async function AccountContent({ searchParams }: AccountPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?callbackUrl=/account");
  }

  const [query, linkedProviders] = await Promise.all([
    searchParams,
    getLinkedProviders(user.id),
  ]);

  return (
    <AccountPanel
      user={user}
      providers={getOAuthProviderOptions()}
      linkedProviders={linkedProviders}
      successMessage={
        firstValue(query.linked) === "1" ? "Your account was connected." : null
      }
      errorMessage={getAuthErrorMessage(firstValue(query.error))}
    />
  );
}

export default function AccountPage({ searchParams }: AccountPageProps) {
  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-16">
        <Suspense fallback={<p role="status">Loading your account…</p>}>
          <AccountContent searchParams={searchParams} />
        </Suspense>
      </div>

      <ButtonStyles />
    </>
  );
}
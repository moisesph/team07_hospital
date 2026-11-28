// app/login/page.tsx

import { Suspense } from "react";

import LoginPanel from "../../components/auth/LoginPanel";
import { ButtonStyles } from "../../components/ui/Button";
import { InputStyles } from "../../components/ui/Input";
import { getOAuthProviderOptions } from "../../lib/auth/auth";
import { getAuthErrorMessage } from "../../lib/auth/error-messages";

interface LoginPageProps {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    error?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

async function LoginContent({ searchParams }: LoginPageProps) {
  const query = await searchParams;

  return (
    <LoginPanel
      providers={getOAuthProviderOptions()}
      callbackUrl={firstValue(query.callbackUrl) ?? "/"}
      errorMessage={getAuthErrorMessage(firstValue(query.error))}
    />
  );
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <>
      <div className="mx-auto w-full max-w-xl px-4 py-8 sm:py-16">
        <Suspense fallback={<p role="status">Loading sign-in…</p>}>
          <LoginContent searchParams={searchParams} />
        </Suspense>
      </div>

      <ButtonStyles />
      <InputStyles />
    </>
  );
}
// app/signup/page.tsx

import { Suspense } from "react";

import SignUpForm from "../../components/auth/SignUpForm";
import { ButtonStyles } from "../../components/ui/Button";
import { InputStyles } from "../../components/ui/Input";
import { getOAuthProviderOptions } from "../../lib/auth/auth";
import { getAuthErrorMessage } from "../../lib/auth/error-messages";

interface SignUpPageProps {
  searchParams: Promise<{ error?: string | string[] }>;
}

async function SignUpContent({ searchParams }: SignUpPageProps) {
  const { error } = await searchParams;

  return (
    <SignUpForm
      providers={getOAuthProviderOptions()}
      errorMessage={getAuthErrorMessage(Array.isArray(error) ? error[0] : error)}
    />
  );
}

export default function SignUpPage({ searchParams }: SignUpPageProps) {
  return (
    <>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-16">
        <Suspense fallback={<p role="status">Loading sign-up…</p>}>
          <SignUpContent searchParams={searchParams} />
        </Suspense>
      </div>

      <ButtonStyles />
      <InputStyles />
    </>
  );
}
"use client";
// components/auth/LoginPanel.tsx

import Link from "next/link";
import { useActionState } from "react";

import { signInAction, type AuthFormState } from "../../lib/auth/actions";
import type { OAuthProviderOption } from "../../lib/auth/auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import AuthCard from "./AuthCard";
import OAuthButtons from "./OAuthButtons";

interface LoginPanelProps {
  providers: OAuthProviderOption[];
  callbackUrl: string;
  errorMessage: string | null;
}

const initialState: AuthFormState = {};

export default function LoginPanel({
  providers,
  callbackUrl,
  errorMessage,
}: LoginPanelProps) {
  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialState,
  );

  return (
    <AuthCard
      titleId="login-title"
      title="Sign in"
      description="Sign in to manage your appointments and hospital services."
      alert={state.formError ?? errorMessage}
      footer={
        <>
          <p className="m-0">
            New here?{" "}
            <Link className="font-bold text-(--color-primary)" href="/signup">
              Create an account
            </Link>
          </p>
          <Link className="font-bold text-(--color-primary)" href="/">
            Return to Home
          </Link>
        </>
      }
    >
      <form action={formAction} className="mt-6 grid gap-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <Input
          id="login-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          errorMessage={state.fieldErrors?.email}
        />

        <Input
          id="login-password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          required
          errorMessage={state.fieldErrors?.password}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Signing in…" : "Sign in"}
        </Button>

        <OAuthButtons providers={providers} disabled={isPending} />
      </form>
    </AuthCard>
  );
}
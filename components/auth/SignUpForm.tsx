"use client";
// components/auth/SignUpForm.tsx

import Link from "next/link";
import { useActionState } from "react";

import { signUpAction, type AuthFormState } from "../../lib/auth/actions";
import type { OAuthProviderOption } from "../../lib/auth/auth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import AuthCard from "./AuthCard";
import OAuthButtons from "./OAuthButtons";

interface SignUpFormProps {
  providers: OAuthProviderOption[];
  errorMessage: string | null;
}

const ROLE_OPTIONS = [
  {
    value: "patient",
    label: "Patient",
    description: "Book appointments and request medicines.",
  },
  {
    value: "doctor",
    label: "Doctor",
    description: "An administrator must approve your account first.",
  },
] as const;

const initialState: AuthFormState = {};

export default function SignUpForm({ providers, errorMessage }: SignUpFormProps) {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState,
  );
  const roleError = state.fieldErrors?.role;

  return (
    <AuthCard
      titleId="signup-title"
      title="Create an account"
      description="All fields are required."
      alert={state.formError ?? errorMessage}
      footer={
        <p className="m-0">
          Already have an account?{" "}
          <Link className="font-bold text-(--color-primary)" href="/login">
            Sign in
          </Link>
        </p>
      }
    >
      <form action={formAction} className="mt-6 grid gap-4">
        <fieldset
          aria-describedby={roleError ? "signup-role-error" : undefined}
          className="m-0 grid gap-3 border-0 p-0"
        >
          <legend className="mb-2 p-0 font-semibold">
            I am a
            <span aria-hidden="true" className="ml-1 text-(--color-danger)">
              *
            </span>
          </legend>

          <div className="grid gap-3 sm:grid-cols-2">
            {ROLE_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer gap-3 rounded-(--radius-control) border border-(--color-border) p-4 transition-colors hover:border-(--color-primary) has-checked:border-(--color-primary) has-checked:bg-(--color-primary-soft) has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--color-primary) motion-reduce:transition-none"
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  required
                  defaultChecked={state.values?.role === option.value}
                  className="mt-1 accent-(--color-primary)"
                />
                <span>
                  <span className="block font-bold">{option.label}</span>
                  <span className="block text-sm text-(--color-muted)">
                    {option.description}
                  </span>
                </span>
              </label>
            ))}
          </div>

          {roleError ? (
            <p
              id="signup-role-error"
              className="m-0 text-sm font-semibold text-(--color-danger)"
            >
              {roleError}
            </p>
          ) : null}
        </fieldset>

        <Input
          id="signup-name"
          name="name"
          label="Full name"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          errorMessage={state.fieldErrors?.name}
        />

        <Input
          id="signup-email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          errorMessage={state.fieldErrors?.email}
        />

        <Input
          id="signup-password"
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          required
          minLength={8}
          helpText="Use at least 8 characters."
          errorMessage={state.fieldErrors?.password}
        />

        <Input
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          autoComplete="new-password"
          required
          errorMessage={state.fieldErrors?.confirmPassword}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating account…" : "Create account"}
        </Button>

        <OAuthButtons
          providers={providers}
          disabled={isPending}
          hint="Choose Patient or Doctor above first."
        />
      </form>
    </AuthCard>
  );
}
"use server";
// lib/auth/actions.ts

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { auth, isEnabledOAuthProvider, signIn, signOut } from "./auth";
import { rememberSignUpRole } from "./auth-cookies";
import {
  signInSchema,
  signUpRoleSchema,
  signUpSchema,
  toFieldErrors,
  type FieldErrors,
} from "./schemas";
import { createPasswordUser } from "./users";

export type AuthFormValues = {
  name?: string;
  email?: string;
  role?: string;
};

export type AuthFormState = {
  values?: AuthFormValues;
  fieldErrors?: FieldErrors;
  formError?: string;
};

const AFTER_SIGN_UP_PATH = "/account";

function textValue(formData: FormData, key: string): string | undefined {
  const value = formData.get(key);

  return typeof value === "string" ? value : undefined;
}

/** Keeps what the person typed (never passwords), because React empties the form after each submit. */
function keptValues(formData: FormData): AuthFormValues {
  return {
    name: textValue(formData, "name"),
    email: textValue(formData, "email"),
    role: textValue(formData, "role"),
  };
}

/** Accepts only paths inside this site, such as "/appointments". */
function safeRedirectPath(value: string | undefined, fallback: string): string {
  if (
    value?.startsWith("/") &&
    !value.startsWith("//") &&
    !value.startsWith("/\\")
  ) {
    return value;
  }

  return fallback;
}

/** Sends the visitor to Google, GitHub, or Facebook. */
async function startOAuth(
  provider: string,
  redirectTo: string,
  values: AuthFormValues,
): Promise<AuthFormState> {
  if (!isEnabledOAuthProvider(provider)) {
    return { values, formError: "This sign-in option is not available." };
  }

  await signIn(provider, { redirectTo });

  return {};
}

/** Signs in with email and password, or starts Google, GitHub, or Facebook. */
export async function signInAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = keptValues(formData);
  const redirectTo = safeRedirectPath(textValue(formData, "callbackUrl"), "/");
  const provider = textValue(formData, "provider");

  if (provider) {
    return startOAuth(provider, redirectTo, values);
  }

  const parsed = signInSchema.safeParse({
    email: values.email ?? "",
    password: textValue(formData, "password") ?? "",
  });

  if (!parsed.success) {
    return { values, fieldErrors: toFieldErrors(parsed.error) };
  }

  try {
    await signIn("credentials", { ...parsed.data, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      return { values, formError: "Invalid email or password." };
    }

    // A successful sign-in also throws: Next.js uses it to redirect.
    throw error;
  }

  return {};
}

/** Creates an account. Patient or Doctor must be chosen first, also with Google, GitHub, or Facebook. */
export async function signUpAction(
  _previousState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = keptValues(formData);
  const provider = textValue(formData, "provider");

  if (provider) {
    const role = signUpRoleSchema.safeParse(values.role ?? "");

    if (!role.success) {
      return { values, fieldErrors: { role: role.error.issues[0]?.message } };
    }

    await rememberSignUpRole(role.data);

    return startOAuth(provider, AFTER_SIGN_UP_PATH, values);
  }

  const parsed = signUpSchema.safeParse({
    name: values.name ?? "",
    email: values.email ?? "",
    password: textValue(formData, "password") ?? "",
    confirmPassword: textValue(formData, "confirmPassword") ?? "",
    role: values.role ?? "",
  });

  if (!parsed.success) {
    return { values, fieldErrors: toFieldErrors(parsed.error) };
  }

  const result = await createPasswordUser(parsed.data);

  if (!result.ok) {
    return {
      values,
      fieldErrors: {
        email: "An account with this email already exists. Sign in instead.",
      },
    };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: AFTER_SIGN_UP_PATH,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { formError: "Your account was created. Please sign in." };
    }

    throw error;
  }

  return {};
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

/** Connects Google, GitHub, or Facebook to the account that is already signed in. */
export async function linkProviderAction(formData: FormData): Promise<void> {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/account");
  }

  const provider = textValue(formData, "provider");

  if (!isEnabledOAuthProvider(provider)) {
    redirect("/account?error=ProviderUnavailable");
  }

  await signIn(provider, { redirectTo: "/account?linked=1" });
}
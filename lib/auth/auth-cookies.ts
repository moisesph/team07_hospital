import "server-only";

import { cookies } from "next/headers";

import { signUpRoleSchema, type SignUpRole } from "./schemas";

const SIGN_UP_ROLE_COOKIE = "signup_role";
const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
];

/** Remembers the role chosen on the Sign up page while the visitor goes to Google, GitHub, or Facebook. */
export async function rememberSignUpRole(role: SignUpRole): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SIGN_UP_ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });
}

export async function readSignUpRole(): Promise<SignUpRole | null> {
  const cookieStore = await cookies();
  const result = signUpRoleSchema.safeParse(
    cookieStore.get(SIGN_UP_ROLE_COOKIE)?.value,
  );

  return result.success ? result.data : null;
}

export async function clearSignUpRole(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(SIGN_UP_ROLE_COOKIE);
}

export async function hasSessionCookie(): Promise<boolean> {
  const cookieStore = await cookies();

  return SESSION_COOKIES.some((name) => cookieStore.has(name));
}
// lib/auth/authorization.ts

import "server-only";

import { redirect } from "next/navigation";

import { getCurrentUser } from "./current-user";
import { hasRole } from "./permissions";
import type { UserRole } from "./schemas";
import type { AppUser } from "./users";

/** For pages: visitors go to Login and come back to `returnTo` afterwards. */
export async function requireUser(returnTo: string): Promise<AppUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(returnTo)}`);
  }

  return user;
}

/** For pages: only the listed roles continue. Everyone else goes to My account with a message. */
export async function requireRole(
  roles: readonly UserRole[],
  returnTo: string,
): Promise<AppUser> {
  const user = await requireUser(returnTo);

  if (!hasRole(user, roles)) {
    redirect("/account?error=AccessDenied");
  }

  return user;
}
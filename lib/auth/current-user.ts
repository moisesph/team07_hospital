// lib/auth/current-user.ts

import "server-only";

import { connection } from "next/server";
import { cache } from "react";

import { auth } from "./auth";
import { getUserById, type AppUser } from "./users";

/**
 * Returns the signed-in user, read from the database on every request,
 * so a role change (for example, an admin approving a doctor) applies right away.
 * `connection()` waits for a real request, because Auth.js creates random
 * security tokens while it checks the session.
 * `cache` lets every part of the same page share one lookup.
 */
export const getCurrentUser = cache(async (): Promise<AppUser | null> => {
  await connection();

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  return getUserById(userId);
});
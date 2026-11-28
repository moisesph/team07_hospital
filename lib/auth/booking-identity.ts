// lib/auth/booking-identity.ts

import "server-only";

import type { BookingIdentity } from "../types";
import { getCurrentUser } from "./current-user";

/**
 * The real booking identity: whoever is signed in, with any role.
 * Visitors get null.
 */
export async function getSessionBookingIdentity(): Promise<BookingIdentity | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return {
    subjectId: user.id,
    patientId: user.patientId,
    profile: {
      name: user.name,
      email: user.email,
      phone: null,
    },
  };
}
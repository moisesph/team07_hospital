// lib/auth/permissions.ts

import type { UserRole } from "./schemas";
import type { AppUser } from "./users";

/** Only what the rules need, so tests can pass plain objects. */
export type PermissionSubject = Pick<
  AppUser,
  "role" | "patientId" | "specialistId"
>;

export function hasRole(
  user: Pick<AppUser, "role">,
  roles: readonly UserRole[],
): boolean {
  return roles.includes(user.role);
}

/**
 * Admins can see every patient. A patient sees only their own record.
 * Doctors will see the patients they have appointments with (PR 2).
 */
export function canAccessPatient(
  user: PermissionSubject,
  patientId: string,
): boolean {
  if (user.role === "admin") {
    return true;
  }

  return user.role === "patient" && user.patientId === patientId;
}

/** Admins can see every doctor's data. An approved doctor sees only their own. Pending doctors see none. */
export function canAccessSpecialist(
  user: PermissionSubject,
  specialistId: string,
): boolean {
  if (user.role === "admin") {
    return true;
  }

  return user.role === "doctor" && user.specialistId === specialistId;
}
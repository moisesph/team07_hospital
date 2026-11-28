// lib/auth/users.ts

import "server-only";

import { compare, hash } from "bcryptjs";

import { getDb } from "../db";
import { roleForSignUp, type SignUpRole, type UserRole } from "./schemas";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  patientId: string | null;
  specialistId: string | null;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  patient_id: string | null;
  specialist_id: string | null;
}

interface CreatedOAuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}

export type CreatePasswordUserResult =
  | { ok: true; user: AppUser }
  | { ok: false; reason: "email-taken" };

const USER_COLUMNS = "id, name, email, role, patient_id, specialist_id";
const BCRYPT_ROUNDS = 12;
const UNIQUE_VIOLATION = "23505";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

let dummyHash: Promise<string> | undefined;

function mapUser(row: UserRow): AppUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    patientId: row.patient_id,
    specialistId: row.specialist_id,
  };
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === UNIQUE_VIOLATION
  );
}

export async function getUserById(id: string): Promise<AppUser | null> {
  if (!UUID_PATTERN.test(id)) {
    return null;
  }

  const rows = await getDb().query<UserRow>(
    `SELECT ${USER_COLUMNS} FROM users WHERE id = $1 LIMIT 1`,
    [id],
  );

  return rows[0] ? mapUser(rows[0]) : null;
}

export async function emailExists(email: string): Promise<boolean> {
  const rows = await getDb().query(
    "SELECT 1 FROM users WHERE lower(email) = lower($1) LIMIT 1",
    [email],
  );

  return rows.length > 0;
}

export async function hasLinkedAccount(
  provider: string,
  providerAccountId: string,
): Promise<boolean> {
  const rows = await getDb().query(
    'SELECT 1 FROM accounts WHERE provider = $1 AND "providerAccountId" = $2 LIMIT 1',
    [provider, providerAccountId],
  );

  return rows.length > 0;
}

/** Lists the providers (google, github, facebook) already connected to this user. */
export async function getLinkedProviders(userId: string): Promise<string[]> {
  if (!UUID_PATTERN.test(userId)) {
    return [];
  }

  const rows = await getDb().query<{ provider: string }>(
    'SELECT provider FROM accounts WHERE "userId" = $1 ORDER BY provider',
    [userId],
  );

  return rows.map((row) => row.provider);
}

/**
 * Returns the user only when the email and password match.
 * A dummy hash is checked when the email does not exist, so both cases take similar time.
 */
export async function verifyPasswordLogin(
  email: string,
  password: string,
): Promise<AppUser | null> {
  const rows = await getDb().query<UserRow & { password_hash: string | null }>(
    `SELECT ${USER_COLUMNS}, password_hash FROM users WHERE lower(email) = lower($1) LIMIT 1`,
    [email],
  );
  const row = rows[0];

  dummyHash ??= hash("dummy-password-for-timing", BCRYPT_ROUNDS);
  const passwordMatches = await compare(
    password,
    row?.password_hash ?? (await dummyHash),
  );

  return row?.password_hash && passwordMatches ? mapUser(row) : null;
}

export async function createPasswordUser(input: {
  name: string;
  email: string;
  password: string;
  role: SignUpRole;
}): Promise<CreatePasswordUserResult> {
  const passwordHash = await hash(input.password, BCRYPT_ROUNDS);

  try {
    const rows = await getDb().query<UserRow>(
      `INSERT INTO users (name, email, role, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING ${USER_COLUMNS}`,
      [input.name, input.email, roleForSignUp(input.role), passwordHash],
    );

    return { ok: true, user: mapUser(rows[0]) };
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { ok: false, reason: "email-taken" };
    }

    throw error;
  }
}

/** Used by Auth.js when someone creates an account with Google, GitHub, or Facebook. */
export async function createOAuthUser(input: {
  name: string;
  email: string;
  image: string | null;
  emailVerified: Date | null;
  role: SignUpRole;
}): Promise<CreatedOAuthUser> {
  const rows = await getDb().query<CreatedOAuthUser>(
    `INSERT INTO users (name, email, "emailVerified", image, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, "emailVerified", image`,
    [
      input.name,
      input.email,
      input.emailVerified,
      input.image,
      roleForSignUp(input.role),
    ],
  );

  return rows[0];
}
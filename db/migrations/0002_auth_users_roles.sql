-- Accounts that can sign in to the portal (format required by Auth.js plus project columns).
-- Every account must choose a role. A doctor sign-up stays pending until an admin approves it and links a specialist record.
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  "emailVerified" timestamptz,
  image text,
  role text NOT NULL CHECK (role IN ('patient', 'pending_doctor', 'doctor', 'admin')),
  patient_id text UNIQUE REFERENCES patients(id) ON DELETE RESTRICT,
  specialist_id text UNIQUE REFERENCES specialists(id) ON DELETE RESTRICT,
  password_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT users_role_links_check CHECK (
    (role = 'patient' AND specialist_id IS NULL)
    OR (role = 'pending_doctor' AND patient_id IS NULL AND specialist_id IS NULL)
    OR (role = 'doctor' AND specialist_id IS NOT NULL AND patient_id IS NULL)
    OR (role = 'admin' AND patient_id IS NULL AND specialist_id IS NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_idx ON users (lower(email));

-- Google, GitHub, and Facebook logins linked to a user (Auth.js format).
CREATE TABLE IF NOT EXISTS accounts (
  id serial PRIMARY KEY,
  "userId" uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  provider text NOT NULL,
  "providerAccountId" text NOT NULL,
  refresh_token text,
  access_token text,
  expires_at bigint,
  id_token text,
  scope text,
  session_state text,
  token_type text,
  CONSTRAINT accounts_provider_account_key UNIQUE (provider, "providerAccountId")
);

CREATE INDEX IF NOT EXISTS accounts_user_id_idx ON accounts ("userId");
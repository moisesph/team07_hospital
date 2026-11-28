import "server-only";

import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import {
  clearSignUpRole,
  hasSessionCookie,
  readSignUpRole,
} from "./auth-cookies";
import { signInSchema } from "./schemas";
import {
  createOAuthUser,
  emailExists,
  hasLinkedAccount,
  verifyPasswordLogin,
} from "./users";

const OAUTH_PROVIDERS = [
  { id: "google", name: "Google", provider: Google, env: "AUTH_GOOGLE" },
  { id: "github", name: "GitHub", provider: GitHub, env: "AUTH_GITHUB" },
  { id: "facebook", name: "Facebook", provider: Facebook, env: "AUTH_FACEBOOK" },
] as const;

export type OAuthProviderId = (typeof OAUTH_PROVIDERS)[number]["id"];

export interface OAuthProviderOption {
  id: OAuthProviderId;
  name: string;
}

/** A provider is turned on only when its ID and SECRET exist in the environment. */
const enabledOAuthProviders = OAUTH_PROVIDERS.filter(({ env }) =>
  Boolean(process.env[`${env}_ID`] && process.env[`${env}_SECRET`]),
);

export function getOAuthProviderOptions(): OAuthProviderOption[] {
  return enabledOAuthProviders.map(({ id, name }) => ({ id, name }));
}

export function isEnabledOAuthProvider(value: unknown): value is OAuthProviderId {
  return enabledOAuthProviders.some(({ id }) => id === value);
}

const passwordProvider = Credentials({
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const parsed = signInSchema.safeParse(credentials);

    if (!parsed.success) {
      return null;
    }

    const user = await verifyPasswordLogin(
      parsed.data.email,
      parsed.data.password,
    );

    return user ? { id: user.id, name: user.name, email: user.email } : null;
  },
});

const providers: Provider[] = [
  passwordProvider,
  ...enabledOAuthProviders.map(({ provider }) => provider),
];

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  // Auth.js recommends creating the Neon pool inside the request handler.
  const neonAdapter = NeonAdapter(
    new Pool({ connectionString: process.env.DATABASE_URL }),
  );

  return {
    adapter: {
      ...neonAdapter,
      // Runs only for brand-new Google, GitHub, or Facebook accounts.
      async createUser(user) {
        const role = await readSignUpRole();

        if (!role) {
          throw new Error("A role must be chosen before an account is created.");
        }

        await clearSignUpRole();

        return createOAuthUser({
          name: user.name?.trim() || user.email.split("@")[0],
          email: user.email.trim().toLowerCase(),
          image: user.image ?? null,
          emailVerified: user.emailVerified ?? null,
          role,
        });
      },
    },
    session: { strategy: "jwt" },
    pages: { signIn: "/login", error: "/login" },
    providers,
    callbacks: {
      async signIn({ user, account }) {
        if (!account || account.provider === "credentials") {
          return true;
        }

        // Returning user: this Google, GitHub, or Facebook account is already linked.
        if (await hasLinkedAccount(account.provider, account.providerAccountId)) {
          return true;
        }

        // Signed-in user connecting a new provider from My account. Auth.js links it.
        if (await hasSessionCookie()) {
          return true;
        }

        if (!user.email) {
          return "/login?error=MissingEmail";
        }

        // Never join accounts just because the email matches.
        if (await emailExists(user.email)) {
          return "/login?error=OAuthAccountNotLinked";
        }

        // New account: allowed only after choosing Patient or Doctor on Sign up.
        if (await readSignUpRole()) {
          return true;
        }

        return "/signup?error=ChooseRole";
      },
      session({ session, token }) {
        if (session.user && token.sub) {
          session.user.id = token.sub;
        }

        return session;
      },
    },
  };
});
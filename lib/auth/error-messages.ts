// lib/auth/error-messages.ts

const AUTH_ERROR_MESSAGES = new Map<string, string>([
  ["ChooseRole", "Choose Patient or Doctor before creating an account."],
  [
    "OAuthAccountNotLinked",
    "An account with this email already exists. Sign in with your password, then connect this provider from My account.",
  ],
  ["MissingEmail", "That provider did not share an email address. Use another option."],
  ["AccessDenied", "You do not have permission to do that."],
  ["ProviderUnavailable", "This sign-in option is not available."],
  ["Configuration", "Sign-in is temporarily unavailable. Please try again later."],
]);

/** Turns an error code from the URL into a friendly message. Unknown codes get a general message. */
export function getAuthErrorMessage(code: string | undefined): string | null {
  if (!code) {
    return null;
  }

  return (
    AUTH_ERROR_MESSAGES.get(code) ?? "We could not sign you in. Please try again."
  );
}
import { z } from "zod";

export const USER_ROLES = ["patient", "pending_doctor", "doctor", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const SIGN_UP_ROLES = ["patient", "doctor"] as const;
export type SignUpRole = (typeof SIGN_UP_ROLES)[number];

export const PASSWORD_MIN_LENGTH = 8;
// bcrypt only reads the first 72 bytes of a password.
export const PASSWORD_MAX_BYTES = 72;

export type FieldErrors = Partial<Record<string, string>>;

const nameSchema = z
  .string()
  .trim()
  .min(1, "Enter your name.")
  .max(100, "Use 100 characters or fewer.");

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "Use 254 characters or fewer.")
  .email("Enter a valid email address.");

const newPasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters.`)
  .refine(
    (value) => new TextEncoder().encode(value).length <= PASSWORD_MAX_BYTES,
    "This password is too long.",
  );

export const signUpRoleSchema = z.enum(SIGN_UP_ROLES, {
  message: "Choose Patient or Doctor to continue.",
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password.").max(1024),
});

export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: z.string(),
    role: signUpRoleSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

/** Turns zod issues into one message per form field. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field === "string" && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
}

/** A doctor sign-up stays pending until an admin approves it. */
export function roleForSignUp(choice: SignUpRole): UserRole {
  return choice === "doctor" ? "pending_doctor" : "patient";
}
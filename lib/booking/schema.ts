import type { BookingIdentityProfile } from "../types";

export const bookingFormFields = [
  "hospitalId",
  "specialistId",
  "date",
  "slotId",
  "contactName",
  "contactEmail",
  "contactPhone",
  "reason",
] as const;

export type BookingFormField = (typeof bookingFormFields)[number];

export type BookingFieldErrors = Partial<
  Record<BookingFormField, string>
>;

export interface BookingValidationErrors {
  fields: BookingFieldErrors;
  formError?: string;
}

export interface BookingFormValues {
  hospitalId: string;
  specialistId: string;
  date: string;
  slotId: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  reason: string;
}

export interface ValidatedBookingInput extends BookingFormValues {
  reason: string;
}

export type BookingInputResult =
  | { success: true; data: ValidatedBookingInput }
  | { success: false; errors: BookingValidationErrors };

const fieldLabels: Record<BookingFormField, string> = {
  hospitalId: "Hospital",
  specialistId: "Specialist",
  date: "Date",
  slotId: "Available slot",
  contactName: "Name",
  contactEmail: "Email",
  contactPhone: "Phone",
  reason: "Reason",
};

const allowedFields = new Set<string>(bookingFormFields);

export function createInitialBookingFormValues(
  profile: BookingIdentityProfile | null,
): BookingFormValues {
  return {
    hospitalId: "",
    specialistId: "",
    date: "",
    slotId: "",
    contactName: profile?.name ?? "",
    contactEmail: profile?.email ?? "",
    contactPhone: profile?.phone ?? "",
    reason: "",
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  return (
    Number.isFinite(timestamp) &&
    new Date(timestamp).toISOString().slice(0, 10) === value
  );
}

export function parseBookingInput(value: unknown): BookingInputResult {
  if (!isRecord(value)) {
    return {
      success: false,
      errors: {
        fields: {},
        formError: "The booking request must be a JSON object.",
      },
    };
  }

  const errors: BookingFieldErrors = {};
  const unexpectedFields = Object.keys(value).filter(
    (field) => !allowedFields.has(field),
  );

  const formError =
    unexpectedFields.length > 0
      ? "The request contains unsupported fields."
      : undefined;

  const read = (field: BookingFormField, optional = false): string => {
    const rawValue = value[field];

    if (rawValue === undefined && optional) {
      return "";
    }

    if (typeof rawValue !== "string") {
      errors[field] = `${fieldLabels[field]} must be text.`;
      return "";
    }

    return rawValue.trim();
  };

  const data: BookingFormValues = {
    hospitalId: read("hospitalId"),
    specialistId: read("specialistId"),
    date: read("date"),
    slotId: read("slotId"),
    contactName: read("contactName"),
    contactEmail: read("contactEmail"),
    contactPhone: read("contactPhone", true),
    reason: read("reason", true),
  };

  for (const field of [
    "hospitalId",
    "specialistId",
    "date",
    "slotId",
  ] as const) {
    if (!data[field]) {
      errors[field] = `Select a ${fieldLabels[field].toLowerCase()}.`;
    } else if (data[field].length > 160) {
      errors[field] = `The ${fieldLabels[field].toLowerCase()} selection is invalid.`;
    }
  }

  if (!data.date) {
    errors.date = "Choose a date.";
  } else if (!isValidIsoDate(data.date)) {
    errors.date = "Enter a valid date.";
  }

  const contactName = data.contactName.replace(/\s+/g, " ").trim();
  if (!contactName) {
    errors.contactName = "Enter a name for this request.";
  } else if (contactName.length > 100) {
    errors.contactName = "Name must be 100 characters or fewer.";
  }

  const contactEmail = data.contactEmail.trim().toLowerCase();
  if (!contactEmail) {
    errors.contactEmail = "Enter an email address for this request.";
  } else if (
    contactEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)
  ) {
    errors.contactEmail = "Enter a valid email address.";
  }

  const contactPhone = data.contactPhone;
  if (contactPhone) {
    const digits = contactPhone.replace(/\D/g, "");
    if (
      contactPhone.length > 30 ||
      !/^[+0-9().\-\s]+$/.test(contactPhone) ||
      digits.length < 7 ||
      digits.length > 15
    ) {
      errors.contactPhone =
        "Enter a valid phone number or leave this optional field blank.";
    }
  }

  const reason = data.reason.trim();
  if (reason.length > 240) {
    errors.reason = "Reason must be 240 characters or fewer.";
  }

  if (Object.keys(errors).length > 0 || formError) {
    return {
      success: false,
      errors: {
        fields: errors,
        ...(formError ? { formError } : {}),
      },
    };
  }

  return {
    success: true,
    data: {
      ...data,
      contactName,
      contactEmail,
      contactPhone,
      reason,
    },
  };
}

import {
  addDaysIso,
  getDoctorAvailability,
  MAX_AVAILABILITY_DAYS,
} from "../../../../../lib/availability/service";
import { getSignedInPatientSession } from "../../../../../lib/auth/session";
import { isValidIsoDate } from "../../../../../lib/booking/schema";
import { isValidSpecialistId } from "../../../../../lib/specialists";

interface AvailabilityRouteContext {
  params: Promise<{ id: string }>;
}

function badRequest(fields: Record<string, string>) {
  return Response.json(
    { ok: false, errors: { fields } },
    { status: 400 },
  );
}

export async function GET(
  request: Request,
  { params }: AvailabilityRouteContext,
) {
  const session = await getSignedInPatientSession();

  if (!session) {
    return Response.json(
      {
        ok: false,
        errors: {
          formError: "Sign in to view available appointment times.",
        },
      },
      { status: 401 },
    );
  }

  const { id } = await params;

  if (!isValidSpecialistId(id)) {
    return badRequest({ doctorId: "Choose a valid doctor." });
  }

  const searchParams = new URL(request.url).searchParams;
  const today = new Date().toISOString().slice(0, 10);
  const from = searchParams.get("from") || today;
  const to = searchParams.get("to") || addDaysIso(today, 13);
  const errors: Record<string, string> = {};

  if (!isValidIsoDate(from)) {
    errors.from = "Enter a valid start date.";
  }

  if (!isValidIsoDate(to)) {
    errors.to = "Enter a valid end date.";
  }

  if (!errors.from && !errors.to) {
    if (from > to) {
      errors.to = "The end date must be on or after the start date.";
    } else {
      const days = Math.round(
        (Date.parse(`${to}T00:00:00.000Z`) -
          Date.parse(`${from}T00:00:00.000Z`)) /
          86_400_000,
      );

      if (days + 1 > MAX_AVAILABILITY_DAYS) {
        errors.to = `Choose a range of ${MAX_AVAILABILITY_DAYS} days or fewer.`;
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return badRequest(errors);
  }

  let availability;

  try {
    availability = await getDoctorAvailability({
      doctorId: id,
      from,
      to,
    });
  } catch (error) {
    console.error("Failed to load doctor availability", error);

    return Response.json(
      {
        ok: false,
        errors: {
          formError:
            "Appointment times are temporarily unavailable. Please try again later.",
        },
      },
      { status: 503 },
    );
  }

  if (!availability) {
    return Response.json(
      {
        ok: false,
        errors: { formError: "The selected doctor does not exist." },
      },
      { status: 404 },
    );
  }

  return Response.json({ ok: true, ...availability });
}

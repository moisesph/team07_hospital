import { submitBookingRequest } from "../../../lib/booking/services";

export function GET() {
  return Response.json(
    {
      message:
        "Appointment records are not publicly listed. Use the demo request form to submit an intake request.",
    },
    { status: 501 },
  );
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof TypeError) {
      return Response.json(
        {
          ok: false,
          errors: {
            fields: {},
            formError: "Send a valid JSON booking request.",
          },
        },
        { status: 400 },
      );
    }

    throw error;
  }

  const result = await submitBookingRequest(
    payload,
    request.headers.get("Idempotency-Key"),
  );

  if (!result.ok) {
    return Response.json(
      { ok: false, errors: result.errors },
      { status: result.status },
    );
  }

  return Response.json(
    {
      ok: true,
      requestId: result.requestId,
      replayed: result.replayed,
      status: "unresolved",
      message: result.message,
    },
    { status: result.replayed ? 200 : 201 },
  );
}

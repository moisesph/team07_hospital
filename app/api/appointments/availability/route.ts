import { getAvailableBookingSlots } from "../../../../lib/booking/services";
import { isValidIsoDate } from "../../../../lib/booking/schema";

export function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const hospitalId = searchParams.get("hospitalId") ?? "";
  const specialistId = searchParams.get("specialistId") ?? "";
  const date = searchParams.get("date") ?? "";

  if (!hospitalId || !specialistId || !date || !isValidIsoDate(date)) {
    return Response.json(
      {
        ok: false,
        errors: {
          fields: {
            ...(!hospitalId ? { hospitalId: "Choose a hospital." } : {}),
            ...(!specialistId ? { specialistId: "Choose a specialist." } : {}),
            ...(!date || !isValidIsoDate(date)
              ? { date: "Choose a valid date." }
              : {}),
          },
        },
      },
      { status: 400 },
    );
  }

  const result = getAvailableBookingSlots({
    hospitalId,
    specialistId,
    date,
  });

  if (!result) {
    return Response.json(
      {
        ok: false,
        errors: {
          fields: {
            hospitalId: "Choose a hospital and specialist in this network.",
            specialistId:
              "The specialist must belong to the selected hospital.",
          },
        },
      },
      { status: 400 },
    );
  }

  return Response.json({
    ok: true,
    schedulingTimeZone: result.timeZone,
    slots: result.slots,
  });
}

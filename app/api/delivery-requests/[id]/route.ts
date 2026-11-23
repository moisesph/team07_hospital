import { NextResponse } from "next/server";
import { getDeliveryRequestByIdOrRef } from "../../../../lib/deliveries";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { searchParams } = new URL(request.url);
  const patientId =
    request.headers.get("x-patient-id") ?? searchParams.get("patientId");

  if (!patientId) {
    return NextResponse.json(
      { error: "Authentication required to view delivery requests." },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  const delivery = getDeliveryRequestByIdOrRef(id);

  if (!delivery) {
    return NextResponse.json(
      { error: "Delivery request not found." },
      { status: 404 },
    );
  }

  if (delivery.patientId !== patientId) {
    return NextResponse.json(
      { error: "Access denied. You can only view your own delivery requests." },
      { status: 403 },
    );
  }

  return NextResponse.json({ delivery });
}
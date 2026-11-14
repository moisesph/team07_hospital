export function GET() {
  return Response.json(
    { message: "Appointment records API goes here." },
    { status: 501 },
  );
}

export function POST() {
  return Response.json(
    { message: "Appointment creation API goes here." },
    { status: 501 },
  );
}
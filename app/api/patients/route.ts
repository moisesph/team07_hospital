export function GET() {
  return Response.json(
    { message: "Patient records are not available." },
    { status: 501 },
  );
}

export function POST() {
  return Response.json(
    { message: "Patient creation is not implemented." },
    { status: 501 },
  );
}
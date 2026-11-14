export function GET() {
  return Response.json(
    { message: "Patient records API goes here." },
    { status: 501 },
  );
}

export function POST() {
  return Response.json(
    { message: "Patient creation API goes here." },
    { status: 501 },
  );
}
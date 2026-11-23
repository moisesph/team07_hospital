import { NextResponse } from "next/server";
import { getMedicines } from "../../../lib/medicines";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hospitalId = searchParams.get("hospitalId");
  const category = searchParams.get("category");
  const query = searchParams.get("q");
  const availableOnly = searchParams.get("availableOnly") === "true";

  const results = getMedicines({
    hospitalId,
    category,
    query,
    availableOnly,
  });

  return NextResponse.json({ medicines: results });
}
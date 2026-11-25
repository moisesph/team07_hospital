import { getSpecialistsWithHospitals } from "../../../lib/specialists";

export async function GET() {
  const rows = await getSpecialistsWithHospitals();
  const specialists = rows.map(({ hospital, ...specialist }) => ({
    ...specialist,
    hospital,
  }));
  return Response.json({ specialists });
}

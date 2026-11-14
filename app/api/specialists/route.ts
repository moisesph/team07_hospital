import { getHospitalById } from "../../../lib/hospitals-db";
import { getSpecialists } from "../../../lib/specialists";

export function GET() {
  const specialists = getSpecialists().map((specialist) => ({
    ...specialist,
    hospital: getHospitalById(specialist.hospitalId),
  }));

  return Response.json({ specialists });
}

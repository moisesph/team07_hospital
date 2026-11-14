import { getHospitalById } from "../../../../lib/hospitals-db";
import {
  getSpecialistById,
  isValidSpecialistId,
} from "../../../../lib/specialists";

interface SpecialistRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: SpecialistRouteContext,
) {
  const { id } = await params;

  if (!isValidSpecialistId(id)) {
    return Response.json(
      { message: "Invalid specialist ID." },
      { status: 400 },
    );
  }

  const specialist = getSpecialistById(id);

  if (!specialist) {
    return Response.json(
      { message: "Specialist not found." },
      { status: 404 },
    );
  }

  return Response.json({
    specialist: {
      ...specialist,
      hospital: getHospitalById(specialist.hospitalId),
    },
  });
}

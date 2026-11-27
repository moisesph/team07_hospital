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

  const specialist = await getSpecialistById(id);

  if (!specialist) {
    return Response.json(
      { message: "Specialist not found." },
      { status: 404 },
    );
  }

  const hospital = await getHospitalById(specialist.hospitalId);

  return Response.json({
    specialist: {
      ...specialist,
      hospital,
    },
  });
}

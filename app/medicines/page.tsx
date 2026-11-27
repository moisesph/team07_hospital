import { MedicineCatalog } from "../../components/MedicineCatalog";
import { getHospitals } from "../../lib/hospitals-db";
import { getMedicines } from "../../lib/medicines";

export default async function MedicinesPage() {
  const medicines = getMedicines();
  const hospitals = await getHospitals();

  return <MedicineCatalog initialMedicines={medicines} hospitals={hospitals} />;
}
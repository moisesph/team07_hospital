import { MedicineCatalog } from "../../components/MedicineCatalog";
import { getHospitals } from "../../lib/hospitals-db";
import { getMedicines } from "../../lib/medicines";

export default function MedicinesPage() {
  const medicines = getMedicines();
  const hospitals = getHospitals();

  return <MedicineCatalog initialMedicines={medicines} hospitals={hospitals} />;
}
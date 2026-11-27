import { DeliveryTracker } from "../../components/DeliveryTracker";
import { getAllDeliveryRequests } from "../../lib/deliveries";
import { getHospitals } from "../../lib/hospitals-db";
import { getMedicines } from "../../lib/medicines";
import { getPatients } from "../../lib/patients";

export default async function DeliveryTrackingPage() {
  const [deliveries, hospitals, patients] = await Promise.all([
    getAllDeliveryRequests(),
    getHospitals(),
    getPatients(),
  ]);
  const medicines = getMedicines();

  return (
    <DeliveryTracker
      allDeliveries={deliveries}
      hospitals={hospitals}
      patients={patients}
      medicines={medicines}
    />
  );
}
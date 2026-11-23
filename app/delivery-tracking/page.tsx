import { DeliveryTracker } from "../../components/DeliveryTracker";
import { getAllDeliveryRequests } from "../../lib/deliveries";
import { getHospitals } from "../../lib/hospitals-db";
import { getMedicines } from "../../lib/medicines";
import { getPatients } from "../../lib/patients";

export default function DeliveryTrackingPage() {
  const deliveries = getAllDeliveryRequests();
  const hospitals = getHospitals();
  const patients = getPatients();
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
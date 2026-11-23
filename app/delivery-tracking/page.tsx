import { DeliveryTracker } from "../../components/DeliveryTracker";
import { getAllDeliveryRequests } from "../../lib/deliveries";
import { getHospitals } from "../../lib/hospitals-db";
import { getPatients } from "../../lib/patients";

export default function DeliveryTrackingPage() {
  const deliveries = getAllDeliveryRequests();
  const hospitals = getHospitals();
  const patients = getPatients();

  return (
    <DeliveryTracker
      allDeliveries={deliveries}
      hospitals={hospitals}
      patients={patients}
    />
  );
}
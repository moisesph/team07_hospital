import type { DeliveryRequest } from "./types";

const deliveryRequests: DeliveryRequest[] = [
  {
    id: "delivery-001",
    referenceCode: "DEL-2026-8412",
    patientId: "patient-001",
    hospitalId: "hospital-001",
    items: [
      {
        medicineId: "medicine-001",
        medicineName: "Amoxicillin",
        strength: "500 mg",
        quantity: 1,
      },
      {
        medicineId: "medicine-002",
        medicineName: "Acetaminophen Extra Strength",
        strength: "500 mg",
        quantity: 2,
      },
    ],
    deliveryAddress: "742 Evergreen Terrace, Apt 4B, North Example City",
    contactPhone: "+1-202-555-0101",
    notes: "Leave with front desk concierge if not home.",
    status: "out_for_delivery",
    estimatedDelivery: "Today, 3:30 PM – 5:00 PM",
    createdAt: "2026-11-23T09:15:00Z",
    timeline: [
      {
        status: "awaiting_confirmation",
        label: "Request Submitted (Awaiting Confirmation)",
        timestamp: "Nov 23, 2026 · 9:15 AM",
        completed: true,
      },
      {
        status: "confirmed",
        label: "Prescription & Order Confirmed",
        timestamp: "Nov 23, 2026 · 10:02 AM",
        completed: true,
      },
      {
        status: "preparing",
        label: "Packed at Hospital Pharmacy",
        timestamp: "Nov 23, 2026 · 11:40 AM",
        completed: true,
      },
      {
        status: "out_for_delivery",
        label: "Out for Home Delivery",
        timestamp: "Nov 23, 2026 · 1:25 PM",
        completed: true,
      },
      {
        status: "delivered",
        label: "Delivered to Patient",
        timestamp: null,
        completed: false,
      },
    ],
  },
  {
    id: "delivery-002",
    referenceCode: "DEL-2026-8419",
    patientId: "patient-001",
    hospitalId: "hospital-001",
    items: [
      {
        medicineId: "medicine-003",
        medicineName: "Lisinopril",
        strength: "10 mg",
        quantity: 1,
      },
    ],
    deliveryAddress: "742 Evergreen Terrace, Apt 4B, North Example City",
    contactPhone: "+1-202-555-0101",
    notes: null,
    status: "awaiting_confirmation",
    estimatedDelivery: "Pending pharmacy review",
    createdAt: "2026-11-23T13:50:00Z",
    timeline: [
      {
        status: "awaiting_confirmation",
        label: "Request Submitted (Awaiting Confirmation)",
        timestamp: "Nov 23, 2026 · 1:50 PM",
        completed: true,
      },
      {
        status: "confirmed",
        label: "Prescription & Order Confirmed",
        timestamp: null,
        completed: false,
      },
      {
        status: "preparing",
        label: "Packed at Hospital Pharmacy",
        timestamp: null,
        completed: false,
      },
      {
        status: "out_for_delivery",
        label: "Out for Home Delivery",
        timestamp: null,
        completed: false,
      },
      {
        status: "delivered",
        label: "Delivered to Patient",
        timestamp: null,
        completed: false,
      },
    ],
  },
  {
    id: "delivery-003",
    referenceCode: "DEL-2026-8390",
    patientId: "patient-002",
    hospitalId: "hospital-001",
    items: [
      {
        medicineId: "medicine-005",
        medicineName: "Cetirizine Hydrochloride",
        strength: "10 mg",
        quantity: 1,
      },
      {
        medicineId: "medicine-006",
        medicineName: "Omeprazole Delayed-Release",
        strength: "20 mg",
        quantity: 1,
      },
    ],
    deliveryAddress: "118 Maple Creek Drive, North Example City",
    contactPhone: "+1-202-555-0102",
    notes: "Ring doorbell upon arrival.",
    status: "delivered",
    estimatedDelivery: "Delivered Nov 21, 2026 at 4:12 PM",
    createdAt: "2026-11-21T10:00:00Z",
    timeline: [
      {
        status: "awaiting_confirmation",
        label: "Request Submitted (Awaiting Confirmation)",
        timestamp: "Nov 21, 2026 · 10:00 AM",
        completed: true,
      },
      {
        status: "confirmed",
        label: "Prescription & Order Confirmed",
        timestamp: "Nov 21, 2026 · 10:35 AM",
        completed: true,
      },
      {
        status: "preparing",
        label: "Packed at Hospital Pharmacy",
        timestamp: "Nov 21, 2026 · 12:15 PM",
        completed: true,
      },
      {
        status: "out_for_delivery",
        label: "Out for Home Delivery",
        timestamp: "Nov 21, 2026 · 2:30 PM",
        completed: true,
      },
      {
        status: "delivered",
        label: "Delivered to Patient",
        timestamp: "Nov 21, 2026 · 4:12 PM",
        completed: true,
      },
    ],
  },
];

function cloneDelivery(request: DeliveryRequest): DeliveryRequest {
  return {
    ...request,
    items: request.items.map((item) => ({ ...item })),
    timeline: request.timeline.map((step) => ({ ...step })),
  };
}

export function getAllDeliveryRequests(): DeliveryRequest[] {
  return deliveryRequests.map(cloneDelivery);
}

export function getDeliveryRequestsForPatient(
  patientId: string,
): DeliveryRequest[] {
  return deliveryRequests
    .filter((record) => record.patientId === patientId)
    .map(cloneDelivery);
}

export function getDeliveryRequestByIdOrRef(
  idOrRef: string,
): DeliveryRequest | null {
  const normalized = idOrRef.trim().toLowerCase();
  const match = deliveryRequests.find(
    (record) =>
      record.id.toLowerCase() === normalized ||
      record.referenceCode.toLowerCase() === normalized,
  );

  return match ? cloneDelivery(match) : null;
}
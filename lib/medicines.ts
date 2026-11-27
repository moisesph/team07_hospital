import type { Medicine, MedicineFilters } from "./types";

const medicines: Medicine[] = [
  {
    id: "medicine-001",
    hospitalId: "hospital-001",
    name: "Amoxicillin",
    genericName: "Amoxicillin Trihydrate",
    strength: "500 mg",
    form: "Oral Capsule",
    category: "Antibiotics",
    description: "Broad-spectrum penicillin antibiotic used to treat bacterial infections.",
    price: 14.5,
    available: true,
    stockCount: 42,
    rxRequired: true,
  },
  {
    id: "medicine-002",
    hospitalId: "hospital-001",
    name: "Acetaminophen Extra Strength",
    genericName: "Paracetamol",
    strength: "500 mg",
    form: "Tablet",
    category: "Pain & Fever",
    description: "Relieves mild to moderate aches, headaches, and reduces fever.",
    price: 8.25,
    available: true,
    stockCount: 85,
    rxRequired: false,
  },
  {
    id: "medicine-003",
    hospitalId: "hospital-001",
    name: "Lisinopril",
    genericName: "Lisinopril Dihydrate",
    strength: "10 mg",
    form: "Tablet",
    category: "Cardiovascular",
    description: "ACE inhibitor prescribed to manage high blood pressure and support heart health.",
    price: 18.0,
    available: true,
    stockCount: 27,
    rxRequired: true,
  },
  {
    id: "medicine-004",
    hospitalId: "hospital-002",
    name: "Albuterol Sulfate Inhaler",
    genericName: "Salbutamol",
    strength: "90 mcg/actuation",
    form: "Metered-Dose Inhaler",
    category: "Respiratory",
    description: "Fast-acting bronchodilator for acute bronchospasm and asthma symptom relief.",
    price: 36.0,
    available: false,
    stockCount: 0,
    rxRequired: true,
  },
  {
    id: "medicine-005",
    hospitalId: "hospital-002",
    name: "Cetirizine Hydrochloride",
    genericName: "Cetirizine",
    strength: "10 mg",
    form: "Tablet",
    category: "Allergy & Sinus",
    description: "24-hour non-drowsy antihistamine for seasonal allergies, sneezing, and itching.",
    price: 11.75,
    available: true,
    stockCount: 64,
    rxRequired: false,
  },
  {
    id: "medicine-006",
    hospitalId: "hospital-002",
    name: "Omeprazole Delayed-Release",
    genericName: "Omeprazole",
    strength: "20 mg",
    form: "Delayed-Release Capsule",
    category: "Digestive Health",
    description: "Proton pump inhibitor used to treat frequent heartburn and acid reflux.",
    price: 15.9,
    available: true,
    stockCount: 31,
    rxRequired: false,
  },
  {
    id: "medicine-007",
    hospitalId: "hospital-003",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    strength: "400 mg",
    form: "Coated Tablet",
    category: "Pain & Fever",
    description: "Nonsteroidal anti-inflammatory drug (NSAID) for inflammation, pain, and fever.",
    price: 9.5,
    available: true,
    stockCount: 50,
    rxRequired: false,
  },
  {
    id: "medicine-008",
    hospitalId: "hospital-003",
    name: "Azithromycin Z-Pak",
    genericName: "Azithromycin Dihydrate",
    strength: "250 mg",
    form: "Film-Coated Tablet",
    category: "Antibiotics",
    description: "Macrolide antibiotic course for respiratory and soft-tissue bacterial infections.",
    price: 24.0,
    available: false,
    stockCount: 0,
    rxRequired: true,
  },
];

function cloneMedicine(medicine: Medicine): Medicine {
  return { ...medicine };
}

export function getMedicines(filters: MedicineFilters = {}): Medicine[] {
  const { hospitalId, category, query, availableOnly } = filters;
  const normalizedQuery = query?.trim().toLowerCase() ?? "";

  return medicines
    .filter((medicine) => {
      if (hospitalId && medicine.hospitalId !== hospitalId) {
        return false;
      }

      if (category && medicine.category !== category) {
        return false;
      }

      if (availableOnly && !medicine.available) {
        return false;
      }

      if (normalizedQuery) {
        const matchesName = medicine.name.toLowerCase().includes(normalizedQuery);
        const matchesGeneric = medicine.genericName
          .toLowerCase()
          .includes(normalizedQuery);
        const matchesStrength = medicine.strength
          .toLowerCase()
          .includes(normalizedQuery);

        if (!matchesName && !matchesGeneric && !matchesStrength) {
          return false;
        }
      }

      return true;
    })
    .map(cloneMedicine);
}

export function getMedicineById(id: string): Medicine | null {
  const medicine = medicines.find((record) => record.id === id);
  return medicine ? cloneMedicine(medicine) : null;
}
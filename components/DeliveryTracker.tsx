"use client";

import { useMemo, useState } from "react";
import type {
  DeliveryRequest,
  DeliveryStatus,
  Hospital,
  Medicine,
  Patient,
} from "../lib/types";
import { ButtonLink, ButtonStyles } from "./ui/Button";

interface DeliveryTrackerProps {
  allDeliveries: DeliveryRequest[];
  hospitals: Hospital[];
  patients: Patient[];
  medicines: Medicine[];
}

const STATUS_LABELS: Record<DeliveryStatus, string> = {
  awaiting_confirmation: "Awaiting Confirmation",
  confirmed: "Confirmed",
  preparing: "Preparing at Pharmacy",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function DeliveryTracker({
  allDeliveries,
  hospitals,
  patients,
  medicines,
}: DeliveryTrackerProps) {
  const [deliveries, setDeliveries] =
    useState<DeliveryRequest[]>(allDeliveries);
  const [activePatientId, setActivePatientId] = useState<string>("patient-001");
  const [referenceInput, setReferenceInput] = useState("");
  const [selectedDeliveryId, setSelectedDeliveryId] =
    useState<string>("delivery-001");
  const [accessMessage, setAccessMessage] = useState<string | null>(null);

  // Delivery Address & Order Request Form State (#9)
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState<string>(
    medicines.find((m) => m.available)?.id ?? "",
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [streetAddress, setStreetAddress] = useState("");
  const [cityStateZip, setCityStateZip] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const availableMedicines = useMemo(
    () => medicines.filter((m) => m.available),
    [medicines],
  );

  const patientDeliveries = useMemo(() => {
    if (!activePatientId) return [];
    return deliveries.filter((d) => d.patientId === activePatientId);
  }, [deliveries, activePatientId]);

  const selectedDelivery = useMemo(() => {
    if (!activePatientId) return null;
    return (
      patientDeliveries.find((d) => d.id === selectedDeliveryId) ??
      patientDeliveries[0] ??
      null
    );
  }, [activePatientId, patientDeliveries, selectedDeliveryId]);

  const hospitalName =
    hospitals.find((h) => h.id === selectedDelivery?.hospitalId)?.name ??
    selectedDelivery?.hospitalId ??
    "Hospital Pharmacy";

  function handlePatientChange(nextPatientId: string) {
    setActivePatientId(nextPatientId);
    setAccessMessage(null);
    setFormError(null);
    setFormSuccess(null);
    setReferenceInput("");
    const firstOrder = deliveries.find((d) => d.patientId === nextPatientId);
    if (firstOrder) {
      setSelectedDeliveryId(firstOrder.id);
    }
  }

  function handleLookup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!activePatientId) {
      setAccessMessage(
        "Access denied: Please sign in as a patient to view delivery requests.",
      );
      return;
    }

    const trimmed = referenceInput.trim().toLowerCase();
    if (!trimmed) {
      setAccessMessage(
        "Please enter a delivery reference code (e.g., DEL-2026-8412).",
      );
      return;
    }

    const found = deliveries.find(
      (d) =>
        d.referenceCode.toLowerCase() === trimmed ||
        d.id.toLowerCase() === trimmed,
    );

    if (!found) {
      setAccessMessage(
        `No delivery request found for "${referenceInput.trim()}".`,
      );
      return;
    }

    if (found.patientId !== activePatientId) {
      setAccessMessage(
        `Access denied: Reference ${found.referenceCode} belongs to another patient account.`,
      );
      return;
    }

    setAccessMessage(null);
    setSelectedDeliveryId(found.id);
  }

  function handleCreateDelivery(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!activePatientId) {
      setFormError("You must be signed in to submit a delivery address.");
      return;
    }

    const med = availableMedicines.find((m) => m.id === selectedMedicineId);
    if (!med) {
      setFormError("Please select an available medicine.");
      return;
    }

    if (!streetAddress.trim() || !cityStateZip.trim() || !contactPhone.trim()) {
      setFormError(
        "Please complete your street address, city/state/ZIP, and contact phone.",
      );
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newId = `delivery-${Date.now()}`;
    const newRef = `DEL-2026-${randomCode}`;
    const nowLabel = "Just now · Pending Pharmacy Confirmation";

    const newRequest: DeliveryRequest = {
      id: newId,
      referenceCode: newRef,
      patientId: activePatientId,
      hospitalId: med.hospitalId,
      items: [
        {
          medicineId: med.id,
          medicineName: med.name,
          strength: med.strength,
          quantity: Math.max(1, quantity),
        },
      ],
      deliveryAddress: `${streetAddress.trim()}, ${cityStateZip.trim()}`,
      contactPhone: contactPhone.trim(),
      notes: deliveryNotes.trim() ? deliveryNotes.trim() : null,
      status: "awaiting_confirmation",
      estimatedDelivery: "Pending pharmacy review",
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: "awaiting_confirmation",
          label: "Request Submitted (Awaiting Confirmation)",
          timestamp: nowLabel,
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
    };

    setDeliveries((prev) => [newRequest, ...prev]);
    setSelectedDeliveryId(newId);
    setReferenceInput(newRef);
    setStreetAddress("");
    setCityStateZip("");
    setContactPhone("");
    setDeliveryNotes("");
    setQuantity(1);
    setShowRequestForm(false);
    setFormSuccess(
      `Delivery request ${newRef} submitted! You can track its live status below.`,
    );
  }

  const demoPatients = patients.slice(0, 2);

  return (
    <>
      <div className="tracking-page">
        <header className="tracking-header">
          <div className="tracking-header__row">
            <div>
              <p className="tracking-eyebrow">Home Delivery</p>
              <h1 className="tracking-title">Delivery &amp; Order Tracking</h1>
              <p className="tracking-subtitle">
                Enter your home delivery address to submit a medication delivery
                request or track the live status of your existing orders.
              </p>
            </div>

            {activePatientId && (
              <button
                type="button"
                onClick={() => {
                  setShowRequestForm((prev) => !prev);
                  setFormError(null);
                }}
                className="tracking-submit-btn"
              >
                {showRequestForm ? "Close Address Form" : "+ New Delivery Request"}
              </button>
            )}
          </div>
        </header>

        {/* Session / Ownership Preview Switcher */}
        <section aria-label="Active patient session" className="session-bar">
          <div>
            <span className="session-bar__label">Active Patient Session:</span>
            <p className="session-bar__hint">
              Switch accounts to verify signed-in ownership and unauthenticated
              access denial.
            </p>
          </div>

          <select
            aria-label="Select patient session"
            value={activePatientId}
            onChange={(e) => handlePatientChange(e.target.value)}
            className="tracking-select"
          >
            {demoPatients.map((p) => (
              <option key={p.id} value={p.id}>
                Signed in: {p.firstName} {p.lastName} ({p.id})
              </option>
            ))}
            <option value="">Signed Out (Unauthenticated Visitor)</option>
          </select>
        </section>

        {formSuccess && (
          <p role="status" className="tracking-success">
            {formSuccess}
          </p>
        )}

        {/* Unauthenticated Access Denied State */}
        {!activePatientId ? (
          <section className="access-denied-card" role="alert">
            <h2>Sign In Required</h2>
            <p>
              Access denied. You must be signed in as a registered patient to
              submit a delivery address or view medicine delivery tracking
              statuses.
            </p>
            <div className="access-denied-card__actions">
              <ButtonLink href="/login" variant="primary">
                Go to Patient Login
              </ButtonLink>
              <button
                type="button"
                onClick={() => handlePatientChange("patient-001")}
                className="tracking-secondary-btn"
              >
                Preview as Elena Marin
              </button>
            </div>
          </section>
        ) : (
          <>
            {/* Delivery Address & Order Request Form (#9) */}
            {showRequestForm && (
              <form
                onSubmit={handleCreateDelivery}
                className="delivery-form-card"
                aria-labelledby="delivery-form-heading"
              >
                <h2 id="delivery-form-heading" className="delivery-form__title">
                  Delivery Address &amp; Medication Details
                </h2>
                <p className="delivery-form__desc">
                  Provide the destination address where our hospital pharmacy
                  courier should deliver your medication.
                </p>

                {formError && (
                  <p role="alert" className="tracking-error">
                    {formError}
                  </p>
                )}

                <div className="delivery-form__grid">
                  <div className="delivery-field">
                    <label htmlFor="delivery-med-select">
                      Select Available Medicine *
                    </label>
                    <select
                      id="delivery-med-select"
                      value={selectedMedicineId}
                      onChange={(e) => setSelectedMedicineId(e.target.value)}
                      className="tracking-input"
                    >
                      {availableMedicines.map((med) => (
                        <option key={med.id} value={med.id}>
                          {med.name} ({med.strength}) — ${med.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="delivery-field">
                    <label htmlFor="delivery-qty-input">Quantity *</label>
                    <input
                      id="delivery-qty-input"
                      type="number"
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="tracking-input"
                    />
                  </div>

                  <div className="delivery-field delivery-field--full">
                    <label htmlFor="delivery-street-input">
                      Street Address &amp; Apartment/Unit *
                    </label>
                    <input
                      id="delivery-street-input"
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g., 742 Evergreen Terrace, Apt 4B"
                      className="tracking-input"
                    />
                  </div>

                  <div className="delivery-field">
                    <label htmlFor="delivery-city-input">
                      City, State &amp; ZIP Code *
                    </label>
                    <input
                      id="delivery-city-input"
                      type="text"
                      value={cityStateZip}
                      onChange={(e) => setCityStateZip(e.target.value)}
                      placeholder="e.g., Nacogdoches, TX 75961"
                      className="tracking-input"
                    />
                  </div>

                  <div className="delivery-field">
                    <label htmlFor="delivery-phone-input">
                      Contact Phone Number *
                    </label>
                    <input
                      id="delivery-phone-input"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g., +1-936-555-0148"
                      className="tracking-input"
                    />
                  </div>

                  <div className="delivery-field delivery-field--full">
                    <label htmlFor="delivery-notes-input">
                      Courier Instructions / Gate Code (Optional)
                    </label>
                    <input
                      id="delivery-notes-input"
                      type="text"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g., Leave at front desk or ring doorbell"
                      className="tracking-input"
                    />
                  </div>
                </div>

                <div className="delivery-form__actions">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="tracking-secondary-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="tracking-submit-btn">
                    Submit Delivery Request
                  </button>
                </div>
              </form>
            )}

            {/* Reference Lookup Form */}
            <form onSubmit={handleLookup} className="tracking-lookup">
              <label htmlFor="delivery-ref-input" className="sr-only">
                Delivery Reference Code
              </label>
              <input
                id="delivery-ref-input"
                type="text"
                value={referenceInput}
                onChange={(e) => setReferenceInput(e.target.value)}
                placeholder="Look up reference code (try DEL-2026-8412 or DEL-2026-8390)..."
                className="tracking-input"
              />
              <button type="submit" className="tracking-submit-btn">
                Track Reference
              </button>
            </form>

            {accessMessage && (
              <p role="alert" className="tracking-error">
                {accessMessage}
              </p>
            )}

            {/* Patient's Past & Pending Requests List */}
            <div
              className="tracking-pills"
              aria-label="Your submitted delivery requests"
            >
              <span className="tracking-pills__label">
                Your Delivery Requests ({patientDeliveries.length}):
              </span>
              {patientDeliveries.map((order) => {
                const isSelected = selectedDelivery?.id === order.id;
                return (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => {
                      setAccessMessage(null);
                      setReferenceInput(order.referenceCode);
                      setSelectedDeliveryId(order.id);
                    }}
                    className={`tracking-pill ${
                      isSelected ? "tracking-pill--active" : ""
                    }`}
                  >
                    {order.referenceCode} · {STATUS_LABELS[order.status]}
                  </button>
                );
              })}
            </div>

            {/* Selected Delivery Request Details & Timeline */}
            {selectedDelivery && (
              <section
                aria-labelledby="tracking-order-heading"
                className="tracking-card"
              >
                <div className="tracking-card__top">
                  <div>
                    <p className="tracking-card__ref-label">Reference Code</p>
                    <h2
                      id="tracking-order-heading"
                      className="tracking-card__ref"
                    >
                      {selectedDelivery.referenceCode}
                    </h2>
                    <p className="tracking-card__hospital">{hospitalName}</p>
                  </div>

                  <span
                    className={`tracking-badge tracking-badge--${selectedDelivery.status}`}
                  >
                    {STATUS_LABELS[selectedDelivery.status]}
                  </span>
                </div>

                <div className="tracking-meta">
                  <div>
                    <span className="tracking-meta__label">
                      Estimated Delivery
                    </span>
                    <strong>{selectedDelivery.estimatedDelivery}</strong>
                  </div>
                  <div>
                    <span className="tracking-meta__label">
                      Delivery Address
                    </span>
                    <strong>{selectedDelivery.deliveryAddress}</strong>
                  </div>
                  <div>
                    <span className="tracking-meta__label">Contact Phone</span>
                    <strong>{selectedDelivery.contactPhone}</strong>
                  </div>
                </div>

                <div className="tracking-timeline">
                  <h3>Status Timeline</h3>
                  <ol className="timeline-list">
                    {selectedDelivery.timeline.map((step) => (
                      <li
                        key={step.status}
                        className={`timeline-step ${
                          step.completed
                            ? "timeline-step--done"
                            : "timeline-step--pending"
                        }`}
                      >
                        <span
                          className="timeline-step__dot"
                          aria-hidden="true"
                        >
                          {step.completed ? "✓" : "•"}
                        </span>
                        <div className="timeline-step__content">
                          <strong>{step.label}</strong>
                          <span>
                            {step.timestamp ?? "Pending upcoming step"}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="tracking-items">
                  <h3>Selected Medicines</h3>
                  <ul>
                    {selectedDelivery.items.map((item) => (
                      <li key={item.medicineId}>
                        <span>
                          <strong>{item.medicineName}</strong> ({item.strength})
                        </span>
                        <span>Qty: {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedDelivery.notes && (
                    <p className="tracking-notes">
                      <strong>Delivery Notes:</strong> {selectedDelivery.notes}
                    </p>
                  )}
                </div>

                <div className="tracking-card__actions">
                  <ButtonLink href="/medicines" variant="primary">
                    Browse Medicine Catalog
                  </ButtonLink>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <ButtonStyles />

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .tracking-page {
          width: min(920px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(1.75rem, 4vw, 3rem);
        }

        .tracking-header {
          margin-bottom: 1.5rem;
        }

        .tracking-header__row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .tracking-eyebrow {
          margin: 0 0 0.4rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .tracking-title {
          margin: 0;
          font-size: clamp(1.75rem, 3.5vw, 2.3rem);
        }

        .tracking-subtitle {
          max-width: 620px;
          margin: 0.6rem 0 0;
          color: var(--color-muted);
          font-size: 1rem;
          line-height: 1.65;
        }

        .session-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.95rem 1.2rem;
          margin-bottom: 1.25rem;
          background: #f4f7f5;
          border: 1px solid #dce5df;
          border-radius: 14px;
        }

        .session-bar__label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
        }

        .session-bar__hint {
          margin: 0.15rem 0 0;
          font-size: 0.8rem;
          color: var(--color-muted);
        }

        .tracking-select {
          padding: 0.55rem 0.85rem;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.88rem;
          font-weight: 600;
          font-family: inherit;
        }

        .tracking-success {
          margin: 0 0 1.15rem;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          background: var(--color-primary-soft);
          border: 1px solid var(--color-primary);
          color: var(--color-primary);
          font-size: 0.92rem;
          font-weight: 700;
        }

        .delivery-form-card {
          padding: clamp(1.25rem, 3vw, 1.75rem);
          margin-bottom: 1.35rem;
          background: #ffffff;
          border: 2px solid var(--color-primary);
          border-radius: 16px;
          box-shadow: 0 6px 18px rgba(31, 111, 67, 0.08);
        }

        .delivery-form__title {
          margin: 0;
          font-size: 1.25rem;
        }

        .delivery-form__desc {
          margin: 0.35rem 0 1.1rem;
          font-size: 0.9rem;
          color: var(--color-muted);
        }

        .delivery-form__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 0.95rem;
        }

        .delivery-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .delivery-field--full {
          grid-column: 1 / -1;
        }

        .delivery-field label {
          font-size: 0.84rem;
          font-weight: 700;
          color: #1e293b;
        }

        .delivery-form__actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }

        .access-denied-card {
          padding: 2rem 1.5rem;
          border-radius: 16px;
          border: 1px solid #fecaca;
          border-left: 4px solid var(--color-danger, #b91c1c);
          background: #fef2f2;
        }

        .access-denied-card h2 {
          margin: 0;
          color: #991b1b;
          font-size: 1.25rem;
        }

        .access-denied-card p {
          margin: 0.55rem 0 1.25rem;
          color: #7f1d1d;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .access-denied-card__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .tracking-secondary-btn {
          padding: 0.65rem 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.88rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
        }

        .tracking-lookup {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 1rem;
          background: #ffffff;
          border: 1px solid #dce5df;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .tracking-input {
          flex: 1 1 260px;
          padding: 0.7rem 0.95rem;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.95rem;
          font-family: inherit;
        }

        .tracking-input:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 1px;
          border-color: var(--color-primary);
        }

        .tracking-submit-btn {
          padding: 0.7rem 1.35rem;
          border: none;
          border-radius: 10px;
          background: var(--color-primary);
          color: #ffffff;
          font-size: 0.92rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
        }

        .tracking-submit-btn:hover {
          background: var(--color-primary-hover);
        }

        .tracking-error {
          margin: 0.75rem 0;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          background: #fee2e2;
          color: #991b1b;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .tracking-pills {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .tracking-pills__label {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--color-muted);
        }

        .tracking-pill {
          padding: 0.4rem 0.8rem;
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          background: #ffffff;
          color: #334155;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
        }

        .tracking-pill--active {
          border-color: var(--color-primary);
          background: var(--color-primary-soft);
          color: var(--color-primary);
        }

        .tracking-card {
          margin-top: 1.5rem;
          padding: clamp(1.25rem, 3vw, 2rem);
          background: #ffffff;
          border: 1px solid #dce5df;
          border-radius: 18px;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
        }

        .tracking-card__top {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #eef2ef;
        }

        .tracking-card__ref-label {
          margin: 0;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-muted);
        }

        .tracking-card__ref {
          margin: 0.2rem 0 0;
          font-size: 1.5rem;
        }

        .tracking-card__hospital {
          margin: 0.25rem 0 0;
          font-size: 0.9rem;
          color: var(--color-primary);
          font-weight: 600;
        }

        .tracking-badge {
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .tracking-badge--awaiting_confirmation {
          background: #fef3c7;
          color: #92400e;
        }

        .tracking-badge--confirmed,
        .tracking-badge--preparing,
        .tracking-badge--out_for_delivery {
          background: var(--color-primary-soft);
          color: var(--color-primary);
        }

        .tracking-badge--delivered {
          background: #dcfce7;
          color: #166534;
        }

        .tracking-badge--cancelled {
          background: #fee2e2;
          color: #991b1b;
        }

        .tracking-meta {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 1rem;
          margin-top: 1.25rem;
          padding: 1rem;
          border-radius: 12px;
          background: #f4f7f5;
        }

        .tracking-meta__label {
          display: block;
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--color-muted);
        }

        .tracking-meta strong {
          display: block;
          margin-top: 0.2rem;
          font-size: 0.92rem;
          color: #0f172a;
        }

        .tracking-timeline {
          margin-top: 1.5rem;
        }

        .tracking-timeline h3,
        .tracking-items h3 {
          margin: 0 0 0.85rem;
          font-size: 1.05rem;
        }

        .timeline-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .timeline-step {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .timeline-step__dot {
          width: 26px;
          height: 26px;
          flex: 0 0 26px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .timeline-step--done .timeline-step__dot {
          background: var(--color-primary);
          color: #ffffff;
        }

        .timeline-step--pending .timeline-step__dot {
          background: #e2e8f0;
          color: #64748b;
        }

        .timeline-step__content {
          display: flex;
          flex-direction: column;
        }

        .timeline-step__content strong {
          font-size: 0.94rem;
          color: #0f172a;
        }

        .timeline-step--pending .timeline-step__content strong {
          color: var(--color-muted);
        }

        .timeline-step__content span {
          font-size: 0.82rem;
          color: var(--color-muted);
        }

        .tracking-items {
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid #eef2ef;
        }

        .tracking-items ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tracking-items li {
          display: flex;
          justify-content: space-between;
          padding: 0.6rem 0.85rem;
          border-radius: 10px;
          background: #f8faf9;
          font-size: 0.9rem;
        }

        .tracking-notes {
          margin: 0.85rem 0 0;
          font-size: 0.88rem;
          color: var(--color-muted);
        }

        .tracking-card__actions {
          margin-top: 1.5rem;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
}
"use client";

import { useMemo, useState } from "react";
import type { Hospital, Medicine } from "../lib/types";
import { ButtonLink, ButtonStyles } from "./ui/Button";
import { SearchBar } from "./ui/SearchBar";

interface MedicineCatalogProps {
  initialMedicines: Medicine[];
  hospitals: Hospital[];
}

export function MedicineCatalog({
  initialMedicines,
  hospitals,
}: MedicineCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );
  const [cart, setCart] = useState<Record<string, number>>({});

  const hospitalMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const hospital of hospitals) {
      map.set(hospital.id, hospital.name);
    }
    return map;
  }, [hospitals]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const med of initialMedicines) {
      unique.add(med.category);
    }
    return Array.from(unique);
  }, [initialMedicines]);

  const filteredMedicines = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return initialMedicines.filter((med) => {
      if (selectedCategory !== "all" && med.category !== selectedCategory) {
        return false;
      }
      if (availableOnly && !med.available) {
        return false;
      }
      if (q) {
        const match =
          med.name.toLowerCase().includes(q) ||
          med.genericName.toLowerCase().includes(q) ||
          med.strength.toLowerCase().includes(q) ||
          med.category.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [initialMedicines, searchQuery, selectedCategory, availableOnly]);

  const cartSummary = useMemo(() => {
    let totalItems = 0;
    let totalPrice = 0;
    for (const med of initialMedicines) {
      const qty = cart[med.id] ?? 0;
      if (qty > 0) {
        totalItems += qty;
        totalPrice += med.price * qty;
      }
    }
    return { totalItems, totalPrice };
  }, [cart, initialMedicines]);

  function addToCart(medicineId: string) {
    setCart((prev) => ({
      ...prev,
      [medicineId]: (prev[medicineId] ?? 0) + 1,
    }));
  }

  function removeFromCart(medicineId: string) {
    setCart((prev) => {
      const next = { ...prev };
      const current = next[medicineId] ?? 0;
      if (current <= 1) {
        delete next[medicineId];
      } else {
        next[medicineId] = current - 1;
      }
      return next;
    });
  }

  return (
    <>
      <div className="catalog-page">
        <header className="catalog-header">
          <p className="catalog-eyebrow">Hospital Pharmacy</p>
          <h1 className="catalog-title">Medicine Catalog</h1>
          <p className="catalog-subtitle">
            Browse available hospital medications, verify dosage strengths,
            check stock availability, and add items to your delivery cart.
          </p>
        </header>

        {/* Cart Summary Banner */}
        {cartSummary.totalItems > 0 && (
          <aside className="cart-banner" aria-label="Medicine delivery cart">
            <div>
              <strong>
                Delivery Cart: {cartSummary.totalItems}{" "}
                {cartSummary.totalItems === 1 ? "item" : "items"}
              </strong>
              <span> · Estimated Total: ${cartSummary.totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-banner__actions">
              <button
                type="button"
                onClick={() => setCart({})}
                className="med-card__details-btn"
              >
                Clear Cart
              </button>
              <ButtonLink href="/orders" variant="primary">
                Proceed to Delivery
              </ButtonLink>
            </div>
          </aside>
        )}

        {/* Reusable Search & Filter Bar */}
        <section aria-label="Filter medicines" className="catalog-filters">
          <div className="catalog-filters__search">
            <SearchBar
              id="medicine-search"
              label="Search medicines"
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by medicine name, generic name, or strength..."
            />
          </div>

          <div className="catalog-filters__select">
            <label htmlFor="medicine-category" className="sr-only">
              Category
            </label>
            <select
              id="medicine-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="catalog-select"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <label className="catalog-checkbox">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
            />
            <span>In stock only</span>
          </label>
        </section>

        {/* Catalog Grid */}
        {filteredMedicines.length === 0 ? (
          <div className="catalog-empty">
            <h2>No matching medicines found</h2>
            <p>
              Try clearing your search term or switching to All Categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setAvailableOnly(false);
              }}
              className="catalog-reset-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredMedicines.map((medicine) => {
              const qtyInCart = cart[medicine.id] ?? 0;

              return (
                <article
                  key={medicine.id}
                  className={`med-card ${
                    medicine.available
                      ? "med-card--available"
                      : "med-card--unavailable"
                  }`}
                >
                  <div className="med-card__body">
                    <div className="med-card__badges">
                      <span
                        className={`med-badge ${
                          medicine.available
                            ? "med-badge--in-stock"
                            : "med-badge--out-of-stock"
                        }`}
                      >
                        {medicine.available
                          ? `Available (${medicine.stockCount} in stock)`
                          : "Unavailable / Out of Stock"}
                      </span>

                      <span
                        className={`med-badge ${
                          medicine.rxRequired
                            ? "med-badge--rx"
                            : "med-badge--otc"
                        }`}
                      >
                        {medicine.rxRequired
                          ? "Rx Required"
                          : "Over the Counter"}
                      </span>
                    </div>

                    <h2 className="med-card__name">{medicine.name}</h2>
                    <p className="med-card__strength">
                      {medicine.strength} · {medicine.form}
                    </p>
                    <p className="med-card__desc">{medicine.description}</p>
                  </div>

                  <div className="med-card__footer">
                    <span className="med-card__price">
                      ${medicine.price.toFixed(2)}
                    </span>

                    <div className="med-card__actions">
                      <button
                        type="button"
                        onClick={() => setSelectedMedicine(medicine)}
                        className="med-card__details-btn"
                      >
                        Details
                      </button>

                      {medicine.available &&
                        (qtyInCart > 0 ? (
                          <div className="qty-controls">
                            <button
                              type="button"
                              onClick={() => removeFromCart(medicine.id)}
                              aria-label={`Remove one ${medicine.name}`}
                              className="qty-btn"
                            >
                              −
                            </button>
                            <span className="qty-value">{qtyInCart}</span>
                            <button
                              type="button"
                              onClick={() => addToCart(medicine.id)}
                              aria-label={`Add one more ${medicine.name}`}
                              className="qty-btn"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addToCart(medicine.id)}
                            className="med-card__add-btn"
                          >
                            Add to Cart
                          </button>
                        ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Medicine Detail Modal */}
        {selectedMedicine && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="medicine-modal-title"
            className="med-modal-backdrop"
            onClick={() => setSelectedMedicine(null)}
          >
            <div className="med-modal" onClick={(e) => e.stopPropagation()}>
              <div className="med-modal__header">
                <div>
                  <p className="med-modal__category">
                    {selectedMedicine.category}
                  </p>
                  <h3 id="medicine-modal-title" className="med-modal__title">
                    {selectedMedicine.name}
                  </h3>
                  <p className="med-modal__generic">
                    Generic: {selectedMedicine.genericName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedMedicine(null)}
                  aria-label="Close details"
                  className="med-modal__close"
                >
                  ✕
                </button>
              </div>

              <dl className="med-modal__specs">
                <div>
                  <dt>Strength</dt>
                  <dd>{selectedMedicine.strength}</dd>
                </div>
                <div>
                  <dt>Form</dt>
                  <dd>{selectedMedicine.form}</dd>
                </div>
                <div>
                  <dt>Availability</dt>
                  <dd
                    className={
                      selectedMedicine.available
                        ? "text-available"
                        : "text-unavailable"
                    }
                  >
                    {selectedMedicine.available
                      ? `In Stock (${selectedMedicine.stockCount} units)`
                      : "Currently Unavailable"}
                  </dd>
                </div>
                <div>
                  <dt>Prescription</dt>
                  <dd>
                    {selectedMedicine.rxRequired
                      ? "Prescription Required"
                      : "No Prescription Required"}
                  </dd>
                </div>
                <div className="med-modal__full-row">
                  <dt>Dispensing Hospital</dt>
                  <dd>
                    {hospitalMap.get(selectedMedicine.hospitalId) ??
                      selectedMedicine.hospitalId}
                  </dd>
                </div>
              </dl>

              <p className="med-modal__desc">{selectedMedicine.description}</p>

              <div className="med-modal__actions">
                <button
                  type="button"
                  onClick={() => setSelectedMedicine(null)}
                  className="med-card__details-btn"
                >
                  Close
                </button>

                {selectedMedicine.available && (
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedMedicine.id);
                      setSelectedMedicine(null);
                    }}
                    className="med-card__add-btn"
                  >
                    Add to Delivery Cart
                  </button>
                )}
              </div>
            </div>
          </div>
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

        .catalog-page {
          width: min(1120px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(1.75rem, 4vw, 3rem);
        }

        .catalog-header {
          margin-bottom: 1.5rem;
        }

        .catalog-eyebrow {
          margin: 0 0 0.4rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .catalog-title {
          margin: 0;
          font-size: clamp(1.75rem, 3.5vw, 2.35rem);
          line-height: 1.2;
        }

        .catalog-subtitle {
          max-width: 660px;
          margin: 0.65rem 0 0;
          color: var(--color-muted);
          font-size: 1rem;
          line-height: 1.65;
        }

        .cart-banner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.95rem 1.25rem;
          margin-bottom: 1.25rem;
          background: var(--color-primary-soft);
          border: 1px solid var(--color-primary);
          border-radius: 14px;
          color: #0f172a;
          font-size: 0.94rem;
        }

        .cart-banner__actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.65rem;
        }

        .catalog-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
          background: #ffffff;
          border: 1px solid #dce5df;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .catalog-filters__search {
          flex: 1 1 260px;
        }

        .catalog-filters__select {
          flex: 0 1 210px;
        }

        .catalog-input,
        .catalog-select {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.92rem;
          font-family: inherit;
        }

        .catalog-input:focus,
        .catalog-select:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 1px;
          border-color: var(--color-primary);
        }

        .catalog-checkbox {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
          cursor: pointer;
          user-select: none;
        }

        .catalog-checkbox input {
          width: 16px;
          height: 16px;
          accent-color: var(--color-primary);
        }

        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
          gap: 1.25rem;
        }

        .med-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.35rem;
          border-radius: 16px;
          border: 1px solid #dce5df;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .med-card--available:hover {
          border-color: var(--color-primary);
          box-shadow: 0 6px 18px rgba(31, 111, 67, 0.09);
        }

        .med-card--unavailable {
          background: #f4f6f5;
          border-color: #e2e8f0;
          opacity: 0.78;
        }

        .med-card__badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          margin-bottom: 0.85rem;
        }

        .med-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.22rem 0.65rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .med-badge--in-stock {
          background: var(--color-primary-soft);
          color: var(--color-primary);
        }

        .med-badge--out-of-stock {
          background: #fee2e2;
          color: #991b1b;
        }

        .med-badge--rx {
          background: #fef3c7;
          color: #92400e;
        }

        .med-badge--otc {
          background: #e2e8f0;
          color: #334155;
        }

        .med-card__name {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
        }

        .med-card__strength {
          margin: 0.25rem 0 0;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .med-card__desc {
          margin: 0.65rem 0 0;
          font-size: 0.9rem;
          line-height: 1.55;
          color: var(--color-muted);
        }

        .med-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.65rem;
          margin-top: 1.25rem;
          padding-top: 0.9rem;
          border-top: 1px solid #eef2ef;
        }

        .med-card__price {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
        }

        .med-card__actions {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .med-card__details-btn {
          padding: 0.45rem 0.8rem;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.82rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: border-color 0.15s ease, color 0.15s ease;
        }

        .med-card__details-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        .med-card__add-btn {
          padding: 0.48rem 0.85rem;
          border: none;
          border-radius: 10px;
          background: var(--color-primary);
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .med-card__add-btn:hover {
          background: var(--color-primary-hover);
        }

        .qty-controls {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.2rem 0.4rem;
          border: 1px solid var(--color-primary);
          border-radius: 10px;
          background: var(--color-primary-soft);
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          border: none;
          border-radius: 6px;
          background: var(--color-primary);
          color: #ffffff;
          font-weight: 700;
          cursor: pointer;
        }

        .qty-value {
          min-width: 18px;
          text-align: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--color-primary);
        }

        .catalog-empty {
          padding: 2.5rem 1.5rem;
          text-align: center;
          background: #f8faf9;
          border: 1px dashed #cbd5e1;
          border-radius: 16px;
        }

        .catalog-empty h2 {
          margin: 0;
          font-size: 1.15rem;
        }

        .catalog-empty p {
          margin: 0.45rem 0 1rem;
          color: var(--color-muted);
          font-size: 0.92rem;
        }

        .catalog-reset-btn {
          padding: 0.6rem 1.15rem;
          border: none;
          border-radius: 10px;
          background: var(--color-primary);
          color: #ffffff;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
        }

        .med-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(15, 23, 42, 0.52);
        }

        .med-modal {
          width: min(520px, 100%);
          padding: 1.5rem;
          border-radius: 18px;
          background: #ffffff;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.22);
        }

        .med-modal__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .med-modal__category {
          margin: 0;
          color: var(--color-primary);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .med-modal__title {
          margin: 0.2rem 0 0;
          font-size: 1.45rem;
        }

        .med-modal__generic {
          margin: 0.2rem 0 0;
          font-size: 0.88rem;
          color: var(--color-muted);
        }

        .med-modal__close {
          padding: 0.35rem 0.6rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
        }

        .med-modal__specs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
          margin: 1.15rem 0 0;
          padding: 1rem;
          border-radius: 12px;
          background: #f4f7f5;
        }

        .med-modal__specs dt {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-muted);
        }

        .med-modal__specs dd {
          margin: 0.2rem 0 0;
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
        }

        .med-modal__full-row {
          grid-column: span 2;
        }

        .text-available {
          color: var(--color-primary) !important;
        }

        .text-unavailable {
          color: #991b1b !important;
        }

        .med-modal__desc {
          margin: 1rem 0 0;
          font-size: 0.93rem;
          line-height: 1.6;
          color: var(--color-muted);
        }

        .med-modal__actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.35rem;
        }
      `}</style>
    </>
  );
}
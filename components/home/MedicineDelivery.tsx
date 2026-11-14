import { ButtonLink } from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

function DeliveryIllustration() {
  return (
    <svg
      className="medicine-delivery__illustration"
      viewBox="0 0 320 220"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        className="medicine-delivery__illustration-background"
        x="20"
        y="24"
        width="280"
        height="172"
        rx="30"
      />

      <path
        className="medicine-delivery__illustration-road"
        d="M44 170h232"
      />

      <g className="medicine-delivery__truck">
        <path d="M70 91h105v66H70z" />
        <path d="M175 111h49l30 29v17h-79z" />
        <path d="M224 112v27h29" />
        <circle cx="112" cy="163" r="15" />
        <circle cx="221" cy="163" r="15" />
        <path d="M86 118h45M108.5 95v46" />
      </g>

      <g className="medicine-delivery__package">
        <rect x="198" y="52" width="54" height="46" rx="7" />
        <path d="M198 66h54M225 52v46" />
        <path d="M216 79h18M225 70v18" />
      </g>

      <circle
        className="medicine-delivery__illustration-accent"
        cx="64"
        cy="60"
        r="12"
      />
      <circle
        className="medicine-delivery__illustration-accent"
        cx="276"
        cy="112"
        r="7"
      />
    </svg>
  );
}

export default function MedicineDelivery() {
  return (
    <>
      <section
        className="medicine-delivery"
        aria-labelledby="medicine-delivery-title"
      >
        <div className="medicine-delivery__content">
          <SectionHeading
            className="medicine-delivery__heading"
            eyebrow="Future service"
            title="Medicine Delivery"
            description="A dedicated portal for medicine delivery requests is being prepared to make future order access clear and convenient."
            id="medicine-delivery-title"
          />

          <p className="medicine-delivery__note">
            Online ordering and delivery tracking are coming soon.
          </p>

          <div className="medicine-delivery__action">
            <ButtonLink href="/orders" variant="primary">
              Request Delivery
            </ButtonLink>
          </div>
        </div>

        <div className="medicine-delivery__visual">
          <DeliveryIllustration />
        </div>
      </section>

      <style>{`
        .medicine-delivery {
          position: relative;
          padding: clamp(1.5rem, 5vw, 3rem);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 0.7fr);
          align-items: center;
          gap: clamp(1.5rem, 5vw, 4rem);
          overflow: hidden;
          background:
            linear-gradient(
              135deg,
              var(--color-surface) 0%,
              var(--color-primary-soft) 100%
            );
          animation: medicine-delivery-enter 560ms
            cubic-bezier(0.2, 0.75, 0.25, 1) 160ms both;
        }

        .medicine-delivery__content {
          position: relative;
          z-index: 1;
          min-width: 0;
        }

        .medicine-delivery__heading {
          max-width: 680px;
        }

        .medicine-delivery__note {
          margin: 1rem 0 0;
          color: var(--color-muted);
          font-size: 0.88rem;
          font-weight: 600;
          line-height: 1.6;
        }

        .medicine-delivery__action {
          margin-top: 1.25rem;
        }

        .medicine-delivery__visual {
          min-width: 0;
          display: grid;
          place-items: center;
        }

        .medicine-delivery__illustration {
          width: min(100%, 360px);
          height: auto;
          display: block;
          overflow: visible;
        }

        .medicine-delivery__illustration-background {
          fill: var(--color-surface);
          stroke: var(--color-border);
          stroke-width: 2;
        }

        .medicine-delivery__illustration-road {
          fill: none;
          stroke: var(--color-border);
          stroke-linecap: round;
          stroke-width: 5;
        }

        .medicine-delivery__truck {
          fill: var(--color-surface);
          stroke: var(--color-primary);
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 5;
        }

        .medicine-delivery__package {
          fill: var(--color-primary-soft);
          stroke: var(--color-primary);
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 4;
        }

        .medicine-delivery__illustration-accent {
          fill: var(--color-primary);
          opacity: 0.18;
        }

        @keyframes medicine-delivery-enter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 760px) {
          .medicine-delivery {
            grid-template-columns: minmax(0, 1fr);
          }

          .medicine-delivery__visual {
            grid-row: 1;
          }

          .medicine-delivery__content {
            grid-row: 2;
          }

          .medicine-delivery__illustration {
            width: min(100%, 320px);
          }
        }

        @media (max-width: 600px) {
          .medicine-delivery {
            padding: 1.25rem;
          }

          .medicine-delivery__action,
          .medicine-delivery__action .ui-button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .medicine-delivery {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
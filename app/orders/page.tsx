import Link from "next/link";

import { ButtonLink, ButtonStyles } from "../../components/ui/Button";

export default function OrdersPage() {
  return (
    <>
      <div className="orders-page">
        <section
          className="orders-page__content"
          aria-labelledby="orders-page-title"
        >
          <div className="orders-page__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M3 6h11v11H3z" />
              <path d="M14 10h4l3 3v4h-7z" />
              <path d="M17 10v3h4" />
              <circle cx="7" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
            </svg>
          </div>

          <p className="orders-page__eyebrow">Future service</p>

          <h1 id="orders-page-title">Medicine Delivery Orders</h1>

          <p className="orders-page__description">
            The medicine delivery portal is being prepared. Online delivery
            requests and order tracking are not available yet.
          </p>

          <p className="orders-page__supporting-text">
            No patient, prescription, address, payment, or delivery information
            is collected on this page.
          </p>

          <div className="orders-page__actions">
            <ButtonLink href="/" variant="primary">
              Return to Home
            </ButtonLink>

            <Link className="orders-page__text-link" href="/hospitals">
              Explore hospitals
            </Link>
          </div>
        </section>
      </div>

      <ButtonStyles />

      <style>{`
        .orders-page {
          width: min(760px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(2rem, 8vw, 5rem);
        }

        .orders-page__content {
          padding: clamp(1.5rem, 6vw, 3.5rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .orders-page__icon {
          width: 72px;
          height: 72px;
          margin-bottom: 1.25rem;
          display: grid;
          place-items: center;
          background: var(--color-primary-soft);
          color: var(--color-primary);
          border-radius: 20px;
        }

        .orders-page__icon svg {
          width: 38px;
          height: 38px;
          display: block;
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.8;
        }

        .orders-page__eyebrow {
          margin: 0 0 0.65rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .orders-page h1 {
          margin: 0;
        }

        .orders-page__description {
          max-width: 620px;
          margin: 1rem 0 0;
          color: var(--color-muted);
          font-size: 1.05rem;
          line-height: 1.75;
        }

        .orders-page__supporting-text {
          max-width: 580px;
          margin: 0.75rem 0 0;
          color: var(--color-muted);
          font-size: 0.88rem;
          line-height: 1.65;
        }

        .orders-page__actions {
          margin-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .orders-page__text-link {
          color: var(--color-primary);
          border-radius: 4px;
          font-weight: 700;
          text-underline-offset: 4px;
        }

        .orders-page__text-link:hover {
          color: var(--color-primary-hover);
        }

        .orders-page__text-link:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 3px;
        }

        @media (max-width: 600px) {
          .orders-page {
            width: calc(100% - 1.25rem);
            padding-block: 1rem 2rem;
          }

          .orders-page__content {
            padding: 1.25rem;
          }

          .orders-page__actions,
          .orders-page__actions .ui-button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
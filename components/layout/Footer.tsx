import Link from "next/link";
import { cacheLife } from "next/cache";

async function getCurrentYear(): Promise<number> {
  "use cache";

  cacheLife("days");

  return new Date().getFullYear();
}

export default async function Footer() {
  const currentYear = await getCurrentYear();

  return (
    <footer className="hospital-footer">
      <div className="hospital-footer__container">
        <div className="hospital-footer__content">
          <div className="hospital-footer__brand">
            <Link
              href="/"
              className="hospital-footer__brand-link"
              aria-label="Team 07 Hospital home"
            >
              <span className="hospital-footer__logo" aria-hidden="true">
                <svg
                  viewBox="0 0 48 48"
                  width="26"
                  height="26"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="19" y="7" width="10" height="34" rx="2" />
                  <rect x="7" y="19" width="34" height="10" rx="2" />
                </svg>
              </span>

              <span className="hospital-footer__brand-text">
                <strong>Team 07 Hospital</strong>
                <small>Patient Services Portal</small>
              </span>
            </Link>

            <p>
              Helping patients explore hospital locations, find healthcare
              professionals, and access appointment services.
            </p>
          </div>

          <div className="hospital-footer__section">
            <h2>Quick Links</h2>

            <nav
              className="hospital-footer__navigation"
              aria-label="Footer navigation"
            >
              <Link href="/">Home</Link>
              <Link href="/specialists">Specialists</Link>
              <Link href="/appointments">Appointments</Link>
              <Link href="/medicines">Medicines</Link>
            </nav>
          </div>

          <div className="hospital-footer__section">
            <h2>Contact</h2>

            <address className="hospital-footer__address">
              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:+50200000000">+502 0000-0000</a>
              </p>

              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@team07hospital.com">
                  contact@team07hospital.com
                </a>
              </p>

              <p>
                <strong>Hours:</strong>
                <span>Monday – Friday</span>
                <span>8:00 AM – 5:00 PM</span>
              </p>
            </address>
          </div>

          <div className="hospital-footer__section hospital-footer__appointments">
            <h2>Appointments</h2>

            <p>
              Visit the appointments section for information about patient
              appointment services.
            </p>

            <Link href="/appointments" className="hospital-footer__button">
              View appointments
            </Link>

            <aside
              className="hospital-footer__emergency"
              aria-labelledby="hospital-footer-emergency-title"
            >
              <h3 id="hospital-footer-emergency-title">Medical Emergency</h3>

              <p>
                If you are experiencing a medical emergency, contact your local
                emergency services immediately.
              </p>
            </aside>
          </div>
        </div>

        <div className="hospital-footer__bottom">
          <p>© {currentYear} Team 07 Hospital. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .hospital-footer {
          width: 100%;
          margin-top: auto;
          background: var(--color-surface);
          color: var(--color-text);
          border-top: 1px solid var(--color-border);
          box-shadow: var(--shadow-section);
        }

        .hospital-footer__container {
          width: min(1180px, calc(100% - 2rem));
          margin-inline: auto;
        }

        .hospital-footer__content {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) repeat(
              3,
              minmax(0, 1fr)
            );
          gap: clamp(1.5rem, 4vw, 3rem);
          padding-block: clamp(2rem, 5vw, 3.5rem);
        }

        .hospital-footer__brand,
        .hospital-footer__section {
          min-width: 0;
        }

        .hospital-footer__brand-link {
          width: fit-content;
          max-width: 100%;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-text);
          border-radius: 12px;
          text-decoration: none;
        }

        .hospital-footer__brand-link:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 4px;
        }

        .hospital-footer__logo {
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: var(--color-primary);
          border-radius: 12px;
        }

        .hospital-footer__logo svg {
          width: 26px;
          height: 26px;
          display: block;
          fill: #ffffff;
        }

        .hospital-footer__brand-text {
          min-width: 0;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .hospital-footer__brand-text strong {
          color: var(--color-text);
          font-size: 1.05rem;
        }

        .hospital-footer__brand-text small {
          margin-top: 0.2rem;
          color: var(--color-muted);
          font-size: 0.76rem;
          font-weight: 500;
        }

        .hospital-footer__brand > p,
        .hospital-footer__section > p {
          margin: 1rem 0 0;
          color: var(--color-muted);
          font-size: 0.9rem;
          line-height: 1.7;
        }

        .hospital-footer__section h2 {
          margin: 0 0 1rem;
          color: var(--color-text);
          font-size: 1rem;
          line-height: 1.3;
        }

        .hospital-footer__navigation {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .hospital-footer__navigation a,
        .hospital-footer__address a {
          max-width: 100%;
          color: var(--color-muted);
          border-radius: 4px;
          font-weight: 600;
          text-decoration: none;
          overflow-wrap: anywhere;
          transition: color 160ms ease;
        }

        .hospital-footer__navigation a:hover,
        .hospital-footer__address a:hover {
          color: var(--color-primary-hover);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .hospital-footer__navigation a:focus-visible,
        .hospital-footer__address a:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 3px;
        }

        .hospital-footer__address {
          min-width: 0;
          margin: 0;
          color: var(--color-muted);
          font-size: 0.9rem;
          font-style: normal;
          line-height: 1.65;
        }

        .hospital-footer__address p {
          min-width: 0;
          margin: 0 0 0.85rem;
          overflow-wrap: anywhere;
        }

        .hospital-footer__address p:last-child {
          margin-bottom: 0;
        }

        .hospital-footer__address strong {
          color: var(--color-text);
        }

        .hospital-footer__address span {
          display: block;
        }

        .hospital-footer__button {
          width: fit-content;
          max-width: 100%;
          min-height: 44px;
          margin-top: 1rem;
          padding: 0.65rem 1rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--color-primary);
          color: #ffffff;
          border: 1px solid transparent;
          border-radius: var(--radius-control);
          font-weight: 600;
          line-height: 1.4;
          text-align: center;
          text-decoration: none;
          transition:
            background-color 160ms ease,
            border-color 160ms ease;
        }

        .hospital-footer__button:hover {
          background: var(--color-primary-hover);
          color: #ffffff;
        }

        .hospital-footer__button:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 3px;
        }

        .hospital-footer__emergency {
          margin-top: 1.25rem;
          padding: 1rem;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          border-left: 4px solid var(--color-danger);
          border-radius: var(--radius-control);
        }

        .hospital-footer__emergency h3 {
          margin: 0 0 0.5rem;
          color: var(--color-danger);
          font-size: 0.95rem;
          line-height: 1.3;
        }

        .hospital-footer__emergency p {
          margin: 0;
          color: var(--color-muted);
          font-size: 0.85rem;
          line-height: 1.6;
        }

        .hospital-footer__bottom {
          min-width: 0;
          padding-block: 1.25rem;
          border-top: 1px solid var(--color-border);
          text-align: center;
        }

        .hospital-footer__bottom p {
          min-width: 0;
          margin: 0;
          color: var(--color-muted);
          font-size: 0.82rem;
          overflow-wrap: anywhere;
        }

        @media (max-width: 900px) {
          .hospital-footer__content {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .hospital-footer__container {
            width: calc(100% - 1.25rem);
          }

          .hospital-footer__content {
            grid-template-columns: minmax(0, 1fr);
            gap: 2rem;
            padding-block: 2rem;
          }

          .hospital-footer__logo {
            width: 42px;
            height: 42px;
            flex-basis: 42px;
          }

          .hospital-footer__logo svg {
            width: 24px;
            height: 24px;
          }

          .hospital-footer__button {
            width: 100%;
          }

          .hospital-footer__bottom {
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hospital-footer__navigation a,
          .hospital-footer__address a,
          .hospital-footer__button {
            transition: none;
          }
        }
      `}</style>
    </footer>
  );
}
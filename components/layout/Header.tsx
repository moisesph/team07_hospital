import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <>
      <header className="hospital-header">
        <div className="hospital-header__container">
          <Link
            href="/"
            className="hospital-header__brand"
            aria-label="Team 07 Hospital home"
          >
            <span className="hospital-header__logo" aria-hidden="true">
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

            <span className="hospital-header__brand-text">
              <strong>Team 07 Hospital</strong>
              <small>Patient Services Portal</small>
            </span>
          </Link>

          <Navigation />
        </div>
      </header>

      <style>{`
        .hospital-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          box-shadow: var(--shadow-section);
        }

        .hospital-header__container {
          width: min(1180px, calc(100% - 2rem));
          min-height: 76px;
          margin-inline: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .hospital-header__brand {
          min-width: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-text);
          text-decoration: none;
          border-radius: 12px;
        }

        .hospital-header__brand:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 4px;
        }

        .hospital-header__logo {
          width: 46px;
          height: 46px;
          flex: 0 0 46px;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: var(--color-primary);
          border-radius: 12px;
        }

        .hospital-header__logo svg {
          width: 26px;
          height: 26px;
          display: block;
          fill: #ffffff;
        }

        .hospital-header__brand-text {
          min-width: 0;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
        }

        .hospital-header__brand-text strong {
          color: var(--color-text);
          font-size: 1.05rem;
          white-space: nowrap;
        }

        .hospital-header__brand-text small {
          margin-top: 0.2rem;
          color: var(--color-muted);
          font-size: 0.76rem;
          font-weight: 500;
          white-space: nowrap;
        }

        @media (max-width: 1100px) {
          .hospital-header__container {
            padding-block: 0.75rem;
            flex-wrap: wrap;
            gap: 0.75rem 1rem;
          }
        }

        @media (max-width: 600px) {
          .hospital-header__container {
            width: calc(100% - 1.25rem);
            min-height: 68px;
          }

          .hospital-header__logo {
            width: 42px;
            height: 42px;
            flex-basis: 42px;
          }

          .hospital-header__logo svg {
            width: 24px;
            height: 24px;
          }

          .hospital-header__brand-text strong {
            font-size: 0.9rem;
          }

          .hospital-header__brand-text small {
            display: none;
          }
        }

        @media (max-width: 380px) {
          .hospital-header__brand-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
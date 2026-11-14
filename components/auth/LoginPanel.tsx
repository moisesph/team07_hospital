import { ButtonLink } from "../ui/Button";

export default function LoginPanel() {
  return (
    <>
      <section className="login-panel" aria-labelledby="login-panel-title">
        <p className="login-panel__eyebrow">Patient Services Portal</p>
        <h1 className="login-panel__title" id="login-panel-title">
          Sign in to your patient portal
        </h1>
        <p className="login-panel__description">
          This page is reserved for sign-in to future patient-specific portal
          services.
        </p>

        {/* TODO: Connect the authentication flow selected by the authentication teammate here. */}
        <section
          className="login-panel__integration"
          aria-labelledby="login-integration-title"
        >
          <h2 id="login-integration-title">Authentication integration</h2>
          <p>
            The sign-in flow has not been selected or connected yet. This
            integration area is reserved for the authentication teammate.
          </p>
        </section>

        <p className="login-panel__status" role="status">
          Sign-in is not available yet. No account or authentication service is
          connected.
        </p>

        <div className="login-panel__action">
          <ButtonLink href="/" variant="primary">
            Return to Home
          </ButtonLink>
        </div>
      </section>

      <style>{`
        .login-panel {
          min-width: 0;
          padding: clamp(1.5rem, 6vw, 3.5rem);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-section);
          box-shadow: var(--shadow-section);
        }

        .login-panel__eyebrow {
          margin: 0 0 0.65rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .login-panel__title {
          margin: 0;
          line-height: 1.2;
        }

        .login-panel__description {
          max-width: 600px;
          margin: 1rem 0 0;
          color: var(--color-muted);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .login-panel__integration {
          margin-top: 1.5rem;
          padding: 1.25rem;
          background: var(--color-background);
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-control);
        }

        .login-panel__integration h2 {
          margin: 0;
          font-size: 1rem;
        }

        .login-panel__integration p {
          margin: 0.55rem 0 0;
          color: var(--color-muted);
          line-height: 1.65;
        }

        .login-panel__status {
          margin: 1.25rem 0 0;
          color: var(--color-muted);
          font-weight: 600;
          line-height: 1.65;
        }

        .login-panel__action {
          margin-top: 1.5rem;
        }

        @media (max-width: 600px) {
          .login-panel {
            padding: 1.25rem;
          }

          .login-panel__action,
          .login-panel__action .ui-button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

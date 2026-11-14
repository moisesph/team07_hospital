import LoginPanel from "../../components/auth/LoginPanel";
import { ButtonStyles } from "../../components/ui/Button";

export default function LoginPage() {
  return (
    <>
      <div className="login-page">
        <LoginPanel />
      </div>

      <ButtonStyles />

      <style>{`
        .login-page {
          width: min(760px, calc(100% - 2rem));
          margin-inline: auto;
          padding-block: clamp(2rem, 8vw, 5rem);
        }

        @media (max-width: 600px) {
          .login-page {
            width: calc(100% - 1.25rem);
            padding-block: 1.25rem 2rem;
          }
        }
      `}</style>
    </>
  );
}

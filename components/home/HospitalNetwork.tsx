import { ButtonLink } from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function HospitalNetwork() {
  return (
    <>
      <section
        className="home-page__network"
        aria-labelledby="hospital-network-title"
      >
        <SectionHeading
          className="home-page__network-content"
          eyebrow="Hospital network"
          title="Find the right destination for your needs."
          description="Team 07 Hospital connects multiple hospital locations through one central portal. Explore the network, open the patient records section, or review the appointments section."
          id="hospital-network-title"
        />

        <div className="home-page__network-action">
          <ButtonLink href="/hospitals" variant="primary">
            Explore the network
          </ButtonLink>
        </div>
      </section>

      <style>{`
        .home-page__network {
          padding: clamp(1.25rem, 4vw, 2rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          animation: home-network-enter 560ms
            cubic-bezier(0.2, 0.75, 0.25, 1) 180ms both;
        }

        .home-page__network-content {
          min-width: 0;
          max-width: 760px;
        }

        .home-page__network-action {
          flex: 0 0 auto;
        }

        @keyframes home-network-enter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 960px) {
          .home-page__network {
            align-items: flex-start;
            flex-direction: column;
          }

          .home-page__network-action {
            align-self: flex-start;
          }
        }

        @media (max-width: 600px) {
          .home-page__network {
            gap: 1.25rem;
          }

          .home-page__network-action,
          .home-page__network-action .ui-button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-page__network {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
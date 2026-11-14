import Image from "next/image";

import { ButtonLink } from "../ui/Button";

export default function HomeHero() {
  return (
    <>
      <section
        className="home-page__hero"
        aria-labelledby="home-page-title"
      >
        <div className="home-page__hero-content">
          <p className="home-page__hero-eyebrow">
            Team 07 Hospital Network
          </p>

          <h1 id="home-page-title" className="home-page__hero-title">
            Connected care across our hospital network.
          </h1>

          <p className="home-page__hero-description">
            Explore our hospitals and access patient records and appointments
            from one central portal.
          </p>

          <div className="home-page__hero-actions">
            <ButtonLink href="/hospitals" variant="primary">
              Explore hospitals
            </ButtonLink>

            <ButtonLink href="/patients" variant="secondary">
              View patients
            </ButtonLink>

            <ButtonLink href="/appointments" variant="secondary">
              View appointments
            </ButtonLink>
          </div>
        </div>

        <div className="home-page__hero-image-entrance">
          <div className="home-page__hero-image-frame">
            <Image
              className="home-page__hero-image"
              src="/images/hero-image.jpg"
              alt="Hospital staff standing together in a bright clinical setting"
              fill
              priority
              sizes="(max-width: 760px) calc(100vw - 1.25rem), (max-width: 1200px) 45vw, 540px"
            />
          </div>
        </div>
      </section>

      <style>{`
        .home-page__hero {
          padding: 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.95fr);
          overflow: hidden;
        }

        .home-page__hero-content {
          min-width: 0;
          padding: clamp(1.5rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          animation: home-hero-content-enter 560ms
            cubic-bezier(0.2, 0.75, 0.25, 1) both;
        }

        .home-page__hero-eyebrow {
          margin: 0 0 0.65rem;
          color: var(--color-primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .home-page__hero-title {
          max-width: 660px;
          margin: 0;
        }

        .home-page__hero-description {
          max-width: 620px;
          margin: 1rem 0 0;
          color: var(--color-muted);
          font-size: clamp(1rem, 2vw, 1.1rem);
          line-height: 1.75;
        }

        .home-page__hero-actions {
          margin-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .home-page__hero-image-entrance {
          min-width: 0;
          min-height: 430px;
          animation: home-hero-image-enter 680ms
            cubic-bezier(0.2, 0.75, 0.25, 1) 80ms both;
        }

        .home-page__hero-image-frame {
          position: relative;
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 430px;
          overflow: hidden;
          background: var(--color-primary-soft);
        }

        .home-page__hero-image {
          object-fit: cover;
          object-position: center;
          transition: transform 700ms
            cubic-bezier(0.2, 0.75, 0.25, 1);
        }

        .home-page__hero:hover .home-page__hero-image {
          transform: scale(1.015);
        }

        @keyframes home-hero-content-enter {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes home-hero-image-enter {
          from {
            opacity: 0;
            transform: scale(1.025);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 960px) {
          .home-page__hero {
            grid-template-columns: minmax(0, 1fr) minmax(300px, 0.85fr);
          }

          .home-page__hero-image-entrance,
          .home-page__hero-image-frame {
            min-height: 390px;
          }
        }

        @media (max-width: 760px) {
          .home-page__hero {
            grid-template-columns: minmax(0, 1fr);
          }

          .home-page__hero-image-entrance {
            min-height: auto;
            aspect-ratio: 16 / 10;
            grid-row: 1;
          }

          .home-page__hero-image-frame {
            min-height: 100%;
          }

          .home-page__hero-content {
            grid-row: 2;
          }
        }

        @media (max-width: 600px) {
          .home-page__hero-content {
            padding: 1.25rem;
          }

          .home-page__hero-actions {
            width: 100%;
            flex-direction: column;
          }

          .home-page__hero-actions .ui-button {
            width: 100%;
          }

          .home-page__hero-image-entrance {
            aspect-ratio: 4 / 3;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-page__hero-content,
          .home-page__hero-image-entrance {
            animation: none;
          }

          .home-page__hero-image {
            transition: none;
          }

          .home-page__hero:hover .home-page__hero-image {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
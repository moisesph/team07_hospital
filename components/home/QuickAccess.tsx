import NavigationCard from "../ui/NavigationCard";
import SectionHeading from "../ui/SectionHeading";

const quickAccessItems = [
  {
    title: "Hospitals",
    description: "Explore the locations in our hospital network.",
    linkLabel: "View hospitals",
    href: "/hospitals",
    icon: "hospital",
  },
  {
    title: "Patients",
    description: "Access the portal's patient records section.",
    linkLabel: "View patients",
    href: "/patients",
    icon: "patients",
  },
  {
    title: "Appointments",
    description: "Access the portal's appointments section.",
    linkLabel: "View appointments",
    href: "/appointments",
    icon: "appointments",
  },
] as const;

type QuickAccessIconName = (typeof quickAccessItems)[number]["icon"];

function QuickAccessIcon({ icon }: { icon: QuickAccessIconName }) {
  if (icon === "hospital") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
        <path d="M16 9h2a2 2 0 0 1 2 2v10" />
        <path d="M8 7h4M10 5v4M8 13h1M12 13h1M8 17h1M12 17h1M3 21h18" />
      </svg>
    );
  }

  if (icon === "patients") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 11a3 3 0 0 1 0 6M18.5 19a4.5 4.5 0 0 0-2.5-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
    </svg>
  );
}

export default function QuickAccess() {
  return (
    <>
      <section
        className="home-page__quick-access"
        aria-labelledby="quick-access-title"
      >
        <SectionHeading
          eyebrow="Quick access"
          title="Explore the portal"
          description="Open the main sections of the patient services portal."
          id="quick-access-title"
        />

        <div className="home-page__card-grid">
          {quickAccessItems.map((item, index) => (
            <div
              className={`home-page__card-entrance home-page__card-entrance--${
                index + 1
              }`}
              key={item.href}
            >
              <NavigationCard
                description={item.description}
                href={item.href}
                icon={<QuickAccessIcon icon={item.icon} />}
                linkLabel={item.linkLabel}
                title={item.title}
              />
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .home-page__quick-access {
          padding: 0;
          background: transparent;
          border: 0;
          border-radius: 0;
          box-shadow: none;
        }

        .home-page__quick-access > .ui-section-heading {
          margin-bottom: 1.5rem;
        }

        .home-page__card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .home-page__card-entrance {
          min-width: 0;
          height: 100%;
          animation: home-quick-access-card-enter 520ms
            cubic-bezier(0.2, 0.75, 0.25, 1) both;
        }

        .home-page__card-entrance > .ui-navigation-card {
          height: 100%;
        }

        .home-page__card-entrance--1 {
          animation-delay: 100ms;
        }

        .home-page__card-entrance--2 {
          animation-delay: 180ms;
        }

        .home-page__card-entrance--3 {
          animation-delay: 260ms;
        }

        @keyframes home-quick-access-card-enter {
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
          .home-page__card-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-page__card-entrance {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
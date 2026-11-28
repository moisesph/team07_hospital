"use client";
// components/layout/Navigation.tsx

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Home",
    href: "/",
    icon: null,
  },
  {
    label: "Hospitals",
    href: "/hospitals",
    icon: null,
  },
  {
    label: "Specialists",
    href: "/specialists",
    icon: null,
  },
  {
    label: "Patient Services",
    href: "/patients",
    icon: null,
  },
  {
    label: "Appointments",
    href: "/appointments",
    icon: null,
  },
  {
    label: "Medicines",
    href: "/medicines",
    icon: null,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: "delivery",
  },
] as const;

const loginItem = {
  label: "Login",
  href: "/login",
  icon: "login",
} as const;

const accountItem = {
  label: "My account",
  href: "/account",
  icon: "account",
} as const;

interface NavigationProps {
  isSignedIn: boolean;
}

interface NavigationLinksProps extends NavigationProps {
  pathname?: string;
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function DeliveryIcon() {
  return (
    <svg
      className="hospital-navigation__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 6h11v11H3z" />
      <path d="M14 10h4l3 3v4h-7z" />
      <path d="M17 10v3h4" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg
      className="hospital-navigation__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 4h6v16h-6" />
      <path d="M3 12h12m-5-5 5 5-5 5" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      className="hospital-navigation__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function NavigationLinks({ pathname, isSignedIn }: NavigationLinksProps) {
  // The last link changes: "Login" for visitors, "My account" after signing in.
  const items = [...navigationItems, isSignedIn ? accountItem : loginItem];

  return (
    <nav className="hospital-navigation" aria-label="Main navigation">
      <ul className="hospital-navigation__list">
        {items.map(({ label, href, icon }) => {
          const isActive =
            pathname !== undefined && isActivePath(pathname, href);

          return (
            <li className="hospital-navigation__item" key={href}>
              <Link
                href={href}
                className="hospital-navigation__link"
                aria-current={isActive ? "page" : undefined}
              >
                {icon === "delivery" ? <DeliveryIcon /> : null}
                {icon === "login" ? <LoginIcon /> : null}
                {icon === "account" ? <AccountIcon /> : null}
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ActiveNavigation({ isSignedIn }: NavigationProps) {
  const pathname = usePathname();

  return <NavigationLinks pathname={pathname} isSignedIn={isSignedIn} />;
}

function NavigationFallback({ isSignedIn }: NavigationProps) {
  return <NavigationLinks isSignedIn={isSignedIn} />;
}

export default function Navigation({ isSignedIn }: NavigationProps) {
  return (
    <>
      <Suspense fallback={<NavigationFallback isSignedIn={isSignedIn} />}>
        <ActiveNavigation isSignedIn={isSignedIn} />
      </Suspense>

      <style>{`
        .hospital-navigation {
          min-width: 0;
          flex-shrink: 0;
        }

        .hospital-navigation__list {
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          list-style: none;
        }

        .hospital-navigation__item {
          min-width: 0;
        }

        .hospital-navigation__link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.38rem;
          min-height: 42px;
          padding: 0.65rem 0.85rem;
          color: var(--color-muted);
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1;
          text-decoration: none;
          white-space: nowrap;
          transition:
            color 160ms ease,
            background-color 160ms ease;
        }

        .hospital-navigation__icon {
          width: 18px;
          height: 18px;
          flex: 0 0 18px;
          display: block;
          fill: none;
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 1.8;
        }

        .hospital-navigation__link:hover {
          color: var(--color-primary-hover);
          background: var(--color-primary-soft);
        }

        .hospital-navigation__link[aria-current="page"] {
          color: var(--color-primary);
          background: var(--color-primary-soft);
        }

        .hospital-navigation__link:focus-visible {
          outline: 3px solid var(--color-primary);
          outline-offset: 2px;
        }

        @media (max-width: 1100px) {
          .hospital-navigation {
            width: 100%;
            flex-basis: 100%;
          }

          .hospital-navigation__list {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .hospital-navigation__link {
            width: 100%;
            padding-inline: 0.5rem;
          }
        }

        @media (max-width: 600px) {
          .hospital-navigation__list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .hospital-navigation__link {
            min-height: 40px;
            font-size: 0.82rem;
          }
        }

        @media (max-width: 380px) {
          .hospital-navigation__link {
            padding-inline: 0.2rem;
            font-size: 0.78rem;
          }

          .hospital-navigation__icon {
            width: 16px;
            height: 16px;
            flex-basis: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hospital-navigation__link {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
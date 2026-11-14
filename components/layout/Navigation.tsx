"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Hospitals",
    href: "/hospitals",
  },
  {
    label: "Patients",
    href: "/patients",
  },
  {
    label: "Appointments",
    href: "/appointments",
  },
] as const;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLinks({ pathname }: { pathname?: string }) {
  return (
    <nav className="hospital-navigation" aria-label="Main navigation">
      <ul className="hospital-navigation__list">
        {navigationItems.map(({ label, href }) => {
          const isActive =
            pathname !== undefined && isActivePath(pathname, href);

          return (
            <li className="hospital-navigation__item" key={href}>
              <Link
                href={href}
                className="hospital-navigation__link"
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ActiveNavigation() {
  const pathname = usePathname();

  return <NavigationLinks pathname={pathname} />;
}

function NavigationFallback() {
  return <NavigationLinks />;
}

export default function Navigation() {
  return (
    <Suspense fallback={<NavigationFallback />}>
      <ActiveNavigation />
    </Suspense>
  );
}
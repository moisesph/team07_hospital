"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Home",
    href: "/",
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

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hospital-navigation" aria-label="Main navigation">
      <ul className="hospital-navigation__list">
        {navigationItems.map(({ label, href }) => {
          const isActive = isActivePath(pathname, href);

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
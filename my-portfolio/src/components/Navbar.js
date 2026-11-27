"use client";

import React, { useState } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";
import { services } from "../data/services";

const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav
      aria-label="Main"
      className="relative z-50 border-b border-line bg-navy font-light"
    >
      <ul className="flex items-center justify-center gap-1 px-2 py-3 sm:gap-2 md:justify-end md:px-10">
        <li className="pr-2 sm:pr-6">
          <Link
            href="/"
            aria-label="Dream InReality home"
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-lg text-ink-inverse"
          >
            <LogoMark className="h-10 w-auto" />
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/">
            Home
          </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setServicesOpen(false);
          }}
        >
          <button
            type="button"
            className="nav-link"
            aria-expanded={servicesOpen}
            aria-controls="services-menu"
            onClick={() => setServicesOpen(!servicesOpen)}
          >
            Services
          </button>
          {servicesOpen && (
            <ul
              id="services-menu"
              className="absolute left-1/2 top-full z-50 min-w-max -translate-x-1/2 rounded-lg border border-line bg-surface py-2 md:left-0 md:translate-x-0"
            >
              {services.map(({ slug, title }) => (
                <li key={slug}>
                  <Link
                    href={slug}
                    className="focus-ring block px-4 py-2.5 text-base text-ink-inverse transition-colors duration-150 hover:bg-navy"
                    onClick={() => setServicesOpen(false)}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <Link className="nav-link" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="nav-link" href="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

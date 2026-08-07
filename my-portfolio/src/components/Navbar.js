"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "../data/services";

const Navbar = () => {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <motion.div
      className="navbar text-black relative z-50"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-row justify-center pr-none lg:justify-end md:justify-end lg:pr-10 md:pr-10">
        <ul className="flex py-4 items-center">
          {/* Logo as part of navigation */}
          <motion.li
            className="pr-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/">
              <Image
                src="/images/dir-logo-01.svg"
                width={40}
                height={40}
                alt="Dream InReality Logo"
              />
            </Link>
          </motion.li>
          <motion.li
            className=""
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link className="button px-10" href="/">
              Home
            </Link>
          </motion.li>
          <li
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <motion.button
              type="button"
              className="button pr-14"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen(!servicesOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Services
            </motion.button>
            {servicesOpen && (
              <ul className="absolute top-full left-0 z-50 min-w-max bg-white rounded-lg shadow-xl py-2">
                {services.map(({ slug, title }) => (
                  <li key={slug}>
                    <Link
                      href={slug}
                      className="block px-4 py-2 hover:bg-cyan-100"
                      onClick={() => setServicesOpen(false)}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <motion.li
            className=""
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link className="button pr-14" href="/about">
              About
            </Link>
          </motion.li>
          <motion.li
            className=""
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link className="button pr-10" href="/contact">
              Contact
            </Link>
          </motion.li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Navbar;

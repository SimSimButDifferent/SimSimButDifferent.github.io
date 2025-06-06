import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      className="navbar text-black"
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

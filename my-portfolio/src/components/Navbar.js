import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar text-black">
      <div className="flex flex-row justify-center pr-none lg:justify-end md:justify-end lg:pr-10 md:pr-10">
        <ul className="flex pt-4">
          <li className="">
            <Link className="button px-10" href="/">
              Home
            </Link>
          </li>
          <li className="">
            <Link className="button pr-14" href="/about">
              About
            </Link>
          </li>
          <li className="">
            <Link className="button pr-10" href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

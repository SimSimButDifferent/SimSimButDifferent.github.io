import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar text-black">
      <div className="flex justify-end">
        <ul className="flex flex-row justify-end">
          <li>
            <Link className="px-10" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="pr-10" href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="pr-10" href="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

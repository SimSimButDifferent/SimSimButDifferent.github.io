import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar text-black">
      <div className="flex justify-end pr-10">
        <ul className="flex flex-row justify-end pt-5">
          <li>
            <Link className="button px-10" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="button pr-10" href="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="button pr-10" href="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;

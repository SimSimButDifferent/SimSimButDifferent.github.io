import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  display: "swap",
});

const Layout = ({ children }) => {
  return (
    <div className={poppins.variable}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;

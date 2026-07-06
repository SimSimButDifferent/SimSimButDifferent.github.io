import "@/styles/globals.css";
import Script from "next/script";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://dreaminreality.co.uk"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-square.svg", type: "image/svg+xml" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/favicon-192.png", sizes: "192x192" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Navbar />
        {children}
        <Footer />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FTY7N2QF09"
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FTY7N2QF09');
          `}
        </Script>
      </body>
    </html>
  );
}

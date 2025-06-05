import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: "100",
});

export default function App({ Component, pageProps }) {
  return (
    <Layout className={`${poppins.variable} font-sans`}>
      <Component {...pageProps} />
    </Layout>
  );
}

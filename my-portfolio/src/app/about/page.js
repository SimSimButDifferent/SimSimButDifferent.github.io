import AboutContent from "@/components/AboutContent";

const description =
  "Dream InReality is Simeon Campbell's 3D CAD consultancy in Kent: SolidWorks modelling, construction drawing packs and photorealistic renders for UK clients.";

export const metadata = {
  title: "About Dream InReality | SolidWorks 3D CAD Consultant, Kent",
  description,
  openGraph: {
    title: "About Dream InReality | SolidWorks 3D CAD Consultant, Kent",
    description,
    url: "/about",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return <AboutContent />;
}

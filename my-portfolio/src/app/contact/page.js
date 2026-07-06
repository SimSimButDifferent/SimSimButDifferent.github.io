import ContactContent from "@/components/ContactContent";

const description =
  "Contact Dream InReality to discuss your product design project: phone, email or visit us in Sellindge, Ashford. 3D CAD modelling for clients across the UK.";

export const metadata = {
  title: "Contact Dream InReality | 3D CAD Design Enquiries, Kent UK",
  description,
  openGraph: {
    title: "Contact Dream InReality | 3D CAD Design Enquiries, Kent UK",
    description,
    url: "/contact",
    siteName: "Dream InReality",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/favicon-512.png", width: 512, height: 512 }],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function Contact() {
  return <ContactContent />;
}

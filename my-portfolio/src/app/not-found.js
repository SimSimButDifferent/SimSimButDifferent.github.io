import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Dream InReality",
  description:
    "That page does not exist. Browse 3D CAD design services from Dream InReality or get in touch about a project.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white py-10">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="phoneheadings lg:text-2xl xl:text-4xl mb-8">
          Page not found
        </h1>
        <p className="textsm lg:text-base pb-8">
          That page does not exist or has moved. The{" "}
          <Link href="/" className="text-accent hover:text-accent-hover">
            home page
          </Link>{" "}
          lists every service, or{" "}
          <Link href="/contact" className="text-accent hover:text-accent-hover">
            get in touch
          </Link>{" "}
          if you were looking for something specific.
        </p>
        <Link
          href="/"
          className="contactText button bg-accent p-4 text-white font-light hover:bg-accent-hover rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

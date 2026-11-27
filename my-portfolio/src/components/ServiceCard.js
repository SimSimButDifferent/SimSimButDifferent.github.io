import Image from "next/image";
import Link from "next/link";

// One homepage service card: a slate panel that links to the service page.
// The whole card is the link; hover changes the border colour only.
export default function ServiceCard({ title, description, href, icon }) {
  return (
    <Link
      href={href}
      className="panel focus-ring flex h-full flex-col gap-3 transition-colors duration-150 hover:border-accent-visual"
    >
      <Image src={icon} alt="" width={40} height={40} className="h-10 w-10" />
      <h3 className="pb-0 text-title-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-inverse">{description}</p>
    </Link>
  );
}

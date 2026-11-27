import Image from "next/image";
import Link from "next/link";

// One homepage service card, styled as a drawing sheet: square corners,
// cyan registration ticks at two corners, a sheet number and stage label in
// mono, and the formats the service hands over as chips.
// The whole card is the link; hover changes the border colour only.
export default function ServiceCard({
  title,
  description,
  href,
  icon,
  number,
  label,
  chips = [],
}) {
  return (
    <Link
      href={href}
      className="focus-ring group relative flex h-full flex-col gap-3 rounded-sm border border-line bg-surface p-6 transition-colors duration-150 hover:border-accent-visual lg:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-accent-visual"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-accent-visual"
      />
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider">
        <span className="text-accent-visual">SVC-{number}</span>
        <span className="text-muted-inverse">{label}</span>
      </div>
      <Image src={icon} alt="" width={40} height={40} className="h-10 w-10" />
      <h3 className="pb-0 text-title-sm font-semibold">{title}</h3>
      <p className="text-sm text-muted-inverse">{description}</p>
      {chips.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-2 border-t border-line pt-4">
          {chips.map((chip) => (
            <li
              key={chip}
              className="rounded-sm border border-cyan-900 px-2 py-0.5 font-mono text-xs text-cyan-300"
            >
              {chip}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}

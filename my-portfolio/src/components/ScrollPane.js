import Image from "next/image";

// One text pane of a ScrollScene. From lg up each pane fills the viewport and
// snaps into place (pass snap={false} for the first pane, which sits under
// the navbar). Below lg there is no pinned canvas, so the pane carries its
// own still frame above the text.
export default function ScrollPane({ step, still, snap = true, children }) {
  return (
    <div
      data-scroll-pane
      className={`flex min-h-[70vh] flex-col justify-center py-16 lg:min-h-screen ${
        snap ? "snap-frame" : ""
      }`}
    >
      <Image
        src={still.src}
        alt={still.alt}
        width={1280}
        height={960}
        className="mb-8 h-auto w-full rounded-lg lg:hidden"
      />
      <p className="eyebrow mb-4">
        <span className="text-accent-visual">{step}</span>
      </p>
      {children}
    </div>
  );
}

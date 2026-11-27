// Impossible-cube line mark, inlined from public/images/dir-logo-01.svg.
// The source draws 8-unit strokes on a 752x888 canvas, which shrink to
// ~0.4px at nav size and blur. non-scaling-stroke keeps every line at a
// fixed pixel width whatever size the mark is drawn, and currentColor
// replaces the old CSS invert.

const POLYS = [
  "12.25,156.65 283.36,9.98 741.14,247.76 470.03,395.54 12.25,156.65",
  "468.92,334.43 631.14,248.87 283.36,69.98 123.36,154.43 468.92,334.43",
  "283.36,237.77 283.36,127.76 177.76,182.76",
  "12.25,156.65 12.25,637.76 472.25,877.76 741.14,732.2",
  "339.96,389.72 339.96,464.95 691.4,642.38 691.4,340.09 525.76,429.59 528.18,559.98",
  "230.56,332.15 230.56,457.53 61.28,544.34 61.28,243.06 412.25,427.76 412.25,501.45",
  "12.25,637.76 283.36,489.98 741.14,732.2 741.14,247.76",
  "470.03,819.06 631.14,732.2 283.36,550.47 123.36,634.21 470.03,819.06",
  "578.55,704.72 524.29,730.23 470.03,755.74 173.84,607.79",
];

const LINES = [
  [230.56, 210.27, 230.56, 155.26],
  [470.03, 395.54, 470.03, 530.62],
  [117.89, 272.86, 117.89, 515.31],
  [283.36, 489.98, 283.36, 359.93],
  [635.76, 370.16, 635.76, 614.29],
  [283.36, 127.76, 574.38, 278.8],
  [339.96, 267.25, 339.96, 157.13],
  [524.29, 676.37, 524.29, 730.23],
  [412.25, 617.82, 412.25, 726.88],
  [470.03, 648.01, 470.03, 755.74],
];

export default function LogoMark({ className = "", strokeWidth = 1 }) {
  return (
    <svg
      viewBox="0 0 752 888"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {POLYS.map((points) => (
        <polyline
          key={points}
          points={points}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {LINES.map(([x1, y1, x2, y2]) => (
        <line
          key={`${x1},${y1}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

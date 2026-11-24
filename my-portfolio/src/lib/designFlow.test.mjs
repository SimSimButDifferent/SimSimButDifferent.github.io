import test from "node:test";
import assert from "node:assert/strict";
import { stages } from "../data/designFlow.mjs";

const routes = [
  "/services/reverse-engineering", "/services/solidworks-design",
  "/services/dfm-consultancy", "/services/construction-drawings",
  "/services/photorealistic-rendering", "/services/cad-file-conversion",
];
const banned = /passionate|cutting-edge|solutions|unlock|elevate|seamless|world-class|leverag|optimiz|visualiz|\bFTA\b|Siam Precision/i;

test("eight stages, numbered in order", () => {
  assert.deepEqual(stages.map((s) => s.number),
    ["01", "02", "03", "04", "05", "06", "07", "08"]);
  assert.deepEqual(stages.map((s) => s.label),
    ["Brief", "Design", "Assembly", "Prototype", "DFM review", "Drawings", "Renders", "Production"]);
});
test("every stage links to a real service page and every page is reached", () => {
  for (const s of stages) assert.ok(routes.includes(s.href), s.href);
  for (const r of routes) assert.ok(stages.some((s) => s.href === r), r);
});
test("every stage is complete and its copy follows the rules", () => {
  for (const s of stages) {
    for (const key of ["title", "body", "linkText", "icon"]) assert.ok(s[key], `${s.number} ${key}`);
    assert.ok(s.chips.length > 0 && s.card.title && s.card.description, s.number);
    // Copy only: the icon file name (design_optimization.svg) is not copy.
    const copy = [s.label, s.title, s.body, s.linkText, ...s.chips, s.card.title, s.card.description].join(" ");
    assert.doesNotMatch(copy, banned, s.number);
  }
});

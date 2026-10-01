import { stages, type Zone } from "@/lib/content";

const NODE_H = 62, GAP = 44, TOP = 30, X = 122, W = 230;
const yOf = (i: number) => TOP + i * (NODE_H + GAP);
const HEIGHT = yOf(stages.length - 1) + NODE_H + 22;
const CX = X + W / 2;
const color: Record<Zone, string> = {
  untrusted: "var(--color-untrusted)",
  model: "var(--color-model)",
  checked: "var(--color-checked)",
};
const zoneLabel: Record<Zone, string> = { untrusted: "untrusted", model: "probabilistic", checked: "checked" };
const gateLabels = ["validate", "cite sources", "check before use", "approve"];

function zoneRanges() {
  const out: { zone: Zone; from: number; to: number }[] = [];
  stages.forEach((s, i) => {
    const last = out[out.length - 1];
    if (last && last.zone === s.zone) last.to = i;
    else out.push({ zone: s.zone, from: i, to: i });
  });
  return out;
}

export default function Diagram({ active }: { active: number }) {
  const packetY = active < 0 ? 8 : yOf(active) + NODE_H / 2;
  return (
    <svg viewBox={`0 0 380 ${HEIGHT}`} role="img" aria-label="Pipeline from input to action, with the current stage highlighted" className="w-full h-auto max-h-[calc(100vh-190px)]">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--color-muted)" />
        </marker>
      </defs>

      {zoneRanges().map((z) => {
        const y1 = yOf(z.from), y2 = yOf(z.to) + NODE_H, cy = (y1 + y2) / 2;
        return (
          <g key={z.from}>
            <rect x="92" y={y1} width="5" height={y2 - y1} rx="2.5" fill={color[z.zone]} />
            <text transform={`translate(70 ${cy}) rotate(-90)`} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={color[z.zone]}>
              {zoneLabel[z.zone]}
            </text>
          </g>
        );
      })}

      {stages.slice(0, -1).map((_, i) => (
        <g key={i}>
          <line x1={CX} y1={yOf(i) + NODE_H} x2={CX} y2={yOf(i + 1) - 3} stroke="var(--color-muted)" strokeWidth="1.5" strokeDasharray={stages[i].zone === "untrusted" && stages[i + 1].zone !== "untrusted" ? "4 4" : undefined} markerEnd="url(#arr)" />
          <text x={CX + 12} y={yOf(i) + NODE_H + GAP / 2 + 4} fontFamily="var(--font-mono)" fontSize="10.5" fill="var(--color-muted)">{gateLabels[i]}</text>
        </g>
      ))}

      {stages.map((s, i) => {
        const on = i === active;
        const textFill = on ? (s.zone === "model" ? "#17201c" : "#ffffff") : "var(--color-ink)";
        return (
          <g key={s.id} className="node">
            <rect x={X} y={yOf(i)} width={W} height={NODE_H} rx="10" fill={on ? color[s.zone] : "var(--color-paper)"} stroke={color[s.zone]} strokeWidth="2" />
            <text x={X + 18} y={yOf(i) + 27} fontFamily="var(--font-mono)" fontSize="11" fill={textFill} opacity="0.8">{String(i + 1).padStart(2, "0")}</text>
            <text x={X + 18} y={yOf(i) + 49} fontFamily="var(--font-display)" fontWeight="700" fontSize="21" fill={textFill}>{s.name}</text>
          </g>
        );
      })}

      <g className="packet" style={{ transform: `translateY(${packetY}px)` }}>
        <circle cx={CX} cy="0" r="7" fill="var(--color-ink)" stroke="var(--color-paper)" strokeWidth="3" />
      </g>
    </svg>
  );
}

import { useState, useMemo } from "react";

// Seeded pseudo-random for reproducible jitter
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

interface GroupData {
  label: string[];
  color: string;
  colorLight: string;
  points: number[];
}

// Sample data (will be replaced with real data later)
const generateSamplePoints = (
  median: number,
  q1: number,
  q3: number,
  min: number,
  max: number,
  n: number,
  seed: number
): number[] => {
  const rng = seededRandom(seed);
  const points: number[] = [];
  for (let i = 0; i < n; i++) {
    const u = rng();
    let val: number;
    if (u < 0.05) val = min + rng() * (q1 - min);
    else if (u < 0.25) val = q1 + rng() * (median - q1) * 0.5;
    else if (u < 0.5) val = q1 + rng() * (median - q1);
    else if (u < 0.75) val = median + rng() * (q3 - median);
    else if (u < 0.95) val = q3 + rng() * (max - q3) * 0.5;
    else val = q3 + rng() * (max - q3);
    points.push(Math.max(min, Math.min(max, val)));
  }
  return points;
};

const groups: GroupData[] = [
  {
    label: ["Control"],
    color: "hsl(220, 10%, 65%)",
    colorLight: "hsl(220, 10%, 85%)",
    points: generateSamplePoints(2.5, 2.2, 3.2, 1.0, 5.0, 120, 42),
  },
  {
    label: ["Treatment", "Stranded"],
    color: "hsl(24, 85%, 58%)",
    colorLight: "hsl(24, 85%, 78%)",
    points: generateSamplePoints(2.0, 1.7, 2.2, 1.0, 3.5, 30, 99),
  },
  {
    label: ["Treatment", "Parallel"],
    color: "hsl(40, 90%, 60%)",
    colorLight: "hsl(40, 90%, 78%)",
    points: generateSamplePoints(2.8, 2.5, 3.4, 1.0, 5.0, 70, 137),
  },
  {
    label: ["Treatment", "True Joint"],
    color: "hsl(174, 52%, 50%)",
    colorLight: "hsl(174, 52%, 72%)",
    points: generateSamplePoints(3.0, 2.8, 3.9, 1.5, 5.0, 55, 211),
  },
];

function computeStats(pts: number[]) {
  const sorted = [...pts].sort((a, b) => a - b);
  const n = sorted.length;
  const median = sorted[Math.floor(n / 2)];
  const q1 = sorted[Math.floor(n / 4)];
  const q3 = sorted[Math.floor((3 * n) / 4)];
  const iqr = q3 - q1;
  const whiskerLow = Math.max(sorted[0], q1 - 1.5 * iqr);
  const whiskerHigh = Math.min(sorted[n - 1], q3 + 1.5 * iqr);
  const mean = pts.reduce((a, b) => a + b, 0) / n;
  return { median, q1, q3, whiskerLow, whiskerHigh, mean };
}

// Chart dimensions
const CHART_W = 720;
const CHART_H = 400;
const PAD = { top: 20, right: 30, bottom: 60, left: 60 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;
const Y_MIN = 1;
const Y_MAX = 5;

const yScale = (v: number) =>
  PAD.top + PLOT_H - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;

const FidelityGradientChart = () => {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

  const groupWidth = PLOT_W / groups.length;
  const boxW = groupWidth * 0.45;

  const statsArr = useMemo(() => groups.map((g) => computeStats(g.points)), []);

  // Jittered x positions per group
  const jitteredPoints = useMemo(() => {
    return groups.map((g, gi) => {
      const cx = PAD.left + gi * groupWidth + groupWidth / 2;
      const rng = seededRandom(gi * 1000 + 7);
      return g.points.map((val) => ({
        x: cx + (rng() - 0.5) * boxW * 0.85,
        y: yScale(val),
        val,
      }));
    });
  }, []);

  const yTicks = [1, 2, 3, 4, 5];

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 text-center">
        <h3 className="font-display text-xl md:text-2xl font-bold mb-1">
          The Fidelity Gradient
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Impact of Operational Fidelity on Perceived Experience Score (1–5,
          self-report)
        </p>
        <p className="font-body text-xs text-muted-foreground mt-0.5">
          Isolating &lsquo;Meeting&rsquo; (Parallel) from
          &lsquo;Collaborating&rsquo; (True Joint)
        </p>
      </div>

      {/* SVG chart */}
      <div className="px-4 pb-6 pt-2 overflow-x-auto">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="w-full max-w-[720px] mx-auto"
          style={{ minWidth: 480 }}
        >
          {/* Grid lines */}
          {yTicks.map((t) => (
            <line
              key={t}
              x1={PAD.left}
              x2={PAD.left + PLOT_W}
              y1={yScale(t)}
              y2={yScale(t)}
              stroke="hsl(40, 10%, 90%)"
              strokeWidth={1}
            />
          ))}

          {/* Y-axis labels */}
          {yTicks.map((t) => (
            <text
              key={t}
              x={PAD.left - 12}
              y={yScale(t)}
              textAnchor="end"
              dominantBaseline="middle"
              className="fill-muted-foreground"
              fontSize={12}
              fontFamily="Inter, sans-serif"
            >
              {t}
            </text>
          ))}

          {/* Y-axis title */}
          <text
            x={16}
            y={PAD.top + PLOT_H / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(-90, 16, ${PAD.top + PLOT_H / 2})`}
            className="fill-highlight"
            fontSize={12}
            fontFamily="Inter, sans-serif"
            fontWeight={600}
          >
            Experience Scale (1-5)
          </text>

          {/* Groups */}
          {groups.map((g, gi) => {
            const cx = PAD.left + gi * groupWidth + groupWidth / 2;
            const s = statsArr[gi];
            const isHovered = hoveredGroup === gi;
            const opacity = hoveredGroup === null || isHovered ? 1 : 0.35;

            return (
              <g
                key={gi}
                onMouseEnter={() => setHoveredGroup(gi)}
                onMouseLeave={() => setHoveredGroup(null)}
                style={{
                  transition: "opacity 0.3s ease-out",
                  opacity,
                  cursor: "pointer",
                }}
              >
                {/* Vertical separator */}
                {gi > 0 && (
                  <line
                    x1={PAD.left + gi * groupWidth}
                    x2={PAD.left + gi * groupWidth}
                    y1={PAD.top}
                    y2={PAD.top + PLOT_H}
                    stroke="hsl(40, 10%, 90%)"
                    strokeWidth={1}
                  />
                )}

                {/* Whiskers */}
                <line
                  x1={cx}
                  x2={cx}
                  y1={yScale(s.whiskerHigh)}
                  y2={yScale(s.whiskerLow)}
                  stroke="hsl(220, 15%, 30%)"
                  strokeWidth={1.5}
                />
                <line
                  x1={cx - boxW * 0.2}
                  x2={cx + boxW * 0.2}
                  y1={yScale(s.whiskerHigh)}
                  y2={yScale(s.whiskerHigh)}
                  stroke="hsl(220, 15%, 30%)"
                  strokeWidth={1.5}
                />
                <line
                  x1={cx - boxW * 0.2}
                  x2={cx + boxW * 0.2}
                  y1={yScale(s.whiskerLow)}
                  y2={yScale(s.whiskerLow)}
                  stroke="hsl(220, 15%, 30%)"
                  strokeWidth={1.5}
                />

                {/* Box */}
                <rect
                  x={cx - boxW / 2}
                  y={yScale(s.q3)}
                  width={boxW}
                  height={yScale(s.q1) - yScale(s.q3)}
                  fill={g.color}
                  fillOpacity={0.6}
                  rx={3}
                  stroke={g.color}
                  strokeWidth={1.5}
                />

                {/* Median line */}
                <line
                  x1={cx - boxW / 2}
                  x2={cx + boxW / 2}
                  y1={yScale(s.median)}
                  y2={yScale(s.median)}
                  stroke="hsl(220, 15%, 20%)"
                  strokeWidth={2}
                />

                {/* Scatter points */}
                {jitteredPoints[gi].map((p, pi) => (
                  <circle
                    key={pi}
                    cx={p.x}
                    cy={p.y}
                    r={2.5}
                    fill="hsl(220, 10%, 45%)"
                    fillOpacity={0.5}
                  />
                ))}

                {/* Mean diamond */}
                <polygon
                  points={`${cx},${yScale(s.mean) - 5} ${cx + 5},${yScale(s.mean)} ${cx},${yScale(s.mean) + 5} ${cx - 5},${yScale(s.mean)}`}
                  fill="hsl(220, 15%, 15%)"
                />

                {/* X-axis label */}
                {g.label.map((line, li) => (
                  <text
                    key={li}
                    x={cx}
                    y={PAD.top + PLOT_H + 18 + li * 15}
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    className="fill-foreground"
                    fontSize={12}
                    fontFamily="Inter, sans-serif"
                    fontWeight={li === 0 && g.label.length === 1 ? 500 : li === 0 ? 500 : 400}
                  >
                    {line}
                  </text>
                ))}

                {/* Hover tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={cx - 52}
                      y={yScale(s.q3) - 52}
                      width={104}
                      height={44}
                      rx={6}
                      fill="hsl(220, 15%, 15%)"
                      fillOpacity={0.92}
                    />
                    <text
                      x={cx}
                      y={yScale(s.q3) - 37}
                      textAnchor="middle"
                      fill="white"
                      fontSize={11}
                      fontFamily="Inter, sans-serif"
                    >
                      Median: {s.median.toFixed(1)} · Mean:{" "}
                      {s.mean.toFixed(1)}
                    </text>
                    <text
                      x={cx}
                      y={yScale(s.q3) - 22}
                      textAnchor="middle"
                      fill="hsla(0,0%,100%,0.7)"
                      fontSize={10}
                      fontFamily="Inter, sans-serif"
                    >
                      IQR: {s.q1.toFixed(1)}–{s.q3.toFixed(1)} · n ={" "}
                      {g.points.length}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* X-axis label */}
          <text
            x={PAD.left + PLOT_W / 2}
            y={CHART_H - 4}
            textAnchor="middle"
            className="fill-highlight"
            fontSize={12}
            fontFamily="Inter, sans-serif"
            fontWeight={600}
          >
            Operational Outcome
          </text>
        </svg>
      </div>

      {/* Callout */}
      <div className="mx-6 mb-6 rounded-lg border-l-4 border-highlight bg-secondary/50 px-5 py-4">
        <p className="font-body text-sm leading-relaxed text-foreground/90">
          While the control group performed better on the task, the pairs that truly collaborated with AI — in <span className="font-display font-bold">"True Joint"</span> mode — reported the <span className="font-display font-bold">best experience</span>.
        </p>
      </div>
    </div>
  );
};

export default FidelityGradientChart;

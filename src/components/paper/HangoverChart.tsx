import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const dimensionCallouts: Record<string, { intro: string; items: string[] }> = {
  "Exploration &\nExperimentation": {
    intro: "Each statement begins with \"AI can...\" or \"it is...\":",
    items: [
      "...it is valuable to look for opportunities to involve AI early in problem-solving.",
      "...I can experiment with AI even when outcomes are uncertain.",
      "...AI can improve outputs through iterative refinement and optimization.",
    ],
  },
  "AI as Thought\nPartner": {
    intro: "Each statement begins with \"AI can...\" or \"it is...\":",
    items: [
      "...help me explore multiple perspectives beyond an initial answer.",
      "...help me challenge and refine my thinking through iteration.",
      "...assist in anticipating objections and exploring counterarguments during planning.",
    ],
  },
  "Productivity\n& Process": {
    intro: "Each statement begins with \"AI can...\":",
    items: [
      "...support organizing and optimizing sequences of work activities.",
      "...be integrated across steps of a process rather than used for isolated tasks.",
      "...help generate and stress-test alternative strategies before making decisions.",
    ],
  },
};

const dimensions = [
  {
    title: "Exploration &\nExperimentation",
    basic: { pre: 4.47, post: 4.48, preErr: [4.35, 4.59], postErr: [4.38, 4.58] },
    advanced: { pre: 4.25, post: 4.48, preErr: [4.1, 4.4], postErr: [4.35, 4.61] },
  },
  {
    title: "AI as Thought\nPartner",
    basic: { pre: 4.2, post: 4.32, preErr: [4.08, 4.32], postErr: [4.2, 4.44] },
    advanced: { pre: 4.05, post: 4.35, preErr: [3.9, 4.2], postErr: [4.22, 4.48] },
  },
  {
    title: "Productivity\n& Process",
    basic: { pre: 4.15, post: 4.25, preErr: [4.05, 4.25], postErr: [4.15, 4.35] },
    advanced: { pre: 4.03, post: 4.22, preErr: [3.88, 4.18], postErr: [4.08, 4.36] },
  },
];

const yMin = 3.5;
const yMax = 5.0;
const yTicks = [3.5, 4.0, 4.5, 5.0];

const panelW = 180;
const panelGap = 50;
const chartH = 220;
const padTop = 80;
const padBottom = 50;
const padLeft = 80;
const totalW = padLeft + dimensions.length * panelW + (dimensions.length - 1) * panelGap + 30;
const totalH = padTop + chartH + padBottom;

const yScale = (v: number) => padTop + chartH - ((v - yMin) / (yMax - yMin)) * chartH;

// Use site palette: teal highlight for advanced, warm muted coral for basic
const basicColor = "hsl(0 45% 68%)";
const advancedColor = "hsl(174 52% 42%)";

const HangoverChart = () => {
  const { ref, isVisible } = useScrollReveal(0.15);
  const [hoveredDim, setHoveredDim] = useState<string | null>(null);

  return (
    <div
      ref={ref}
      className={`my-10 rounded-xl border bg-card/60 p-6 md:p-8 shadow-md transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ filter: isVisible ? "blur(0)" : "blur(3px)" }}
    >
      {/* Title cluster — open layout, no card box */}
      <h4 className="font-display text-xl md:text-2xl font-bold mb-1">
        The "Hangover" Effect
      </h4>
      <p className="font-serif text-base text-muted-foreground mb-6 max-w-2xl">
        <em>Post-Task A vs. post-Task B belief scores by training type. Treatment participants started lower (carry-over from Task A) and showed larger changes, though sensitivity analyses suggest this likely reflects recovery rather than a training effect.</em>
      </p>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-5">
        <span className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: basicColor }}
          />
          <span className="font-body text-xs text-muted-foreground">Basic training</span>
        </span>
        <span className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: advancedColor }}
          />
          <span className="font-body text-xs text-muted-foreground">Advanced AI Mindset</span>
        </span>
      </div>

      <div className="w-full overflow-x-auto -ml-2 relative">
        <svg
          viewBox={`0 0 ${totalW} ${totalH}`}
          className="w-full h-auto"
          style={{ minWidth: 480 }}
        >
          {/* Y-axis label */}
          <text
            x={padLeft - 58}
            y={padTop + chartH / 2}
            textAnchor="middle"
            className="font-body"
            transform={`rotate(-90, ${padLeft - 58}, ${padTop + chartH / 2})`}
            style={{
              fontSize: "10px",
              fill: "hsl(220 10% 46%)",
              opacity: isVisible ? 0.7 : 0,
              transition: "opacity 600ms ease-out 300ms",
            }}
          >
            Mean belief score (1–5 Likert)
          </text>

          {dimensions.map((dim, di) => {
            const panelX = padLeft + di * (panelW + panelGap);
            const preX = panelX + 45;
            const postX = panelX + panelW - 45;
            const titleLines = dim.title.split("\n");
            const stagger = di * 150;

            return (
              <g key={dim.title}>
                {/* Panel title — two lines + hover target */}
                {titleLines.map((line, li) => (
                  <text
                    key={li}
                    x={panelX + panelW / 2}
                    y={padTop - 28 + li * 14}
                    textAnchor="middle"
                    className="font-display"
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      fill: hoveredDim === dim.title ? "hsl(174 52% 42%)" : "hsl(220 20% 14%)",
                      opacity: isVisible ? 1 : 0,
                      transition: `opacity 500ms ease-out ${300 + stagger}ms, fill 200ms ease`,
                      cursor: "pointer",
                    }}
                  >
                    {line}
                  </text>
                ))}
                {/* Invisible hover rect over title area */}
                <rect
                  x={panelX}
                  y={padTop - 46}
                  width={panelW}
                  height={36}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredDim(dim.title)}
                  onMouseLeave={() => setHoveredDim(null)}
                />

                {/* Gridlines */}
                {yTicks.map((t) => (
                  <line
                    key={t}
                    x1={panelX}
                    x2={panelX + panelW}
                    y1={yScale(t)}
                    y2={yScale(t)}
                    stroke="hsl(40 12% 88%)"
                    strokeWidth="0.7"
                    style={{
                      opacity: isVisible ? 0.8 : 0,
                      transition: `opacity 500ms ease-out ${200 + stagger}ms`,
                    }}
                  />
                ))}

                {/* Y-axis tick labels — first panel only */}
                {di === 0 &&
                  yTicks.map((t) => (
                    <text
                      key={t}
                      x={panelX - 10}
                      y={yScale(t) + 3.5}
                      textAnchor="end"
                      className="font-body"
                      style={{
                        fontSize: "10px",
                        fill: "hsl(220 10% 46%)",
                        opacity: isVisible ? 0.7 : 0,
                        transition: "opacity 500ms ease-out 200ms",
                      }}
                    >
                      {t.toFixed(1)}
                    </text>
                  ))}

                {/* X-axis labels */}
                {["pre", "post"].map((label, li) => (
                  <text
                    key={label}
                    x={li === 0 ? preX : postX}
                    y={padTop + chartH + 22}
                    textAnchor="middle"
                    className="font-body"
                    style={{
                      fontSize: "10px",
                      fill: "hsl(220 10% 46%)",
                      opacity: isVisible ? 0.65 : 0,
                      transition: `opacity 500ms ease-out ${400 + stagger}ms`,
                    }}
                  >
                    {label}
                  </text>
                ))}

                {/* Data series */}
                {renderSeries(dim.basic, preX, postX, basicColor, isVisible, 500 + stagger)}
                {renderSeries(dim.advanced, preX, postX, advancedColor, isVisible, 650 + stagger)}
              </g>
            );
          })}
        </svg>

        {/* Callout overlay */}
        {hoveredDim && dimensionCallouts[hoveredDim] && (
          <div
            className="absolute left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-md rounded-lg border bg-card/95 backdrop-blur-sm p-4 shadow-lg pointer-events-none"
            style={{
              top: "8px",
              animation: "fadeIn 200ms ease-out",
            }}
          >
            <p className="font-display text-sm font-bold mb-2 text-foreground">
              {hoveredDim.replace("\n", " ")}
            </p>
            <p className="font-body text-xs text-muted-foreground mb-2">
              {dimensionCallouts[hoveredDim].intro}
            </p>
            <ul className="space-y-1.5">
              {dimensionCallouts[hoveredDim].items.map((item, i) => (
                <li key={i} className="font-serif text-xs italic text-foreground/80 pl-3 border-l-2 border-highlight/40">
                  "{item}"
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="font-serif text-base text-muted-foreground mt-6 max-w-2xl whitespace-pre-line">
        <strong>How to read this:</strong> After Task A, treatment participants had lower beliefs about AI than controls (d = 0.34, p = .008), a carry-over effect from the structured protocol friction. They then showed greater positive change from post-Task A to post-Task B. But when we adjusted for the depressed starting point (ANCOVA), the treatment effect was null for all dimensions. The pattern is more consistent with recovery from the dip than with a genuine training effect.
      </p>
    </div>
  );
};

function renderSeries(
  data: { pre: number; post: number; preErr: number[]; postErr: number[] },
  preX: number,
  postX: number,
  color: string,
  animate: boolean,
  delayMs: number
) {
  const preY = yScale(data.pre);
  const postY = yScale(data.post);
  const transition = `opacity 600ms ease-out ${delayMs}ms`;

  return (
    <g style={{ opacity: animate ? 1 : 0, transition }}>
      {/* Connecting line */}
      <line
        x1={preX}
        y1={preY}
        x2={postX}
        y2={postY}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Error bars */}
      {[
        { x: preX, err: data.preErr },
        { x: postX, err: data.postErr },
      ].map(({ x, err }, i) => (
        <g key={i}>
          <line x1={x} y1={yScale(err[0])} x2={x} y2={yScale(err[1])} stroke={color} strokeWidth="1.2" opacity="0.6" />
          <line x1={x - 3} y1={yScale(err[0])} x2={x + 3} y2={yScale(err[0])} stroke={color} strokeWidth="1.2" opacity="0.6" />
          <line x1={x - 3} y1={yScale(err[1])} x2={x + 3} y2={yScale(err[1])} stroke={color} strokeWidth="1.2" opacity="0.6" />
        </g>
      ))}

      {/* Dots */}
      <circle cx={preX} cy={preY} r="4.5" fill={color} />
      <circle cx={postX} cy={postY} r="4.5" fill={color} />
    </g>
  );
}

export default HangoverChart;

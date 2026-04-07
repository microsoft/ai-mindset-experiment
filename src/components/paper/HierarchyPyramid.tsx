import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const layers = [
  {
    id: "behavioral",
    label: "Behavioral Scaffolding",
    sub: "Mandate protocols",
    detail:
      "Structured workflows can formalize collaboration patterns, but mandating them too early may create friction that reduces performance. In our study, the structured protocol was associated with lower document quality and substantially lower document production.",
    color: "hsl(200 70% 65%)",
    colorHover: "hsl(200 75% 58%)",
  },
  {
    id: "cognitive",
    label: "Cognitive Scaffolding",
    sub: "Mindset-only works if base is solid",
    detail:
      "In an exploratory analysis, reframing AI as a thought partner was associated with doubled odds of producing top-quality work (OR = 2.07), though the primary continuous model was null.",
    color: "hsl(200 65% 38%)",
    colorHover: "hsl(200 70% 30%)",
  },
  {
    id: "mechanical",
    label: "Mechanical Fluency",
    sub: "Functional Training",
    detail:
      "The foundation layer: employees need basic comfort with AI tools before any higher-order scaffolding can take effect. Without this, everything above collapses.",
    color: "hsl(320 45% 62%)",
    colorHover: "hsl(320 50% 55%)",
  },
];

const buildOrder = ["mechanical", "cognitive", "behavioral"] as const;
const buildDelays = [400, 1100, 1800];

const HierarchyPyramid = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [builtLayers, setBuiltLayers] = useState<Set<string>>(new Set());
  const { ref, isVisible } = useScrollReveal(0.15);

  const active = layers.find((l) => l.id === activeLayer);
  const allBuilt = builtLayers.size === 3;

  useEffect(() => {
    if (!isVisible) return;
    const timers = buildOrder.map((id, i) =>
      setTimeout(() => {
        setBuiltLayers((prev) => new Set([...prev, id]));
      }, buildDelays[i])
    );
    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  const isBuilt = (id: string) => builtLayers.has(id);

  // Wide pyramid — roughly 2:1 aspect like reference image
  // Pyramid spans x: 60–540, y: 40–340
  const pyramidLayers = {
    mechanical: {
      points: "60,340 540,340 420,220 180,220",
      transformOrigin: "300px 340px",
      // Annotation line from right edge midpoint
      annotationStart: { x: 480, y: 280 },
      annotationEnd: { x: 580, y: 280 },
      labelX: 590,
      labelY: 275,
      subY: 295,
    },
    cognitive: {
      points: "180,216 420,216 360,115 240,115",
      transformOrigin: "300px 216px",
      annotationStart: { x: 390, y: 165 },
      annotationEnd: { x: 580, y: 165 },
      labelX: 590,
      labelY: 160,
      subY: 180,
    },
    behavioral: {
      points: "240,111 360,111 300,40",
      transformOrigin: "300px 111px",
      annotationStart: { x: 330, y: 80 },
      annotationEnd: { x: 580, y: 80 },
      labelX: 590,
      labelY: 75,
      subY: 95,
    },
  };

  return (
    <div
      ref={ref}
      className={`mt-14 mb-4 -mx-6 md:-mx-8 px-6 md:px-8 py-12 md:py-16 rounded-2xl surface-warm transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ filter: isVisible ? "blur(0)" : "blur(4px)" }}
    >
      <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
        The Strategic Framework
      </h3>
      <p className="font-body text-sm text-muted-foreground mb-8">
        A hierarchy of needs for AI integration — click each layer to explore
      </p>

      <div className="flex flex-col gap-8">
        {/* Pyramid with external labels */}
        <div className="w-full">
          <svg
            viewBox="0 0 800 380"
            className="w-full h-auto"
            aria-label="Hierarchy of Needs pyramid with three layers"
          >
            <defs>
              <linearGradient id="arrowGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="hsl(320 45% 62%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(200 70% 65%)" stopOpacity="0.9" />
              </linearGradient>
              <marker
                id="arrowHead"
                markerWidth="12"
                markerHeight="10"
                refX="6"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L12,5 L0,10 Z" fill="url(#arrowGrad)" />
              </marker>
            </defs>

            {/* Value Creation arrow */}
            <line
              x1="30"
              y1="340"
              x2="30"
              y2="40"
              stroke="url(#arrowGrad)"
              strokeWidth="3"
              markerEnd="url(#arrowHead)"
              style={{
                opacity: allBuilt ? 1 : 0,
                transition: "opacity 800ms ease-out",
                transitionDelay: "200ms",
              }}
            />
            <text
              x="26"
              y="200"
              textAnchor="middle"
              className="font-body"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "3px",
                fill: "hsl(220 20% 14%)",
                opacity: allBuilt ? 0.45 : 0,
                transition: "opacity 800ms ease-out",
                transitionDelay: "400ms",
              }}
              transform="rotate(-90, 26, 200)"
            >
              VALUE CREATION
            </text>

            {/* Pyramid layers + annotation labels */}
            {buildOrder.map((id) => {
              const layerData = layers.find((l) => l.id === id)!;
              const config = pyramidLayers[id as keyof typeof pyramidLayers];
              const built = isBuilt(id);
              const dimmed = allBuilt && activeLayer && activeLayer !== id;

              return (
                <g key={id}>
                  {/* Shape */}
                  <polygon
                    points={config.points}
                    fill={activeLayer === id ? layerData.colorHover : layerData.color}
                    className="cursor-pointer"
                    style={{
                      transformOrigin: config.transformOrigin,
                      transform: built ? "scaleY(1)" : "scaleY(0)",
                      opacity: built ? (dimmed ? 0.35 : 1) : 0,
                      transition:
                        "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out",
                    }}
                    onClick={() =>
                      allBuilt && setActiveLayer(activeLayer === id ? null : id)
                    }
                    onMouseEnter={() => allBuilt && setActiveLayer(id)}
                    onMouseLeave={() => allBuilt && activeLayer === id && setActiveLayer(null)}
                  />

                  {/* Annotation line */}
                  <line
                    x1={config.annotationStart.x}
                    y1={config.annotationStart.y}
                    x2={config.annotationEnd.x}
                    y2={config.annotationEnd.y}
                    stroke="hsl(220 20% 14%)"
                    strokeWidth="1"
                    style={{
                      opacity: built ? (dimmed ? 0.15 : 0.25) : 0,
                      transition: "opacity 500ms ease-out",
                      transitionDelay: built ? "400ms" : "0ms",
                    }}
                  />
                  {/* Tick at start */}
                  <line
                    x1={config.annotationStart.x}
                    y1={config.annotationStart.y - 6}
                    x2={config.annotationStart.x}
                    y2={config.annotationStart.y + 6}
                    stroke="hsl(220 20% 14%)"
                    strokeWidth="1"
                    style={{
                      opacity: built ? (dimmed ? 0.15 : 0.25) : 0,
                      transition: "opacity 500ms ease-out",
                      transitionDelay: built ? "400ms" : "0ms",
                    }}
                  />

                  {/* External label */}
                  <text
                    x={config.labelX}
                    y={config.labelY}
                    className="font-display pointer-events-none"
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      fill: "hsl(220 20% 14%)",
                      opacity: built ? (dimmed ? 0.3 : 1) : 0,
                      transition: "opacity 500ms ease-out",
                      transitionDelay: built ? "500ms" : "0ms",
                    }}
                  >
                    {layerData.label}
                  </text>
                  <text
                    x={config.labelX}
                    y={config.subY}
                    className="font-body pointer-events-none"
                    style={{
                      fontSize: "13px",
                      fill: "hsl(220 10% 46%)",
                      opacity: built ? (dimmed ? 0.2 : 0.7) : 0,
                      transition: "opacity 500ms ease-out",
                      transitionDelay: built ? "600ms" : "0ms",
                    }}
                  >
                    {layerData.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel below */}
        <div
          className={`min-h-[80px] transition-all duration-400 ease-out ${
            active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {active ? (
            <div className="bg-card rounded-lg border shadow-sm px-6 py-5 flex items-start gap-4">
              <div
                className="w-3 h-3 rounded-full mt-1 shrink-0"
                style={{ backgroundColor: active.color }}
              />
              <div>
                <h4 className="font-display font-bold text-base md:text-lg mb-1">
                  {active.label}
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {active.detail}
                </p>
              </div>
            </div>
          ) : (
            <p className="font-body text-sm text-muted-foreground italic text-center">
              {allBuilt
                ? "Hover or tap a layer to explore each level of the framework."
                : "Building the hierarchy…"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HierarchyPyramid;

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { name: "Control", subtitle: "(basic tool training)", value: 62, count: "76/123" },
  { name: "Treatment", subtitle: "(partnership training)", value: 77, count: "67/87" },
];

const COLORS = ["hsl(210, 18%, 55%)", "hsl(4, 55%, 65%)"];

const CustomLabel = (props: any) => {
  const { x, y, width, index } = props;
  const item = data[index];
  return (
    <g>
      <text
        x={x + width / 2}
        y={y - 28}
        textAnchor="middle"
        className="font-display"
        style={{ fontSize: 22, fontWeight: 700, fill: "hsl(220, 20%, 14%)" }}
      >
        {item.value}%
      </text>
      <text
        x={x + width / 2}
        y={y - 8}
        textAnchor="middle"
        className="font-body"
        style={{ fontSize: 13, fill: "hsl(220, 10%, 46%)" }}
      >
        ({item.count})
      </text>
    </g>
  );
};

const CustomXTick = (props: any) => {
  const { x, y, index } = props;
  const item = data[index];
  return (
    <g>
      <text
        x={x}
        y={y + 16}
        textAnchor="middle"
        className="font-display"
        style={{ fontSize: 14, fontWeight: 600, fill: "hsl(220, 20%, 14%)" }}
      >
        {item.name}
      </text>
      <text
        x={x}
        y={y + 34}
        textAnchor="middle"
        className="font-body"
        style={{ fontSize: 12, fill: "hsl(220, 10%, 46%)" }}
      >
        {item.subtitle}
      </text>
    </g>
  );
};

const TaskBChart = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-2">
        <h4 className="font-display font-bold text-lg md:text-xl leading-snug">
          Partnership Training Doubled the Odds of a Perfect Score
        </h4>
        <p className="font-body text-sm text-muted-foreground mt-1">
          % of individuals scoring 20/20 on the strategy task&ensp;|&ensp;N =
          210 individual documents&ensp;|&ensp;Pair‑clustered SEs
        </p>
      </div>

      <div className="px-2 pb-2" style={{ height: 380 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 50, right: 40, bottom: 50, left: 20 }}
            barCategoryGap="40%"
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="hsl(40, 12%, 88%)"
            />
            <XAxis
              dataKey="name"
              tick={<CustomXTick />}
              axisLine={{ stroke: "hsl(40, 12%, 88%)" }}
              tickLine={false}
              height={50}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{
                fontSize: 12,
                fill: "hsl(220, 10%, 46%)",
              }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              onMouseEnter={(_, i) => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i]}
                  fillOpacity={hoveredBar !== null && hoveredBar !== i ? 0.5 : 1}
                  style={{
                    transition: "fill-opacity 200ms ease-out",
                    cursor: "pointer",
                  }}
                />
              ))}
              <LabelList content={<CustomLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats callout */}
      <div className="mx-6 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-secondary/60 rounded-lg px-4 py-3 text-center">
          <span className="font-display font-bold text-base">
            OR = 2.07
          </span>
          <span className="font-body text-xs text-muted-foreground ml-2">
            p = 0.022
          </span>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            95% CI [1.12, 3.83]
          </p>
        </div>
        <div className="flex-1 bg-secondary/60 rounded-lg px-4 py-3 text-center">
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            68% of all documents scored 20/20 (ceiling)
            <br />
            Continuous model: p = 0.22 (effect hidden)
          </p>
        </div>
      </div>

      {/* Footer note */}
      <div className="px-6 pb-5 border-t pt-4">
        <p className="font-body text-xs text-muted-foreground leading-relaxed">
          Teaching people to treat AI as a thought partner was associated with
          higher individual output quality at the top of the distribution. Confirmed at ≥18
          threshold: OR = 1.87, p = 0.049. Standard errors clustered at pair
          level (CR2). The pre-specified continuous model was null (p = .22).
        </p>
      </div>
    </div>
  );
};

export default TaskBChart;

import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const weeklyData = [
  { week: 1, control: 12, basicAI: 13, advancedAI: 14 },
  { week: 2, control: 12, basicAI: 14, advancedAI: 16 },
  { week: 3, control: 13, basicAI: 15, advancedAI: 18 },
  { week: 4, control: 12, basicAI: 16, advancedAI: 19 },
  { week: 5, control: 13, basicAI: 16, advancedAI: 20 },
  { week: 6, control: 12, basicAI: 17, advancedAI: 21 },
  { week: 7, control: 13, basicAI: 17, advancedAI: 22 },
  { week: 8, control: 12, basicAI: 18, advancedAI: 22 },
  { week: 9, control: 13, basicAI: 18, advancedAI: 23 },
  { week: 10, control: 12, basicAI: 19, advancedAI: 24 },
  { week: 11, control: 13, basicAI: 19, advancedAI: 24 },
  { week: 12, control: 12, basicAI: 20, advancedAI: 25 },
];

const scatterData = weeklyData.flatMap((d) => [
  { tasks: d.control, quality: 3.8 + Math.random() * 0.6, group: "Control" },
  { tasks: d.basicAI, quality: 4.0 + Math.random() * 0.6, group: "Basic AI" },
  { tasks: d.advancedAI, quality: 4.2 + Math.random() * 0.6, group: "Advanced AI" },
]);

type ChartType = "bar" | "line" | "scatter";

const chartColors = {
  control: "hsl(220, 14%, 60%)",
  basicAI: "hsl(174, 42%, 55%)",
  advancedAI: "hsl(174, 52%, 35%)",
};

const DataExplorer = () => {
  const [chartType, setChartType] = useState<ChartType>("line");
  const { ref, isVisible } = useScrollReveal(0.1);

  const types: { key: ChartType; label: string }[] = [
    { key: "line", label: "Line" },
    { key: "bar", label: "Bar" },
    { key: "scatter", label: "Scatter" },
  ];

  return (
    <section id="explorer" ref={ref} className="px-6 py-20 md:py-28 surface-warm">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Explore the Data
            </h2>
            <p
              className={`font-body text-muted-foreground transition-all duration-700 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              Weekly task completion by treatment arm.
            </p>
          </div>
          <div
            className={`flex gap-1 bg-secondary rounded-lg p-1 font-body text-sm transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            {types.map((t) => (
              <button
                key={t.key}
                onClick={() => setChartType(t.key)}
                className={`px-4 py-1.5 rounded-md transition-all duration-200 active:scale-[0.97] ${
                  chartType === t.key
                    ? "bg-card shadow-sm font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`bg-card rounded-lg p-4 md:p-6 shadow-sm transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ filter: isVisible ? "blur(0)" : "blur(4px)" }}
        >
          <ResponsiveContainer width="100%" height={380}>
            {chartType === "line" ? (
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 12%, 88%)" />
                <XAxis dataKey="week" label={{ value: "Week", position: "insideBottom", offset: -4 }} tick={{ fontSize: 12 }} />
                <YAxis label={{ value: "Tasks / week", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
                <Legend />
                <Line type="monotone" dataKey="control" name="Control" stroke={chartColors.control} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="basicAI" name="Basic AI" stroke={chartColors.basicAI} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="advancedAI" name="Advanced AI" stroke={chartColors.advancedAI} strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            ) : chartType === "bar" ? (
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 12%, 88%)" />
                <XAxis dataKey="week" label={{ value: "Week", position: "insideBottom", offset: -4 }} tick={{ fontSize: 12 }} />
                <YAxis label={{ value: "Tasks / week", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
                <Legend />
                <Bar dataKey="control" name="Control" fill={chartColors.control} radius={[3, 3, 0, 0]} />
                <Bar dataKey="basicAI" name="Basic AI" fill={chartColors.basicAI} radius={[3, 3, 0, 0]} />
                <Bar dataKey="advancedAI" name="Advanced AI" fill={chartColors.advancedAI} radius={[3, 3, 0, 0]} />
              </BarChart>
            ) : (
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 12%, 88%)" />
                <XAxis dataKey="tasks" name="Tasks" label={{ value: "Tasks / week", position: "insideBottom", offset: -4 }} tick={{ fontSize: 12 }} />
                <YAxis dataKey="quality" name="Quality" label={{ value: "Quality score", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} domain={[3.5, 5.2]} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }} />
                <Legend />
                <Scatter name="Control" data={scatterData.filter((d) => d.group === "Control")} fill={chartColors.control} />
                <Scatter name="Basic AI" data={scatterData.filter((d) => d.group === "Basic AI")} fill={chartColors.basicAI} />
                <Scatter name="Advanced AI" data={scatterData.filter((d) => d.group === "Advanced AI")} fill={chartColors.advancedAI} />
              </ScatterChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DataExplorer;

import { useState, useMemo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Participant {
  id: string;
  role: string;
  arm: string;
  tasksPerWeek: number;
  qualityScore: number;
  satisfaction: number;
}

const roles = ["Analyst", "Engineer", "Designer", "Manager", "Researcher", "Writer"];
const arms = ["Control", "Basic AI", "Advanced AI"];

// Generate sample data
const sampleData: Participant[] = Array.from({ length: 40 }, (_, i) => {
  const arm = arms[i % 3];
  const base = arm === "Control" ? 0 : arm === "Basic AI" ? 1 : 2;
  return {
    id: `P-${String(i + 1).padStart(4, "0")}`,
    role: roles[i % roles.length],
    arm,
    tasksPerWeek: 11 + base * 4 + Math.floor(Math.random() * 5),
    qualityScore: +(3.7 + base * 0.3 + Math.random() * 0.5).toFixed(1),
    satisfaction: +(3.2 + base * 0.4 + Math.random() * 0.6).toFixed(1),
  };
});

const DataTable = () => {
  const [search, setSearch] = useState("");
  const [armFilter, setArmFilter] = useState("All");
  const { ref, isVisible } = useScrollReveal(0.1);

  const filtered = useMemo(() => {
    return sampleData.filter((p) => {
      const matchSearch =
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.role.toLowerCase().includes(search.toLowerCase());
      const matchArm = armFilter === "All" || p.arm === armFilter;
      return matchSearch && matchArm;
    });
  }, [search, armFilter]);

  return (
    <section ref={ref} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-2 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Participant Data
        </h2>
        <p
          className={`font-body text-muted-foreground mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Sample anonymized data — filter by treatment arm or search by ID / role.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-3 mb-6 transition-all duration-700 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <input
            type="text"
            placeholder="Search ID or role…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="font-body text-sm px-4 py-2 rounded-lg border bg-card focus:outline-none focus:ring-2 focus:ring-ring/30 transition-shadow w-full sm:w-64"
          />
          <div className="flex gap-1 bg-secondary rounded-lg p-1 font-body text-sm">
            {["All", ...arms].map((a) => (
              <button
                key={a}
                onClick={() => setArmFilter(a)}
                className={`px-3 py-1.5 rounded-md transition-all duration-200 active:scale-[0.97] ${
                  armFilter === a
                    ? "bg-card shadow-sm font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`bg-card rounded-lg shadow-sm overflow-hidden transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ filter: isVisible ? "blur(0)" : "blur(4px)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full font-body text-sm">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left px-4 py-3 font-semibold">ID</th>
                  <th className="text-left px-4 py-3 font-semibold">Role</th>
                  <th className="text-left px-4 py-3 font-semibold">Arm</th>
                  <th className="text-right px-4 py-3 font-semibold">Tasks/wk</th>
                  <th className="text-right px-4 py-3 font-semibold">Quality</th>
                  <th className="text-right px-4 py-3 font-semibold">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No participants match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                      <td className="px-4 py-3">{p.role}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            p.arm === "Control"
                              ? "bg-secondary text-muted-foreground"
                              : p.arm === "Basic AI"
                              ? "bg-highlight-soft text-highlight"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {p.arm}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">{p.tasksPerWeek}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{p.qualityScore}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{p.satisfaction}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="font-body text-xs text-muted-foreground mt-3">
          Showing {filtered.length} of {sampleData.length} participants
        </p>
      </div>
    </section>
  );
};

export default DataTable;

import { useScrollReveal } from "@/hooks/useScrollReveal";
import ExperimentDiagram from "./ExperimentDiagram";
const arms = [
  {
    arm: "Treatment",
    taskA: "AI-First protocol: \u201CCreate-Out-Loud\u201D collaborative protocol",
    taskB: "AI-First training \u2014 AI as a \u201Cthought partner\u201D",
  },
  {
    arm: "Control",
    taskA: "Naturalistic protocol: pairs work together and with AI however they chose",
    taskB: "Standard technical Copilot training",
  },
];

const outcomes = [
  "LLM-graded document quality",
  "Self-reported experience",
  "Belief change across session",
];

const Methodology = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section id="methodology" ref={ref} className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Methodology
        </h2>
        <p
          className={`font-body text-muted-foreground max-w-2xl mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          A single-day field experiment with 388 Gap Inc. employees randomized
          into two bundled arms. Both arms had full access to Microsoft Copilot.
          The study tests <em>how</em> people use AI, not whether they have it.
        </p>

        {/* Experiment diagram */}
        <div
          className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            transitionDelay: isVisible ? "150ms" : "0ms",
            filter: isVisible ? "blur(0)" : "blur(4px)",
          }}
        >
          <ExperimentDiagram />
        </div>





        <div
          className={`overflow-hidden rounded-lg border transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            transitionDelay: isVisible ? "350ms" : "0ms",
            filter: isVisible ? "blur(0)" : "blur(4px)",
          }}
        >
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Arm</th>
                <th className="text-left px-4 py-3 font-semibold">Task A (Pair)</th>
                <th className="text-left px-4 py-3 font-semibold">Task B (Individual)</th>
              </tr>
            </thead>
            <tbody>
              {arms.map((a) => (
                <tr key={a.arm} className="border-t">
                  <td className="px-4 py-3 font-medium">{a.arm}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.taskA}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.taskB}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Outcomes */}
        <div
          className={`mt-8 transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            transitionDelay: isVisible ? "450ms" : "0ms",
            filter: isVisible ? "blur(0)" : "blur(4px)",
          }}
        >
          <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            PRIMARY OUTCOMES
          </h3>
          <div className="flex flex-wrap gap-2">
            {outcomes.map((o) => (
              <span key={o} className="bg-secondary px-3 py-1 rounded-full font-body text-sm">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;

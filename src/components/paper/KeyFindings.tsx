import { useScrollReveal } from "@/hooks/useScrollReveal";

const findings = [
  {
    title: "Changing mindset is likely easier than changing workflows",
    detail:
      "Across our two tasks, we found that participants primed with an AI-first mindset outperformed those with a traditional mindset, while participants placed into an AI-first workflow experienced more friction than those in a traditional workflow. While these were separate comparisons, taken together they suggest that shifting mindset may be a more productive lever than mandating workflow change.",
  },
  {
    title: "Mental models shape outcomes",
    detail:
      "Employees\u2019 mental model of AI substantially affects what they get out of it. Attending mindset-specific training as opposed to \u201c101 feature\u201d training doubled the odds of producing high-impact work.",
  },
  {
    title: "True collaboration \u2260 parallel play",
    detail:
      "True joint collaboration with AI is not the same as parallel play. Unless intentionally designed, employees may default to \u201cparallel playing\u201d with their own Copilot rather than using it as a team, underscoring how complex collaborative workflows with AI are.",
  },
];

const KeyFindings = () => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section id="findings" ref={ref} className="px-6 py-20 md:py-28 surface-warm">
      <div className="mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Key Findings
        </h2>
        <p
          className={`font-body text-muted-foreground max-w-xl mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Three takeaways from the experiment.
        </p>

        <div className="grid gap-6">
          {findings.map((f, i) => (
            <div
              key={i}
              className={`rounded-xl border-l-4 border-highlight bg-card px-6 py-5 shadow-sm hover:shadow-md transition-all duration-500 active:scale-[0.99] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{
                transitionDelay: isVisible ? `${150 + i * 100}ms` : "0ms",
                filter: isVisible ? "blur(0)" : "blur(4px)",
              }}
            >
              <p className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
                {f.title}
              </p>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFindings;

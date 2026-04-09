import { useScrollReveal } from "@/hooks/useScrollReveal";

const findings = [
  {
    title: "Mindset training showed more favorable patterns than workflow mandates",
    detail:
      "Participants who received AI Mindset training had higher odds of producing a perfect-score document (exploratory binary model, OR = 2.07; continuous model was null), while participants placed into a mandated AI workflow experienced more friction and lower output quality. These were separate comparisons across different tasks with different designs, and should be interpreted as bounded operational lessons rather than a general verdict.",
  },
  {
    title: "Mental models shape outcomes",
    detail:
      "In an exploratory analysis, attending AI Mindset training doubled the odds of producing a perfect-score document (OR = 2.07, p = .022), though the pre-specified continuous model was null (p = .22) due to ceiling effects.",
  },
  {
    title: "True collaboration \u2260 parallel play",
    detail:
      "True joint collaboration with AI is not the same as parallel play. Unless intentionally designed, employees default to \u201cparallel playing\u201d with their own Copilot rather than using it as a team. Collaborative AI workflows are harder to get right than they look.",
  },
  {
    title: "You can\u2019t improve what you can\u2019t measure",
    detail:
      "Our AI rubric scored 68% of documents as perfect. Human raters graded the same work on a full 1\u2013to\u20135 scale, with a mean of 11.8 out of 20. The rubric was blind to differences that were actually there, which masked the treatment effect in our primary model. For organizations, the lesson is concrete: generic evaluation tools will miss what matters. Build internal measures calibrated to your own quality bar.",
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
          Four takeaways from the experiment.
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

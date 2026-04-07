import { useState } from "react";

const RevealBar = ({
  text,
  className = "",
}: {
  text: React.ReactNode;
  className?: string;
}) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      onClick={() => setRevealed(!revealed)}
      className={`w-full px-4 py-2 text-center transition-all duration-300 active:scale-[0.98] ${className}`}
    >
      {revealed ? (
        <span className="font-display font-bold text-xs md:text-sm">
          {text}
        </span>
      ) : (
        <span className="text-base" title="Click to reveal">💡</span>
      )}
    </button>
  );
};

const SocialPlaceboMatrix = () => {
  return (
    <div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-center mb-8">
        Interpreting the Four Patterns: The Social Placebo Myth
      </h3>

      <div className="flex items-stretch gap-3">
        {/* Y-axis labels */}
        <div className="flex flex-col shrink-0 w-6 md:w-8">
          <div className="flex-1 flex items-center justify-center">
            <span
              className="font-body text-[11px] font-semibold text-highlight whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Working together
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span
              className="font-body text-[11px] font-semibold text-highlight whitespace-nowrap"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Working alone
            </span>
          </div>
        </div>

        {/* Matrix + X-axis */}
        <div className="flex-1 min-w-0">
          <div className="rounded-xl overflow-hidden border-2 border-foreground/80 shadow-sm">
            {/* Top row */}
            <div className="grid grid-cols-2">
              {/* Stranded Risk + Social Placebo */}
              <div className="border-r-2 border-foreground/80 border-b-2 border-b-foreground/80 flex flex-col">
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center items-center text-center">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="bg-[hsl(0,70%,92%)] rounded px-2 py-0.5 shrink-0">
                      <span className="font-display font-bold text-xs text-[hsl(0,65%,42%)]">
                        Stranded Risk
                      </span>
                    </div>
                  </div>
                  <span className="font-display font-bold text-base md:text-lg text-foreground/80">
                    Parallel Play
                  </span>
                  <span className="font-body text-xs text-foreground/55 mt-1">
                    Social Placebo
                  </span>
                </div>
                <RevealBar
                  text={<span className="text-foreground/65">Feels collaborative, <em>no lift</em></span>}
                  className="bg-[hsl(0,30%,88%)] hover:bg-[hsl(0,30%,85%)]"
                />
              </div>

              {/* Mechanism */}
              <div className="border-b-2 border-foreground/80 flex flex-col bg-[hsl(210,25%,62%)]">
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center items-center text-center">
                  <span className="font-display font-bold text-lg md:text-xl text-white">
                    True Joint
                  </span>
                  <span className="font-body text-sm text-white/75 mt-1">
                    Mechanistic Workflow
                  </span>
                </div>
                <RevealBar
                  text={<span className="text-white/90">Integrated loop, <em>higher scores</em></span>}
                  className="bg-[hsl(210,25%,52%)] hover:bg-[hsl(210,25%,48%)]"
                />
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-2">
              {/* Baseline */}
              <div className="border-r-2 border-foreground/80 bg-[hsl(210,35%,85%)] flex flex-col">
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center items-center text-center">
                  <span className="font-display font-bold text-base md:text-lg text-foreground/75">
                    Baseline
                  </span>
                  <span className="font-body text-xs text-foreground/50 mt-1">
                    Default Behavior
                  </span>
                </div>
                <RevealBar
                  text={<span className="text-foreground/55">(Reference point)</span>}
                  className="bg-[hsl(210,30%,78%)] hover:bg-[hsl(210,30%,74%)]"
                />
              </div>

              {/* Empty / not observed */}
              <div className="bg-secondary/40 p-3 min-h-[140px]">
                <div
                  className="w-full h-full rounded"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, transparent, transparent 6px, hsl(40, 8%, 86%) 6px, hsl(40, 8%, 86%) 7px)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* X-axis label */}
          <div className="flex justify-between mt-3 px-1">
            <span className="font-body text-xs font-semibold text-highlight">
              ← AI use is individual
            </span>
            <span className="font-body text-xs font-semibold text-highlight">
              AI use is shared (joint prompting) →
            </span>
          </div>
        </div>
      </div>

      {/* Call-out box */}
      <div className="mt-8 rounded-xl border-l-4 border-[hsl(var(--highlight))] bg-highlight-soft/50 px-6 py-5 space-y-3">
        <p className="font-body text-sm md:text-base text-foreground/85 leading-relaxed">
          The <strong className="font-display font-bold">Parallel Play</strong> group produced experience outcomes indistinguishable from Baseline. That's the <em>Social Placebo</em> effect: it feels collaborative, but it doesn't change the AI's behavior.
        </p>
        <p className="font-body text-sm md:text-base text-foreground/85 leading-relaxed">
          <strong className="font-display font-bold">True Joint</strong> integrates the AI into the shared loop and is the only pattern associated with higher scores. These compliance comparisons are descriptive only, as group membership reflects post-randomization selection.
        </p>
      </div>
    </div>
  );
};

export default SocialPlaceboMatrix;

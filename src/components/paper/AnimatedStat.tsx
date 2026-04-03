import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface AnimatedStatProps {
  value: string;
  description: string;
  delay?: number;
}

function parseStatValue(value: string): { prefix: string; number: number; suffix: string } {
  const match = value.match(/^([−+]?)(\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value };
  return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] };
}

const AnimatedStat = ({ value, description, delay = 0 }: AnimatedStatProps) => {
  const { ref, isVisible } = useScrollReveal(0.3);
  const [displayNum, setDisplayNum] = useState(0);
  const hasAnimated = useRef(false);
  const parsed = parseStatValue(value);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200;
    const start = performance.now();
    const target = parsed.number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNum(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const timer = setTimeout(() => requestAnimationFrame(tick), delay);
    return () => clearTimeout(timer);
  }, [isVisible, parsed.number, delay]);

  return (
    <div
      ref={ref}
      className={`flex items-start gap-6 py-6 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Large number */}
      <div className="shrink-0 w-28 md:w-36 text-right">
        <span className="font-display font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-br from-highlight to-[hsl(var(--highlight)/0.6)] bg-clip-text text-transparent leading-none">
          {parsed.prefix}{displayNum}{parsed.suffix}
        </span>
      </div>

      {/* Vertical accent + description */}
      <div className="flex items-center gap-4 flex-1 min-h-[3rem]">
        <div
          className={`w-0.5 self-stretch bg-highlight/40 rounded-full origin-top transition-transform duration-700 ${
            isVisible ? "scale-y-100" : "scale-y-0"
          }`}
          style={{ transitionDelay: `${delay + 300}ms` }}
        />
        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AnimatedStat;

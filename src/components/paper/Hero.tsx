import { useScrollReveal } from "@/hooks/useScrollReveal";

const Hero = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative px-6 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <div
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ filter: isVisible ? "blur(0)" : "blur(4px)" }}>
          
          <p className="font-body text-sm font-medium uppercase tracking-widest text-highlight mb-6">
            Working Paper · 2026
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            Scaffolding Human–AI Collaboration: A Field Experiment on Behavioral Protocols and Cognitive Reframing
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">A field experiment with 388 employees at Gap Inc. testing two interventions in a single day: an AI-first collaborative process, and AI-first mindset training — both compared against naturalistic AI use with full Microsoft Copilot access.







          </p>
        </div>

        <div
          className={`flex flex-wrap items-center justify-center gap-3 text-sm font-body text-muted-foreground transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ filter: isVisible ? "blur(0)" : "blur(4px)" }}>
          
          <span className="bg-highlight-soft text-highlight px-3 py-1 rounded-full font-medium">
            n = 388
          </span>
          <span className="bg-secondary px-3 py-1 rounded-full">
            1-day field experiment
          </span>
          <span className="bg-secondary px-3 py-1 rounded-full">2 intervention protocols

          </span>
        </div>

        <nav
          className={`mt-12 flex flex-wrap justify-center gap-4 font-body text-sm transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ filter: isVisible ? "blur(0)" : "blur(4px)" }}>
          
          <a href="#findings" className="text-highlight hover:underline underline-offset-4">
            Key Findings ↓
          </a>
          <a href="#methodology" className="text-muted-foreground hover:text-foreground transition-colors">
            Methodology ↓
          </a>
          <a href="#explorer" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore Data ↓
          </a>
        </nav>

        <blockquote
          className={`mt-16 max-w-2xl mx-auto text-center transition-all duration-700 delay-[400ms] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ filter: isVisible ? "blur(0)" : "blur(4px)" }}>
          
          <p className="font-display md:text-xl italic leading-relaxed text-3xl text-primary">
            “The idea for the study was born out of a question we kept asking ourselves — if you had to choose, which would you pick: an employee with an AI‑first mindset navigating an analogue process, or an employee with an analogue mindset navigating an AI‑first process?”
          



          </p>
          <footer className="mt-4 font-body text-sm text-muted-foreground">
            &mdash; Alexia Cambon, Microsoft Researcher
          </footer>
        </blockquote>
      </div>
    </section>);

};

export default Hero;
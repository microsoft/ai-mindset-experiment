import { useState } from "react";
import { ChevronDown, Play } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import FidelityGradientChart from "./FidelityGradientChart";
import SocialPlaceboMatrix from "./SocialPlaceboMatrix";
import TaskBChart from "./TaskBChart";
import AnimatedStat from "./AnimatedStat";

const TaskDropdown = ({
  label,
  title,
  description




}: {label: string;title: string;description: string;}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.995]">
        
        <span className="font-body text-xs font-semibold uppercase tracking-widest text-highlight shrink-0">
          {label}
        </span>
        <div className="flex-1 min-w-0">
          <span className="font-display font-bold text-sm md:text-base">{title}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1">
            <div className="border-t pt-4">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

const patterns = [
{
  title: "Baseline",
  bullets: [
  "Pairs working however they chose",
  "Individual or shared AI use, no protocol",
  "Reference point"]

},
{
  title: "True Joint",
  bullets: [
  "Working together",
  "Joint prompting using shared conversation",
  "AI acts as shared drafter"]

},
{
  title: "Parallel Play",
  bullets: [
  "Working together (meeting, talking)",
  "But still prompting Copilot individually",
  "Feels collaborative, but AI not integrated"]

},
{
  title: "Stranded",
  bullets: [
  "Intended collaboration",
  "But partner no-show/technical breakdown/workflow failure",
  "Collaboration failed to materialize"]

}];


const FlipCard = ({
  num,
  heading,
  sub




}: {num: string;heading: React.ReactNode;sub: string;}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer active:scale-[0.97] transition-transform duration-200"
      style={{ perspective: "800px" }}
      onClick={() => setFlipped(!flipped)}>
      
      <div
        className="relative w-full transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}>
        
        {/* Front face */}
        <div
          className="relative bg-card rounded-xl border shadow-sm px-6 py-10 flex flex-col items-center justify-center text-center min-h-[220px]"
          style={{ backfaceVisibility: "hidden" }}>
          
          <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-display font-bold text-xl mb-3">
            {num}
          </div>
          <span className="font-body text-xs text-muted-foreground uppercase tracking-widest">
            Click to reveal
          </span>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 bg-card rounded-xl border shadow-sm px-6 pt-10 pb-6 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}>
          
          <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-display font-bold text-lg">
            {num}
          </div>
          <p className="font-display font-bold text-base md:text-lg leading-snug mb-3">
            {heading}
          </p>
          <p className="font-body text-sm text-muted-foreground italic leading-relaxed">
            {sub}
          </p>
        </div>
      </div>
    </div>);

};

const CollaborationPatterns = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div>
      <h4 className="font-display text-lg md:text-xl font-bold mb-4">
        The Four Collaboration Patterns We Observed
      </h4>
      <div className="grid grid-cols-2 rounded-xl border shadow-sm overflow-hidden bg-card">
        {patterns.map((p, i) => {
          const isOpen = openIdx === i;
          const isTop = i < 2;
          const isLeft = i % 2 === 0;
          return (
            <button
              key={p.title}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className={`relative text-left px-5 py-5 transition-colors hover:bg-muted/30 active:scale-[0.98] ${
              isTop ? "border-b" : ""} ${
              isLeft ? "border-r" : ""}`}>
              
              <div className="flex items-start justify-between gap-2">
                <span className="font-display font-bold text-sm md:text-base">
                  {p.title}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                
              </div>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                
                <div className="overflow-hidden">
                  <ul className="mt-3 space-y-1.5">
                    {p.bullets.map((b) =>
                    <li
                      key={b}
                      className="font-body text-sm text-muted-foreground leading-snug flex items-start gap-2">
                      
                        <span className="text-highlight mt-1.5 shrink-0 w-1 h-1 rounded-full bg-highlight" />
                        {b}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </button>);

        })}
      </div>
    </div>);

};

const TheExperiment = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section id="experiment" ref={ref} className="px-6 py-20 md:py-28 surface-warm">
      <div className="mx-auto max-w-3xl">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          
          The Experiment
        </h2>

        {/* Task A section */}
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            transitionDelay: isVisible ? "100ms" : "0ms",
            filter: isVisible ? "blur(0)" : "blur(4px)"
          }}>
          
          <h3 className="font-display text-xl md:text-2xl font-bold mb-4">
            Task A: AI Adoption Action Plan
          </h3>

          <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
            In the first task, pairs of employees were asked to draft an AI
            adoption strategy for their company.
          </p>

          <div className="mb-6">
            <TaskDropdown
              label="Task A"
              title="Pair Task — AI Adoption Action Plan"
              description='Pairs produced a one-page "AI Adoption Action Plan" tailored to their organizational function within a 30-minute time cap. To prevent generic outputs, the task imposed an "anti-generic" constraint: every item required either a specific noun (e.g., a named system, dataset, or stakeholder) or a quantitative metric. Each pair produced a single shared document.' />
            
          </div>

          <div className="font-body text-base text-muted-foreground leading-relaxed space-y-4">
            <p>
              The employees were divided into two groups:
            </p>

            {/* Forking arrows visual — animated on scroll */}
            <div className="flex flex-col items-center mt-2 mb-1" ref={(el) => {
              if (!el || el.dataset.observed) return;
              el.dataset.observed = 'true';
              const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                  el.classList.add('fork-visible');
                  obs.disconnect();
                }
              }, { threshold: 0.5 });
              obs.observe(el);
            }}>
              {/* Vertical stem */}
              <div className="w-px bg-muted-foreground/40 origin-top h-8 transition-transform duration-500 ease-out scale-y-0 [.fork-visible>&]:scale-y-100" />
              {/* Fork point */}
              <div className="relative w-[280px] md:w-[360px] h-8">
                <div className="absolute top-0 right-1/2 h-px bg-muted-foreground/40 origin-right w-1/2 transition-transform duration-[400ms] ease-out delay-500 scale-x-0 [.fork-visible_&]:scale-x-100" />
                <div className="absolute top-0 left-1/2 h-px bg-muted-foreground/40 origin-left w-1/2 transition-transform duration-[400ms] ease-out delay-500 scale-x-0 [.fork-visible_&]:scale-x-100" />
                <div className="absolute left-0 top-0 flex flex-col items-center opacity-0 -translate-y-1 transition-all duration-[400ms] ease-out delay-[850ms] [.fork-visible_&]:opacity-100 [.fork-visible_&]:translate-y-0">
                  <div className="w-px h-6 bg-muted-foreground/40" />
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-muted-foreground/40" />
                </div>
                <div className="absolute right-0 top-0 flex flex-col items-center opacity-0 -translate-y-1 transition-all duration-[400ms] ease-out delay-[850ms] [.fork-visible_&]:opacity-100 [.fork-visible_&]:translate-y-0">
                  <div className="w-px h-6 bg-muted-foreground/40" />
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-muted-foreground/40" />
                </div>
              </div>
            </div>

            {/* Two cards — fade in after arrows */}
            <div className="grid grid-cols-2 gap-4" ref={(el) => {
              if (!el || el.dataset.observed) return;
              el.dataset.observed = 'true';
              const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                  el.classList.add('cards-visible');
                  obs.disconnect();
                }
              }, { threshold: 0.3 });
              obs.observe(el);
            }}>
              <div className="bg-card rounded-lg border shadow-sm p-5 text-center opacity-0 translate-y-3 transition-all duration-500 ease-out delay-[1100ms] [.cards-visible_&]:opacity-100 [.cards-visible_&]:translate-y-0">
                <span className="inline-block font-body text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2">Control</span>
                <p className="font-body text-sm text-foreground leading-relaxed">Naturalistic approach: pairs were instructed to collaborate however they wanted, using AI in their preferred way

                </p>
              </div>
              <div className="bg-card rounded-lg border-2 border-[hsl(var(--highlight))] shadow-sm p-5 text-center opacity-0 translate-y-3 transition-all duration-500 ease-out delay-[1200ms] [.cards-visible_&]:opacity-100 [.cards-visible_&]:translate-y-0">
                <span className="inline-block font-body text-[10px] font-semibold uppercase tracking-widest text-highlight mb-2">Treatment</span>
                <p className="font-body text-sm text-foreground leading-relaxed">AI-first protocol: pairs were mandated to follow a structured collaborative workflow integrating AI into how they collaborated

                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-10">
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-highlight mb-3">
              The Results
            </h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              Compared to pairs allowed to use AI naturalistically, those
              assigned to the mandated workflow:
            </p>
            <div className="space-y-1">
              <AnimatedStat value="−5 pts" description="scored nearly 5 points lower in document quality" delay={0} />
              <AnimatedStat value="8×" description="were over 8× more likely not to produce a document at all" delay={200} />
            </div>
          </div>

          {/* Collaboration Patterns */}
          <div
            className={`mt-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              transitionDelay: isVisible ? "200ms" : "0ms",
              filter: isVisible ? "blur(0)" : "blur(4px)"
            }}>
            <div className="font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-5 mb-10">
              <p className="font-display text-lg md:text-xl font-bold text-foreground">
                What does this mean? Why did the control group perform better than the treated group?
              </p>
              <p>
                One possible explanation: mandating a new AI workflow introduces coordination friction while employees are still figuring out how to use the system. The overhead of synchronizing, meeting, and following a protocol may have cost more than it added.
              </p>
              <p>
                We also observed that collaboration quality varied across groups, which may have affected the results.
              </p>
            </div>
            
            <CollaborationPatterns />
          </div>

          {/* Fidelity Gradient chart */}
          <div
            className={`mt-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              transitionDelay: isVisible ? "300ms" : "0ms",
              filter: isVisible ? "blur(0)" : "blur(4px)"
            }}>
            
            <FidelityGradientChart />
          </div>

          {/* Social Placebo Matrix */}
          <div
            className={`mt-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              transitionDelay: isVisible ? "350ms" : "0ms",
              filter: isVisible ? "blur(0)" : "blur(4px)"
            }}>
            
            <SocialPlaceboMatrix />
          </div>

          {/* Key Takeaway */}
          <div
            className={`mt-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              transitionDelay: isVisible ? "400ms" : "0ms",
              filter: isVisible ? "blur(0)" : "blur(4px)"
            }}>
            
            <h3 className="font-display text-xl md:text-2xl font-bold text-center mb-8">
              Takeaway: Workflow, Not Togetherness, Is the Mechanism
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
              {
                num: "1",
                heading:
                <>
                      <em>Parallel Play</em> feels{" "}
                      <span className="underline decoration-highlight decoration-2 underline-offset-2">
                        collaborative
                      </span>
                      , but behaves like baseline.
                    </>,

                sub: "Togetherness alone isn\u2019t the mechanism."
              },
              {
                num: "2",
                heading:
                <>
                      Only <em>True Joint</em> was associated with higher scores.
                    </>,

                sub: "Shared human context flowing into the AI mattered more than meeting alone."
              },
              {
                num: "3",
                heading: <>Workflow design determines outcomes.</>,
                sub: "Meetings don\u2019t drive value \u2014 interaction patterns do."
              }].
              map((card, i) =>
              <FlipCard key={i} num={card.num} heading={card.heading} sub={card.sub} />
              )}
            </div>
          </div>
        </div>

        {/* Task B section */}
        <div
          className={`mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            transitionDelay: isVisible ? "500ms" : "0ms",
            filter: isVisible ? "blur(0)" : "blur(4px)"
          }}>
          
          <h3 className="font-display text-xl md:text-2xl font-bold mb-4">
            Task B: Communications Strategy
          </h3>

          <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
            In the second task, the pairs were dissolved and employees were asked
            to work individually to develop a communications strategy.
          </p>

          <div className="mb-6">
            <TaskDropdown
              label="Task B"
              title="Individual Task — Communications Strategy"
              description="Each participant independently developed a strategic communications response addressing three stakeholder concerns about AI adoption at Gap Inc.: (a) data transparency and privacy, (b) labor displacement, and (c) environmental considerations related to AI energy footprint." />
            
          </div>

          <div className="font-body text-base text-muted-foreground leading-relaxed space-y-4">
            <p>
              In this task, we tested a different intervention: Not workflow
              redesign, but mindset change.
            </p>
            <p>Before doing the task, employees were randomly assigned to receive either:</p>

            {/* Forking arrows visual — animated on scroll */}
            <div className="flex flex-col items-center mt-2 mb-1" ref={(el) => {
              if (!el || el.dataset.observed) return;
              el.dataset.observed = 'true';
              const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                  el.classList.add('fork-visible');
                  obs.disconnect();
                }
              }, { threshold: 0.5 });
              obs.observe(el);
            }}>
              {/* Vertical stem */}
              <div className="w-px bg-muted-foreground/40 origin-top h-8 transition-transform duration-500 ease-out scale-y-0 [.fork-visible>&]:scale-y-100" />
              {/* Fork point */}
              <div className="relative w-[280px] md:w-[360px] h-8">
                {/* Horizontal bar - left half */}
                <div className="absolute top-0 right-1/2 h-px bg-muted-foreground/40 origin-right w-1/2 transition-transform duration-[400ms] ease-out delay-500 scale-x-0 [.fork-visible_&]:scale-x-100" />
                {/* Horizontal bar - right half */}
                <div className="absolute top-0 left-1/2 h-px bg-muted-foreground/40 origin-left w-1/2 transition-transform duration-[400ms] ease-out delay-500 scale-x-0 [.fork-visible_&]:scale-x-100" />
                {/* Left vertical + arrow */}
                <div className="absolute left-0 top-0 flex flex-col items-center opacity-0 -translate-y-1 transition-all duration-[400ms] ease-out delay-[850ms] [.fork-visible_&]:opacity-100 [.fork-visible_&]:translate-y-0">
                  <div className="w-px h-6 bg-muted-foreground/40" />
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-muted-foreground/40" />
                </div>
                {/* Right vertical + arrow */}
                <div className="absolute right-0 top-0 flex flex-col items-center opacity-0 -translate-y-1 transition-all duration-[400ms] ease-out delay-[850ms] [.fork-visible_&]:opacity-100 [.fork-visible_&]:translate-y-0">
                  <div className="w-px h-6 bg-muted-foreground/40" />
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-muted-foreground/40" />
                </div>
              </div>
            </div>

            {/* Two cards — fade in after arrows */}
            <div className="grid grid-cols-2 gap-4" ref={(el) => {
              if (!el || el.dataset.observed) return;
              el.dataset.observed = 'true';
              const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) {
                  el.classList.add('cards-visible');
                  obs.disconnect();
                }
              }, { threshold: 0.3 });
              obs.observe(el);
            }}>
              <div className="bg-card rounded-lg border shadow-sm p-5 text-center opacity-0 translate-y-3 transition-all duration-500 ease-out delay-[1100ms] [.cards-visible_&]:opacity-100 [.cards-visible_&]:translate-y-0">
                <span className="inline-block font-body text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 mb-2">Control</span>
                <p className="font-body text-sm text-foreground leading-relaxed">
                  Standard feature‑focused AI training
                </p>
              </div>
              <div className="bg-card rounded-lg border-2 border-[hsl(var(--highlight))] shadow-sm p-5 text-center opacity-0 translate-y-3 transition-all duration-500 ease-out delay-[1200ms] [.cards-visible_&]:opacity-100 [.cards-visible_&]:translate-y-0">
                <span className="inline-block font-body text-[10px] font-semibold uppercase tracking-widest text-highlight mb-2">Treatment</span>
                <p className="font-body text-sm text-foreground leading-relaxed">
                  AI Mindset training reframing AI as a <em className="not-italic font-semibold">thought partner</em> rather than a tool
                </p>
              </div>
            </div>
            <p>
              The AI Mindset training was developed by Conor Grennan, CEO of AI Mindset and former Chief AI Architect at NYU Stern, whose behavioral approach to AI adoption formed the basis of the treatment condition.
            </p>
          </div>



          {/* Results */}
          <div className="mt-10">
            <h4 className="font-body text-xs font-semibold uppercase tracking-widest text-highlight mb-3">
              The Results
            </h4>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              Participants who received AI Mindset training were associated with:
            </p>
            <div className="space-y-1">
              <AnimatedStat value="2×" description="the odds of producing a perfect‑score document (exploratory binary model)" delay={0} />
              <AnimatedStat value="+15 pp" description="a 15‑percentage‑point increase in perfect‑score outputs" delay={200} />
            </div>
          </div>

          {/* Alex Farach Quote */}
          <div className="mt-12 mb-12">
            <blockquote className="relative border-l-4 border-[hsl(var(--highlight))] pl-6 py-2">
              <p className="font-display text-base md:text-lg font-medium leading-relaxed italic text-foreground/85">
                In our exploratory analysis, about 62 out of 100 people who got standard tool training produced a top-quality document. With AI Mindset training, it was 77. That's 15 more people per 100 clearing the bar, from a single session. The continuous model was null, so we're cautious about this, but the pattern was consistent across multiple thresholds. If it holds up in further testing, the practical implications are worth paying attention to.
              </p>
            </blockquote>
            <div className="mt-4 pl-6">
              <p className="font-display font-bold text-sm">Alex Farach</p>
              <p className="font-body text-sm text-muted-foreground">Microsoft Researcher</p>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-10">
            <TaskBChart />
          </div>

          {/* Conor Grennan Quote */}
          <div className="mt-14 text-center">
            <blockquote className="relative">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-6xl text-highlight/30 select-none leading-none">"</span>
              <p className="font-display text-lg md:text-xl font-bold leading-snug italic text-foreground/90">
                When we stop treating AI like a tool and start treating it like a teammate, we unlock its real potential - not just to answer questions, but to expand how we think.
              </p>
            </blockquote>
            <div className="mt-6">
              <p className="font-display font-bold text-sm">Conor Grennan</p>
              <p className="font-body text-sm text-muted-foreground">CEO, AI Mindset - Former Chief AI Architect, NYU Stern</p>
            </div>
          </div>

          {/* Task B Takeaway */}
          <div
            className={`mt-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{
              transitionDelay: isVisible ? "600ms" : "0ms",
              filter: isVisible ? "blur(0)" : "blur(4px)"
            }}>
            
            <h3 className="font-display text-xl md:text-2xl font-bold text-center mb-8">
              Takeaway: Mindset Shapes Outcomes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
              {
                num: "1",
                heading:
                <>
                      A brief{" "}
                      <span className="underline decoration-highlight decoration-2 underline-offset-2">
                        AI Mindset intervention
                      </span>{" "}
                      showed promising results.
                    </>,

                sub: "A single training session was associated with higher odds of a perfect score."
              },
              {
                num: "2",
                heading:
                <>
                      How employees <em>think</em> about AI shaped their results in this study.
                    </>,

                sub: "The type of training mattered, though more research is needed to confirm."
              },
              {
                num: "3",
                heading:
                <>
                      Iterative AI engagement was associated with better outcomes than transactional use.
                    </>,

                sub: "Conversation over commands."
              }].
              map((card, i) =>
              <FlipCard key={i} num={card.num} heading={card.heading} sub={card.sub} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TheExperiment;
import Hero from "@/components/paper/Hero";
import Footer from "@/components/Footer";
import KeyFindings from "@/components/paper/KeyFindings";
import Methodology from "@/components/paper/Methodology";
import TheExperiment from "@/components/paper/TheExperiment";
import HierarchyPyramid from "@/components/paper/HierarchyPyramid";
import HangoverChart from "@/components/paper/HangoverChart";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Sticky minimal nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-3">
          <span className="font-display font-bold text-sm tracking-tight">Scaffolding Human–AI Collaboration</span>
          <nav className="hidden sm:flex gap-6 font-body text-sm text-muted-foreground">
            <a href="#methodology" className="hover:text-foreground transition-colors">Methodology</a>
            <a href="#experiment" className="hover:text-foreground transition-colors">Experiment</a>
            
          </nav>
        </div>
      </header>

      <Hero />
      <KeyFindings />
      <Methodology />

      {/* Quote */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="relative">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-6xl text-highlight/30 select-none leading-none">"</span>
            <p className="font-display text-xl md:text-2xl font-bold leading-snug italic text-foreground/90">
              This study was an important investment in understanding - scientifically - how to drive AI adoption. It reflects Gap Inc.'s strategy to accelerate AI within the company: Enable, Optimize, Reinvent.&nbsp;You don’t reinvent the business with AI overnight - you enable the people, optimize the work, and only then scale transformation.
            </p>
          </blockquote>
          <div className="mt-6">
            <p className="font-display font-bold text-sm">Sven Gerjets</p>
            <p className="font-body text-sm text-muted-foreground">CIO, GAP Inc.</p>
          </div>
        </div>
      </section>

      <TheExperiment />

      {/* So What Does This All Mean */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
            So What Does This All Mean?
          </h2>
          <div className="font-body text-base md:text-lg text-muted-foreground leading-relaxed space-y-6">
            <p>
              In our study, mandating a new AI‑mediated workflow introduced friction that affected both task performance and subsequent beliefs about AI. Participants who experienced the structured protocol entered the next task with lower beliefs than those who had used AI more flexibly, a measurable <em className="text-foreground font-medium not-italic">hangover effect</em>.
            </p>
            <HangoverChart />
            <p>
              A brief intervention that reframed AI as a collaborative partner was associated with higher odds of producing a perfect-score document (OR = 2.07, p = .022), though the primary continuous model was null.
            </p>
            <p className="text-foreground font-display font-bold text-lg md:text-xl leading-snug">
              Before redesigning how employees work with AI, organizations may benefit from addressing how employees <span className="underline decoration-highlight decoration-2 underline-offset-4">think</span> about it — though our results suggest this as a hypothesis rather than a confirmed finding.
            </p>
            <HierarchyPyramid />
          </div>

          {/* End-of-main-read divider */}
          <div className="flex items-center justify-center gap-3 mt-16 mb-4">
            <span className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-muted-foreground/30" />
            <span className="text-muted-foreground/40 text-lg tracking-[0.4em] font-serif select-none">· ◆ ·</span>
            <span className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-muted-foreground/30" />
          </div>
        </div>
      </section>

      {/* Important Caveats */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
            Important Caveats
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "Time-of-Day Confound",
                content: "The study design assigned all control participants to the morning and all treatment participants to the afternoon. This means any observed differences could also be due to time-of-day effects (e.g., fatigue, motivation) in addition to the interventions themselves."
              },
              {
                title: "High Attrition in the Treatment Group",
                content: "Treatment participants were much less likely to complete the tasks.\n\nTask A: 27% of treatment pairs didn't submit a document vs. 4% in control.\n\nTask B: 55% of treatment individuals didn't submit vs. 37% in control."
              },
              {
                title: "AI Grading Bias Toward Longer Documents",
                content: "The AI grader favored longer documents (\u03C1 = 0.65 between word count and score for Task A). Treatment documents were shorter on average (454 vs. 740 words), which may have penalized them. Adjusting for word count reduced the Task A effect by 33%. Human validation confirmed the bias was symmetric across conditions, but it remains a real measurement concern."
              },
              {
                title: "Ceiling Effects in Individual Task",
                content: "68% of Task B documents scored 20/20 on the AI rubric. Human raters gave the same documents a mean of 11.8/20. The rubric could not distinguish good work from great work, which is why the continuous model was null. We used a post-hoc binary model (perfect score vs. not) to detect differences the continuous model could not."
              },
              {
                title: "Low Compliance with the Structured Protocol",
                content: "Less than 25% of treatment pairs fully followed the structured \"Create-Out-Loud\" protocol in Task A. Many couldn't meet synchronously or defaulted to individual AI use. The main negative finding may reflect logistical challenges rather than the protocol's inherent effectiveness."
              },
            ].map((caveat) => (
              <details
                key={caveat.title}
                className="group rounded-xl border bg-card/60 shadow-sm transition-all hover:shadow-md"
              >
                <summary className="cursor-pointer select-none px-6 py-4 font-display text-base md:text-lg font-semibold flex items-center justify-between list-none">
                  {caveat.title}
                  <span className="ml-4 text-muted-foreground transition-transform duration-300 group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1">
                  <p className="font-serif text-base text-muted-foreground leading-relaxed">
                    {caveat.content}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>


      {/* Research Team */}
      <section className="px-6 py-20 md:py-28 surface-warm">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12">
            The Microsoft Research Team
          </h2>
          <div className="space-y-8">
            {[
              { name: "Alex Farach", bio: "Alex is a Senior Data Scientist & AI Economic Insights Lead in AI Business Solutions Marketing where he researches the evolution of the Frontier Firm." },
              { name: "Alexia Cambon", bio: "Alexia is a Director in Microsoft\u2019s Office of Applied Research where she focuses on the future of work and collaborative AI." },
              { name: "Rebecca Janssen", bio: "Rebecca is a Senior Applied Scientist in the Office of the Chief Scientific Officer at Microsoft, where she conducts research at the intersection of technology, economics and society." },
              { name: "Lev Tankelevitch", bio: "Lev is a Senior Researcher at Microsoft Research’s Cambridge Lab where he studies how to augment thinking and workflows using AI, particularly in collaborative work, as well as the broader impacts of Generative AI on cognition, people, and society." },
              { name: "Connie Hsueh", bio: "Connie is a Senior Researcher with Microsoft AI\u2019s Futures Team where she studies human-AI interaction." },
            ].map((person) => (
              <div key={person.name}>
                <h3 className="font-display font-bold text-base md:text-lg">{person.name}</h3>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mt-1">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 mt-20">
            The Gap Inc. Team
          </h2>
          <div className="space-y-8">
            {[
              { name: "Sven Gerjets", bio: "Sven is Gap Inc's CIO and lead the company's digital transformation, data science and technology portfolio." },
              { name: "Mario Diaz", bio: "Mario is a Sr Manager, Learning Experience Corporate, who champions AI experimentation and adoption by helping teams turn curiosity into practical impact." },
            ].map((person) => (
              <div key={person.name}>
                <h3 className="font-display font-bold text-base md:text-lg">{person.name}</h3>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mt-1">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
          {/* Whitepaper CTA */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-14 flex items-center gap-5 rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex-shrink-0 w-20 h-28 rounded-lg bg-secondary border flex flex-col items-center justify-center gap-1.5 group-hover:border-[hsl(var(--highlight))] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-highlight transition-colors"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground font-medium">PDF</span>
            </div>
            <div>
              <p className="font-display font-bold text-lg md:text-xl text-foreground group-hover:text-highlight transition-colors">
                Read the full paper here
              </p>
              <p className="font-body text-sm text-muted-foreground mt-1">Download the complete research paper</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-muted-foreground group-hover:text-highlight group-hover:translate-x-1 transition-all flex-shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mt-12">
            Interested in learning more about our work? Follow Microsoft&rsquo;s New Future of Work research initiative here:{" "}
            <a href="https://www.microsoft.com/en-us/research/theme/the-new-future-of-work/" target="_blank" rel="noopener noreferrer" className="text-highlight underline underline-offset-2 hover:text-foreground transition-colors">
              The New Future of Work &ndash; Microsoft Research
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

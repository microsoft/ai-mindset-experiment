const PersonIcon = ({ className = "" }: {className?: string;}) =>
<svg viewBox="0 0 24 28" fill="currentColor" className={className}>
    <circle cx="12" cy="7" r="5.5" />
    <path d="M2 26c0-5.523 4.477-10 10-10s10 4.477 10 10" />
  </svg>;


const AiBox = ({ className = "" }: {className?: string;}) =>
<div className={`flex items-center justify-center w-10 h-10 rounded-md border-2 border-foreground/70 font-display font-bold text-sm ${className}`}>
    AI
  </div>;


const DoubleArrow = ({ dashed = false, className = "" }: {dashed?: boolean;className?: string;}) =>
<svg viewBox="0 0 32 16" className={`w-7 h-3.5 ${className}`}>
    <line x1="4" y1="8" x2="28" y2="8" stroke="currentColor" strokeWidth="2" {...dashed && { strokeDasharray: "4 3" }} />
    <polygon points="26,4 32,8 26,12" fill="currentColor" />
    <polygon points="6,4 0,8 6,12" fill="currentColor" />
  </svg>;


const DownArrow = ({ className = "" }: {className?: string;}) =>
<svg viewBox="0 0 16 32" className={`w-4 h-8 text-highlight ${className}`}>
    <line x1="8" y1="0" x2="8" y2="26" stroke="currentColor" strokeWidth="2.5" />
    <polygon points="3,22 8,30 13,22" fill="currentColor" />
  </svg>;


const ThoughtBubble = ({ label }: {label: string;}) =>
<div className="relative">
    <div className="bg-muted/60 border border-border rounded-full px-3 py-1 font-body text-xs font-medium">
      {label}
    </div>
    <div className="absolute -bottom-2 left-4 flex gap-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-border" />
      <span className="w-1 h-1 rounded-full bg-border" />
    </div>
  </div>;


const LABEL_COL = "w-[120px] md:w-[160px] shrink-0";
const GRID = "grid grid-cols-[120px_1fr_1fr] md:grid-cols-[160px_1fr_1fr]";

const ExperimentDiagram = () => {
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Column headers */}
      <div className={`${GRID} border-b`}>
        <div className={`${LABEL_COL} border-r bg-muted/20`} />
        <div className="px-6 py-4 border-r text-center">
          <span className="font-display font-bold text-highlight text-sm md:text-base">Treatment</span>
        </div>
        <div className="px-6 py-4 text-center">
          <span className="font-display font-bold text-highlight text-sm md:text-base">Control</span>
        </div>
      </div>

      {/* Task A row */}
      <div className={`${GRID} items-stretch`}>
        <div className={`${LABEL_COL} flex flex-col justify-center px-4 md:px-6 py-8 border-r bg-muted/20`}>
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-highlight">TASK A</span>
          <span className="font-display font-bold text-sm md:text-base mt-1">Behavioural scaffolding</span>
          <span className="font-body text-xs text-muted-foreground mt-0.5">(paired task)</span>
        </div>

        {/* Treatment - Task A */}
        <div className="flex flex-col items-center justify-center py-8 px-4 border-r">
          <div className="flex items-center gap-3 mb-3">
            <PersonIcon className="w-8 h-8 text-foreground/80" />
            <DoubleArrow className="text-foreground/40" />
            <PersonIcon className="w-8 h-8 text-foreground/80" />
          </div>
          <svg viewBox="0 0 8 16" className="w-2 h-4 text-foreground/30">
            <line x1="4" y1="0" x2="4" y2="16" stroke="currentColor" strokeWidth="2" />
          </svg>
          <AiBox />
          <p className="font-body text-xs text-muted-foreground mt-3 text-center leading-snug max-w-[140px]">
            AI-First Protocol (Mandated “Create-Out-Loud” collaborative workflow)
          </p>
        </div>

        {/* Control - Task A */}
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <div className="flex items-start gap-6">
            <div className="flex items-center gap-1.5">
              <PersonIcon className="w-7 h-7 text-foreground/80" />
              <DoubleArrow dashed className="text-foreground/40 !w-5 !h-3" />
              <AiBox className="!w-8 !h-8 !text-xs" />
            </div>
            <div className="flex items-center gap-1.5">
              <PersonIcon className="w-7 h-7 text-foreground/80" />
              <DoubleArrow dashed className="text-foreground/40 !w-5 !h-3" />
              <AiBox className="!w-8 !h-8 !text-xs" />
            </div>
          </div>
          <p className="font-body text-xs text-muted-foreground mt-4 text-center leading-snug max-w-[160px]">Naturalistic Protocol (No prescribed workflow)
          </p>
        </div>
      </div>

      {/* Divider with arrows */}
      <div className={`${GRID} items-center`}>
        <div className={`${LABEL_COL} border-r bg-muted/20`}>
          <div className="border-t border-dashed border-border" />
        </div>
        <div className="flex justify-center py-2 border-r">
          <DownArrow />
        </div>
        <div className="flex justify-center py-2">
          <DownArrow />
        </div>
      </div>

      {/* Task B row */}
      <div className={`${GRID} items-stretch`}>
        <div className={`${LABEL_COL} flex flex-col justify-center px-4 md:px-6 py-8 border-r bg-muted/20`}>
          <span className="font-body text-xs font-semibold uppercase tracking-widest text-highlight">TASK B</span>
          <span className="font-display font-bold text-sm md:text-base mt-1">Cognitive scaffolding</span>
          <span className="font-body text-xs text-muted-foreground mt-0.5">(individual task)</span>
        </div>

        {/* Treatment - Task B */}
        <div className="flex flex-col items-center justify-center py-8 px-4 border-r">
          <ThoughtBubble label="Partner" />
          <div className="h-4" />
          <div className="flex items-center gap-2">
            <PersonIcon className="w-8 h-8 text-foreground/80" />
            <DoubleArrow className="text-foreground/40" />
            <AiBox />
          </div>
          <p className="font-body text-xs text-muted-foreground mt-4 text-center leading-snug max-w-[140px]">AI Mindset training (Thought partner framing)

          </p>
        </div>

        {/* Control - Task B */}
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <ThoughtBubble label="Tool" />
          <div className="h-4" />
          <div className="flex items-center gap-2">
            <PersonIcon className="w-8 h-8 text-foreground/80" />
            <DoubleArrow dashed className="text-foreground/40" />
            <AiBox />
          </div>
          <p className="font-body text-xs text-muted-foreground mt-4 text-center leading-snug max-w-[140px]">Standard Training
(Feature-based, tool framing)
          </p>
        </div>
      </div>
    </div>);
};

export default ExperimentDiagram;
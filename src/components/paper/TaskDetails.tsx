import { useState } from "react";
import { ChevronDown } from "lucide-react";

const tasks = [
  {
    id: "task-a",
    label: "Task A",
    title: "Pair Task — AI Adoption Action Plan",
    summary: "Pairs produced a one-page plan tailored to their organizational function within a 30-minute time cap.",
    description:
      'Pairs produced a one-page "AI Adoption Action Plan" tailored to their organizational function within a 30-minute time cap. To prevent generic outputs, the task imposed an "anti-generic" constraint: every item required either a specific noun (e.g., a named system, dataset, or stakeholder) or a quantitative metric. Each pair produced a single shared document.',
  },
  {
    id: "task-b",
    label: "Task B",
    title: "Individual Task — Communications Strategy",
    summary: "Each participant independently developed a communications strategy addressing three stakeholder concerns.",
    description:
      "Each participant independently developed a communications strategy addressing three stakeholder concerns about AI adoption at Gap Inc.: a) data governance and transparency, b) workforce transition issues and (c) sustainability considerations related to AI infrastructure.",
  },
];

const TaskDetails = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <div className="space-y-3">
      <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Task Details
      </h3>
      {tasks.map((task) => {
        const isOpen = openId === task.id;
        return (
          <div
            key={task.id}
            className="bg-card rounded-lg border shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggle(task.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors active:scale-[0.995]"
            >
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-highlight shrink-0">
                {task.label}
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-display font-bold text-sm md:text-base">
                  {task.title}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1">
                  <div className="border-t pt-4">
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskDetails;

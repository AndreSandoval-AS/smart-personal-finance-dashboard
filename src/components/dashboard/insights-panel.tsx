import { Sparkles } from "lucide-react";

interface InsightsPanelProps {
  insights: string[];
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <section className="glass-card-strong rounded-3xl p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="text-indigo-300" size={18} />
        <h2 className="panel-title">AI Insights</h2>
      </div>

      <ul className="space-y-3.5 text-sm text-slate-200">
        {insights.map((insight) => (
          <li
            key={insight}
            className="rounded-2xl border border-indigo-200/10 bg-slate-950/45 px-4 py-3.5 leading-relaxed"
          >
            {insight}
          </li>
        ))}
      </ul>
    </section>
  );
}

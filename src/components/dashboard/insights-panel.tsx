import { Sparkles } from "lucide-react";

interface InsightsPanelProps {
  insights: string[];
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <section className="glass-card-strong rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="text-indigo-300" size={18} />
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
      </div>

      <ul className="space-y-3 text-sm text-slate-200">
        {insights.map((insight) => (
          <li
            key={insight}
            className="rounded-xl border border-white/10 bg-slate-900/45 px-4 py-3 leading-relaxed"
          >
            {insight}
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export function SummaryCard({ title, value, subtitle, icon: Icon }: SummaryCardProps) {
  return (
    <article className="glass-card rounded-2xl p-5 shadow-lg shadow-black/25">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-300">{title}</p>
        <span className="rounded-lg bg-indigo-500/20 p-2 text-indigo-300">
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </article>
  );
}

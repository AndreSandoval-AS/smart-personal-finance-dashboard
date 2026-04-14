import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
}

export function SummaryCard({ title, value, subtitle, icon: Icon }: SummaryCardProps) {
  return (
    <article className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium tracking-wide text-slate-300">{title}</p>
        <span className="rounded-xl border border-indigo-300/20 bg-indigo-400/15 p-2.5 text-indigo-200">
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
    </article>
  );
}

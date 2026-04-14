"use client";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Wallet } from "lucide-react";
import { Doughnut, Line } from "react-chartjs-2";
import { chartPalette, chartTheme } from "@/lib/design-tokens";
import type { Expense } from "@/types/expense";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

interface ExpenseChartsProps {
  expenses: Expense[];
}

const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function getMonthlyTotals(expenses: Expense[]) {
  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    const month = expense.date.slice(0, 7);
    acc[month] = (acc[month] ?? 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(totals).sort((a, b) => a[0].localeCompare(b[0]));
}

function getCategoryTotals(expenses: Expense[]) {
  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(totals).sort((a, b) => b[1] - a[1]);
}

function tooltipConfig(): ChartOptions<"doughnut" | "line">["plugins"] {
  return {
    legend: { labels: { color: chartTheme.textSecondary } },
    tooltip: {
      backgroundColor: "rgba(2, 6, 23, 0.94)",
      borderColor: "rgba(148, 163, 184, 0.3)",
      borderWidth: 1,
      titleColor: chartTheme.textPrimary,
      bodyColor: chartTheme.textSecondary,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.label}: ${CURRENCY.format(context.parsed as number)}`,
      },
    },
  };
}

export function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  const monthlyData = getMonthlyTotals(expenses);
  const categoryData = getCategoryTotals(expenses);
  const hasCategoryData = categoryData.length > 0;
  const hasMonthlyData = monthlyData.length > 0;

  return (
    <section className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      <article className="glass-card rounded-3xl p-5 sm:p-6">
        <h2 className="panel-title mb-5">Category Breakdown</h2>
        {hasCategoryData ? (
          <Doughnut
            data={{
              labels: categoryData.map(([category]) => category),
              datasets: [
                {
                  data: categoryData.map(([, amount]) => amount),
                  backgroundColor: chartPalette,
                },
              ],
            }}
            options={{
              plugins: tooltipConfig(),
            }}
          />
        ) : (
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-950/30 px-6 text-center">
            <Wallet className="mb-3 text-slate-500" size={24} />
            <p className="text-sm font-medium text-slate-300">No category data yet</p>
            <p className="mt-1 text-xs text-slate-400">Add expenses to see your spending split.</p>
          </div>
        )}
      </article>

      <article className="glass-card rounded-3xl p-5 sm:p-6">
        <h2 className="panel-title mb-5">Monthly Spending Trend</h2>
        {hasMonthlyData ? (
          <Line
            data={{
              labels: monthlyData.map(([month]) => month),
              datasets: [
                {
                  label: "Spending",
                  data: monthlyData.map(([, amount]) => amount),
                  borderColor: chartTheme.line,
                  backgroundColor: chartTheme.lineFill,
                  tension: 0.35,
                  fill: true,
                },
              ],
            }}
            options={{
              scales: {
                x: { ticks: { color: chartTheme.textSecondary }, grid: { color: chartTheme.grid } },
                y: {
                  ticks: {
                    color: chartTheme.textSecondary,
                    callback: (value) => CURRENCY.format(Number(value)),
                  },
                  grid: { color: chartTheme.grid },
                },
              },
              plugins: tooltipConfig(),
            }}
          />
        ) : (
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-950/30 px-6 text-center">
            <Wallet className="mb-3 text-slate-500" size={24} />
            <p className="text-sm font-medium text-slate-300">No monthly trend data yet</p>
            <p className="mt-1 text-xs text-slate-400">Track expenses across dates to see trends.</p>
          </div>
        )}
      </article>
    </section>
  );
}

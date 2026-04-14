"use client";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
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

export function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  const monthlyData = getMonthlyTotals(expenses);
  const categoryData = getCategoryTotals(expenses);

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
        <h2 className="mb-4 text-lg font-semibold text-white">Category Breakdown</h2>
        <Doughnut
          data={{
            labels: categoryData.map(([category]) => category),
            datasets: [
              {
                data: categoryData.map(([, amount]) => amount),
                backgroundColor: [
                  "#6366F1",
                  "#06B6D4",
                  "#10B981",
                  "#F59E0B",
                  "#EF4444",
                  "#8B5CF6",
                  "#14B8A6",
                  "#64748B",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              legend: { labels: { color: "#cbd5e1" } },
            },
          }}
        />
      </article>

      <article className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
        <h2 className="mb-4 text-lg font-semibold text-white">Monthly Spending Trend</h2>
        <Line
          data={{
            labels: monthlyData.map(([month]) => month),
            datasets: [
              {
                label: "Spending",
                data: monthlyData.map(([, amount]) => amount),
                borderColor: "#818cf8",
                backgroundColor: "rgba(129,140,248,0.25)",
                tension: 0.35,
                fill: true,
              },
            ],
          }}
          options={{
            scales: {
              x: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(148,163,184,0.2)" } },
              y: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(148,163,184,0.2)" } },
            },
            plugins: {
              legend: { labels: { color: "#cbd5e1" } },
            },
          }}
        />
      </article>
    </section>
  );
}

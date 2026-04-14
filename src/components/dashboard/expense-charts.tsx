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
    <section className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      <article className="glass-card rounded-3xl p-5 sm:p-6">
        <h2 className="panel-title mb-5">Category Breakdown</h2>
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
            plugins: {
              legend: { labels: { color: chartTheme.textSecondary } },
            },
          }}
        />
      </article>

      <article className="glass-card rounded-3xl p-5 sm:p-6">
        <h2 className="panel-title mb-5">Monthly Spending Trend</h2>
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
              y: { ticks: { color: chartTheme.textSecondary }, grid: { color: chartTheme.grid } },
            },
            plugins: {
              legend: { labels: { color: chartTheme.textSecondary } },
            },
          }}
        />
      </article>
    </section>
  );
}

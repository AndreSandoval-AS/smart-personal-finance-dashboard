"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarRange, PiggyBank, TrendingUp } from "lucide-react";
import { ExpenseCharts } from "@/components/dashboard/expense-charts";
import { ExpenseForm } from "@/components/dashboard/expense-form";
import { ExpenseList } from "@/components/dashboard/expense-list";
import { InsightsPanel } from "@/components/dashboard/insights-panel";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { buildInsights } from "@/lib/insights";
import { loadExpenses, saveExpenses, seedExpenses } from "@/lib/storage";
import type { Expense } from "@/types/expense";

const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function getMonthKey(date: Date): string {
  return date.toISOString().slice(0, 7);
}

export function DashboardClient() {
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    typeof window === "undefined" ? seedExpenses : loadExpenses(),
  );

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const totals = useMemo(() => {
    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const currentMonth = getMonthKey(new Date());
    const monthlySpending = expenses
      .filter((expense) => expense.date.startsWith(currentMonth))
      .reduce((sum, expense) => sum + expense.amount, 0);

    const categoryTotals = expenses.reduce<Record<string, number>>((acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    }, {});

    const topCategory =
      Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";

    return { totalSpending, monthlySpending, topCategory };
  }, [expenses]);

  const insights = useMemo(() => buildInsights(expenses), [expenses]);

  function handleAddExpense(expense: Expense) {
    setExpenses((current) => [expense, ...current].sort((a, b) => b.date.localeCompare(a.date)));
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="glass-card rounded-2xl p-6 shadow-xl shadow-black/20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
          Personal Finance Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
          Track spending. Learn patterns. Save smarter.
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          A beginner-friendly dashboard built with local data, responsive charts, and AI-style
          suggestions so you can better manage your money.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Total Spending"
          value={CURRENCY.format(totals.totalSpending)}
          subtitle="All tracked expenses"
          icon={PiggyBank}
        />
        <SummaryCard
          title="Monthly Spending"
          value={CURRENCY.format(totals.monthlySpending)}
          subtitle="Current month only"
          icon={CalendarRange}
        />
        <SummaryCard
          title="Top Category"
          value={totals.topCategory}
          subtitle="Highest cost category"
          icon={TrendingUp}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[340px_1fr]">
        <div className="space-y-4">
          <ExpenseForm onAddExpense={handleAddExpense} />
          <InsightsPanel insights={insights} />
        </div>
        <div className="space-y-4">
          <ExpenseCharts expenses={expenses} />
          <ExpenseList expenses={expenses} />
        </div>
      </section>
    </main>
  );
}

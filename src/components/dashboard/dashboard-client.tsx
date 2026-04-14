"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarRange, PiggyBank, TrendingUp } from "lucide-react";
import { ExpenseCharts } from "@/components/dashboard/expense-charts";
import { ExpenseForm } from "@/components/dashboard/expense-form";
import { ExpenseList } from "@/components/dashboard/expense-list";
import { InsightsPanel } from "@/components/dashboard/insights-panel";
import { SummaryCard } from "@/components/dashboard/summary-card";
import {
  getMonthKey,
  getMonthlySpending,
  getTopCategory,
  getTotalSpending,
  sortExpensesByDateDesc,
} from "@/lib/expense-analytics";
import { buildInsights } from "@/lib/insights";
import { loadExpenses, saveExpenses, seedExpenses } from "@/lib/storage";
import type { Expense } from "@/types/expense";

const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function DashboardClient() {
  const [expenses, setExpenses] = useState<Expense[]>(() =>
    typeof window === "undefined" ? seedExpenses : loadExpenses(),
  );
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const totals = useMemo(() => {
    const totalSpending = getTotalSpending(expenses);
    const currentMonth = getMonthKey(new Date());
    const monthlySpending = getMonthlySpending(expenses, currentMonth);
    const topCategory = getTopCategory(expenses);

    return { totalSpending, monthlySpending, topCategory };
  }, [expenses]);

  const insights = useMemo(() => buildInsights(expenses), [expenses]);

  function handleSaveExpense(expense: Expense) {
    setExpenses((current) => {
      const expenseExists = current.some((item) => item.id === expense.id);
      const nextExpenses = expenseExists
        ? current.map((item) => (item.id === expense.id ? expense : item))
        : [expense, ...current];

      return sortExpensesByDateDesc(nextExpenses);
    });
    setEditingExpense(null);
  }

  function handleEditExpense(expense: Expense) {
    setEditingExpense(expense);
  }

  function handleDeleteExpense(expenseId: string) {
    setExpenses((current) => current.filter((expense) => expense.id !== expenseId));
    setEditingExpense((current) => (current?.id === expenseId ? null : current));
  }

  function handleCancelEdit() {
    setEditingExpense(null);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:gap-7 lg:px-8">
      <header className="glass-card rounded-3xl p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300/95">
          Personal Finance Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Track spending. Learn patterns. Save smarter.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          A beginner-friendly dashboard built with local data, responsive charts, and AI-style
          suggestions so you can better manage your money.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3 lg:gap-5">
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

      <section className="grid gap-4 xl:grid-cols-[360px_1fr] lg:gap-5">
        <div className="space-y-4 lg:space-y-5">
          <ExpenseForm
            key={editingExpense?.id ?? "new-expense"}
            onSaveExpense={handleSaveExpense}
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
          />
          <InsightsPanel insights={insights} />
        </div>
        <div className="space-y-4 lg:space-y-5">
          <ExpenseCharts expenses={expenses} />
          <ExpenseList
            expenses={expenses}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </section>
    </main>
  );
}

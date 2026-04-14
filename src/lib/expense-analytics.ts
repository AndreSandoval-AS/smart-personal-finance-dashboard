import type { Expense } from "@/types/expense";

export interface CategoryTotal {
  category: string;
  amount: number;
}

export interface MonthlyTotal {
  month: string;
  amount: number;
}

export function getMonthKey(date: Date): string {
  return date.toISOString().slice(0, 7);
}

export function sortExpensesByDateDesc(expenses: Expense[]): Expense[] {
  return [...expenses].sort((a, b) => b.date.localeCompare(a.date));
}

export function getTotalSpending(expenses: Expense[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function getMonthlySpending(expenses: Expense[], monthKey: string): number {
  return expenses
    .filter((expense) => expense.date.startsWith(monthKey))
    .reduce((sum, expense) => sum + expense.amount, 0);
}

export function getCategoryTotals(expenses: Expense[]): CategoryTotal[] {
  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function getMonthlyTotals(expenses: Expense[]): MonthlyTotal[] {
  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    const month = expense.date.slice(0, 7);
    acc[month] = (acc[month] ?? 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function getTopCategory(expenses: Expense[]): string {
  return getCategoryTotals(expenses)[0]?.category ?? "N/A";
}

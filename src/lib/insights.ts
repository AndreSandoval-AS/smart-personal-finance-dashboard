import type { Expense } from "@/types/expense";

const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function getCurrentMonthKey(): string {
  return new Date().toISOString().slice(0, 7);
}

export function buildInsights(expenses: Expense[]): string[] {
  if (!expenses.length) {
    return [
      "Start by adding your first expense to unlock spending insights.",
      "Tracking expenses weekly helps spot patterns early.",
    ];
  }

  const totalsByCategory = expenses.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + item.amount;
    return acc;
  }, {});

  const [topCategory = "Other"] = Object.entries(totalsByCategory).sort(
    (a, b) => b[1] - a[1],
  )[0] ?? ["Other", 0];

  const topCategoryTotal = totalsByCategory[topCategory] ?? 0;
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const currentMonthKey = getCurrentMonthKey();
  const monthlyTotal = expenses
    .filter((item) => item.date.startsWith(currentMonthKey))
    .reduce((sum, item) => sum + item.amount, 0);

  const avgExpense = total / expenses.length;

  return [
    `Your top spending category is ${topCategory} at ${CURRENCY.format(topCategoryTotal)}. Consider setting a soft cap for this category.`,
    `This month you have spent ${CURRENCY.format(monthlyTotal)}. Try reducing one discretionary purchase to stay on target.`,
    `Your average expense is ${CURRENCY.format(avgExpense)}. Grouping errands could lower transaction frequency and save money.`,
  ];
}

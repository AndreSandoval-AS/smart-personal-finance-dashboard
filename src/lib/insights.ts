import type { Expense } from "@/types/expense";
import {
  getCategoryTotals,
  getMonthKey,
  getMonthlySpending,
  getTotalSpending,
} from "@/lib/expense-analytics";

const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function shiftMonth(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function getLargestExpense(expenses: Expense[]): Expense | null {
  if (!expenses.length) {
    return null;
  }

  return expenses.reduce((largest, current) =>
    current.amount > largest.amount ? current : largest,
  );
}

function getMoMMessage(currentMonthTotal: number, previousMonthTotal: number): string {
  if (previousMonthTotal <= 0 && currentMonthTotal > 0) {
    return `You have spent ${CURRENCY.format(currentMonthTotal)} this month. Keep tracking to build a month-over-month baseline.`;
  }

  if (previousMonthTotal <= 0) {
    return "No spending logged for this month yet. Add expenses as you go to unlock trend insights.";
  }

  const diff = currentMonthTotal - previousMonthTotal;
  const percentage = (Math.abs(diff) / previousMonthTotal) * 100;

  if (diff > 0) {
    return `Monthly spending is up ${percentage.toFixed(0)}% vs last month (${CURRENCY.format(currentMonthTotal)} vs ${CURRENCY.format(previousMonthTotal)}). Review variable costs to bring this closer to last month.`;
  }

  if (diff < 0) {
    return `Great progress: monthly spending is down ${percentage.toFixed(0)}% vs last month (${CURRENCY.format(currentMonthTotal)} vs ${CURRENCY.format(previousMonthTotal)}). Keep this pace by maintaining the same habits.`;
  }

  return `Monthly spending is steady at ${CURRENCY.format(currentMonthTotal)}, matching last month. Try trimming one optional purchase to create extra savings.`;
}

export function buildInsights(expenses: Expense[]): string[] {
  if (!expenses.length) {
    return [
      "Start by adding your first expense to unlock spending insights.",
      "Tracking expenses weekly helps spot patterns early.",
    ];
  }

  const sortedCategoryTotals = getCategoryTotals(expenses);
  const topCategory = sortedCategoryTotals[0]?.category ?? "Other";
  const topCategoryTotal = sortedCategoryTotals[0]?.amount ?? 0;
  const total = getTotalSpending(expenses);
  const now = new Date();
  const currentMonthKey = getMonthKey(now);
  const previousMonthKey = getMonthKey(shiftMonth(now, -1));
  const monthlyTotal = getMonthlySpending(expenses, currentMonthKey);
  const previousMonthTotal = getMonthlySpending(expenses, previousMonthKey);
  const avgExpense = total / expenses.length;
  const largestExpense = getLargestExpense(expenses);
  const categoryShare = total > 0 ? (topCategoryTotal / total) * 100 : 0;
  const discretionaryCategories = new Set(["Food", "Entertainment", "Shopping"]);
  const discretionaryTotal = expenses
    .filter((expense) => discretionaryCategories.has(expense.category))
    .reduce((sum, expense) => sum + expense.amount, 0);
  const discretionaryShare = total > 0 ? (discretionaryTotal / total) * 100 : 0;
  const suggestedCategoryCap = topCategoryTotal * 0.9;
  const largestOutlierThreshold = avgExpense * 1.8;

  const insights: string[] = [];

  insights.push(
    `Top category is ${topCategory} at ${CURRENCY.format(topCategoryTotal)} (${categoryShare.toFixed(0)}% of total spend). Set a monthly cap near ${CURRENCY.format(suggestedCategoryCap)} to lower category concentration.`,
  );
  insights.push(getMoMMessage(monthlyTotal, previousMonthTotal));

  if (largestExpense && largestExpense.amount >= largestOutlierThreshold) {
    insights.push(
      `Largest expense was ${CURRENCY.format(largestExpense.amount)} (${largestExpense.category}) on ${largestExpense.date}. Because it is well above your average ${CURRENCY.format(avgExpense)}, consider planning this type of purchase in advance.`,
    );
  } else {
    insights.push(
      `Average expense is ${CURRENCY.format(avgExpense)} and no major outlier was detected. Grouping errands and recurring payments can reduce transaction count and improve control.`,
    );
  }

  if (discretionaryShare >= 35) {
    insights.push(
      `Discretionary spend (Food, Entertainment, Shopping) is ${discretionaryShare.toFixed(0)}% of total. Cutting this by 10% could free about ${CURRENCY.format(discretionaryTotal * 0.1)} for savings.`,
    );
  } else {
    insights.push(
      `Discretionary spend is ${discretionaryShare.toFixed(0)}% of total, which is fairly controlled. Redirecting even one small weekly expense into savings can still build momentum.`,
    );
  }

  return insights.slice(0, 4);
}

import type { Expense } from "@/types/expense";

const STORAGE_KEY = "finance-dashboard-expenses";

export const seedExpenses: Expense[] = [
  {
    id: "exp-1",
    category: "Food",
    amount: 82.5,
    date: "2026-04-06",
    notes: "Groceries for the week",
  },
  {
    id: "exp-2",
    category: "Transportation",
    amount: 35,
    date: "2026-04-09",
    notes: "Gas refill",
  },
  {
    id: "exp-3",
    category: "Utilities",
    amount: 120,
    date: "2026-03-30",
    notes: "Electricity bill",
  },
  {
    id: "exp-4",
    category: "Entertainment",
    amount: 24.99,
    date: "2026-03-25",
    notes: "Movie and snacks",
  },
];

export function loadExpenses(): Expense[] {
  if (typeof window === "undefined") {
    return seedExpenses;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return seedExpenses;
  }

  try {
    const parsed = JSON.parse(raw) as Expense[];
    if (!Array.isArray(parsed)) {
      return seedExpenses;
    }

    return parsed;
  } catch {
    return seedExpenses;
  }
}

export function saveExpenses(expenses: Expense[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

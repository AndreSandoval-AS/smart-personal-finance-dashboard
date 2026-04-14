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

function isValidExpense(value: unknown): value is Expense {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.category === "string" &&
    typeof item.amount === "number" &&
    Number.isFinite(item.amount) &&
    typeof item.date === "string" &&
    typeof item.notes === "string"
  );
}

export function loadExpenses(): Expense[] {
  if (typeof window === "undefined") {
    return seedExpenses;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return seedExpenses;
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return seedExpenses;
    }

    const validExpenses = parsed.filter(isValidExpense);
    return validExpenses.length ? validExpenses : seedExpenses;
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

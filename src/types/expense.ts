export type ExpenseCategory =
  | "Housing"
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Health"
  | "Utilities"
  | "Shopping"
  | "Other";

export interface Expense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  notes: string;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Housing",
  "Food",
  "Transportation",
  "Entertainment",
  "Health",
  "Utilities",
  "Shopping",
  "Other",
];

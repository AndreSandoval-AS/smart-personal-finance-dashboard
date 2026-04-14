"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { EXPENSE_CATEGORIES, type Expense, type ExpenseCategory } from "@/types/expense";

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [category, setCategory] = useState<ExpenseCategory>("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    onAddExpense({
      id: crypto.randomUUID(),
      category,
      amount: numericAmount,
      date,
      notes: notes.trim() || "No notes",
    });

    setAmount("");
    setNotes("");
  }

  return (
    <section className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <PlusCircle className="text-indigo-300" size={18} />
        <h2 className="panel-title">Add Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3.5">
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as ExpenseCategory)}
          className="field-control rounded-xl px-3.5 py-2.5 text-sm"
        >
          {EXPENSE_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          step="0.01"
          required
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount"
          className="field-control rounded-xl px-3.5 py-2.5 text-sm"
        />

        <input
          type="date"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="field-control rounded-xl px-3.5 py-2.5 text-sm"
        />

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Notes (optional)"
          rows={3}
          className="field-control rounded-xl px-3.5 py-2.5 text-sm"
        />

        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Save Expense
        </button>
      </form>
    </section>
  );
}

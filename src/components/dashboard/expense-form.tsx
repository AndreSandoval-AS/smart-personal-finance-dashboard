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
    <section className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
      <div className="mb-4 flex items-center gap-2">
        <PlusCircle className="text-indigo-300" size={18} />
        <h2 className="text-lg font-semibold text-white">Add Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as ExpenseCategory)}
          className="rounded-lg border border-white/20 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-400/60 focus:ring-2"
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
          className="rounded-lg border border-white/20 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-400/60 placeholder:text-slate-400 focus:ring-2"
        />

        <input
          type="date"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="rounded-lg border border-white/20 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-400/60 focus:ring-2"
        />

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Notes (optional)"
          rows={3}
          className="rounded-lg border border-white/20 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-400/60 placeholder:text-slate-400 focus:ring-2"
        />

        <button
          type="submit"
          className="mt-1 inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
        >
          Save Expense
        </button>
      </form>
    </section>
  );
}

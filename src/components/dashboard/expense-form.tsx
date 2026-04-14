"use client";

import { useState } from "react";
import { PencilLine, PlusCircle, X } from "lucide-react";
import { EXPENSE_CATEGORIES, type Expense, type ExpenseCategory } from "@/types/expense";

interface ExpenseFormProps {
  onSaveExpense: (expense: Expense) => void;
  editingExpense: Expense | null;
  onCancelEdit: () => void;
}

export function ExpenseForm({ onSaveExpense, editingExpense, onCancelEdit }: ExpenseFormProps) {
  const [category, setCategory] = useState<ExpenseCategory>(editingExpense?.category ?? "Food");
  const [amount, setAmount] = useState(editingExpense ? String(editingExpense.amount) : "");
  const [date, setDate] = useState(
    () => editingExpense?.date ?? new Date().toISOString().slice(0, 10),
  );
  const [notes, setNotes] = useState(
    editingExpense && editingExpense.notes !== "No notes" ? editingExpense.notes : "",
  );
  const isEditing = Boolean(editingExpense);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    onSaveExpense({
      id: editingExpense?.id ?? crypto.randomUUID(),
      category,
      amount: numericAmount,
      date,
      notes: notes.trim() || "No notes",
    });

    if (!editingExpense) {
      setAmount("");
      setNotes("");
    }
  }

  return (
    <section className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        {isEditing ? (
          <PencilLine className="text-indigo-300" size={18} />
        ) : (
          <PlusCircle className="text-indigo-300" size={18} />
        )}
        <h2 className="panel-title">{isEditing ? "Edit Expense" : "Add Expense"}</h2>
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
          {isEditing ? "Update Expense" : "Save Expense"}
        </button>
        {isEditing ? (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-900/55 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-900/75"
          >
            <X size={16} />
            Cancel Edit
          </button>
        ) : null}
      </form>
    </section>
  );
}

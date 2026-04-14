import { NotebookText } from "lucide-react";
import type { Expense } from "@/types/expense";

interface ExpenseListProps {
  expenses: Expense[];
}

const CURRENCY = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <section className="glass-card rounded-3xl p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <NotebookText className="text-indigo-300" size={18} />
        <h2 className="panel-title">Expense History</h2>
      </div>

      <div className="max-h-[340px] overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-slate-950/85 text-slate-300 backdrop-blur-sm">
            <tr>
              <th className="px-2 py-2.5 text-xs font-semibold uppercase tracking-wide">Category</th>
              <th className="px-2 py-2.5 text-xs font-semibold uppercase tracking-wide">Amount</th>
              <th className="px-2 py-2.5 text-xs font-semibold uppercase tracking-wide">Date</th>
              <th className="px-2 py-2.5 text-xs font-semibold uppercase tracking-wide">Notes</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-t border-white/10 text-slate-200 transition-colors hover:bg-white/5"
              >
                <td className="px-2 py-3.5">{expense.category}</td>
                <td className="px-2 py-3.5 font-medium text-slate-100">{CURRENCY.format(expense.amount)}</td>
                <td className="px-2 py-3.5 text-slate-300">{expense.date}</td>
                <td className="px-2 py-3.5 text-slate-300">{expense.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

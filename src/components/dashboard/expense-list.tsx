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
    <section className="glass-card rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <NotebookText className="text-indigo-300" size={18} />
        <h2 className="text-lg font-semibold text-white">Expense History</h2>
      </div>

      <div className="max-h-[340px] overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-slate-900/90 text-slate-300">
            <tr>
              <th className="px-2 py-2 font-medium">Category</th>
              <th className="px-2 py-2 font-medium">Amount</th>
              <th className="px-2 py-2 font-medium">Date</th>
              <th className="px-2 py-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-t border-white/10 text-slate-200">
                <td className="px-2 py-3">{expense.category}</td>
                <td className="px-2 py-3">{CURRENCY.format(expense.amount)}</td>
                <td className="px-2 py-3">{expense.date}</td>
                <td className="px-2 py-3">{expense.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import TransactionRow from "./TransactionRow";
import { useRole } from "../../context/RoleContext";
import Badge from "../common/Badge";
import { formatCurrency, amountColorClass, formatDate } from "../../utils/formatCurrency";
import { Pencil, Trash2 } from "lucide-react";

function TransactionCard({ txn, isAdmin, onEdit, onDelete }) {
  const amtClass = amountColorClass(txn.amount);
  return (
    <div className="flex items-start justify-between gap-3 py-3.5 border-b border-zinc-800/60 last:border-0">
      <div className="flex items-start gap-3 min-w-0">

        <div className="min-w-0">
          <p className="text-zinc-200 text-sm font-medium truncate">{txn.description}</p>
          <p className="text-zinc-500 text-xs">{txn.merchant}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <Badge label={txn.category} />
            <span className="text-zinc-600 text-xs">{formatDate(txn.date)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={`text-sm font-semibold ${amtClass}`}>
          {formatCurrency(txn.amount, { showSign: true })}
        </span>
        <Badge label={txn.type === "income" ? "Income" : "Expense"} variant={txn.type} />
        {isAdmin && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit?.(txn)}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 active:bg-zinc-700 active:text-zinc-200"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete?.(txn.id)}
              className="p-1.5 rounded-lg bg-zinc-800 text-red-400 active:bg-red-500/20"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransactionsTable({ transactions, onEdit, onDelete }) {
  const { isAdmin } = useRole();

  if (!transactions.length) {
    return (
      <div className="text-center py-16 text-zinc-500">
        <p className="text-4xl mb-3">🔍</p>
        <p className="font-medium">No transactions found</p>
        <p className="text-sm mt-1">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <>
      {/* MOBILE: card list — no table, no scroll, actions always visible */}
      <div className="sm:hidden">
        {transactions.map((txn) => (
          <TransactionCard
            key={txn.id}
            txn={txn}
            isAdmin={isAdmin}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* DESKTOP: full table, hover to reveal actions */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Description</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Type</th>
              <th className="py-3 px-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
              {isAdmin && (
                <th className="py-3 px-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <TransactionRow
                key={txn.id}
                txn={txn}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
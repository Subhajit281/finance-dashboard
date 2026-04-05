import Badge from "../common/Badge";
import { formatCurrency, amountColorClass, formatDate } from "../../utils/formatCurrency";
import { Pencil, Trash2 } from "lucide-react";

export default function TransactionRow({ txn, isAdmin, onEdit, onDelete }) {
  const amtClass = amountColorClass(txn.amount);

  return (
    <tr className="border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors group">
      {/* Description */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-zinc-200 text-sm font-medium leading-snug">
              {txn.description}
            </p>
            <p className="text-zinc-500 text-xs">{txn.merchant}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="py-3.5 px-4">
        <Badge label={txn.category} />
      </td>

      {/* Date */}
      <td className="py-3.5 px-4 text-zinc-400 text-sm">
        {formatDate(txn.date)}
      </td>

      {/* Type */}
      <td className="py-3.5 px-4">
        <Badge label={txn.type === "income" ? "Income" : "Expense"} variant={txn.type} />
      </td>

      {/* Amount */}
      <td className={`py-3.5 px-4 text-right text-sm font-semibold ${amtClass}`}>
        {formatCurrency(txn.amount, { showSign: true })}
      </td>

      {/* Admin actions */}
      {isAdmin && (
        <td className="py-3.5 px-4">
          <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-100 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit?.(txn)}
              className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete?.(txn.id)}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}
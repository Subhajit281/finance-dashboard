import TransactionRow from "./TransactionRow";
import { useRole } from "../../context/RoleContext";

export default function TransactionsTable({ transactions, onEdit, onDelete }) {
  const { isAdmin } = useRole();

  if (!transactions.length) {
    return (
      <div className="text-center py-16 text-zinc-500">
        
        <p className="font-medium">No transactions found</p>
        <p className="text-sm mt-1">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Description
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Category
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Date
            </th>
            <th className="py-3 px-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Type
            </th>
            <th className="py-3 px-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Amount
            </th>
            {isAdmin && (
              <th className="py-3 px-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Actions
              </th>
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
  );
}
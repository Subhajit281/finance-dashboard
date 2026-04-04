import { useState } from "react";
import { Plus } from "lucide-react";
import TransactionsTable from "../components/transactions/TransactionsTable";
import FilterBar from "../components/transactions/FilterBar";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import Button from "../components/common/Button";
import { useTransactions } from "../hooks/useTransactions";
import { useRole } from "../context/RoleContext";

export default function TransactionsPage() {
  const {
    transactions,
    filterType, setFilterType,
    searchQuery, setSearchQuery,
    addTransaction, updateTransaction, deleteTransaction,
  } = useTransactions();
  const { isAdmin } = useRole();

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (txn) => { setEditData(txn); setModalOpen(true); };
  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) deleteTransaction(id);
  };
  const handleModalSubmit = (data) => {
    if (editData) updateTransaction(editData.id, data);
    else addTransaction(data);
    setEditData(null);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Transactions</h1>
          <p className="text-zinc-500 text-sm mt-0.5">{transactions.length} records</p>
        </div>
        {isAdmin && (
          <Button onClick={() => { setEditData(null); setModalOpen(true); }} icon={<Plus size={15} />}>
            Add Transaction
          </Button>
        )}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <FilterBar
          filterType={filterType}
          setFilterType={setFilterType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TransactionsTable
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onSubmit={handleModalSubmit}
        editData={editData}
      />
    </div>
  );
}
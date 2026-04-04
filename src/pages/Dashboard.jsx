import SummaryCard from "../components/dashboard/SummaryCard";
import BarChart from "../components/dashboard/BarChart";
import DonutChart from "../components/dashboard/DonutChart";
import InsightCard from "../components/dashboard/InsightCard";
import FilterBar from "../components/transactions/FilterBar";
import TransactionsTable from "../components/transactions/TransactionsTable";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import { useInsights } from "../hooks/useInsights";
import { useTransactions } from "../hooks/useTransactions";
import { useFinance } from "../context/FinanceContext";
import { useRole } from "../context/RoleContext";
import { formatCurrency } from "../utils/formatCurrency";
import Button from "../components/common/Button";
import { Plus } from "lucide-react";
import { useState } from "react";

const PERIOD_TABS = ["1M", "3M", "6M", "1Y"];

export default function Dashboard() {
  const { timePeriod, setTimePeriod } = useFinance();
  const { summary, chartData, insights } = useInsights();
  const {
    transactions,
    filterType, setFilterType,
    searchQuery, setSearchQuery,                            // data controller hook
    addTransaction, updateTransaction, deleteTransaction,
  } = useTransactions();  
  const { isAdmin } = useRole();

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (txn) => {
    setEditData(txn);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (editData) {
      updateTransaction(editData.id, data);
    } else {
      addTransaction(data);
    }
    setEditData(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this transaction?")) deleteTransaction(id);
  };

  const now = new Date();
  const monthLabel = now.toLocaleString("en-IN", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-zinc-500 text-sm mt-0.5">{monthLabel}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period tabs */}
          <div className="flex items-center gap-1 bg-zinc-800/60 rounded-xl p-1">
            {PERIOD_TABS.map((p) => (
              <button
                key={p}
                onClick={() => setTimePeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  timePeriod === p
                    ? "bg-indigo-700 text-white shadow"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {isAdmin && (
            <Button onClick={() => { setEditData(null); setModalOpen(true); }} icon={<Plus size={15} />}>
              Add Transactions
            </Button>
          )}
        </div>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Balance"
          value={formatCurrency(summary.totalBalance)}
          change={7.2}
          accent="blue"
        />
        <SummaryCard
          title="Income"
          value={formatCurrency(summary.totalIncome)}
          change={5.1}
          accent="green"
        />
        <SummaryCard
          title="Expenses"
          value={formatCurrency(summary.totalExpenses)}
          change={3.4}
          accent="red"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm">Income vs Expenses</h2>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Income
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Expense
              </span>
            </div>
          </div>
          <BarChart data={chartData} />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h2 className="text-white font-semibold text-sm mb-4">Spending breakdown</h2>
          <DonutChart data={summary.spendingBreakdown} />
        </div>
      </div>

      {/* Insight card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {insights.highestSpending && (
          <InsightCard {...insights.highestSpending} />
        )}
        <InsightCard {...insights.monthlySaved} />
        <InsightCard {...insights.savingsRate} />
      </div>

      {/* Recent Transactions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-white font-semibold">Recent Transactions</h2>
          <FilterBar
            filterType={filterType}
            setFilterType={setFilterType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <TransactionsTable
          transactions={transactions.slice(0, 10)}     // 10 latest txns
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
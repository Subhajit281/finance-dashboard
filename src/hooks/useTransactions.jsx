import { useMemo, useState } from "react";
import { useFinance } from "../context/FinanceContext";

/* Provides filtered, searched, and paginated transaction data.*/

export function useTransactions() {
  const { getFilteredByPeriod, addTransaction, updateTransaction, deleteTransaction } =
    useFinance();

  const [filterType, setFilterType] = useState("all"); // "all" | "income" | "expense"
  const [searchQuery, setSearchQuery] = useState("");

  const periodTransactions = useMemo(() => getFilteredByPeriod(), [getFilteredByPeriod]);

  const filtered = useMemo(() => {
    let list = periodTransactions;

    if (filterType !== "all") {
      list = list.filter((t) => t.type === filterType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.merchant?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [periodTransactions, filterType, searchQuery]);

  return {
    transactions: filtered,
    allTransactions: periodTransactions,
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
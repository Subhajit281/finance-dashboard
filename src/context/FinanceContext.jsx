import { createContext, useContext, useState, useCallback } from "react";
import { mockTransactions } from "../data/mockTransactions";

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [timePeriod, setTimePeriod] = useState("3M"); // "1M" | "3M" | "6M" | "1Y"

  //  CRUD (Admin)
  const addTransaction = useCallback((txn) => {
    const newTxn = {
      ...txn,
      id: `txn_${Date.now()}`,
    };
    setTransactions((prev) => [newTxn, ...prev]);  // new txns should appear first 
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((txn) => (txn.id === id ? { ...txn, ...updates } : txn))
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
  }, []);

  // Filtering helpers 
  const getFilteredByPeriod = useCallback(
    (txns = transactions) => {    // for future flexibility with working on different datas
      const now = new Date();
      const monthsMap = { "1M": 1, "3M": 3, "6M": 6, "1Y": 12 };
      const months = monthsMap[timePeriod] ?? 3;     // default 3M
      const cutoff = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
      return txns.filter((t) => new Date(t.date) >= cutoff);
    },
    [transactions, timePeriod]
  );

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        timePeriod,
        setTimePeriod,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getFilteredByPeriod,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used inside FinanceProvider");
  return ctx;
}
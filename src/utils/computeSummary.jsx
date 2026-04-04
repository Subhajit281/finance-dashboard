
export function computeSummary(transactions = []) {
  let totalIncome = 0;
  let totalExpenses = 0;
  const categoryTotals = {};

  for (const txn of transactions) {
    if (txn.type === "income") {
      totalIncome += txn.amount;
    } else {
      const abs = Math.abs(txn.amount);
      totalExpenses += abs;
      categoryTotals[txn.category] =
        (categoryTotals[txn.category] ?? 0) + abs;
    }
  }

  const totalBalance = totalIncome - totalExpenses;
  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
      : "0.0";

  // Spending breakdown as percentage array
  const spendingBreakdown = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage:
        totalExpenses > 0
          ? Math.round((amount / totalExpenses) * 100)
          : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    savingsRate: parseFloat(savingsRate),
    spendingBreakdown,
    categoryTotals,
  };
}

/* Groups transactions by month for chart data.*/
export function groupByMonth(transactions = []) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const map = {};
  for (const txn of transactions) {
    const d = new Date(txn.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!map[key]) {
      map[key] = {
        month: monthNames[d.getMonth()],
        year: d.getFullYear(),
        sortKey: d.getFullYear() * 100 + d.getMonth(),
        income: 0,
        expense: 0,
      };
    }
    if (txn.type === "income") {
      map[key].income += txn.amount;
    } else {
      map[key].expense += Math.abs(txn.amount);
    }
  }

  return Object.values(map).sort((a, b) => a.sortKey - b.sortKey);
}
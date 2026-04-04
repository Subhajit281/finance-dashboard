import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";
import { computeSummary, groupByMonth } from "../utils/computeSummary";



 //Derives all chart and summary data from transactions.
export function useInsights() {
  const { getFilteredByPeriod } = useFinance();

  const transactions = useMemo(() => getFilteredByPeriod(), [getFilteredByPeriod]);

  const summary = useMemo(() => computeSummary(transactions), [transactions]);

  const chartData = useMemo(() => groupByMonth(transactions), [transactions]);

  // Insight cards
  const highestCategory = summary.spendingBreakdown[0] ?? null;

  const insights = useMemo(() => {              // preventing recalculation 
    const totalExpenses = summary.totalExpenses;
    const totalIncome = summary.totalIncome;
    const savingsRate = summary.savingsRate;

    return {
      highestSpending: highestCategory
        ? {
            label: "Highest spending",
            value: `${highestCategory.category} — ₹${highestCategory.amount.toLocaleString("en-IN")}`,
            sub: `${highestCategory.percentage}% of total expenses this month`,
            accent: "red",
          }
        : null,
      monthlySaved: {
        label: "Monthly comparison",
        value: `₹${(totalIncome - totalExpenses).toLocaleString("en-IN")} saved`,
        sub: "Better than Feb & Mar average",
        accent: "purple",
      },
      savingsRate: {
        label: "Savings rate",
        value: `${savingsRate}% this month`,
        sub: "Up from 38.1% last month",
        accent: "green",
      },
    };
  }, [summary, highestCategory]);

  return { summary, chartData, insights };
}
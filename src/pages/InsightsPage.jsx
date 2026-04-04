import { useInsights } from "../hooks/useInsights";
import { useFinance } from "../context/FinanceContext";
import DonutChart from "../components/dashboard/DonutChart";
import BarChart from "../components/dashboard/BarChart";
import InsightCard from "../components/dashboard/InsightCard";
import { formatCurrency } from "../utils/formatCurrency";

export default function InsightsPage() {
  const { timePeriod } = useFinance();
  const { summary, chartData, insights } = useInsights();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Insights</h1>
        <p className="text-zinc-500 text-sm mt-0.5">
          Financial overview for the past {timePeriod}
        </p>
      </div>

      {/* Key metrics */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Income", value: formatCurrency(summary.totalIncome), color: "text-emerald-500" },
          { label: "Total Expenses", value: formatCurrency(summary.totalExpenses), color: "text-red-400" },
          { label: "Net Savings", value: formatCurrency(summary.totalBalance), color: "text-indigo-500" },
          { label: "Savings Rate", value: `${summary.savingsRate}%`, color: "text-amber-500" },
        ].map((m) => (
          <div key={m.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{m.label}</p>
            <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h2 className="text-white font-semibold text-sm mb-4">Monthly Income vs Expenses</h2>
          <BarChart data={chartData} />
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <h2 className="text-white font-semibold text-sm mb-4">Spending Breakdown</h2>
          <DonutChart data={summary.spendingBreakdown} />
        </div>
      </div>

      {/* Top spending categories */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <h2 className="text-white font-semibold mb-4">Top Spending Categories</h2>
        <div className="space-y-3">
          {summary.spendingBreakdown.map((item, i) => (
            <div key={item.category} className="flex items-center gap-4">
              <span className="text-zinc-500 text-sm w-5 text-right">{i + 1}</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-300 text-sm font-medium">{item.category}</span>
                  <span className="text-zinc-400 text-sm">
                    {formatCurrency(item.amount)} · {item.percentage}%
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-700 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {insights.highestSpending && <InsightCard {...insights.highestSpending} />}
        <InsightCard {...insights.monthlySaved} />
        <InsightCard {...insights.savingsRate} />
      </div>
    </div>
  );
}
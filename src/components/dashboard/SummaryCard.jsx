import { TrendingUp, TrendingDown } from "lucide-react";

const ACCENT_COLORS = {
  blue: "border-b-2 border-blue-500",
  green: "border-b-2 border-emerald-500",
  red: "border-b-2 border-red-500",
};

export default function SummaryCard({ title, value, change, changeLabel, accent = "blue" }) {
  const isPositive = change >= 0;

  return (
    <div
      className={`bg-zinc-900 rounded-2xl p-5 flex flex-col gap-3 border border-zinc-800 hover:border-zinc-700 transition-colors ${ACCENT_COLORS[accent] ?? ""}`}
    >
      <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">
        {title}
      </p>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      <div
        className={`flex items-center gap-1.5 text-xs font-medium ${
          isPositive ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {isPositive ? (
          <TrendingUp size={13} />
        ) : (
          <TrendingDown size={13} />
        )}
        <span>
          {isPositive ? "↑" : "↓"} {Math.abs(change)}% {changeLabel ?? "from last month"}
        </span>
      </div>
    </div>
  );
}
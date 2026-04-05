import { TrendingUp, TrendingDown } from "lucide-react";

const ACCENT_COLORS = {
  blue: "border-b-2 border-blue-500",
  green: "border-b-2 border-emerald-500",
  red: "border-b-2 border-red-500",
};

export default function SummaryCard({ title, value, change, changeLabel, accent = "blue" }) {
  const isPositive = change >= 0;

  return (
    <div className={`bg-zinc-900 rounded-2xl p-3 sm:p-5 flex flex-col gap-2 sm:gap-3 border border-zinc-800 hover:border-zinc-700 transition-colors ${ACCENT_COLORS[accent] ?? ""}`}>
      <p className="text-zinc-500 text-[10px] sm:text-sm font-semibold uppercase tracking-widest">
        {title}
      </p>
      <p className="text-sm sm:text-xl font-bold text-white tracking-tight">
        {value}
      </p>
      <div className={`flex items-center gap-1 text-[10px] sm:text-xs font-medium ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
        {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        <span className="">
          {isPositive ? "↑" : "↓"} {Math.abs(change)}%{" "}
          <span className="hidden sm:inline">{changeLabel ?? "from last month"}</span>
        </span>
      </div>
    </div>
  );
}
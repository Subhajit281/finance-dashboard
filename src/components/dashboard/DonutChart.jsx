import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef4444", // red
  "#6366f1", //  indigo
  "#f59e0b", // amber
  "#a78bfa", // violet
  "#22d3ee", // cyan
  "#34d399", // emerald
  "#fb923c", // orange
  "#60a5fa", // blue
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-3 shadow-2xl text-sm">
      <p className="text-zinc-300 font-semibold">{name}</p>
      <p className="text-zinc-400">₹{Number(value).toLocaleString("en-IN")}</p>
    </div>
  );
};

export default function DonutChart({ data = [] }) {
  const chartData = data.map((d) => ({
    name: d.category,
    value: d.amount,
    percentage: d.percentage,
  }));

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="w-full mt-2 space-y-2">
        {chartData.slice(0, 5).map((item, i) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-zinc-400">{item.name}</span>
            </div>
            <span className="text-zinc-300 font-medium">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
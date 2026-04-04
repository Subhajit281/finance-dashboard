const ACCENTS = {
  orange: " border-amber-500 bg-amber-500/5",
  purple: " border-indigo-500 bg-indigo-500/5",
  green: " border-emerald-500 bg-emerald-500/5",
  red:   " border-red-500 bg-red-500/5",
};

const LABEL_COLORS = {
  orange: "text-amber-400",
  purple: "text-indigo-400",
  green: "text-emerald-400",
  red:"text-red-500",
};

export default function InsightCard({ label, value, sub, accent = "purple" }) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-1.5 border border-zinc-800 ${ACCENTS[accent] ?? ACCENTS.purple}`}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest ${LABEL_COLORS[accent]}`}>
        {label}
      </p>
      <p className="text-white font-bold text-lg leading-tight">{value}</p>
      <p className="text-zinc-500 text-xs">{sub}</p>
    </div>
  );
}
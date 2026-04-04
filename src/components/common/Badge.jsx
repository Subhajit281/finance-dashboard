const VARIANTS = {
  income: " text-emerald-500 border border-emerald-400/30",
  expense: " text-red-500 border border-red-400/30",
  salary: " text-blue-300 ",
  food: " text-amber-300",
  rent: " text-rose-300",
  utilities: "text-cyan-300 ",
  shopping: " text-purple-300",
  transport: "text-sky-300",
  subscription: "text-violet-300",
  health: " text-green-300",
  investment: "text-teal-300",
  education: " text-indigo-300",
  freelance: " text-orange-300",
  default: " text-zinc-300",
};

export default function Badge({ label, variant }) {
  const key = (variant ?? label ?? "").toLowerCase();
  const cls = VARIANTS[key] ?? VARIANTS.default;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}
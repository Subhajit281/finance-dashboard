import { Search } from "lucide-react";

const TABS = [
  { id: "all", label: "All" },
  { id: "income", label: "Income" },
  { id: "expense", label: "Expense" },
];

export default function FilterBar({ filterType, setFilterType, searchQuery, setSearchQuery }) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Type tabs */}
      <div className="flex items-center gap-1 bg-zinc-800/60 rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filterType === tab.id
                ? "bg-indigo-700 text-white shadow"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 w-48 transition-colors"
        />
      </div>
    </div>
  );
}
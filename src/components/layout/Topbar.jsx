import { ChevronDown, User } from "lucide-react";
import { useRole } from "../../context/RoleContext";

export default function Topbar() {
  const { role, toggleRole, isAdmin } = useRole();

  return (
    <header className="h-14 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-end px-6 gap-4">
      {/* Role switcher */}
      <button
        onClick={toggleRole}
        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-sm text-zinc-300 transition-colors"
        title="Click to toggle role"
      >
        <User size={13} className="text-zinc-400" />
        <span className="font-medium">Role:</span>
        <span className={isAdmin ? "text-indigo-400" : "text-zinc-300"}>
          {role}
        </span>
        <ChevronDown size={13} className="text-zinc-500" />
      </button>

      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold select-none">
        AS
      </div>
    </header>
  );
}
import { ChevronDown, User, Menu } from "lucide-react";
import { useRole } from "../../context/RoleContext";

export default function Topbar({ onMenuClick }) {
  const { role, toggleRole, isAdmin } = useRole();

  return (
    <header className="h-14 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 gap-4">

      {/* Left  hamburger + logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
          <span className="text-white font-bold text-sm">FinFlow</span>
        </div>
      </div>

      
      <div className="hidden lg:block flex-1" />

      {/* Right: role switcher + avatar */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleRole}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-sm text-zinc-300 transition-colors"
          title="Click to toggle role"
        >
          <User size={13} className="text-zinc-400" />
          <span className="font-medium">Role:</span>
          <span className={isAdmin ? "text-indigo-400" : "text-zinc-300"}>{role}</span>
          <ChevronDown size={13} className="text-zinc-500" />
        </button>

        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold select-none">
          AS
        </div>
      </div>
    </header>
  );
}
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings } from "lucide-react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, section: "Main" },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/insights", label: "Insights", icon: Lightbulb },
  { to: "/preferences", label: "Preferences", icon: Settings, section: "Settings" },
];

export default function Sidebar() {

  // if links inactive then show grayish color else show indigo
  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
    }`;

  let lastSection = null;

  return (
    <aside className="w-56 shrink-0 bg-zinc-950 border-r border-zinc-800/60 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-zinc-800/60">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
          <span className="text-white font-bold tracking-tight text-base">
            FinFlow
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => {
          const showSection = item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          return (
            <div key={item.to}>
              {showSection && (
                <p className="text-zinc-600 text-xs font-semibold uppercase tracking-widest px-3 pt-4 pb-2">
                  {item.section}
                </p>
              )}
              <NavLink to={item.to} end={item.to === "/"} className={linkCls}>
                <item.icon size={16} />
                {item.label}
              </NavLink>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-zinc-800/60">
        <p className="text-zinc-600 text-xs text-center">Role switcher → top right</p>
      </div>
    </aside>
  );
}
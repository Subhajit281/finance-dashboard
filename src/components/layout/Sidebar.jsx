import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, section: "Main" },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/insights", label: "Insights", icon: Lightbulb },
  { to: "/preferences", label: "Preferences", icon: Settings, section: "Settings" },
];

function NavItems({ onClose }) {
  let lastSection = null;

  const linkCls = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
    }`;

  return (
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
            <NavLink
              to={item.to}
              end={item.to === "/"}
              className={linkCls}
              onClick={onClose}
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* ── MOBILE DRAWER ── */}

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 40,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        className="lg:hidden"
      />

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "224px",
          zIndex: 50,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
          background: "#09090b",
          borderRight: "1px solid rgba(39,39,42,0.6)",
        }}
        className="lg:hidden"
      >
        {/* Logo + close */}
        <div className="px-5 py-5 border-b border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-white font-bold tracking-tight text-base">FinFlow</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
          >
            <X size={18} />
          </button>
        </div>
        <NavItems onClose={onClose} />
        <div className="px-4 py-4 border-t border-zinc-800/60">
          <p className="text-zinc-600 text-xs text-center">Role switcher → top right</p>
        </div>
      </div>

      {/* ── DESKTOP SIDEBAR ── always visible, static */}
      <aside className="hidden lg:flex w-56 shrink-0 flex-col h-screen sticky top-0 bg-zinc-950 border-r border-zinc-800/60">
        <div className="px-5 py-5 border-b border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />
            <span className="text-white font-bold tracking-tight text-base">FinFlow</span>
          </div>
        </div>
        <NavItems onClose={() => {}} />
        <div className="px-4 py-4 border-t border-zinc-800/60">
          <p className="text-zinc-600 text-xs text-center">Role switcher → top right</p>
        </div>
      </aside>
    </>
  );
}
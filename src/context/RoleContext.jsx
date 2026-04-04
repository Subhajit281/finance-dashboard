import { createContext, useContext, useState } from "react";

const ROLES = { VIEWER: "Viewer", ADMIN: "Admin" };

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState(ROLES.VIEWER);

  const toggleRole = () =>
    setRole((prev) => (prev === ROLES.VIEWER ? ROLES.ADMIN : ROLES.VIEWER));

  const isAdmin = role === ROLES.ADMIN;
  const isViewer = role === ROLES.VIEWER;

  return (
    <RoleContext.Provider value={{ role, toggleRole, isAdmin, isViewer, ROLES }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside RoleProvider");
  return ctx;
}
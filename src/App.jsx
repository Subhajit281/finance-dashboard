import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import { RoleProvider } from "./context/RoleContext";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";

function Preferences() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold text-white">Preferences</h1>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-400 text-sm">
        Preferences settings will be available here. Connect to backend to get user settings.
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <FinanceProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/preferences" element={<Preferences />} />
            </Route>
          </Routes>
        </FinanceProvider>
      </RoleProvider>
    </BrowserRouter>
  );
}
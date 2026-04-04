import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../common/Button";

const CATEGORIES = [
  "Salary", "Freelance", "Investment", "Rent", "Food",
  "Utilities", "Shopping", "Transport", "Subscription", "Health", "Education", "Other",
];

const EMPTY = {
  description: "",
  merchant: "",
  category: "Food",
  date: new Date().toISOString().split("T")[0],
  type: "expense",
  amount: "",

};

export default function AddTransactionModal({ isOpen, onClose, onSubmit, editData = null }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        amount: Math.abs(editData.amount).toString(),
      });
    } else {
      setForm(EMPTY);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    const amount =
      form.type === "expense"
        ? -Math.abs(parseFloat(form.amount))
        : Math.abs(parseFloat(form.amount));
    onSubmit({ ...form, amount });
    onClose();
  };

  const inputCls =
    "w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-white font-semibold text-lg">
            {editData ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
         
          <div className="flex gap-2">
            {["income", "expense"].map((t) => (
              <button
                key={t}
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                className={`flex-1 py-2.5 rounded-md text-sm font-semibold capitalize transition-all ${
                  form.type === t
                    ? t === "income"
                      ? "bg-emerald-700 text-white"
                      : "bg-red-700 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <input
            className={inputCls}
            placeholder="Description"
            value={form.description}
            onChange={set("description")}
          />

          <input
            className={inputCls}
            placeholder="Merchant / Source"
            value={form.merchant}
            onChange={set("merchant")}
          />

          <div className="grid grid-cols-2 gap-3">
            <select
              className={inputCls}
              value={form.category}
              onChange={set("category")}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="date"
              className={inputCls}
              value={form.date}
              onChange={set("date")}
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-medium text-sm">
              ₹
            </span>
            <input
              type="number"
              className={`${inputCls} pl-7`}
              placeholder="0"
              value={form.amount}
              onChange={set("amount")}
              min="0"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 pt-0">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSubmit}>
            {editData ? "Save Changes" : "Add Transaction"}
          </Button>
        </div>
      </div>
    </div>
  );
}
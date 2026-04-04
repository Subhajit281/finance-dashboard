/* Formats a number as Indian Rupees (₹).*/


export function formatCurrency(amount, options = {}) {
  const { showSign = false, compact = false } = options;
  const abs = Math.abs(amount);

  let formatted;
  if (compact && abs >= 100000) {
    formatted = `₹${(abs / 100000).toFixed(1)}L`;
  } else if (compact && abs >= 1000) {
    formatted = `₹${(abs / 1000).toFixed(1)}K`;
  } else {
    formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(abs);
  }

  if (showSign && amount > 0) return `+${formatted}`;
  if (amount < 0) return `-${formatted}`;
  return formatted;
}


export function amountColorClass(amount) {
  return amount >= 0 ? "text-emerald-400" : "text-red-400";
}


export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}
/**
 * All txns data
 * Currently uses in-memory mock data via FinanceContext.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";


export async function fetchTransactions(filters = {}) {
  // data comes from FinanceContext (mock) for now
  // const params = new URLSearchParams(filters);
  // const res = await fetch(`${BASE_URL}/api/transactions?${params}`);
  // return res.json();
  return Promise.resolve([]);
}

export async function createTransaction(payload) {
  // const res = await fetch(`${BASE_URL}/api/transactions`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // return res.json();
  return Promise.resolve({ ...payload, id: `txn_${Date.now()}` });
}

export async function updateTransaction(id, updates) {
  // const res = await fetch(`${BASE_URL}/api/transactions/${id}`, {
  //   method: "PATCH",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(updates),
  // });
  // return res.json();
  return Promise.resolve({ id, ...updates });
}

export async function deleteTransaction(id) {
  // await fetch(`${BASE_URL}/api/transactions/${id}`, { method: "DELETE" });
  return Promise.resolve({ success: true });
}
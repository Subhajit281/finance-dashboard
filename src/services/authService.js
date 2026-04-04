// mock API integration for auth 

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function login(email, password) {
  // const res = await fetch(`${BASE_URL}/api/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });
  // const data = await res.json();
  // localStorage.setItem("token", data.token);
  // return data;
  return Promise.resolve({ user: { email }, token: "mock-token" });
}

export async function logout() {
  // await fetch(`${BASE_URL}/api/auth/logout`, { method: "POST" });
  // localStorage.removeItem("token");
  return Promise.resolve();
}

export function getToken() {
  return localStorage.getItem("token") ?? null;
}

export function isAuthenticated() {
  return !!getToken();
}
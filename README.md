# FinanceFlow — Personal Finance Dashboard

A responsive personal finance dashboard built with **React 19**, **Tailwind CSS v4**, and **Recharts**. Provides a clean overview of income, expenses, spending breakdowns, and transaction management with role-based access control.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Architecture & Approach](#architecture--approach)
- [Mock API Integration](#mock-api-integration)
- [Role-Based Access Control](#role-based-access-control)
- [Backend Migration Guide](#backend-migration-guide)
- [Tech Stack](#tech-stack)

---

## Overview

FinanceFlow lets users track their personal finances across multiple time periods (1M, 3M, 6M, 1Y). It includes an interactive dashboard with charts, a full transactions table with search and filtering, and a dedicated insights page with category-level spending analysis.

The application is built **frontend-only** with mock data, but is architected from the ground up to support a real backend with minimal changes — all data operations are abstracted behind a services layer.

---

## Features

- **Dashboard Overview** — Total balance, income, and expense summary cards with trend indicators
- **Income vs Expenses Bar Chart** — Monthly comparison using Recharts
- **Spending Breakdown Donut Chart** — Category-level breakdown with legend
- **Insight Cards** — Highest spending category, monthly savings, and savings rate
- **Recent Transactions Table** — Filterable by type (All / Income / Expense) with live search
- **Full Transactions Page** — Complete transaction history with the same filter/search controls
- **Insights Page** — Extended analytics including category progress bars and key financial metrics
- **Add / Edit / Delete Transactions** — Available to Admin role via a modal form
- **Role Switcher** — Toggle between Viewer and Admin in the top bar
- **Period Filter** — 1M, 3M, 6M, 1Y tabs that update all charts and data simultaneously
- **Responsive Layout** — Sidebar navigation with sticky topbar

---

## Folder Structure

```
src/
├── assets/                   # Static assets
├── components/
│   ├── common/
│   │   ├── Badge.jsx         # Category/type badge with color variants
│   │   └── Button.jsx        # Reusable button with variant + size props
│   ├── dashboard/
│   │   ├── BarChart.jsx      # Recharts bar chart (Income vs Expenses)
│   │   ├── DonutChart.jsx    # Recharts pie/donut chart (Spending breakdown)
│   │   ├── InsightCard.jsx   # Highlighted insight stat card
│   │   └── SummaryCard.jsx   # Top-level metric card (Balance, Income, Expenses)
│   ├── layout/
│   │   ├── AppLayout.jsx     # Root layout with sidebar + topbar + outlet
│   │   ├── Sidebar.jsx       # Navigation sidebar with NavLinks
│   │   └── Topbar.jsx        # Top bar with role switcher and avatar
│   └── transactions/
│       ├── AddTransactionModal.jsx   # Add/Edit transaction modal form
│       ├── FilterBar.jsx             # Type filter tabs + search input
│       ├── TransactionRow.jsx        # Single table row with admin actions
│       └── TransactionsTable.jsx     # Full table with header + empty state
├── context/
│   ├── FinanceContext.jsx    # Global transaction state + CRUD + period filtering
│   └── RoleContext.jsx       # Viewer/Admin role state and toggle
├── data/
│   └── mockTransactions.js   # 27 seeded mock transactions across Jan–Apr 2026
├── hooks/
│   ├── useInsights.js        # Derives chart data and insight cards from context
│   └── useTransactions.js    # Filtered/searched transaction list for tables
├── pages/
│   ├── Dashboard.jsx         # Main dashboard page
│   ├── InsightsPage.jsx      # Analytics and spending breakdown page
│   └── TransactionsPage.jsx  # Full transaction list page
├── services/
│   ├── authService.js        # Auth helpers (login, logout, token) — mock + API stubs
│   ├── summaryService.js     # Summary/analytics fetch — mock + API stub
│   └── transactionService.js # Transaction CRUD — mock + API stubs
└── utils/
    ├── computeSummary.js     # Pure functions: totals, savings rate, chart grouping
    └── formatCurrency.js     # Indian Rupee formatting, date formatting, color helpers
```

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Subhajit281/finance-dashboard.git
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

### Environment Variables

Create a `.env` file in the root for backend configuration (optional — not required for mock mode):

```env
VITE_API_BASE_URL=https://your-api.com
```

---

## Architecture & Approach

### State Management

Global state is handled with **React Context** .

- `FinanceContext` — owns the transactions array and exposes CRUD operations (`addTransaction`, `updateTransaction`, `deleteTransaction`) and a `getFilteredByPeriod()` helper that respects the active time period.
- `RoleContext` — owns the current role (`Viewer` / `Admin`) and exposes a `toggleRole()` function and boolean helpers (`isAdmin`, `isViewer`).

Both contexts wrap the entire app in `App.jsx` so any component can access them.

### Custom Hooks

Business logic is extracted into hooks so pages stay clean:

- `useInsights()` — calls `getFilteredByPeriod()`, runs `computeSummary()` and `groupByMonth()` through `useMemo`, and returns chart data + insight card props ready to render.
- `useTransactions()` — handles the filter type and search query state, returning a filtered + searched list derived from the period-filtered transactions.

### Utility Functions

All data transformation is in pure functions inside `utils/`:

- `computeSummary(transactions)` — returns totals, savings rate, and the spending breakdown array sorted by amount.
- `groupByMonth(transactions)` — groups transactions into monthly buckets for the bar chart.
- `formatCurrency(amount, options)` — formats values as Indian Rupees (₹) using `Intl.NumberFormat` with optional compact and sign display.

### Routing

React Router v7 with a nested layout route — `AppLayout` wraps all pages so the sidebar and topbar are shared without re-mounting.

---

## Mock API Integration

All data operations are abstracted through a **services layer** in `src/services/`. Each service file contains the real API call written out and commented, alongside a mock return

### `transactionService.js`

Covers the full transaction CRUD lifecycle:

```js
// Current (mock): returns resolved promise
export async function fetchTransactions(filters = {}) {
  return Promise.resolve([]);
}

// To switch to backend — uncomment:
// const res = await fetch(`${BASE_URL}/api/transactions`);
// return res.json();
```

The same pattern applies to `createTransaction`, `updateTransaction`, and `deleteTransaction`.

### `authService.js`

Provides `login()`, `logout()`, `getToken()`, and `isAuthenticated()`. Currently returns mock responses. When a real auth backend exists, uncomment the fetch calls — the rest of the app reads `getToken()` and `isAuthenticated()` without caring about the implementation.

### `summaryService.js`

Provides `fetchSummary(period)` for when the backend computes aggregations server-side. Currently returns `null` (client-side computation via `computeSummary` is used instead).

---

## Role-Based Access Control

The app supports two roles toggled via the **Role** button in the top-right corner:

| Feature | Viewer | Admin |
|---|---|---|
| View dashboard, charts, insights | ☑️ | ☑️ |
| View all transactions | ☑️ | ☑️ |
| Search and filter transactions | ☑️ | ☑️ |
| Add new transaction | ❌ | ☑️ |
| Edit existing transaction | ❌ | ☑️ |
| Delete transaction | ❌ | ☑️ |

Role gating is enforced via `useRole()` — the `isAdmin` boolean is checked in `Dashboard.jsx`, `TransactionsPage.jsx`, and `TransactionsTable.jsx` before rendering write-action UI elements.

---

## Backend Migration Guide

The app is designed so that switching from mock data to a real backend requires changes in only two places:

1. **`src/services/`** — Uncomment the `fetch()` calls and remove the `Promise.resolve()` stubs. Set `VITE_API_BASE_URL` in your `.env`.

2. **`src/context/FinanceContext.jsx`** — Replace the `useState(mockTransactions)` initial value with a `useEffect` that calls `fetchTransactions()` from the service on mount.

No changes are needed in any component, hook, page, or utility file.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| React Router | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Recharts | 3 | Bar chart and donut chart |
| Lucide React | latest | Icons |
| Vite | 8 | Build tool and dev server |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:5173 |
| `npm run build` | Build for production (output to `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |
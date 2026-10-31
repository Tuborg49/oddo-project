# Brightloop Software – Subscription Management System

> **Neo-Brutalist SaaS Subscription & Recurring Billing Frontend**

Built with **React.js**, **JavaScript**, **Vite**, and **React Router v6** following the Neo-Brutalism design system extracted from the provided Figma specifications.

---

## 🚀 Quick Start

```sh
# 1. Install dependencies (already installed)
npm install

# 2. Start the local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🎨 Design System Implementation (Neo-Brutalism)

* **Borders**: Uniform `2.5px solid #000000` (and `3px solid #000000` for heavy modals and cards).  
* **Hard Drop Shadows**: Solid `4px 4px 0px #000000` on cards and buttons, `8px 8px 0px #000000` on dialogs.  
* **Micro-Interactions**: Active press translation (`transform: translate(2px, 2px); box-shadow: 1px 1px 0px #000;`).  
* **Color Palette**:  
  * 🟡 **Electric Yellow** (`#FFE600`): Primary actions, highlight badges, pending states.  
  * 🟣 **Pastel Lavender** (`#B892FF`): Admin metrics, executive highlights.  
  * 🔵 **Pastel Cyan** (`#70EEFF`): Table headers, information blocks, plan badges.  
  * 🟠 **Pastel Peach** (`#FFB396`): Secondary stats and alerts.  
  * 🟢 **Lime Green** (`#86EFAC`): `PAID`, `ACTIVE`, `CONFIRMED` success badges.  
  * 🔴 **Pastel Rose** (`#FDA4AF`): `OVERDUE`, `FAILED`, `CANCELLED` alert badges.  
  * ⚪ **Canvas Neutral** (`#F8F8F5`): Warm cream application canvas.  
* **Typography**: Modern punchy grotesque (`Plus Jakarta Sans`) with heavy weights (`800`/`900`), uppercase headers, and clean monospace numeric values.

---

## 🗺️ Implemented Routes & Personas

### 1\. Public Routes

* `/login` — Sign-in card with reviewer fast-login shortcuts (Admin, Staff, Customer Portal).  
* `/register` — B2B organization registration view.  
* `/forgot-password` — Password recovery flow with interactive feedback.

### 2\. Admin Routes (`/admin` layout)

* `/admin` — Executive dashboard: MRR ($18,420),ARR($221,040), Active Subs (1,067), Churn Rate (1.8%), weekly revenue bar chart, and plan revenue distribution.  
* `/admin/products` — SaaS product and metered variant management (Tiers, quotas, pricing) with Add/Edit/Delete modals.  
* `/admin/plans` — Subscription plans (Starter, Pro, Enterprise) with monthly/annual billing cycle toggle (Save 20% badge) and feature manager.  
* `/admin/taxes` — Tax jurisdiction compliance rules (US Sales Tax, EU VAT, UK VAT, India GST, Canada HST) with status toggles.  
* `/admin/discounts` — Promotional coupon codes (`WELCOME20`, `STARTUP50`, `ANNUAL100`) with redemption usage progress bars.  
* `/admin/templates` — Standardized quotation templates, SLA terms, and contract presets.  
* `/admin/users` — Team and staff governance with avatar cards, department badges, and role assignments.

### 3\. Staff Routes (`/staff` layout)

* `/staff` — Operational overview: pending quotations, customer accounts managed, and overdue payment alerts.  
* `/staff/customers` — Customer CRM directory with account status, contact details, assigned plans, and MRR.  
* `/staff/subscriptions` — Subscription lifecycle pipeline: `Draft` → `Sent` → `Confirmed` → `Active` → `Cancelled`.  
* `/staff/invoices` — Complete invoice register with status badges and full printable/downloadable Invoice Sheet Preview modal.  
* `/staff/payments` — Real-time payment gateway transaction tracker across Stripe, Wires, SEPA, and ACH.

### 4\. Customer Portal Routes (`/portal` layout)

* `/portal/my-subscriptions` — Customer's active subscription card, auto-renewal controls, resource quota consumption, and Change/Upgrade Plan modal.  
* `/portal/my-invoices` — Customer invoice history with total lifetime spend and statement viewer.  
* `/portal/profile` — Organization billing details, official invoicing address, tax ID, and notification preference toggles.

---

## ⚡ Hackathon Evaluator Tools

* **Role Switcher in Header**: Instant one-click toggle between **Admin**, **Staff**, and **Customer Portal** perspectives without signing out.  
* **Live Search & Filtering**: Client-side filtering on all tables and product grids.  
* **Interactive Modals**: Full Add, Edit, Delete, and Preview dialogs across all operational screens.
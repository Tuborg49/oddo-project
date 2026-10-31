// Brightloop In-Memory Relational Store (Odoo Challenge Schema)
const db = {
  users: [
    { id: "usr_admin_1", email: "admin@brightloop.com", password: "AdminPass123!", name: "Sarah Jenkins", role: "ADMIN" },
    { id: "usr_staff_1", email: "sales@brightloop.com", password: "StaffPass123!", name: "David Miller", role: "STAFF" },
    { id: "usr_cust_1", email: "billing@acmelogistics.com", password: "CustomerPass123!", name: "Acme Logistics Corp", role: "CUSTOMER" }
  ],

  products: [
    {
      id: "prod_erp",
      name: "Brightloop ERP Core",
      type: "SOFTWARE",
      salesPrice: 1200,
      costPrice: 400,
      variants: [
        { name: "Standard", surcharge: 0 },
        { name: "Odoo Edition", surcharge: 560 } // Odoo rule: +$560 surcharge
      ]
    },
    {
      id: "prod_storage",
      name: "Cloud Storage Booster (1TB)",
      type: "ADDON",
      salesPrice: 50,
      costPrice: 12,
      variants: [{ name: "Standard", surcharge: 0 }]
    },
    {
      id: "prod_cron",
      name: "Automation Cron Engine",
      type: "ADDON",
      salesPrice: 300,
      costPrice: 80,
      variants: [{ name: "Standard", surcharge: 0 }]
    }
  ],

  plans: [
    { id: "plan_monthly", name: "Starter Monthly", interval: "MONTHLY", basePrice: 49, minQty: 1, allowPause: true },
    { id: "plan_annual", name: "Enterprise Annual Contract", interval: "YEARLY", basePrice: 1760, minQty: 5, allowPause: true }
  ],

  subscriptions: [
    {
      id: "SUB-2026-001",
      customerId: "usr_cust_1",
      customerName: "Acme Logistics Corp",
      planId: "plan_annual",
      productName: "Brightloop ERP Core (Odoo Edition)",
      interval: "YEARLY",
      baseAmount: 1760,
      activeAddons: ["Cloud Storage Booster (1TB)"],
      addonMonthlyTotal: 50,
      status: "ACTIVE", // DRAFT -> QUOTATION -> CONFIRMED -> ACTIVE -> CLOSED
      startDate: "2025-11-04",
      nextBillingDate: "2026-11-04"
    }
  ],

  invoices: [
    {
      id: "INV-10042",
      subscriptionId: "SUB-2026-001",
      customerName: "Acme Logistics Corp",
      issueDate: "2026-10-01",
      dueDate: "2026-10-15",
      subtotal: 1118.64,
      taxAmount: 201.36,
      grandTotal: 1320.00,
      amountPaid: 1320.00,
      status: "PAID",
      idempotencyKey: "SUB-2026-001_2026-10-01"
    }
  ],

  payments: [
    {
      id: "pay_101",
      invoiceId: "INV-10042",
      method: "STRIPE",
      amount: 1320.00,
      paymentDate: "2026-10-02",
      reference: "STRIPE_CH_994820",
      notes: "Customer portal automatic settlement"
    }
  ]
};

module.exports = db;

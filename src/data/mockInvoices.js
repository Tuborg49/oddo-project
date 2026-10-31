export const initialInvoices = [
  {
    id: 'inv-00124',
    invoiceNumber: 'INV-2026-00124',
    customerName: 'Acme Cloud Technologies',
    customerEmail: 'david@acmecloud.com',
    billingAddress: '500 Howard Street, Suite 400, San Francisco, CA 94105, USA',
    amount: 2490.00,
    subtotal: 2490.00,
    taxRate: 7.25,
    taxAmount: 180.53,
    discountAmount: 0.00,
    total: 2670.53,
    issueDate: '2026-10-15',
    dueDate: '2026-11-15',
    status: 'Paid',
    items: [
      { description: 'Brightloop Enterprise Ultra - 1 Year Subscription License', qty: 1, unitPrice: 2490.00, total: 2490.00 }
    ],
    notes: 'Thank you for your partnership with Brightloop Software.'
  },
  {
    id: 'inv-00123',
    invoiceNumber: 'INV-2026-00123',
    customerName: 'Nordic FinTech Labs',
    customerEmail: 'astrid@nordicfin.se',
    billingAddress: 'Kungsgatan 12, 111 43 Stockholm, Sweden',
    amount: 89.00,
    subtotal: 89.00,
    taxRate: 20.00,
    taxAmount: 17.80,
    discountAmount: 17.80, // WELCOME20
    total: 89.00,
    issueDate: '2026-10-14',
    dueDate: '2026-11-14',
    status: 'Paid',
    items: [
      { description: 'Brightloop Professional Plan - Monthly Recurring', qty: 1, unitPrice: 89.00, total: 89.00 }
    ],
    notes: 'Includes 24/7 priority support and multi-country tax calculations.'
  },
  {
    id: 'inv-00122',
    invoiceNumber: 'INV-2026-00122',
    customerName: 'Quantum Health Systems',
    customerEmail: 'robert@quantumhealth.io',
    billingAddress: '777 Bay Street, Toronto, ON M5G 2C8, Canada',
    amount: 89.00,
    subtotal: 89.00,
    taxRate: 13.00,
    taxAmount: 11.57,
    discountAmount: 0.00,
    total: 100.57,
    issueDate: '2026-10-10',
    dueDate: '2026-11-10',
    status: 'Paid',
    items: [
      { description: 'Brightloop Professional Plan - Monthly Recurring', qty: 1, unitPrice: 89.00, total: 89.00 }
    ],
    notes: 'Billed automatically via registered corporate visa card.'
  },
  {
    id: 'inv-00121',
    invoiceNumber: 'INV-2026-00121',
    customerName: 'Solaris Energy Software',
    customerEmail: 'marcus@solaris-energy.de',
    billingAddress: 'Friedrichstraße 44, 10117 Berlin, Germany',
    amount: 29.00,
    subtotal: 29.00,
    taxRate: 19.00,
    taxAmount: 5.51,
    discountAmount: 0.00,
    total: 34.51,
    issueDate: '2026-10-01',
    dueDate: '2026-10-15',
    status: 'Overdue',
    items: [
      { description: 'Brightloop Starter Plan - Monthly', qty: 1, unitPrice: 29.00, total: 29.00 }
    ],
    notes: 'Payment reminder sent on Oct 18, 2026.'
  },
  {
    id: 'inv-00120',
    invoiceNumber: 'INV-2026-00120',
    customerName: 'HyperScale Media UK',
    customerEmail: 'emma@hyperscale.co.uk',
    billingAddress: '25 Bank Street, Canary Wharf, London E14 5JP, UK',
    amount: 2490.00,
    subtotal: 2490.00,
    taxRate: 20.00,
    taxAmount: 498.00,
    discountAmount: 0.00,
    total: 2988.00,
    issueDate: '2026-10-20',
    dueDate: '2026-11-20',
    status: 'Pending',
    items: [
      { description: 'Brightloop Enterprise Ultra - Annual Renewal', qty: 1, unitPrice: 2490.00, total: 2490.00 }
    ],
    notes: 'Awaiting corporate wire transfer authorization.'
  }
];

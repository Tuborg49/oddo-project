export const initialTemplates = [
  {
    id: 'tmpl-01',
    name: 'Enterprise Annual Software Agreement',
    category: 'Enterprise',
    description: 'Standard 12-month commercial SaaS licensing quotation with SLA agreement.',
    validityDays: 30,
    discountAllowed: true,
    terms: 'Payment due Net 30 from invoice receipt. 99.9% uptime SLA included. Annual auto-renewal unless notified 60 days prior.',
    defaultItems: [
      { description: 'Brightloop Enterprise License (Annual)', qty: 1, rate: 2490.00 },
      { description: 'Dedicated Solution Architect Onboarding', qty: 1, rate: 1200.00 }
    ],
    status: 'Active'
  },
  {
    id: 'tmpl-02',
    name: 'Growth Scale Quotation',
    category: 'Commercial',
    description: 'Designed for fast growing tech companies moving to Pro tier with extra seats.',
    validityDays: 14,
    discountAllowed: true,
    terms: 'Payment due on receipt. Standard priority support included. Billed monthly or annually as elected.',
    defaultItems: [
      { description: 'Professional Plan (Monthly)', qty: 1, rate: 89.00 },
      { description: 'Additional 10 Team Seats Pool', qty: 1, rate: 50.00 }
    ],
    status: 'Active'
  },
  {
    id: 'tmpl-03',
    name: 'Custom Multi-Tenant Pilot Quote',
    category: 'Pilot',
    description: '90-day evaluation pilot license for enterprise proof-of-concept testing.',
    validityDays: 15,
    discountAllowed: false,
    terms: 'Evaluation license valid strictly for 90 days. Non-commercial test data only.',
    defaultItems: [
      { description: '90-Day Sandboxed Enterprise Evaluation', qty: 1, rate: 499.00 }
    ],
    status: 'Active'
  }
];

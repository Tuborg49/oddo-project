export const initialProducts = [
  {
    id: 'prod-001',
    name: 'Brightloop Analytics Suite',
    category: 'Analytics',
    description: 'Real-time telemetry, user funnel tracking, and automated cohort analytics.',
    status: 'Active',
    basePrice: 49.00,
    billingInterval: 'Monthly',
    variants: [
      { id: 'v-101', name: 'Starter Tier (up to 50k events)', price: 49.00, quota: '50k events/mo' },
      { id: 'v-102', name: 'Growth Tier (up to 500k events)', price: 149.00, quota: '500k events/mo' },
      { id: 'v-103', name: 'Enterprise Tier (Unlimited)', price: 399.00, quota: 'Unlimited events' }
    ]
  },
  {
    id: 'prod-002',
    name: 'Cloud Storage & CDN Mesh',
    category: 'Infrastructure',
    description: 'High-speed object storage and global edge content delivery network.',
    status: 'Active',
    basePrice: 29.00,
    billingInterval: 'Monthly',
    variants: [
      { id: 'v-201', name: '100 GB Edge Storage', price: 29.00, quota: '100 GB' },
      { id: 'v-202', name: '1 TB High-Speed Storage', price: 99.00, quota: '1 TB' },
      { id: 'v-203', name: '10 TB Dedicated Mesh', price: 450.00, quota: '10 TB' }
    ]
  },
  {
    id: 'prod-003',
    name: 'Brightloop Identity & Auth',
    category: 'Security',
    description: 'SSO, SAML 2.0, Multi-Factor Authentication, and granular RBAC controls.',
    status: 'Active',
    basePrice: 79.00,
    billingInterval: 'Monthly',
    variants: [
      { id: 'v-301', name: 'Standard (up to 25 seats)', price: 79.00, quota: '25 seats' },
      { id: 'v-302', name: 'Scale (up to 100 seats)', price: 199.00, quota: '100 seats' },
      { id: 'v-303', name: 'Unlimited Enterprise SSO', price: 499.00, quota: 'Unlimited seats' }
    ]
  },
  {
    id: 'prod-004',
    name: 'Automated Billing & Tax Relay',
    category: 'Finance',
    description: 'Automated global recurring invoicing, tax calculation, and payment reconciliation.',
    status: 'Active',
    basePrice: 119.00,
    billingInterval: 'Monthly',
    variants: [
      { id: 'v-401', name: 'Base Gateway', price: 119.00, quota: '1,000 tx/mo' },
      { id: 'v-402', name: 'Global Multi-Currency Hub', price: 299.00, quota: '10,000 tx/mo' }
    ]
  },
  {
    id: 'prod-005',
    name: 'Customer Support Desk Pro',
    category: 'Productivity',
    description: 'Omnichannel ticketing, live chat widget, and automated response routing.',
    status: 'Inactive',
    basePrice: 39.00,
    billingInterval: 'Monthly',
    variants: [
      { id: 'v-501', name: '5 Agents Pool', price: 39.00, quota: '5 agents' },
      { id: 'v-502', name: '20 Agents Pool', price: 129.00, quota: '20 agents' }
    ]
  }
];

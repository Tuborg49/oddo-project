export const initialDiscounts = [
  {
    id: 'disc-01',
    code: 'WELCOME20',
    description: 'Welcome promotion for new startup customers',
    type: 'Percentage',
    value: 20,
    validUntil: '2027-12-31',
    maxUses: 500,
    timesUsed: 142,
    status: 'Active'
  },
  {
    id: 'disc-02',
    code: 'STARTUP50',
    description: '50% off for verified early stage incubator startups',
    type: 'Percentage',
    value: 50,
    validUntil: '2027-06-30',
    maxUses: 100,
    timesUsed: 89,
    status: 'Active'
  },
  {
    id: 'disc-03',
    code: 'ANNUAL100',
    description: 'Flat $100 off on any annual Enterprise plan commitment',
    type: 'Fixed Amount',
    value: 100,
    validUntil: '2027-11-15',
    maxUses: 250,
    timesUsed: 44,
    status: 'Active'
  },
  {
    id: 'disc-04',
    code: 'BLACKFRIDAY30',
    description: 'Black Friday flash promo code',
    type: 'Percentage',
    value: 30,
    validUntil: '2026-11-30',
    maxUses: 1000,
    timesUsed: 1000,
    status: 'Expired'
  }
];

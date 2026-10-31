export const initialPlans = [
  {
    id: 'plan-starter',
    name: 'Starter Plan',
    code: 'BL-START',
    monthlyPrice: 29.00,
    yearlyPrice: 290.00, // 2 months free
    badge: 'Basic',
    color: '#FFFFFF',
    description: 'Perfect for early-stage startups and small projects launching their SaaS.',
    features: [
      'Up to 3 Team Seats',
      '50,000 Event Tracking / mo',
      'Basic Email & Chat Support',
      'Standard Tax Compliance',
      'Daily System Backup'
    ],
    status: 'Active',
    subscribersCount: 245
  },
  {
    id: 'plan-pro',
    name: 'Professional Plan',
    code: 'BL-PRO',
    monthlyPrice: 89.00,
    yearlyPrice: 890.00,
    badge: 'Popular',
    color: '#FFE600',
    description: 'Designed for scaling SaaS teams requiring deeper analytics and multi-seats.',
    features: [
      'Up to 15 Team Seats',
      '500,000 Event Tracking / mo',
      'Priority 24/7 Slack Support',
      'Automated Multi-Country Tax Rules',
      'Custom Quotation Templates',
      'Advanced Funnel Analysis'
    ],
    status: 'Active',
    subscribersCount: 680
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Ultra',
    code: 'BL-ENT',
    monthlyPrice: 249.00,
    yearlyPrice: 2490.00,
    badge: 'Enterprise',
    color: '#B892FF',
    description: 'Mission-critical infrastructure with tailored SLA, SSO, and dedicated account manager.',
    features: [
      'Unlimited Team Seats',
      'Unlimited Telemetry & Logs',
      'Dedicated Account Representative',
      'Custom SLA 99.99% Guarantee',
      'SSO & Granular SAML Policies',
      'Full White-Label Customer Portal'
    ],
    status: 'Active',
    subscribersCount: 142
  }
];

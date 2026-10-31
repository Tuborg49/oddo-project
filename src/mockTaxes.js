export const initialTaxes = [
  {
    id: 'tax-01',
    name: 'US State Sales Tax (Avg)',
    country: 'United States',
    rate: 7.25,
    type: 'Percentage',
    status: 'Active',
    taxCode: 'US-STATE-01',
    appliesTo: 'All Digital Products'
  },
  {
    id: 'tax-02',
    name: 'European Union Standard VAT',
    country: 'European Union (General)',
    rate: 20.00,
    type: 'Percentage',
    status: 'Active',
    taxCode: 'EU-VAT-STD',
    appliesTo: 'B2C and Unregistered B2B'
  },
  {
    id: 'tax-03',
    name: 'UK Value Added Tax (VAT)',
    country: 'United Kingdom',
    rate: 20.00,
    type: 'Percentage',
    status: 'Active',
    taxCode: 'GB-VAT-20',
    appliesTo: 'All Subscriptions'
  },
  {
    id: 'tax-04',
    name: 'India Goods & Services Tax (GST)',
    country: 'India',
    rate: 18.00,
    type: 'Percentage',
    status: 'Active',
    taxCode: 'IN-GST-18',
    appliesTo: 'SaaS & Cloud Services'
  },
  {
    id: 'tax-05',
    name: 'Canada Harmonized Sales Tax (HST)',
    country: 'Canada',
    rate: 13.00,
    type: 'Percentage',
    status: 'Active',
    taxCode: 'CA-HST-13',
    appliesTo: 'Digital Software Licenses'
  },
  {
    id: 'tax-06',
    name: 'Australia GST',
    country: 'Australia',
    rate: 10.00,
    type: 'Percentage',
    status: 'Inactive',
    taxCode: 'AU-GST-10',
    appliesTo: 'SaaS Subscriptions'
  }
];

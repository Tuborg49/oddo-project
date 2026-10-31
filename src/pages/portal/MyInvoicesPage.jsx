import React, { useState } from 'react';
import { Search, Eye, Download, Receipt, CheckCircle, Clock } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import InvoiceModal from '../../components/subscriptions/InvoiceModal';
import { initialInvoices } from '../../data/mockInvoices';

export default function MyInvoicesPage() {
  // Acme Cloud Technologies' invoices
  const customerInvoices = initialInvoices.filter(i => i.customerName === 'Acme Cloud Technologies' || i.id === 'inv-00124');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const totalPaid = customerInvoices.reduce((sum, inv) => sum + (inv.status === 'Paid' ? inv.total : 0), 0);

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h1 className="page-title">MY BILLING STATEMENTS & INVOICES</h1>
          <p className="page-subtitle">
            Download PDF copies and inspect tax calculations for all software subscription receipts.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280' }}>
            TOTAL PAID (LIFETIME)
          </span>
          <p style={{ fontSize: '24px', fontWeight: 900 }}>${totalPaid.toFixed(2)}</p>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="neo-table-wrapper">
        <div className="neo-table-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Receipt size={18} strokeWidth={2.5} />
            <h3 style={{ fontSize: '15px', fontWeight: 900, textTransform: 'uppercase' }}>
              BILLING HISTORY ({customerInvoices.length})
            </h3>
          </div>
          <button
            className="neo-btn neo-btn-sm"
            onClick={() => alert('Simulated batch download of all historical statements')}
          >
            <Download size={14} />
            DOWNLOAD ALL STATEMENTS
          </button>
        </div>

        <div className="neo-table-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Statement #</th>
                <th>Service Plan</th>
                <th>Invoice Date</th>
                <th>Payment Due</th>
                <th>Amount</th>
                <th>Tax Included</th>
                <th>Payment Status</th>
                <th>View Receipt</th>
              </tr>
            </thead>
            <tbody>
              {customerInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    {inv.invoiceNumber}
                  </td>
                  <td style={{ fontWeight: 800 }}>Brightloop Enterprise Ultra</td>
                  <td>{inv.issueDate}</td>
                  <td>{inv.dueDate}</td>
                  <td style={{ fontSize: '15px', fontWeight: 900 }}>${inv.total.toFixed(2)}</td>
                  <td>${inv.taxAmount.toFixed(2)} ({inv.taxRate}%)</td>
                  <td>
                    <Badge variant={inv.status}>{inv.status}</Badge>
                  </td>
                  <td>
                    <Button
                      variant="default"
                      size="sm"
                      icon={Eye}
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      VIEW
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <InvoiceModal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
}

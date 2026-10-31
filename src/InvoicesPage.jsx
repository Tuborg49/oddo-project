import React, { useState } from 'react';
import { Search, Eye, Download, Receipt } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import InvoiceModal from '../../components/subscriptions/InvoiceModal';
import { initialInvoices } from '../../data/mockInvoices';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMarkPaid = (invId) => {
    setInvoices(invoices.map(i => i.id === invId ? { ...i, status: 'Paid' } : i));
  };

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
          <h1 className="page-title">INVOICE MANAGEMENT</h1>
          <p className="page-subtitle">
            Generate, dispatch, audit, and reconcile client invoices and tax breakdowns.
          </p>
        </div>
        <Button
          variant="cyan"
          icon={Download}
          onClick={() => alert('Simulated batch exporting all Q4 Invoices to CSV')}
        >
          EXPORT INVOICES
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="neo-card"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div className="neo-search-box" style={{ maxWidth: '380px' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search invoice # or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input neo-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Paid', 'Pending', 'Overdue'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className="neo-btn neo-btn-sm"
              style={{
                backgroundColor: statusFilter === st ? '#FFE600' : '#FFFFFF',
                fontWeight: 800
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="neo-table-wrapper">
        <div className="neo-table-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Receipt size={18} strokeWidth={2.5} />
            <h3 style={{ fontSize: '15px', fontWeight: 900, textTransform: 'uppercase' }}>
              ALL INVOICES ({filteredInvoices.length})
            </h3>
          </div>
        </div>

        <div className="neo-table-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client Name</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Subtotal</th>
                <th>Tax</th>
                <th>Total Due</th>
                <th>Status</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    {inv.invoiceNumber}
                  </td>
                  <td>
                    <div style={{ fontWeight: 800 }}>{inv.customerName}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{inv.customerEmail}</div>
                  </td>
                  <td>{inv.issueDate}</td>
                  <td style={{ color: inv.status === 'Overdue' ? '#E11D48' : '#000', fontWeight: 700 }}>
                    {inv.dueDate}
                  </td>
                  <td>${inv.subtotal.toFixed(2)}</td>
                  <td>+${inv.taxAmount.toFixed(2)}</td>
                  <td style={{ fontSize: '15px', fontWeight: 900 }}>
                    ${inv.total.toFixed(2)}
                  </td>
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

      {/* Invoice Sheet Preview Modal */}
      {selectedInvoice && (
        <InvoiceModal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          invoice={selectedInvoice}
          onMarkPaid={handleMarkPaid}
        />
      )}
    </div>
  );
}

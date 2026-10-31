import React, { useState } from 'react';
import { Search, CreditCard, RefreshCw } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { initialPayments } from '../../data/mockPayments';

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleRetryPayment = (payId) => {
    setPayments(payments.map(p => {
      if (p.id === payId) {
        return { ...p, status: 'Completed', date: 'Just now' };
      }
      return p;
    }));
    alert('Simulated transaction retry authorized successfully!');
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
          <h1 className="page-title">PAYMENT TRACKING & GATEWAYS</h1>
          <p className="page-subtitle">
            Real-time transaction log across Stripe, corporate wires, SEPA, and ACH relays.
          </p>
        </div>
        <Button
          variant="yellow"
          icon={RefreshCw}
          onClick={() => alert('Simulated synchronizing gateway ledger records')}
        >
          SYNC GATEWAYS
        </Button>
      </div>

      {/* Search and Filters */}
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
            placeholder="Search TXN ID, invoice #, or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input neo-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Completed', 'Pending', 'Failed'].map((st) => (
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

      {/* Transactions Table */}
      <div className="neo-table-wrapper">
        <div className="neo-table-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} strokeWidth={2.5} />
            <h3 style={{ fontSize: '15px', fontWeight: 900, textTransform: 'uppercase' }}>
              SETTLED TRANSACTIONS ({filteredPayments.length})
            </h3>
          </div>
        </div>

        <div className="neo-table-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Invoice Ref</th>
                <th>Client Account</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Timestamp</th>
                <th>Gateway Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((pay) => (
                <tr key={pay.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    {pay.transactionId}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700 }}>{pay.invoiceNumber}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800 }}>{pay.customerName}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700 }}>
                      <CreditCard size={14} />
                      <span>{pay.method}</span>
                      {pay.cardLast4 !== 'N/A' && (
                        <span style={{ color: '#6B7280' }}>•••• {pay.cardLast4}</span>
                      )}
                    </div>
                  </td>
                  <td style={{ fontSize: '15px', fontWeight: 900 }}>
                    ${pay.amount.toFixed(2)}
                  </td>
                  <td style={{ fontSize: '12px', color: '#4B5563' }}>{pay.date}</td>
                  <td>
                    <Badge variant={pay.status}>{pay.status}</Badge>
                  </td>
                  <td>
                    {pay.status === 'Failed' ? (
                      <Button
                        variant="danger"
                        size="sm"
                        icon={RefreshCw}
                        onClick={() => handleRetryPayment(pay.id)}
                      >
                        RETRY
                      </Button>
                    ) : (
                      <button
                        className="neo-btn neo-btn-sm"
                        style={{ background: '#FFF' }}
                        onClick={() => alert(`Simulated downloading receipt for ${pay.transactionId}`)}
                      >
                        RECEIPT
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

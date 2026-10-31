import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Users, Clock, AlertTriangle, Plus } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { initialSubscriptions } from '../../data/mockSubscriptions';
import { initialCustomers } from '../../data/mockCustomers';
import { initialInvoices } from '../../data/mockInvoices';

export default function StaffDashboard() {
  const navigate = useNavigate();

  const pendingQuotes = initialSubscriptions.filter(s => s.quotationStatus === 'Draft' || s.quotationStatus === 'Sent');
  const overdueInvoices = initialInvoices.filter(i => i.status === 'Overdue');

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
          <h1 className="page-title">STAFF OPERATIONS DESK</h1>
          <p className="page-subtitle">
            Welcome, Mike! Here are your active customer pipelines, quotation reviews, and billing actions.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="cyan"
            icon={Users}
            onClick={() => navigate('/staff/customers')}
          >
            CUSTOMER CRM
          </Button>
          <Button
            variant="yellow"
            icon={Plus}
            onClick={() => navigate('/staff/subscriptions')}
          >
            DRAFT QUOTATION
          </Button>
        </div>
      </div>

      {/* Operational Metrics */}
      <div className="stat-grid">
        <StatCard
          title="Assigned Accounts"
          value={initialCustomers.length.toString()}
          subtext="B2B accounts under your care"
          icon={Users}
          bgColor="#FFE600"
        />
        <StatCard
          title="Active Subscriptions"
          value="5"
          subtext="Healthy recurring services"
          icon={Layers}
          bgColor="#70EEFF"
        />
        <StatCard
          title="Pending Quotations"
          value={pendingQuotes.length.toString()}
          subtext="Awaiting client sign-off"
          icon={Clock}
          trend="Action required"
          trendUp={false}
          bgColor="#B892FF"
        />
        <StatCard
          title="Payment Alerts"
          value={overdueInvoices.length.toString()}
          subtext="Overdue invoices needing chase"
          icon={AlertTriangle}
          trend="Urgent"
          trendUp={false}
          bgColor="#FDA4AF"
        />
      </div>

      {/* Main Split: Pending Quotes + Overdue Invoices */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Pending Quotations to Confirm */}
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase' }}>
                QUOTATIONS IN PROGRESS
              </h2>
              <p style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
                Quotes awaiting final client acceptance or contract delivery
              </p>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/staff/subscriptions')}
            >
              VIEW ALL
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pendingQuotes.map((q) => (
              <div
                key={q.id}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #000',
                  borderRadius: '10px',
                  boxShadow: '3px 3px 0px #000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '12px' }}>
                      {q.subscriptionNumber}
                    </span>
                    <Badge variant={q.quotationStatus}>{q.quotationStatus}</Badge>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 800, color: '#000', marginTop: '2px' }}>
                    {q.customerName}
                  </p>
                  <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
                    {q.planName} • ${q.amount.toFixed(2)}/{q.billingCycle}
                  </span>
                </div>

                <Button
                  variant="yellow"
                  size="sm"
                  onClick={() => navigate('/staff/subscriptions')}
                >
                  MANAGE
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices Alert Widget */}
        <div className="neo-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase' }}>
                BILLING ALERTS & OVERDUE
              </h2>
              <p style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
                Uncollected revenue requiring staff outreach
              </p>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('/staff/invoices')}
            >
              INVOICES
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {initialInvoices.filter(i => i.status !== 'Paid').map((inv) => (
              <div
                key={inv.id}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#FFF5F5',
                  border: '2px solid #000',
                  borderRadius: '10px',
                  boxShadow: '3px 3px 0px #000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '12px' }}>
                      {inv.invoiceNumber}
                    </span>
                    <Badge variant={inv.status}>{inv.status}</Badge>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 800, color: '#000', marginTop: '2px' }}>
                    {inv.customerName}
                  </p>
                  <span style={{ fontSize: '11px', color: '#E11D48', fontWeight: 700 }}>
                    Due date: {inv.dueDate}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '16px', fontWeight: 900 }}>${inv.total.toFixed(2)}</p>
                  <button
                    onClick={() => navigate('/staff/invoices')}
                    style={{
                      border: 'none',
                      background: 'none',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#000',
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    }}
                  >
                    Send reminder →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

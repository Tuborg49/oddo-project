import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp, AlertCircle, ArrowUpRight, Plus, Download, Filter } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { initialSubscriptions } from '../../data/mockSubscriptions';
import { initialInvoices } from '../../data/mockInvoices';
import InvoiceModal from '../../components/subscriptions/InvoiceModal';

export default function AdminDashboard() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Weekly bar performance data from Figma overview_dashboard.png
  const weeklyData = [
    { day: 'M', height: 40, color: '#B892FF' },
    { day: 'T', height: 75, color: '#70EEFF' },
    { day: 'W', height: 60, color: '#FFB396' },
    { day: 'T', height: 100, color: '#FFE600' },
    { day: 'F', height: 85, color: '#B892FF' },
    { day: 'S', height: 50, color: '#70EEFF' },
    { day: 'S', height: 35, color: '#FFB396' },
  ];

  return (
    <div>
      {/* Top Header Banner */}
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
          <h1 className="page-title">EXECUTIVE DASHBOARD</h1>
          <p className="page-subtitle">
            Welcome back, Alexander! Here is your real-time recurring revenue and subscription telemetry.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="cyan"
            icon={Download}
            onClick={() => alert('Simulated downloading SaaS Monthly Financial Report CSV')}
          >
            EXPORT REPORT
          </Button>
          <Button
            variant="yellow"
            icon={Plus}
            onClick={() => alert('Navigate to Product or Plan creator to launch new catalog items')}
          >
            CREATE PLAN
          </Button>
        </div>
      </div>

      {/* 4 Neo-Brutalist Stat Cards */}
      <div className="stat-grid">
        <StatCard
          title="Monthly Recurring Revenue"
          value="$18,420"
          subtext="+$2,450 vs last month"
          icon={DollarSign}
          trend="+14.2%"
          trendUp={true}
          bgColor="#B892FF"
        />
        <StatCard
          title="Annual Run Rate (ARR)"
          value="$221,040"
          subtext="Projected FY2026 run rate"
          icon={TrendingUp}
          trend="+22.8%"
          trendUp={true}
          bgColor="#70EEFF"
        />
        <StatCard
          title="Active Subscriptions"
          value="1,067"
          subtext="89 enterprise accounts"
          icon={Users}
          trend="+34 new"
          trendUp={true}
          bgColor="#FFB396"
        />
        <StatCard
          title="Gross Churn Rate"
          value="1.8%"
          subtext="-0.4% improvement"
          icon={AlertCircle}
          trend="-0.4%"
          trendUp={true}
          bgColor="#FFE600"
        />
      </div>

      {/* Main Grid: Weekly Performance Chart & Subscription Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}
      >
        {/* Weekly Performance Bar Chart (From overview_dashboard.png) */}
        <div className="neo-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase' }}>
                WEEKLY REVENUE PERFORMANCE
              </h2>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280' }}>
                Net new recurring billing cashflow this week
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '24px', fontWeight: 900 }}>$14,850</span>
              <p style={{ fontSize: '11px', fontWeight: 800, color: '#10B981' }}>+18% vs Last Week</p>
            </div>
          </div>

          {/* Neo-brutalist Bar Graphic */}
          <div
            style={{
              height: '180px',
              borderBottom: '2.5px solid #000',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              padding: '0 10px',
              gap: '12px',
              position: 'relative'
            }}
          >
            {/* Dashed Guideline */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                left: 0,
                right: 0,
                borderTop: '2px dashed #D1D5DB',
                pointerEvents: 'none'
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '60%',
                left: 0,
                right: 0,
                borderTop: '2px dashed #E5E7EB',
                pointerEvents: 'none'
              }}
            />

            {weeklyData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  height: '100%',
                  justifyContent: 'flex-end'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: '44px',
                    height: `${item.height}%`,
                    backgroundColor: item.color,
                    border: '2px solid #000',
                    borderBottom: 'none',
                    borderRadius: '6px 6px 0 0',
                    boxShadow: '2px -2px 0px #000',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                  title={`${item.day}: ${item.height}% volume`}
                />
              </div>
            ))}
          </div>

          {/* Days Row */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            {weeklyData.map((item, idx) => (
              <span key={idx} style={{ fontSize: '12px', fontWeight: 900, color: '#000', width: '44px', textAlign: 'center' }}>
                {item.day}
              </span>
            ))}
          </div>
        </div>

        {/* Plan Revenue Distribution */}
        <div className="neo-card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>
            PLAN REVENUE SHARE
          </h2>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', marginBottom: '20px' }}>
            Active customer share across Brightloop plan tiers
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                <span>ENTERPRISE ULTRA ($249/mo)</span>
                <span>$35,358 / mo (64%)</span>
              </div>
              <div style={{ height: '18px', border: '2px solid #000', borderRadius: '6px', background: '#F8F8F5', overflow: 'hidden' }}>
                <div style={{ width: '64%', height: '100%', background: '#B892FF', borderRight: '2px solid #000' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                <span>PROFESSIONAL PLAN ($89/mo)</span>
                <span>$60,520 / mo (28%)</span>
              </div>
              <div style={{ height: '18px', border: '2px solid #000', borderRadius: '6px', background: '#F8F8F5', overflow: 'hidden' }}>
                <div style={{ width: '28%', height: '100%', background: '#FFE600', borderRight: '2px solid #000' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                <span>STARTER BASIC ($29/mo)</span>
                <span>$7,105 / mo (8%)</span>
              </div>
              <div style={{ height: '18px', border: '2px solid #000', borderRadius: '6px', background: '#F8F8F5', overflow: 'hidden' }}>
                <div style={{ width: '8%', height: '100%', background: '#70EEFF', borderRight: '2px solid #000' }} />
              </div>
            </div>

            <div
              style={{
                marginTop: '10px',
                padding: '12px',
                backgroundColor: '#FFF580',
                border: '2px solid #000',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              💡 <strong>Growth Insight:</strong> Enterprise tier expansion increased by 38% after launching Custom Quotation Templates.
            </div>
          </div>
        </div>
      </div>

      {/* Recent Subscriptions & Invoices Table */}
      <div className="neo-table-wrapper">
        <div className="neo-table-header-bar">
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase' }}>
              RECENT ACTIVE SUBSCRIPTION CONTRACTS
            </h3>
            <p style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>
              Real-time subscription status across all accounts
            </p>
          </div>
          <Button variant="default" size="sm" onClick={() => window.location.href = '/admin/plans'}>
            VIEW ALL PLANS
          </Button>
        </div>

        <div className="neo-table-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Subscription #</th>
                <th>Customer</th>
                <th>Plan Tier</th>
                <th>Cycle</th>
                <th>Amount</th>
                <th>Renewal Date</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {initialSubscriptions.slice(0, 5).map((sub) => (
                <tr key={sub.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    {sub.subscriptionNumber}
                  </td>
                  <td>
                    <div style={{ fontWeight: 800 }}>{sub.customerName}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>{sub.customerEmail}</div>
                  </td>
                  <td>
                    <Badge variant={sub.planName.includes('Enterprise') ? 'enterprise' : 'pro'}>
                      {sub.planName}
                    </Badge>
                  </td>
                  <td>{sub.billingCycle}</td>
                  <td style={{ fontWeight: 800 }}>${sub.amount.toFixed(2)}</td>
                  <td>{sub.renewalDate}</td>
                  <td>
                    <Badge variant={sub.status}>{sub.status}</Badge>
                  </td>
                  <td>
                    <button
                      className="neo-btn neo-btn-sm"
                      style={{ background: '#FFF' }}
                      onClick={() => {
                        const inv = initialInvoices.find(i => i.customerName === sub.customerName) || initialInvoices[0];
                        setSelectedInvoice(inv);
                      }}
                    >
                      VIEW
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Viewer Modal */}
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

import React, { useState } from 'react';
import { Layers, Calendar, Check, ArrowUpRight, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { initialPlans } from '../../data/mockPlans';

export default function MySubscriptionsPage() {
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Enterprise Ultra',
    code: 'BL-ENT',
    billingCycle: 'Yearly',
    amount: 2490.00,
    renewalDate: '2027-01-01',
    status: 'Active',
    autoRenew: true,
    features: [
      'Unlimited Team Seats (18 seats currently active)',
      'Unlimited Telemetry & Logs',
      'Dedicated Solution Architect & 24/7 SLA',
      'Automated Multi-Jurisdiction Tax Invoicing',
      'Single Sign-On (SAML / Okta) Active'
    ]
  });

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  const handleSelectUpgrade = (plan) => {
    setCurrentPlan({
      ...currentPlan,
      name: plan.name,
      code: plan.code,
      amount: currentPlan.billingCycle === 'Yearly' ? plan.yearlyPrice : plan.monthlyPrice,
      features: plan.features
    });
    setIsUpgradeModalOpen(false);
    alert(`Successfully switched to ${plan.name}!`);
  };

  const handleConfirmCancel = () => {
    setCurrentPlan({
      ...currentPlan,
      status: 'Cancelled',
      autoRenew: false
    });
    setIsCancelConfirmOpen(false);
    alert('Subscription cancellation scheduled at end of current billing period.');
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
          <h1 className="page-title">MY ACTIVE SUBSCRIPTIONS</h1>
          <p className="page-subtitle">
            Manage your organization's Brightloop software licenses, renewal cycles, and tier capacity.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            variant="yellow"
            icon={ArrowUpRight}
            onClick={() => setIsUpgradeModalOpen(true)}
          >
            CHANGE OR UPGRADE PLAN
          </Button>
        </div>
      </div>

      {/* Main Subscription Card (Direct Neo-brutalist aesthetic from billing_&_plans.png) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Active Plan Detail */}
        <div className="neo-card" style={{ borderWidth: '3px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: '#6B7280' }}>
                CURRENT ACTIVE PLAN
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase' }}>
                {currentPlan.name}
              </h2>
            </div>
            <Badge variant={currentPlan.status}>{currentPlan.status}</Badge>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '16px' }}>
            <span style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-0.03em' }}>
              ${currentPlan.amount.toFixed(0)}
            </span>
            <span style={{ fontSize: '15px', fontWeight: 800, color: '#6B7280' }}>
              /{currentPlan.billingCycle.toLowerCase()}
            </span>
          </div>

          <div style={{ borderTop: '2.5px dashed #000', margin: '16px 0' }} />

          {/* Renewal meta */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: '#F8F8F5',
              border: '2px solid #000',
              borderRadius: '10px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280' }}>
                NEXT RECURRING RENEWAL
              </p>
              <p style={{ fontSize: '14px', fontWeight: 900 }}>{currentPlan.renewalDate}</p>
            </div>
            <div>
              <Badge variant={currentPlan.autoRenew ? 'success' : 'danger'}>
                {currentPlan.autoRenew ? 'AUTO-RENEW ON' : 'AUTO-RENEW OFF'}
              </Badge>
            </div>
          </div>

          {/* Included Features */}
          <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '10px' }}>
            Included Enterprise Entitlements:
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentPlan.features.map((feat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700 }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#86EFAC',
                    border: '1.5px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '12px', borderTop: '2px solid #000', paddingTop: '16px' }}>
            <Button
              variant="default"
              style={{ flex: 1 }}
              onClick={() => setIsUpgradeModalOpen(true)}
            >
              MODIFY TIERS
            </Button>
            {currentPlan.status !== 'Cancelled' && (
              <Button
                variant="danger"
                onClick={() => setIsCancelConfirmOpen(true)}
              >
                CANCEL PLAN
              </Button>
            )}
          </div>
        </div>

        {/* Usage & Metered Quota Card */}
        <div className="neo-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>
              RESOURCE QUOTA CONSUMPTION
            </h2>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', marginBottom: '20px' }}>
              Cycle ends on {currentPlan.renewalDate}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Metric 1 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                  <span>ACTIVE SEATS ALLOCATED</span>
                  <span>18 / UNLIMITED</span>
                </div>
                <div style={{ height: '14px', border: '2px solid #000', borderRadius: '6px', background: '#F8F8F5', overflow: 'hidden' }}>
                  <div style={{ width: '45%', height: '100%', background: '#70EEFF' }} />
                </div>
              </div>

              {/* Metric 2 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                  <span>TELEMETRY INGESTION (EVENTS/MO)</span>
                  <span>3.4M / UNLIMITED</span>
                </div>
                <div style={{ height: '14px', border: '2px solid #000', borderRadius: '6px', background: '#F8F8F5', overflow: 'hidden' }}>
                  <div style={{ width: '35%', height: '100%', background: '#FFE600' }} />
                </div>
              </div>

              {/* Metric 3 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
                  <span>SLA AVAILABILITY LAST 30 DAYS</span>
                  <span>99.98% (GUARANTEED: 99.9%)</span>
                </div>
                <div style={{ height: '14px', border: '2px solid #000', borderRadius: '6px', background: '#F8F8F5', overflow: 'hidden' }}>
                  <div style={{ width: '99.98%', height: '100%', background: '#86EFAC' }} />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              backgroundColor: '#FFE3D8',
              border: '2px solid #000',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              marginTop: '20px'
            }}
          >
            🛡️ <strong>Dedicated Support Hotline:</strong> Your dedicated enterprise account executive is <strong>Sarah Jenkins</strong> (sarah.j@brightloop.io).
          </div>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title="SWITCH OR UPGRADE PLAN"
        maxWidth="640px"
        footer={
          <Button variant="default" onClick={() => setIsUpgradeModalOpen(false)}>
            CLOSE
          </Button>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {initialPlans.map((p) => (
            <div
              key={p.id}
              style={{
                border: currentPlan.name === p.name ? '3px solid #000' : '2px solid #000',
                borderRadius: '10px',
                padding: '16px',
                backgroundColor: currentPlan.name === p.name ? '#FFF580' : '#FFFFFF',
                boxShadow: '3px 3px 0px #000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 900 }}>{p.name}</h3>
                  {currentPlan.name === p.name && (
                    <Badge variant="active">CURRENT</Badge>
                  )}
                </div>
                <p style={{ fontSize: '24px', fontWeight: 900, margin: '8px 0' }}>
                  ${p.monthlyPrice}/mo
                </p>
                <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: 600 }}>{p.description}</p>
              </div>

              <div style={{ marginTop: '16px' }}>
                <Button
                  variant={currentPlan.name === p.name ? 'default' : 'yellow'}
                  size="sm"
                  style={{ width: '100%' }}
                  disabled={currentPlan.name === p.name}
                  onClick={() => handleSelectUpgrade(p)}
                >
                  {currentPlan.name === p.name ? 'ACTIVE PLAN' : 'SELECT THIS PLAN'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isCancelConfirmOpen}
        onClose={() => setIsCancelConfirmOpen(false)}
        onConfirm={handleConfirmCancel}
        title="CANCEL SUBSCRIPTION"
        message="Are you sure you want to stop automated renewals for Acme Cloud Technologies? You will retain access until the end of your prepaid period on Jan 1, 2027."
        confirmText="Confirm Cancellation"
        confirmVariant="danger"
      />
    </div>
  );
}

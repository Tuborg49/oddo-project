import React, { useState } from 'react';
import { Plus, Check, Edit2, Trash2, Zap, Star } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { Input, Select, Textarea } from '../../components/common/Input';
import { initialPlans } from '../../data/mockPlans';

export default function PlansPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    monthlyPrice: '',
    yearlyPrice: '',
    badge: 'Popular',
    color: '#FFE600',
    description: '',
    features: ''
  });

  const handleOpenAdd = () => {
    setEditingPlan(null);
    setFormData({
      name: '',
      code: 'BL-NEW',
      monthlyPrice: '',
      yearlyPrice: '',
      badge: 'New',
      color: '#FFE600',
      description: '',
      features: 'Full API Access\nPriority Support\nWeekly Data Backup'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      code: plan.code,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      badge: plan.badge,
      color: plan.color,
      description: plan.description,
      features: plan.features.join('\n')
    });
    setIsModalOpen(true);
  };

  const handleSavePlan = (e) => {
    e.preventDefault();
    const parsedFeatures = formData.features.split('\n').filter(f => f.trim().length > 0);

    if (editingPlan) {
      setPlans(plans.map((p) => {
        if (p.id === editingPlan.id) {
          return {
            ...p,
            name: formData.name,
            code: formData.code,
            monthlyPrice: parseFloat(formData.monthlyPrice) || 0,
            yearlyPrice: parseFloat(formData.yearlyPrice) || 0,
            badge: formData.badge,
            color: formData.color,
            description: formData.description,
            features: parsedFeatures
          };
        }
        return p;
      }));
    } else {
      const newPlan = {
        id: `plan-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        code: formData.code,
        monthlyPrice: parseFloat(formData.monthlyPrice) || 0,
        yearlyPrice: parseFloat(formData.yearlyPrice) || 0,
        badge: formData.badge,
        color: formData.color,
        description: formData.description,
        features: parsedFeatures,
        status: 'Active',
        subscribersCount: 0
      };
      setPlans([...plans, newPlan]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setPlans(plans.filter((p) => p.id !== deleteId));
    setDeleteId(null);
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
          <h1 className="page-title">SUBSCRIPTION PLANS</h1>
          <p className="page-subtitle">
            Configure pricing tiers, bundled entitlements, and promotional billing terms.
          </p>
        </div>
        <Button variant="yellow" icon={Plus} onClick={handleOpenAdd}>
          CREATE NEW PLAN
        </Button>
      </div>

      {/* Segmented Billing Toggle (As seen in Figma billing_&_plans.png) */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <div
          style={{
            display: 'inline-flex',
            backgroundColor: '#FFFFFF',
            border: '2.5px solid #000000',
            borderRadius: '12px',
            boxShadow: '4px 4px 0px #000000',
            padding: '4px',
            gap: '6px'
          }}
        >
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '8px 24px',
              borderRadius: '8px',
              border: billingCycle === 'monthly' ? '2px solid #000' : '2px solid transparent',
              backgroundColor: billingCycle === 'monthly' ? '#111827' : 'transparent',
              color: billingCycle === 'monthly' ? '#FFFFFF' : '#000000',
              fontWeight: 800,
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              border: billingCycle === 'yearly' ? '2px solid #000' : '2px solid transparent',
              backgroundColor: billingCycle === 'yearly' ? '#111827' : 'transparent',
              color: billingCycle === 'yearly' ? '#FFFFFF' : '#000000',
              fontWeight: 800,
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease'
            }}
          >
            Yearly
            <span
              style={{
                backgroundColor: '#70EEFF',
                color: '#000',
                fontSize: '10px',
                fontWeight: 900,
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1.5px solid #000'
              }}
            >
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid (Exact Neo-brutalism from billing_&_plans.png) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {plans.map((plan) => {
          const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
          const intervalText = billingCycle === 'monthly' ? '/mo' : '/yr';

          return (
            <div
              key={plan.id}
              className="neo-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                borderWidth: '3px'
              }}
            >
              {plan.badge && (
                <div style={{ position: 'absolute', top: '-14px', right: '20px' }}>
                  <Badge variant={plan.badge === 'Popular' ? 'warning' : 'purple'}>
                    ⭐ {plan.badge}
                  </Badge>
                </div>
              )}

              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#6B7280'
                  }}
                >
                  {plan.code}
                </span>
                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em',
                    marginTop: '2px',
                    marginBottom: '10px'
                  }}
                >
                  {plan.name}
                </h3>

                {/* Price Display */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '38px', fontWeight: 900, letterSpacing: '-0.03em' }}>
                    ${price.toFixed(0)}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#6B7280' }}>
                    {intervalText}
                  </span>
                </div>

                <div style={{ borderTop: '2px dashed #000', margin: '14px 0' }} />

                <p style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '16px' }}>
                  {plan.description}
                </p>

                {/* Features List with Rounded Checks */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {plan.features.map((feat, idx) => (
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
              </div>

              {/* Bottom Card Controls */}
              <div>
                <div
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#F8F8F5',
                    border: '1.5px solid #000',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 800,
                    marginBottom: '14px',
                    textAlign: 'center'
                  }}
                >
                  Active Subscribers: <strong>{plan.subscribersCount}</strong> accounts
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    variant="default"
                    size="sm"
                    icon={Edit2}
                    style={{ flex: 1 }}
                    onClick={() => handleOpenEdit(plan)}
                  >
                    EDIT PLAN
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={Trash2}
                    onClick={() => setDeleteId(plan.id)}
                  >
                    DELETE
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan ? 'EDIT SUBSCRIPTION PLAN' : 'NEW SUBSCRIPTION PLAN'}
        maxWidth="540px"
        footer={
          <>
            <Button variant="default" onClick={() => setIsModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="yellow" onClick={handleSavePlan}>
              {editingPlan ? 'SAVE PLAN' : 'CREATE PLAN'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSavePlan}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
            <Input
              label="Plan Title"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Scale Tier"
              required
            />
            <Input
              label="Code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="BL-SCALE"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Monthly Price ($)"
              type="number"
              value={formData.monthlyPrice}
              onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
              placeholder="89.00"
              required
            />
            <Input
              label="Yearly Price ($)"
              type="number"
              value={formData.yearlyPrice}
              onChange={(e) => setFormData({ ...formData, yearlyPrice: e.target.value })}
              placeholder="890.00"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Select
              label="Badge Label"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              options={['Basic', 'Popular', 'Enterprise', 'Recommended', 'Beta']}
            />
            <Select
              label="Highlight Color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              options={[
                { value: '#FFE600', label: 'Electric Yellow' },
                { value: '#B892FF', label: 'Pastel Lavender' },
                { value: '#70EEFF', label: 'Pastel Cyan' },
                { value: '#FFFFFF', label: 'Clean White' }
              ]}
            />
          </div>

          <Textarea
            label="Plan Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Target persona and value proposition..."
            required
          />

          <Textarea
            label="Features (1 feature per line)"
            rows={4}
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            placeholder="Unlimited Seats&#10;500k event logs&#10;24/7 Slack support"
            required
          />
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="ARCHIVE PLAN"
        message="Are you sure you want to retire this subscription plan? Existing active subscribers will remain grandfathered."
      />
    </div>
  );
}

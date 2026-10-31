import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Layers, CheckCircle2, Send, FileCheck, XCircle, ArrowUpRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { Input, Select } from '../../components/common/Input';
import { initialSubscriptions } from '../../data/mockSubscriptions';
import { initialPlans } from '../../data/mockPlans';
import { initialCustomers } from '../../data/mockCustomers';

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    customerName: 'Acme Cloud Technologies',
    planName: 'Professional Plan',
    billingCycle: 'Monthly',
    amount: 89.00,
    quotationStatus: 'Draft',
    autoRenew: true
  });

  const filteredSubs = subscriptions.filter(s => {
    const matchesSearch = s.subscriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.quotationStatus === statusFilter || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingSub(null);
    setFormData({
      customerName: initialCustomers[0]?.name || '',
      planName: 'Professional Plan',
      billingCycle: 'Monthly',
      amount: 89.00,
      quotationStatus: 'Draft',
      autoRenew: true
    });
    setIsModalOpen(true);
  };

  const handleAdvanceLifecycle = (subId, nextStatus) => {
    setSubscriptions(subscriptions.map(s => {
      if (s.id === subId) {
        let mainStatus = s.status;
        if (nextStatus === 'Confirmed' || nextStatus === 'Active') mainStatus = 'Active';
        if (nextStatus === 'Cancelled') mainStatus = 'Cancelled';
        return {
          ...s,
          quotationStatus: nextStatus,
          status: mainStatus
        };
      }
      return s;
    }));
  };

  const handleSaveSub = (e) => {
    e.preventDefault();
    const plan = initialPlans.find(p => p.name === formData.planName);
    const amount = formData.billingCycle === 'Yearly' ? (plan?.yearlyPrice || 890.00) : (plan?.monthlyPrice || 89.00);

    if (editingSub) {
      setSubscriptions(subscriptions.map(s => s.id === editingSub.id ? {
        ...s,
        customerName: formData.customerName,
        planName: formData.planName,
        billingCycle: formData.billingCycle,
        amount: amount,
        quotationStatus: formData.quotationStatus,
        status: formData.quotationStatus === 'Confirmed' ? 'Active' : s.status,
        autoRenew: formData.autoRenew
      } : s));
    } else {
      const newSub = {
        id: `sub-${Date.now().toString().slice(-4)}`,
        subscriptionNumber: `SUB-2026-${(subscriptions.length + 1).toString().padStart(3, '0')}`,
        customerName: formData.customerName,
        customerEmail: 'billing@client.com',
        planName: formData.planName,
        planCode: plan?.code || 'BL-PRO',
        billingCycle: formData.billingCycle,
        amount: amount,
        startDate: new Date().toISOString().slice(0, 10),
        renewalDate: '2027-01-01',
        status: formData.quotationStatus === 'Confirmed' ? 'Active' : 'Pending',
        quotationStatus: formData.quotationStatus,
        autoRenew: formData.autoRenew
      };
      setSubscriptions([newSub, ...subscriptions]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setSubscriptions(subscriptions.filter(s => s.id !== deleteId));
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
          <h1 className="page-title">SUBSCRIPTIONS & QUOTATIONS</h1>
          <p className="page-subtitle">
            Lifecycle stages: Draft quotation → Send to Client → Confirm Terms → Active Contract.
          </p>
        </div>
        <Button variant="yellow" icon={Plus} onClick={handleOpenAdd}>
          DRAFT NEW QUOTE
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
            placeholder="Search subscription #, client, or plan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input neo-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Draft', 'Sent', 'Confirmed', 'Active', 'Cancelled'].map((st) => (
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

      {/* Subscriptions Table */}
      <div className="neo-table-wrapper">
        <div className="neo-table-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} strokeWidth={2.5} />
            <h3 style={{ fontSize: '15px', fontWeight: 900, textTransform: 'uppercase' }}>
              SUBSCRIPTIONS PIPELINE ({filteredSubs.length})
            </h3>
          </div>
        </div>

        <div className="neo-table-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Contract #</th>
                <th>Client Name</th>
                <th>Software Plan</th>
                <th>Cycle</th>
                <th>Commitment</th>
                <th>Quote Stage</th>
                <th>Contract Status</th>
                <th>Lifecycle Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.map((sub) => (
                <tr key={sub.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    {sub.subscriptionNumber}
                  </td>
                  <td>
                    <div style={{ fontWeight: 800 }}>{sub.customerName}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>Renews: {sub.renewalDate}</div>
                  </td>
                  <td>
                    <Badge variant={sub.planName.includes('Enterprise') ? 'enterprise' : 'pro'}>
                      {sub.planName}
                    </Badge>
                  </td>
                  <td>{sub.billingCycle}</td>
                  <td style={{ fontSize: '14px', fontWeight: 900 }}>${sub.amount.toFixed(2)}</td>
                  <td>
                    <Badge variant={sub.quotationStatus}>{sub.quotationStatus}</Badge>
                  </td>
                  <td>
                    <Badge variant={sub.status}>{sub.status}</Badge>
                  </td>
                  <td>
                    {/* Interactive Lifecycle Advancer */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {sub.quotationStatus === 'Draft' && (
                        <Button
                          variant="yellow"
                          size="sm"
                          icon={Send}
                          onClick={() => handleAdvanceLifecycle(sub.id, 'Sent')}
                        >
                          SEND QUOTE
                        </Button>
                      )}
                      {sub.quotationStatus === 'Sent' && (
                        <Button
                          variant="cyan"
                          size="sm"
                          icon={FileCheck}
                          onClick={() => handleAdvanceLifecycle(sub.id, 'Confirmed')}
                        >
                          CONFIRM
                        </Button>
                      )}
                      {sub.quotationStatus === 'Confirmed' && (
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={14} /> LIVE CONTRACT
                        </span>
                      )}
                      {sub.quotationStatus !== 'Cancelled' && sub.quotationStatus !== 'Draft' && (
                        <button
                          className="neo-btn neo-btn-sm"
                          style={{ padding: '4px 8px', background: '#FFF' }}
                          onClick={() => handleAdvanceLifecycle(sub.id, 'Cancelled')}
                          title="Cancel subscription"
                        >
                          <XCircle size={13} color="#E11D48" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Draft New Quote Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSub ? 'EDIT SUBSCRIPTION' : 'DRAFT NEW QUOTATION'}
        maxWidth="500px"
        footer={
          <>
            <Button variant="default" onClick={() => setIsModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="yellow" onClick={handleSaveSub}>
              SAVE QUOTE
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveSub}>
          <Select
            label="Client Account"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            options={initialCustomers.map(c => c.name)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Select
              label="Subscription Plan"
              value={formData.planName}
              onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
              options={initialPlans.map(p => p.name)}
            />
            <Select
              label="Billing Cycle"
              value={formData.billingCycle}
              onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
              options={['Monthly', 'Yearly']}
            />
          </div>

          <Select
            label="Initial Quotation Status"
            value={formData.quotationStatus}
            onChange={(e) => setFormData({ ...formData, quotationStatus: e.target.value })}
            options={['Draft', 'Sent', 'Confirmed']}
          />

          <div style={{ marginTop: '14px', fontSize: '12px', fontWeight: 700 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.autoRenew}
                onChange={(e) => setFormData({ ...formData, autoRenew: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#FFE600' }}
              />
              Enable automated recurring renewal upon anniversary date
            </label>
          </div>
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="CANCEL CONTRACT"
        message="Are you sure you want to delete this subscription agreement?"
      />
    </div>
  );
}

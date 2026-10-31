import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Tag, Calendar } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { Input, Select } from '../../components/common/Input';
import { initialDiscounts } from '../../data/mockDiscounts';

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'Percentage',
    value: '',
    validUntil: '2027-12-31',
    maxUses: 100,
    status: 'Active'
  });

  const filteredDiscounts = discounts.filter(d =>
    d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingDiscount(null);
    setFormData({
      code: '',
      description: '',
      type: 'Percentage',
      value: '',
      validUntil: '2027-12-31',
      maxUses: 100,
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (discount) => {
    setEditingDiscount(discount);
    setFormData({
      code: discount.code,
      description: discount.description,
      type: discount.type,
      value: discount.value,
      validUntil: discount.validUntil,
      maxUses: discount.maxUses,
      status: discount.status
    });
    setIsModalOpen(true);
  };

  const handleSaveDiscount = (e) => {
    e.preventDefault();
    if (editingDiscount) {
      setDiscounts(discounts.map(d => d.id === editingDiscount.id ? {
        ...d,
        code: formData.code.toUpperCase(),
        description: formData.description,
        type: formData.type,
        value: parseFloat(formData.value) || 0,
        validUntil: formData.validUntil,
        maxUses: parseInt(formData.maxUses, 10) || 0,
        status: formData.status
      } : d));
    } else {
      const newDisc = {
        id: `disc-${Date.now().toString().slice(-4)}`,
        code: formData.code.toUpperCase(),
        description: formData.description,
        type: formData.type,
        value: parseFloat(formData.value) || 0,
        validUntil: formData.validUntil,
        maxUses: parseInt(formData.maxUses, 10) || 0,
        timesUsed: 0,
        status: formData.status
      };
      setDiscounts([newDisc, ...discounts]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setDiscounts(discounts.filter(d => d.id !== deleteId));
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
          <h1 className="page-title">DISCOUNT & COUPON MANAGEMENT</h1>
          <p className="page-subtitle">
            Configure promotional promo codes, special customer rebates, and limited-time campaigns.
          </p>
        </div>
        <Button variant="yellow" icon={Plus} onClick={handleOpenAdd}>
          NEW DISCOUNT CODE
        </Button>
      </div>

      {/* Search */}
      <div className="neo-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div className="neo-search-box" style={{ maxWidth: '400px' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search coupon codes or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input neo-search-input"
          />
        </div>
      </div>

      {/* Discounts Table */}
      <div className="neo-table-wrapper">
        <div className="neo-table-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag size={18} strokeWidth={2.5} />
            <h3 style={{ fontSize: '15px', fontWeight: 900, textTransform: 'uppercase' }}>
              PROMOTIONAL CODES ({filteredDiscounts.length})
            </h3>
          </div>
        </div>

        <div className="neo-table-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Benefit</th>
                <th>Campaign Description</th>
                <th>Valid Until</th>
                <th>Redemption Usage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiscounts.map((discount) => {
                const percentUsed = Math.min(100, Math.round((discount.timesUsed / (discount.maxUses || 1)) * 100));

                return (
                  <tr key={discount.id}>
                    <td>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 900,
                          fontSize: '13px',
                          padding: '4px 8px',
                          background: '#FFF580',
                          border: '1.5px solid #000',
                          borderRadius: '6px'
                        }}
                      >
                        {discount.code}
                      </span>
                    </td>
                    <td style={{ fontSize: '15px', fontWeight: 900 }}>
                      {discount.type === 'Percentage' ? `${discount.value}% OFF` : `$${discount.value} OFF`}
                    </td>
                    <td style={{ fontSize: '13px', fontWeight: 600 }}>{discount.description}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                        <Calendar size={13} />
                        <span>{discount.validUntil}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ width: '140px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
                          <span>{discount.timesUsed} used</span>
                          <span>{discount.maxUses} max</span>
                        </div>
                        <div style={{ height: '8px', border: '1.5px solid #000', borderRadius: '4px', background: '#F8F8F5', overflow: 'hidden' }}>
                          <div style={{ width: `${percentUsed}%`, height: '100%', background: '#FFE600' }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant={discount.status}>{discount.status}</Badge>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="neo-btn neo-btn-sm"
                          style={{ padding: '6px', background: '#FFF' }}
                          onClick={() => handleOpenEdit(discount)}
                          title="Edit discount"
                        >
                          <Edit2 size={13} strokeWidth={2.5} />
                        </button>
                        <button
                          className="neo-btn neo-btn-sm"
                          style={{ padding: '6px', background: '#FDA4AF' }}
                          onClick={() => setDeleteId(discount.id)}
                          title="Delete discount"
                        >
                          <Trash2 size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Discount Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDiscount ? 'EDIT PROMO CODE' : 'CREATE NEW DISCOUNT'}
        maxWidth="500px"
        footer={
          <>
            <Button variant="default" onClick={() => setIsModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="yellow" onClick={handleSaveDiscount}>
              {editingDiscount ? 'SAVE CHANGES' : 'CREATE DISCOUNT'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveDiscount}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Promo Code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g. FLASH25"
              required
            />
            <Select
              label="Discount Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              options={['Percentage', 'Fixed Amount']}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label={formData.type === 'Percentage' ? 'Value (%)' : 'Value ($)'}
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="20"
              required
            />
            <Input
              label="Max Redemptions"
              type="number"
              value={formData.maxUses}
              onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
              placeholder="100"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Valid Until"
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              required
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'Expired']}
            />
          </div>

          <Input
            label="Campaign Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Special onboarding rebate for SaaS accelerator teams"
            required
          />
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="DELETE DISCOUNT"
        message="Are you sure you want to delete this coupon? Active quotes currently referencing it will not be affected, but no new customers can apply it."
      />
    </div>
  );
}

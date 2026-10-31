import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Receipt, Globe } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { Input, Select } from '../../components/common/Input';
import { initialTaxes } from '../../data/mockTaxes';

export default function TaxesPage() {
  const [taxes, setTaxes] = useState(initialTaxes);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTax, setEditingTax] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    country: 'United States',
    rate: '',
    taxCode: '',
    appliesTo: 'All Subscriptions',
    status: 'Active'
  });

  const filteredTaxes = taxes.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.taxCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingTax(null);
    setFormData({
      name: '',
      country: 'United States',
      rate: '',
      taxCode: 'TAX-NEW',
      appliesTo: 'All SaaS Products',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tax) => {
    setEditingTax(tax);
    setFormData({
      name: tax.name,
      country: tax.country,
      rate: tax.rate,
      taxCode: tax.taxCode,
      appliesTo: tax.appliesTo,
      status: tax.status
    });
    setIsModalOpen(true);
  };

  const handleSaveTax = (e) => {
    e.preventDefault();
    if (editingTax) {
      setTaxes(taxes.map(t => t.id === editingTax.id ? {
        ...t,
        name: formData.name,
        country: formData.country,
        rate: parseFloat(formData.rate) || 0,
        taxCode: formData.taxCode,
        appliesTo: formData.appliesTo,
        status: formData.status
      } : t));
    } else {
      const newTax = {
        id: `tax-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        country: formData.country,
        rate: parseFloat(formData.rate) || 0,
        taxCode: formData.taxCode,
        appliesTo: formData.appliesTo,
        status: formData.status,
        type: 'Percentage'
      };
      setTaxes([...taxes, newTax]);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setTaxes(taxes.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return t;
    }));
  };

  const handleDeleteConfirm = () => {
    setTaxes(taxes.filter(t => t.id !== deleteId));
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
          <h1 className="page-title">TAX RULES & COMPLIANCE</h1>
          <p className="page-subtitle">
            Manage international VAT, GST, and state sales tax rates automatically applied during checkout.
          </p>
        </div>
        <Button variant="yellow" icon={Plus} onClick={handleOpenAdd}>
          ADD TAX RULE
        </Button>
      </div>

      {/* Search Bar */}
      <div className="neo-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div className="neo-search-box" style={{ maxWidth: '400px' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by tax rule name, code, or jurisdiction..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input neo-search-input"
          />
        </div>
      </div>

      {/* Tax Table */}
      <div className="neo-table-wrapper">
        <div className="neo-table-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Receipt size={18} strokeWidth={2.5} />
            <h3 style={{ fontSize: '15px', fontWeight: 900, textTransform: 'uppercase' }}>
              CONFIGURED JURISDICTIONS ({filteredTaxes.length})
            </h3>
          </div>
        </div>

        <div className="neo-table-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Tax Code</th>
                <th>Rule Name</th>
                <th>Country / Jurisdiction</th>
                <th>Standard Rate</th>
                <th>Applies To</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTaxes.map((tax) => (
                <tr key={tax.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    {tax.taxCode}
                  </td>
                  <td style={{ fontWeight: 800 }}>{tax.name}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Globe size={14} />
                      <span>{tax.country}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '15px', fontWeight: 900, color: '#000' }}>
                    {tax.rate}%
                  </td>
                  <td style={{ fontSize: '12px', color: '#4B5563' }}>{tax.appliesTo}</td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(tax.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      title="Click to toggle status"
                    >
                      <Badge variant={tax.status}>{tax.status}</Badge>
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        className="neo-btn neo-btn-sm"
                        style={{ padding: '6px', background: '#FFF' }}
                        onClick={() => handleOpenEdit(tax)}
                        title="Edit tax rule"
                      >
                        <Edit2 size={13} strokeWidth={2.5} />
                      </button>
                      <button
                        className="neo-btn neo-btn-sm"
                        style={{ padding: '6px', background: '#FDA4AF' }}
                        onClick={() => setDeleteId(tax.id)}
                        title="Delete tax rule"
                      >
                        <Trash2 size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Tax Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTax ? 'EDIT TAX JURISDICTION' : 'NEW TAX RULE'}
        maxWidth="500px"
        footer={
          <>
            <Button variant="default" onClick={() => setIsModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="yellow" onClick={handleSaveTax}>
              {editingTax ? 'SAVE CHANGES' : 'CREATE TAX RULE'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveTax}>
          <Input
            label="Rule Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ireland Standard VAT"
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Tax Code"
              value={formData.taxCode}
              onChange={(e) => setFormData({ ...formData, taxCode: e.target.value })}
              placeholder="IE-VAT-23"
              required
            />
            <Input
              label="Country / Region"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Ireland"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Rate (%)"
              type="number"
              step="0.01"
              value={formData.rate}
              onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
              placeholder="23.00"
              required
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'Inactive']}
            />
          </div>

          <Input
            label="Applies To"
            value={formData.appliesTo}
            onChange={(e) => setFormData({ ...formData, appliesTo: e.target.value })}
            placeholder="All SaaS Subscriptions"
          />
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="DELETE TAX RULE"
        message="Are you sure you want to delete this tax jurisdiction? Any automated invoice generation for this country will default to 0% tax."
      />
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Users, Building, Mail, Phone, Globe } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { Input, Select } from '../../components/common/Input';
import { initialCustomers } from '../../data/mockCustomers';

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: 'United States',
    industry: 'Cloud Infrastructure',
    activePlan: 'Professional Plan',
    mrr: 89.00,
    status: 'Active'
  });

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: 'United States',
      industry: 'SaaS Software',
      activePlan: 'Starter Plan',
      mrr: 29.00,
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCustomer(c);
    setFormData({
      name: c.name,
      contactPerson: c.contactPerson,
      email: c.email,
      phone: c.phone,
      country: c.country,
      industry: c.industry,
      activePlan: c.activePlan,
      mrr: c.mrr,
      status: c.status
    });
    setIsModalOpen(true);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (editingCustomer) {
      setCustomers(customers.map(c => c.id === editingCustomer.id ? {
        ...c,
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        industry: formData.industry,
        activePlan: formData.activePlan,
        mrr: parseFloat(formData.mrr) || 0,
        status: formData.status
      } : c));
    } else {
      const newCust = {
        id: `cust-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        industry: formData.industry,
        activePlan: formData.activePlan,
        mrr: parseFloat(formData.mrr) || 0,
        status: formData.status,
        joinedDate: new Date().toISOString().slice(0, 10)
      };
      setCustomers([newCust, ...customers]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setCustomers(customers.filter(c => c.id !== deleteId));
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
          <h1 className="page-title">CUSTOMER RELATIONSHIP MANAGEMENT</h1>
          <p className="page-subtitle">
            Manage enterprise accounts, verify billing profiles, and assign dedicated service plans.
          </p>
        </div>
        <Button variant="yellow" icon={Plus} onClick={handleOpenAdd}>
          ONBOARD NEW CLIENT
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
            placeholder="Search company, contact, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input neo-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Active', 'Pending', 'Churned'].map((st) => (
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

      {/* Customer CRM Table */}
      <div className="neo-table-wrapper">
        <div className="neo-table-header-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} strokeWidth={2.5} />
            <h3 style={{ fontSize: '15px', fontWeight: 900, textTransform: 'uppercase' }}>
              CUSTOMER ACCOUNTS ({filteredCustomers.length})
            </h3>
          </div>
        </div>

        <div className="neo-table-container">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Primary Contact</th>
                <th>Region</th>
                <th>Assigned Plan</th>
                <th>Account MRR</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => (
                <tr key={cust.id}>
                  <td>
                    <div style={{ fontWeight: 800, fontSize: '14px' }}>{cust.name}</div>
                    <div style={{ fontSize: '11px', color: '#6B7280' }}>Industry: {cust.industry}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{cust.contactPerson}</div>
                    <div style={{ fontSize: '11px', color: '#4B5563' }}>{cust.email}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                      <Globe size={13} />
                      <span>{cust.country}</span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={cust.activePlan.includes('Enterprise') ? 'enterprise' : 'info'}>
                      {cust.activePlan}
                    </Badge>
                  </td>
                  <td style={{ fontSize: '15px', fontWeight: 900 }}>
                    ${cust.mrr.toFixed(2)}/mo
                  </td>
                  <td>
                    <Badge variant={cust.status}>{cust.status}</Badge>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        className="neo-btn neo-btn-sm"
                        style={{ padding: '6px', background: '#FFF' }}
                        onClick={() => handleOpenEdit(cust)}
                        title="Edit client"
                      >
                        <Edit2 size={13} strokeWidth={2.5} />
                      </button>
                      <button
                        className="neo-btn neo-btn-sm"
                        style={{ padding: '6px', background: '#FDA4AF' }}
                        onClick={() => setDeleteId(cust.id)}
                        title="Delete client"
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

      {/* Add / Edit Customer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCustomer ? 'EDIT CLIENT RECORD' : 'ONBOARD CLIENT'}
        maxWidth="520px"
        footer={
          <>
            <Button variant="default" onClick={() => setIsModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="yellow" onClick={handleSaveCustomer}>
              {editingCustomer ? 'SAVE CHANGES' : 'SAVE ACCOUNT'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveCustomer}>
          <Input
            label="Company Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Apex Cyber Systems"
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Contact Person"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              placeholder="e.g. Sarah Connor"
              required
            />
            <Input
              label="Work Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="s.connor@apex.io"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 555 0192"
            />
            <Input
              label="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="United States"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Select
              label="Assigned Plan"
              value={formData.activePlan}
              onChange={(e) => setFormData({ ...formData, activePlan: e.target.value })}
              options={['Starter Plan', 'Professional Plan', 'Enterprise Ultra']}
            />
            <Select
              label="Account Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'Pending', 'Churned']}
            />
          </div>

          <Input
            label="Industry Domain"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            placeholder="e.g. FinTech & Risk AI"
          />
        </form>
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="DELETE CLIENT"
        message="Are you sure you want to permanently delete this customer profile and archive their billing history?"
      />
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, FileText, Clock } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { Input, Select, Textarea } from '../../components/common/Input';
import { initialTemplates } from '../../data/mockTemplates';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Enterprise',
    description: '',
    validityDays: 30,
    discountAllowed: true,
    terms: '',
    status: 'Active'
  });

  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingTemplate(null);
    setFormData({
      name: '',
      category: 'Enterprise',
      description: '',
      validityDays: 30,
      discountAllowed: true,
      terms: 'Standard SaaS licensing agreement. Payment due Net 30 from invoice receipt.',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      category: template.category,
      description: template.description,
      validityDays: template.validityDays,
      discountAllowed: template.discountAllowed,
      terms: template.terms,
      status: template.status
    });
    setIsModalOpen(true);
  };

  const handleSaveTemplate = (e) => {
    e.preventDefault();
    if (editingTemplate) {
      setTemplates(templates.map(t => t.id === editingTemplate.id ? {
        ...t,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        validityDays: parseInt(formData.validityDays, 10) || 30,
        discountAllowed: formData.discountAllowed,
        terms: formData.terms,
        status: formData.status
      } : t));
    } else {
      const newTmpl = {
        id: `tmpl-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        validityDays: parseInt(formData.validityDays, 10) || 30,
        discountAllowed: formData.discountAllowed,
        terms: formData.terms,
        defaultItems: [
          { description: 'Standard Cloud License Bundle', qty: 1, rate: 890.00 }
        ],
        status: formData.status
      };
      setTemplates([...templates, newTmpl]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setTemplates(templates.filter(t => t.id !== deleteId));
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
          <h1 className="page-title">QUOTATION TEMPLATE MANAGEMENT</h1>
          <p className="page-subtitle">
            Configure standardized B2B proposal templates, legal terms, and pre-packaged service agreements.
          </p>
        </div>
        <Button variant="yellow" icon={Plus} onClick={handleOpenAdd}>
          NEW QUOTE TEMPLATE
        </Button>
      </div>

      {/* Search Bar */}
      <div className="neo-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
        <div className="neo-search-box" style={{ maxWidth: '400px' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search quotation templates by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input neo-search-input"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
        {filteredTemplates.map((template) => (
          <div key={template.id} className="neo-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      padding: '8px',
                      backgroundColor: '#B892FF',
                      border: '2px solid #000',
                      borderRadius: '8px',
                      boxShadow: '2px 2px 0px #000'
                    }}
                  >
                    <FileText size={20} color="#000" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#6B7280' }}>
                      {template.category}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.2 }}>
                      {template.name}
                    </h3>
                  </div>
                </div>
                <Badge variant={template.status}>{template.status}</Badge>
              </div>

              <p style={{ fontSize: '13px', color: '#4B5563', fontWeight: 600, marginBottom: '16px' }}>
                {template.description}
              </p>

              {/* Template Attributes */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  padding: '12px',
                  backgroundColor: '#F8F8F5',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}
              >
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280' }}>
                    Validity Window
                  </span>
                  <p style={{ fontSize: '14px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} />
                    {template.validityDays} Days
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280' }}>
                    Discount Allowed
                  </span>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: template.discountAllowed ? '#10B981' : '#E11D48' }}>
                    {template.discountAllowed ? 'YES' : 'NO'}
                  </p>
                </div>
              </div>

              {/* Standard Terms */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Standard Legal Terms:
                </span>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginTop: '4px', background: '#FFF', padding: '8px', border: '1.5px solid #000', borderRadius: '6px' }}>
                  {template.terms}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                borderTop: '2px solid #000',
                paddingTop: '14px'
              }}
            >
              <Button
                variant="default"
                size="sm"
                icon={Edit2}
                onClick={() => handleOpenEdit(template)}
              >
                EDIT
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => setDeleteId(template.id)}
              >
                DELETE
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTemplate ? 'EDIT QUOTATION TEMPLATE' : 'NEW QUOTATION TEMPLATE'}
        maxWidth="540px"
        footer={
          <>
            <Button variant="default" onClick={() => setIsModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="yellow" onClick={handleSaveTemplate}>
              {editingTemplate ? 'SAVE CHANGES' : 'CREATE TEMPLATE'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveTemplate}>
          <Input
            label="Template Title"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Enterprise SLA Agreement"
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={['Enterprise', 'Commercial', 'Pilot', 'Educational']}
            />
            <Input
              label="Validity (Days)"
              type="number"
              value={formData.validityDays}
              onChange={(e) => setFormData({ ...formData, validityDays: e.target.value })}
              required
            />
          </div>

          <Textarea
            label="Template Summary"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="When sales reps should use this template..."
            required
          />

          <Textarea
            label="Terms & Conditions"
            rows={3}
            value={formData.terms}
            onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
            placeholder="Enter payment, renewal, and SLA terms..."
            required
          />
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="DELETE TEMPLATE"
        message="Are you sure you want to delete this quotation template? Staff members drafting quotes will no longer see it in their dropdown."
      />
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Box, Layers, Tag, Check, Filter } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { Input, Select, Textarea } from '../../components/common/Input';
import { initialProducts } from '../../data/mockProducts';

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Analytics',
    description: '',
    basePrice: '',
    billingInterval: 'Monthly',
    status: 'Active',
    variantName: '',
    variantQuota: '',
    variantPrice: ''
  });

  const categories = ['All', 'Analytics', 'Infrastructure', 'Security', 'Finance', 'Productivity'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Analytics',
      description: '',
      basePrice: '',
      billingInterval: 'Monthly',
      status: 'Active',
      variantName: 'Default Starter Tier',
      variantQuota: '10,000 units',
      variantPrice: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      basePrice: product.basePrice,
      billingInterval: product.billingInterval,
      status: product.status,
      variantName: product.variants?.[0]?.name || '',
      variantQuota: product.variants?.[0]?.quota || '',
      variantPrice: product.variants?.[0]?.price || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formData.name,
            category: formData.category,
            description: formData.description,
            basePrice: parseFloat(formData.basePrice) || 0,
            billingInterval: formData.billingInterval,
            status: formData.status
          };
        }
        return p;
      }));
    } else {
      const newProduct = {
        id: `prod-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        basePrice: parseFloat(formData.basePrice) || 0,
        billingInterval: formData.billingInterval,
        status: formData.status,
        variants: [
          {
            id: `v-${Date.now().toString().slice(-3)}`,
            name: formData.variantName || 'Standard Tier',
            price: parseFloat(formData.variantPrice || formData.basePrice) || 0,
            quota: formData.variantQuota || 'Standard quota'
          }
        ]
      };
      setProducts([newProduct, ...products]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div>
      {/* Top Header */}
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
          <h1 className="page-title">PRODUCT & VARIANT MANAGEMENT</h1>
          <p className="page-subtitle">
            Configure SaaS software licenses, metered quotas, and tiered packaging options.
          </p>
        </div>
        <Button variant="yellow" icon={Plus} onClick={handleOpenAdd}>
          ADD NEW PRODUCT
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div className="neo-search-box" style={{ width: '100%' }}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search products by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neo-input neo-search-input"
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>
            Category:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className="neo-btn neo-btn-sm"
                style={{
                  backgroundColor: categoryFilter === cat ? '#FFE600' : '#FFFFFF',
                  fontWeight: 800
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid with Product Variants */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="neo-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      padding: '8px',
                      backgroundColor: '#70EEFF',
                      border: '2px solid #000',
                      borderRadius: '8px',
                      boxShadow: '2px 2px 0px #000'
                    }}
                  >
                    <Box size={20} color="#000" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: '#6B7280' }}>
                      {product.category}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.2 }}>
                      {product.name}
                    </h3>
                  </div>
                </div>
                <Badge variant={product.status}>{product.status}</Badge>
              </div>

              <p style={{ fontSize: '13px', color: '#4B5563', fontWeight: 600, marginBottom: '16px', lineHeight: 1.4 }}>
                {product.description}
              </p>

              {/* Pricing Base */}
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#F8F8F5',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                  Base Catalog Price:
                </span>
                <span style={{ fontSize: '16px', fontWeight: 900 }}>
                  ${product.basePrice.toFixed(2)}{' '}
                  <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 700 }}>
                    /{product.billingInterval.toLowerCase()}
                  </span>
                </span>
              </div>

              {/* Variants Section */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Layers size={14} strokeWidth={2.5} />
                  <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Available Variants ({product.variants?.length || 0})
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {product.variants?.map((v) => (
                    <div
                      key={v.id}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#FFFFFF',
                        border: '1.5px solid #000',
                        borderRadius: '6px',
                        boxShadow: '1.5px 1.5px 0px #000',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px'
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 800 }}>{v.name}</p>
                        <span style={{ fontSize: '10px', color: '#6B7280', fontWeight: 700 }}>
                          Quota: {v.quota}
                        </span>
                      </div>
                      <span style={{ fontWeight: 900, fontSize: '13px' }}>
                        ${v.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                borderTop: '2px solid #000',
                paddingTop: '14px',
                marginTop: '10px'
              }}
            >
              <Button
                variant="default"
                size="sm"
                icon={Edit2}
                onClick={() => handleOpenEdit(product)}
              >
                EDIT
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => setDeleteId(product.id)}
              >
                DELETE
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'EDIT PRODUCT & VARIANTS' : 'CREATE NEW SAAS PRODUCT'}
        maxWidth="560px"
        footer={
          <>
            <Button variant="default" onClick={() => setIsModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="yellow" onClick={handleSaveProduct}>
              {editingProduct ? 'SAVE CHANGES' : 'CREATE PRODUCT'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveProduct}>
          <Input
            label="Product Title"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Brightloop API Gateway"
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={['Analytics', 'Infrastructure', 'Security', 'Finance', 'Productivity']}
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'Inactive']}
            />
          </div>

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe product capabilities and target user tier..."
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Base Price ($)"
              type="number"
              step="0.01"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              placeholder="49.00"
              required
            />
            <Select
              label="Billing Interval"
              value={formData.billingInterval}
              onChange={(e) => setFormData({ ...formData, billingInterval: e.target.value })}
              options={['Monthly', 'Yearly', 'Quarterly']}
            />
          </div>

          {!editingProduct && (
            <div
              style={{
                marginTop: '16px',
                padding: '14px',
                border: '2px dashed #000',
                borderRadius: '8px',
                background: '#F8F8F5'
              }}
            >
              <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>
                Initial Variant Configuration
              </h4>
              <Input
                label="Variant Name"
                value={formData.variantName}
                onChange={(e) => setFormData({ ...formData, variantName: e.target.value })}
                placeholder="e.g. Standard Tier"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Input
                  label="Quota Capacity"
                  value={formData.variantQuota}
                  onChange={(e) => setFormData({ ...formData, variantQuota: e.target.value })}
                  placeholder="e.g. 100k events/mo"
                />
                <Input
                  label="Variant Price ($)"
                  type="number"
                  value={formData.variantPrice}
                  onChange={(e) => setFormData({ ...formData, variantPrice: e.target.value })}
                  placeholder="49.00"
                />
              </div>
            </div>
          )}
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="DELETE PRODUCT"
        message="Are you sure you want to remove this software product? Active customer subscriptions referencing this product will be flagged."
      />
    </div>
  );
}

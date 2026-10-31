import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, UserPlus, Shield, Mail, CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { Input, Select } from '../../components/common/Input';
import { initialUsers } from '../../data/mockUsers';

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Staff',
    department: 'Sales & Customer Success',
    status: 'Active'
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'Staff',
      department: 'Sales & Customer Success',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? {
        ...u,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        status: formData.status
      } : u));
    } else {
      const newUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        status: formData.status,
        joinedDate: new Date().toISOString().slice(0, 10),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setUsers(users.filter(u => u.id !== deleteId));
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
          <h1 className="page-title">USER & STAFF GOVERNANCE</h1>
          <p className="page-subtitle">
            Manage organization team members, assign operational roles, and audit access credentials.
          </p>
        </div>
        <Button variant="yellow" icon={UserPlus} onClick={handleOpenAdd}>
          INVITE NEW MEMBER
        </Button>
      </div>

      {/* Filter Bar */}
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
        <div className="neo-search-box" style={{ maxWidth: '360px' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by staff member or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input neo-search-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Admin', 'Staff'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className="neo-btn neo-btn-sm"
              style={{
                backgroundColor: roleFilter === r ? '#FFE600' : '#FFFFFF',
                fontWeight: 800
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Team Cards Grid (Following team_management.png) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="neo-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '24px',
              position: 'relative'
            }}
          >
            {/* Status dot */}
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <Badge variant={user.status}>{user.status}</Badge>
            </div>

            {/* Avatar with thick black border and shadow */}
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                overflow: 'hidden',
                marginBottom: '16px',
                backgroundColor: '#FFE600'
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '2px' }}>
              {user.name}
            </h3>

            <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', marginBottom: '10px' }}>
              {user.email}
            </p>

            {/* Role Badge */}
            <div style={{ marginBottom: '14px' }}>
              <Badge variant={user.role === 'Admin' ? 'admin' : 'warning'}>
                {user.role}
              </Badge>
            </div>

            <div
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#F8F8F5',
                border: '1.5px solid #000',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '16px'
              }}
            >
              <span style={{ color: '#6B7280' }}>Dept: </span>
              <strong>{user.department}</strong>
              <div style={{ color: '#6B7280', marginTop: '2px' }}>
                Joined: {user.joinedDate}
              </div>
            </div>

            {/* Card Actions */}
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <Button
                variant="default"
                size="sm"
                icon={Edit2}
                style={{ flex: 1 }}
                onClick={() => handleOpenEdit(user)}
              >
                EDIT
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => setDeleteId(user.id)}
              >
                REMOVE
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'EDIT TEAM MEMBER' : 'INVITE NEW MEMBER'}
        maxWidth="480px"
        footer={
          <>
            <Button variant="default" onClick={() => setIsModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="yellow" onClick={handleSaveUser}>
              {editingUser ? 'SAVE CHANGES' : 'SEND INVITATION'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveUser}>
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Jordan Hayes"
            required
          />

          <Input
            label="Work Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jordan@brightloop.io"
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Select
              label="Assigned Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={['Staff', 'Admin', 'Finance Manager']}
            />
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={['Active', 'Inactive']}
            />
          </div>

          <Select
            label="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            options={[
              'Sales & Customer Success',
              'Finance & Billing',
              'Billing Support',
              'Executive / Operations',
              'Product Engineering'
            ]}
          />
        </form>
      </Modal>

      {/* Delete User Dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="REMOVE STAFF MEMBER"
        message="Are you sure you want to revoke this user's workspace credentials? Any active customers assigned to them will need reassignment."
      />
    </div>
  );
}

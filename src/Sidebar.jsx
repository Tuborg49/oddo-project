import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Box,
  Layers,
  Percent,
  Receipt,
  FileText,
  Users,
  CreditCard,
  User,
  LogOut,
  Zap
} from 'lucide-react';

export default function Sidebar({ role = 'admin', isOpen = true, onClose }) {
  const navigate = useNavigate();

  const adminNav = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Box },
    { name: 'Subscription Plans', path: '/admin/plans', icon: Layers },
    { name: 'Tax Rules', path: '/admin/taxes', icon: Receipt },
    { name: 'Discounts', path: '/admin/discounts', icon: Percent },
    { name: 'Quote Templates', path: '/admin/templates', icon: FileText },
    { name: 'Staff & Users', path: '/admin/users', icon: Users },
  ];

  const staffNav = [
    { name: 'Staff Overview', path: '/staff', icon: LayoutDashboard },
    { name: 'Customers', path: '/staff/customers', icon: Users },
    { name: 'Subscriptions & Quotes', path: '/staff/subscriptions', icon: Layers },
    { name: 'Invoices', path: '/staff/invoices', icon: Receipt },
    { name: 'Payment Tracking', path: '/staff/payments', icon: CreditCard },
  ];

  const portalNav = [
    { name: 'My Subscriptions', path: '/portal/my-subscriptions', icon: Layers },
    { name: 'My Invoices', path: '/portal/my-invoices', icon: Receipt },
    { name: 'Billing Profile', path: '/portal/profile', icon: User },
  ];

  const navLinks = role === 'admin' ? adminNav : role === 'staff' ? staffNav : portalNav;

  const roleMeta = {
    admin: { label: 'ADMINISTRATOR', bg: '#B892FF' },
    staff: { label: 'STAFF MEMBER', bg: '#FFE600' },
    portal: { label: 'CUSTOMER PORTAL', bg: '#70EEFF' }
  }[role] || { label: 'USER', bg: '#FFFFFF' };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="mobile-backdrop"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40,
            display: 'none'
          }}
        />
      )}

      <aside
        style={{
          width: '270px',
          backgroundColor: '#FFFFFF',
          borderRight: '2.5px solid #000000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 50,
          height: '100vh',
          position: 'sticky',
          top: 0
        }}
      >
        <div>
          {/* Brand Logo & Title */}
          <div
            style={{
              padding: '24px 20px',
              borderBottom: '2.5px solid #000000',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#FFE600',
                border: '2.5px solid #000000',
                borderRadius: '10px',
                boxShadow: '3px 3px 0px #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Zap size={24} color="#000" strokeWidth={3} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1
                }}
              >
                BRIGHTLOOP
              </h1>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: '#6B7280',
                  textTransform: 'uppercase'
                }}
              >
                SUBSCRIPTION SUITE
              </span>
            </div>
          </div>

          {/* Current Role Badge */}
          <div style={{ padding: '16px 20px 8px 20px' }}>
            <div
              style={{
                padding: '6px 12px',
                backgroundColor: roleMeta.bg,
                border: '2px solid #000000',
                borderRadius: '8px',
                boxShadow: '2px 2px 0px #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.05em' }}>
                {roleMeta.label}
              </span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#000' }} />
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin' || item.path === '/staff'}
                  onClick={onClose}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    transition: 'all 0.1s ease',
                    border: isActive ? '2px solid #000000' : '2px solid transparent',
                    backgroundColor: isActive ? (role === 'admin' ? '#B892FF' : role === 'staff' ? '#FFE600' : '#70EEFF') : 'transparent',
                    color: '#000000',
                    boxShadow: isActive ? '3px 3px 0px #000000' : 'none',
                    transform: isActive ? 'translate(-1px, -1px)' : 'none'
                  })}
                >
                  <Icon size={18} strokeWidth={2.5} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div style={{ padding: '16px', borderTop: '2.5px solid #000000', backgroundColor: '#F8F8F5' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0px #000',
                  backgroundColor: '#FFE600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '13px'
                }}
              >
                {role === 'admin' ? 'AK' : role === 'staff' ? 'MJ' : 'DM'}
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 800 }}>
                  {role === 'admin' ? 'Alexander K.' : role === 'staff' ? 'Mike Turner' : 'David Miller'}
                </p>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#6B7280' }}>
                  {role === 'admin' ? 'alex@brightloop.io' : role === 'staff' ? 'mike.t@brightloop.io' : 'david@acmecloud.com'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="neo-btn neo-btn-sm"
            style={{ width: '100%', justifyContent: 'center', background: '#FFF' }}
          >
            <LogOut size={14} strokeWidth={2.5} />
            LOG OUT
          </button>
        </div>
      </aside>
    </>
  );
}

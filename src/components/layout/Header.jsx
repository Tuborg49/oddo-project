import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, ShieldCheck, UserCheck, User, Menu, Check } from 'lucide-react';

export default function Header({ role = 'admin', onToggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'New Enterprise Quote Accepted', time: '12m ago', unread: true },
    { id: 2, title: 'Invoice #INV-2026-00124 Paid ($2,670.53)', time: '1h ago', unread: true },
    { id: 3, title: 'Solaris Energy payment overdue reminder', time: '4h ago', unread: false },
  ];

  return (
    <header
      style={{
        height: '68px',
        backgroundColor: '#FFFFFF',
        borderBottom: '2.5px solid #000000',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="neo-btn neo-btn-sm"
            style={{ display: 'none', padding: '6px' }}
            id="mobile-menu-trigger"
          >
            <Menu size={18} strokeWidth={2.5} />
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              padding: '3px 8px',
              backgroundColor: '#F8F8F5',
              border: '1.5px solid #000',
              borderRadius: '6px'
            }}
          >
            {role.toUpperCase()}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#374151' }}>
            {location.pathname}
          </span>
        </div>
      </div>

      {/* Right Tools: Fast Role Switcher & Notifications */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Fast Role Switcher Buttons */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#F8F8F5',
            padding: '3px',
            border: '2px solid #000',
            borderRadius: '10px',
            boxShadow: '2px 2px 0px #000'
          }}
        >
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: role === 'admin' ? '#B892FF' : 'transparent',
              color: '#000',
              borderWidth: role === 'admin' ? '1.5px' : '0',
              borderColor: '#000',
              borderStyle: 'solid',
              boxShadow: role === 'admin' ? '1px 1px 0px #000' : 'none'
            }}
          >
            Admin
          </button>
          <button
            onClick={() => navigate('/staff')}
            style={{
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: role === 'staff' ? '#FFE600' : 'transparent',
              color: '#000',
              borderWidth: role === 'staff' ? '1.5px' : '0',
              borderColor: '#000',
              borderStyle: 'solid',
              boxShadow: role === 'staff' ? '1px 1px 0px #000' : 'none'
            }}
          >
            Staff
          </button>
          <button
            onClick={() => navigate('/portal/my-subscriptions')}
            style={{
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: role === 'portal' ? '#70EEFF' : 'transparent',
              color: '#000',
              borderWidth: role === 'portal' ? '1.5px' : '0',
              borderColor: '#000',
              borderStyle: 'solid',
              boxShadow: role === 'portal' ? '1px 1px 0px #000' : 'none'
            }}
          >
            Portal
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="neo-btn neo-btn-sm"
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: '#FFE600',
              position: 'relative'
            }}
            aria-label="View notifications"
          >
            <Bell size={16} strokeWidth={2.5} />
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '10px',
                height: '10px',
                backgroundColor: '#E11D48',
                borderRadius: '50%',
                border: '1.5px solid #000'
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '48px',
                width: '320px',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid #000000',
                borderRadius: '12px',
                boxShadow: '6px 6px 0px #000000',
                zIndex: 100,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#70EEFF',
                  borderBottom: '2px solid #000',
                  fontWeight: 900,
                  fontSize: '13px',
                  textTransform: 'uppercase'
                }}
              >
                Notifications (2 New)
              </div>
              <div>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #E5E7EB',
                      backgroundColor: n.unread ? '#FEFCE8' : '#FFFFFF',
                      fontSize: '12px'
                    }}
                  >
                    <p style={{ fontWeight: 800, color: '#000' }}>{n.title}</p>
                    <span style={{ fontSize: '10px', color: '#6B7280', fontWeight: 600 }}>{n.time}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '8px', textAlign: 'center', backgroundColor: '#F8F8F5' }}>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

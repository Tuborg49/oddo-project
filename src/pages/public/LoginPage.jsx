import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, User } from 'lucide-react';
import { Input } from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex@brightloop.io');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Default redirect to admin
    navigate('/admin');
  };

  const handleQuickLogin = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'staff') {
      navigate('/staff');
    } else {
      navigate('/portal/my-subscriptions');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8F8F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px'
      }}
    >
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div
          style={{
            width: '54px',
            height: '54px',
            backgroundColor: '#FFE600',
            border: '3px solid #000',
            borderRadius: '14px',
            boxShadow: '4px 4px 0px #000',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}
        >
          <Zap size={32} color="#000" strokeWidth={3} />
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
          BRIGHTLOOP SOFTWARE
        </h1>
        <p style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>
          Subscription & Recurring Billing Management
        </p>
      </div>

      {/* Main Login Card */}
      <div
        className="neo-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '32px',
          boxShadow: '6px 6px 0px #000'
        }}
      >
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B7280', marginTop: '2px' }}>
            Sign in to access your subscription control panel
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Work Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            icon={Mail}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={Lock}
            required
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              fontSize: '12px',
              fontWeight: 700
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                defaultChecked
                style={{ width: '16px', height: '16px', accentColor: '#FFE600' }}
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              style={{ color: '#000', textDecoration: 'underline' }}
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="yellow"
            style={{ width: '100%', padding: '12px', fontSize: '14px' }}
            icon={ArrowRight}
          >
            Sign In to Account
          </Button>
        </form>

        {/* Quick Demo Login Switcher */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '2.5px solid #000'
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#374151',
              marginBottom: '10px',
              textAlign: 'center'
            }}
          >
            ⚡ Hackathon Reviewer Fast-Logins:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <Button
              variant="purple"
              size="sm"
              icon={ShieldCheck}
              onClick={() => handleQuickLogin('admin')}
            >
              Admin
            </Button>
            <Button
              variant="yellow"
              size="sm"
              icon={UserCheck}
              onClick={() => handleQuickLogin('staff')}
            >
              Staff
            </Button>
            <Button
              variant="cyan"
              size="sm"
              icon={User}
              onClick={() => handleQuickLogin('portal')}
            >
              Portal
            </Button>
          </div>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', fontWeight: 600 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ fontWeight: 800, color: '#000', textDecoration: 'underline' }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

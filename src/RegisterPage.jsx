import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Lock, Mail, Building, User, ArrowRight } from 'lucide-react';
import { Input } from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agree: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    navigate('/portal/my-subscriptions');
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
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            backgroundColor: '#FFE600',
            border: '2.5px solid #000',
            borderRadius: '12px',
            boxShadow: '3px 3px 0px #000',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}
        >
          <Zap size={28} color="#000" strokeWidth={3} />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 900, textTransform: 'uppercase' }}>
          BRIGHTLOOP SOFTWARE
        </h1>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>
          Create an enterprise organization account
        </p>
      </div>

      <div
        className="neo-card"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '28px',
          boxShadow: '6px 6px 0px #000'
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px' }}>
          Register Account
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="David Miller"
            icon={User}
            required
          />

          <Input
            label="Company Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Acme Cloud Technologies"
            icon={Building}
            required
          />

          <Input
            label="Work Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="david@acmecloud.com"
            icon={Mail}
            required
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              icon={Lock}
              required
            />
            <Input
              label="Confirm"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="••••••••"
              icon={Lock}
              required
            />
          </div>

          <div style={{ marginBottom: '16px', fontSize: '12px', fontWeight: 700 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#FFE600' }}
              />
              I agree to the Terms of Service & Privacy SLA
            </label>
          </div>

          <Button
            type="submit"
            variant="yellow"
            style={{ width: '100%', padding: '12px', fontSize: '14px' }}
            icon={ArrowRight}
          >
            Create My Account
          </Button>
        </form>

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', fontWeight: 600 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 800, color: '#000', textDecoration: 'underline' }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

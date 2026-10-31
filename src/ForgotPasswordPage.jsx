import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
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
          Password Recovery Verification
        </p>
      </div>

      <div
        className="neo-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          boxShadow: '6px 6px 0px #000'
        }}
      >
        {!submitted ? (
          <>
            <h2 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '6px' }}>
              Reset Password
            </h2>
            <p style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600, marginBottom: '20px' }}>
              Enter your registered work email and we will send you a one-time reset link.
            </p>

            <form onSubmit={handleSubmit}>
              <Input
                label="Registered Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                icon={Mail}
                required
              />

              <Button
                type="submit"
                variant="yellow"
                style={{ width: '100%', padding: '12px', marginTop: '10px' }}
              >
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#86EFAC',
                border: '2.5px solid #000',
                borderRadius: '50%',
                boxShadow: '3px 3px 0px #000',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <CheckCircle size={32} color="#000" strokeWidth={2.5} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase' }}>
              Instructions Sent!
            </h3>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563', margin: '12px 0 20px 0' }}>
              If an account exists for <strong>{email}</strong>, a secure reset token has been dispatched.
            </p>
            <Button
              variant="default"
              onClick={() => setSubmitted(false)}
              style={{ width: '100%' }}
            >
              Send Again
            </Button>
          </div>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link
            to="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 800,
              color: '#000',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

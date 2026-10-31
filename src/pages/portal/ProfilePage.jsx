import React, { useState } from 'react';
import { User, Building, Mail, Phone, MapPin, Receipt, Save, CheckCircle, Bell } from 'lucide-react';
import Button from '../../components/common/Button';
import { Input, Textarea } from '../../components/common/Input';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    displayName: 'David Miller',
    email: 'david@acmecloud.com',
    company: 'Acme Cloud Technologies',
    phone: '+1 (555) 234-8901',
    billingAddress: '500 Howard Street, Suite 400, San Francisco, CA 94105, USA',
    taxId: 'US-EIN-9481920-X',
    emailDigest: true,
    invoiceAlerts: true,
    renewalReminders: true
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
          <h1 className="page-title">CUSTOMER BILLING PROFILE</h1>
          <p className="page-subtitle">
            Update corporate address, tax identification numbers, and recurring notification contacts.
          </p>
        </div>
        {saved && (
          <div
            style={{
              padding: '8px 16px',
              backgroundColor: '#86EFAC',
              border: '2px solid #000',
              borderRadius: '8px',
              boxShadow: '2px 2px 0px #000',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle size={16} strokeWidth={2.5} />
            SETTINGS SAVED SUCCESSFULLY!
          </div>
        )}
      </div>

      {/* Main Profile & Settings Grid (Modeled after settings_&_preferences.png and user_profile_settings.png) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Account & Company Info */}
        <div className="neo-card">
          {/* Avatar representation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '16px',
                border: '3px solid #000',
                backgroundColor: '#70EEFF',
                boxShadow: '3px 3px 0px #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '24px'
              }}
            >
              DM
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase' }}>
                {profile.displayName}
              </h3>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>{profile.company}</p>
              <span style={{ fontSize: '11px', color: '#6B7280' }}>Account ID: ACME-CL-901</span>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <Input
              label="Contact Representative"
              value={profile.displayName}
              onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
              icon={User}
              required
            />

            <Input
              label="Organization Name"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              icon={Building}
              required
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="Billing Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                icon={Mail}
                required
              />
              <Input
                label="Direct Phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                icon={Phone}
              />
            </div>

            <Input
              label="Corporate Tax ID / VAT Registration"
              value={profile.taxId}
              onChange={(e) => setProfile({ ...profile, taxId: e.target.value })}
              icon={Receipt}
              required
            />

            <Textarea
              label="Official Billing Address (Printed on Invoices)"
              value={profile.billingAddress}
              onChange={(e) => setProfile({ ...profile, billingAddress: e.target.value })}
              rows={3}
              required
            />

            <Button
              type="submit"
              variant="yellow"
              icon={Save}
              style={{ width: '100%', marginTop: '12px', padding: '12px' }}
            >
              SAVE PROFILE INFORMATION
            </Button>
          </form>
        </div>

        {/* Configuration & Preferences (From settings_&_preferences.png) */}
        <div className="neo-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Bell size={20} strokeWidth={2.5} />
              <h2 style={{ fontSize: '16px', fontWeight: 900, textTransform: 'uppercase' }}>
                NOTIFICATION PREFERENCES
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Toggle 1 */}
              <div
                style={{
                  padding: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #000',
                  borderRadius: '10px',
                  boxShadow: '2px 2px 0px #000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 800 }}>Invoice Generation Alerts</p>
                  <p style={{ fontSize: '11px', color: '#6B7280' }}>
                    Receive instant PDF receipts when monthly or annual charges clear
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.invoiceAlerts}
                  onChange={(e) => setProfile({ ...profile, invoiceAlerts: e.target.checked })}
                  style={{ width: '20px', height: '20px', accentColor: '#FFE600', cursor: 'pointer' }}
                />
              </div>

              {/* Toggle 2 */}
              <div
                style={{
                  padding: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #000',
                  borderRadius: '10px',
                  boxShadow: '2px 2px 0px #000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 800 }}>Renewal Reminder Notices</p>
                  <p style={{ fontSize: '11px', color: '#6B7280' }}>
                    Send notice 30 days prior to annual contract renewal date
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.renewalReminders}
                  onChange={(e) => setProfile({ ...profile, renewalReminders: e.target.checked })}
                  style={{ width: '20px', height: '20px', accentColor: '#FFE600', cursor: 'pointer' }}
                />
              </div>

              {/* Toggle 3 */}
              <div
                style={{
                  padding: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #000',
                  borderRadius: '10px',
                  boxShadow: '2px 2px 0px #000',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 800 }}>Monthly Usage Telemetry Digest</p>
                  <p style={{ fontSize: '11px', color: '#6B7280' }}>
                    Summarized report of events consumed and team seats allocated
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.emailDigest}
                  onChange={(e) => setProfile({ ...profile, emailDigest: e.target.checked })}
                  style={{ width: '20px', height: '20px', accentColor: '#FFE600', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '14px',
              backgroundColor: '#F8F8F5',
              border: '2px solid #000',
              borderRadius: '8px',
              marginTop: '24px'
            }}
          >
            <h4 style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '4px' }}>
              SECURITY CREDENTIALS
            </h4>
            <p style={{ fontSize: '11px', color: '#4B5563', marginBottom: '12px' }}>
              Your organization utilizes Brightloop SAML Single Sign-On. Credentials are governed by your corporate identity provider.
            </p>
            <Button
              variant="default"
              size="sm"
              onClick={() => alert('SAML session validated via Okta SSO.')}
            >
              AUDIT SAML STATUS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

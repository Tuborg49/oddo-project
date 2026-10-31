import React from 'react';

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  trend,
  trendUp = true,
  bgColor = '#FFFFFF',
  className = ''
}) {
  return (
    <div
      className={`neo-card ${className}`}
      style={{
        backgroundColor: bgColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '140px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {Icon && (
          <div
            style={{
              padding: '8px',
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '2px solid #000000',
              borderRadius: '8px',
              boxShadow: '2px 2px 0px #000000',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={20} strokeWidth={2.5} color="#000000" />
          </div>
        )}
        {trend && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 8px',
              border: '2px solid #000000',
              borderRadius: '9999px',
              backgroundColor: trendUp ? '#86EFAC' : '#FDA4AF',
              color: '#000000',
              boxShadow: '1.5px 1.5px 0px #000000'
            }}
          >
            {trend}
          </span>
        )}
      </div>

      <div style={{ marginTop: '16px' }}>
        <p
          style={{
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#111827',
            marginBottom: '4px'
          }}
        >
          {title}
        </p>
        <h3
          style={{
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#000000',
            lineHeight: 1.1
          }}
        >
          {value}
        </h3>
        {subtext && (
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#374151',
              marginTop: '4px'
            }}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}

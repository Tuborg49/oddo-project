import React from 'react';

export default function Badge({
  children,
  variant,
  className = ''
}) {
  const normalized = (variant || children || '').toString().toLowerCase();

  let variantClass = 'neo-badge-neutral';

  if (['paid', 'active', 'completed', 'confirmed', 'success'].includes(normalized)) {
    variantClass = 'neo-badge-success';
  } else if (['pending', 'sent', 'warning', 'low stock', 'action required'].includes(normalized)) {
    variantClass = 'neo-badge-warning';
  } else if (['overdue', 'cancelled', 'failed', 'danger', 'inactive', 'churned'].includes(normalized)) {
    variantClass = 'neo-badge-danger';
  } else if (['draft', 'info', 'pro', 'popular', 'basic'].includes(normalized)) {
    variantClass = 'neo-badge-info';
  } else if (['admin', 'enterprise', 'purple'].includes(normalized)) {
    variantClass = 'neo-badge-purple';
  }

  return (
    <span className={`neo-badge ${variantClass} ${className}`}>
      {children}
    </span>
  );
}

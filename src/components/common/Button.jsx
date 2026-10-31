import React from 'react';

export default function Button({
  children,
  variant = 'default', // 'yellow' | 'purple' | 'cyan' | 'dark' | 'danger' | 'default'
  size = 'md',        // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const variantClass = {
    yellow: 'neo-btn-yellow',
    primary: 'neo-btn-yellow',
    purple: 'neo-btn-purple',
    cyan: 'neo-btn-cyan',
    dark: 'neo-btn-dark',
    danger: 'neo-btn-danger',
    default: ''
  }[variant] || '';

  const sizeClass = size === 'sm' ? 'neo-btn-sm' : '';

  return (
    <button
      type={type}
      className={`neo-btn ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : 16} strokeWidth={2.5} />}
      {children}
    </button>
  );
}

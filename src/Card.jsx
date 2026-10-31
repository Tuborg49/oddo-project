import React from 'react';

export default function Card({
  children,
  className = '',
  hover = false,
  style = {},
  ...props
}) {
  return (
    <div
      className={`neo-card ${hover ? 'neo-card-hover' : ''} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

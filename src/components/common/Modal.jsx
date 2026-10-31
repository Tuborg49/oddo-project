import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = '580px'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="neo-modal-backdrop" onClick={onClose}>
      <div
        className="neo-modal-box"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="neo-modal-header">
          <h2 className="neo-modal-title">{title}</h2>
          <button
            onClick={onClose}
            className="neo-btn neo-btn-sm"
            style={{ padding: '6px', background: '#FFF' }}
            aria-label="Close modal"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        <div className="neo-modal-body">
          {children}
        </div>

        {footer && (
          <div className="neo-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

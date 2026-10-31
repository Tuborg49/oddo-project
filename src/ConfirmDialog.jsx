import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Yes, Delete',
  confirmVariant = 'danger',
  cancelText = 'Cancel'
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="440px"
      footer={
        <>
          <Button variant="default" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#FFE4E6',
            border: '2px solid #000',
            borderRadius: '12px',
            boxShadow: '2px 2px 0px #000',
            display: 'inline-flex'
          }}
        >
          <AlertTriangle size={28} color="#E11D48" strokeWidth={2.5} />
        </div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937', lineHeight: 1.5 }}>
          {message}
        </p>
      </div>
    </Modal>
  );
}

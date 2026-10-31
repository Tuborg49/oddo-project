import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { Download, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

export default function InvoiceModal({
  isOpen,
  onClose,
  invoice,
  onMarkPaid
}) {
  if (!invoice) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`INVOICE: ${invoice.invoiceNumber}`}
      maxWidth="680px"
      footer={
        <>
          <Button
            variant="default"
            icon={Printer}
            onClick={() => window.print()}
          >
            PRINT
          </Button>
          <Button
            variant="cyan"
            icon={Download}
            onClick={() => alert(`Simulated downloading invoice ${invoice.invoiceNumber}.pdf`)}
          >
            DOWNLOAD PDF
          </Button>
          {invoice.status !== 'Paid' && onMarkPaid && (
            <Button
              variant="yellow"
              icon={CheckCircle}
              onClick={() => {
                onMarkPaid(invoice.id);
                onClose();
              }}
            >
              MARK AS PAID
            </Button>
          )}
        </>
      }
    >
      <div style={{ backgroundColor: '#FFFFFF', padding: '16px' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2.5px solid #000', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '28px', background: '#FFE600', border: '2px solid #000', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, boxShadow: '2px 2px 0px #000' }}>
                BL
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em' }}>BRIGHTLOOP SOFTWARE</h3>
            </div>
            <p style={{ fontSize: '12px', color: '#4B5563', fontWeight: 600 }}>Cloud & Telemetry Licensing Systems</p>
            <p style={{ fontSize: '11px', color: '#6B7280' }}>tax-id: US-BL-9481920-X</p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <Badge variant={invoice.status} style={{ fontSize: '12px', padding: '6px 14px' }}>
              {invoice.status}
            </Badge>
            <p style={{ fontSize: '12px', fontWeight: 800, marginTop: '8px' }}>{invoice.invoiceNumber}</p>
            <p style={{ fontSize: '11px', color: '#6B7280' }}>Date: {invoice.issueDate}</p>
            <p style={{ fontSize: '11px', color: '#E11D48', fontWeight: 700 }}>Due: {invoice.dueDate}</p>
          </div>
        </div>

        {/* Bill To */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', padding: '12px', background: '#F8F8F5', border: '2px solid #000', borderRadius: '10px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280' }}>BILLED TO</p>
            <p style={{ fontSize: '14px', fontWeight: 800, color: '#000', marginTop: '2px' }}>{invoice.customerName}</p>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>{invoice.customerEmail}</p>
            <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>{invoice.billingAddress}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#6B7280' }}>PAYMENT TERMS</p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#000', marginTop: '2px' }}>Net 30 Days</p>
            <p style={{ fontSize: '11px', color: '#4B5563', marginTop: '4px' }}>Auto-debit on file or ACH direct transfer</p>
          </div>
        </div>

        {/* Items Table */}
        <div style={{ border: '2px solid #000', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#70EEFF', borderBottom: '2px solid #000' }}>
                <th style={{ padding: '10px 14px', fontWeight: 800, textTransform: 'uppercase' }}>Item & Description</th>
                <th style={{ padding: '10px 14px', fontWeight: 800, textAlign: 'center' }}>Qty</th>
                <th style={{ padding: '10px 14px', fontWeight: 800, textAlign: 'right' }}>Rate</th>
                <th style={{ padding: '10px 14px', fontWeight: 800, textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items && invoice.items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>{item.description}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'center', fontWeight: 700 }}>{item.qty}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 800 }}>${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <div style={{ width: '260px', border: '2px solid #000', borderRadius: '10px', padding: '12px', background: '#F8F8F5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
              <span>Subtotal:</span>
              <span>${(invoice.subtotal || invoice.amount).toFixed(2)}</span>
            </div>
            {invoice.taxAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
                <span>Tax ({invoice.taxRate}%):</span>
                <span>+${invoice.taxAmount.toFixed(2)}</span>
              </div>
            )}
            {invoice.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#10B981', marginBottom: '6px' }}>
                <span>Discount Applied:</span>
                <span>-${invoice.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 900, borderTop: '2px solid #000', paddingTop: '8px', marginTop: '6px' }}>
              <span>TOTAL DUE:</span>
              <span>${(invoice.total || invoice.amount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div style={{ padding: '10px 14px', background: '#FFF580', border: '2px solid #000', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}>
            📌 <strong>Note:</strong> {invoice.notes}
          </div>
        )}
      </div>
    </Modal>
  );
}

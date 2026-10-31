import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        backgroundColor: '#FFFFFF',
        borderTop: '2px solid #000000',
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>
        Showing <span style={{ color: '#000' }}>{startItem}</span> to{' '}
        <span style={{ color: '#000' }}>{endItem}</span> of{' '}
        <span style={{ color: '#000' }}>{totalItems}</span> entries
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button
          className="neo-btn neo-btn-sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          style={{ background: '#FFF' }}
        >
          <ChevronLeft size={14} strokeWidth={2.5} />
          PREV
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className="neo-btn neo-btn-sm"
            style={{
              minWidth: '32px',
              backgroundColor: currentPage === page ? '#FFE600' : '#FFFFFF',
              fontWeight: 800
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="neo-btn neo-btn-sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          style={{ background: '#FFF' }}
        >
          NEXT
          <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

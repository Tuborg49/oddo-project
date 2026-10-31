import React from 'react';

export function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="neo-form-group">
      {label && (
        <label htmlFor={inputId} className="neo-label">
          {label} {required && <span style={{ color: '#E11D48' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <span style={{ position: 'absolute', left: '12px', pointerEvents: 'none', color: '#000000' }}>
            <Icon size={16} strokeWidth={2.5} />
          </span>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`neo-input ${className}`}
          style={Icon ? { paddingLeft: '38px' } : {}}
          {...props}
        />
      </div>
      {error && (
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#E11D48', marginTop: '2px' }}>
          {error}
        </span>
      )}
    </div>
  );
}

export function Select({
  label,
  id,
  value,
  onChange,
  options = [],
  required = false,
  className = '',
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="neo-form-group">
      {label && (
        <label htmlFor={selectId} className="neo-label">
          {label} {required && <span style={{ color: '#E11D48' }}>*</span>}
        </label>
      )}
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        required={required}
        className={`neo-select ${className}`}
        {...props}
      >
        {options.map((opt) => {
          const val = typeof opt === 'object' ? opt.value : opt;
          const lbl = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function Textarea({
  label,
  id,
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  rows = 3,
  ...props
}) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="neo-form-group">
      {label && (
        <label htmlFor={textareaId} className="neo-label">
          {label} {required && <span style={{ color: '#E11D48' }}>*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`neo-textarea ${className}`}
        {...props}
      />
    </div>
  );
}

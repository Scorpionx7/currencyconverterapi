import { forwardRef } from 'react';
import './Select.css';

const Select = forwardRef(
  (
    { label, error, children, required = false, className = '', ...props },
    ref
  ) => {
    const selectClass = `select ${error ? 'select--error' : ''} ${className}`;

    return (
      <div className="select-group">
        {label && (
          <label className="select-label">
            {label}
            {required && <span className="select-required">*</span>}
          </label>
        )}
        <select ref={ref} className={selectClass} {...props}>
          {children}
        </select>
        {error && <span className="select-error-message">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;

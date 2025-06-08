import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(
  (
    {
      label,
      error,
      type = 'text',
      placeholder,
      required = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputClass = `input ${error ? 'input--error' : ''} ${className}`;

    return (
      <div className="input-group">
        {label && (
          <label className="input-label">
            {label}
            {required && <span className="input-required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={inputClass}
          placeholder={placeholder}
          {...props}
        />
        {error && <span className="input-error-message">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, required, error, helper, id, ...props }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div>
        <label
          htmlFor={fieldId}
          className="block mb-2 font-body text-[14px] font-medium"
          style={{ color: '#1D2020' }}
        >
          {label}
          {required && (
            <span className="ml-1" style={{ color: '#D74A4A' }} aria-hidden="true">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${fieldId}-error` : helper ? `${fieldId}-helper` : undefined
          }
          className="w-full font-body text-[16px] rounded-xl transition-colors duration-160 focus:outline-none"
          style={{
            height: 56,
            padding: '0 20px',
            backgroundColor: '#FFFFFF',
            border: error ? '1px solid #D74A4A' : '1px solid #E7E6E4',
            color: '#1D2020',
          }}
          onFocus={(e) => {
            if (!error) {
              e.currentTarget.style.borderColor = '#1D2020';
              e.currentTarget.style.outline = '2px solid rgba(109,94,243,0.2)';
              e.currentTarget.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = '';
            e.currentTarget.style.outlineOffset = '';
            if (!error) e.currentTarget.style.borderColor = '#E7E6E4';
          }}
          onMouseEnter={(e) => {
            if (!error && document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = '#C4C4C4';
            }
          }}
          onMouseLeave={(e) => {
            if (!error && document.activeElement !== e.currentTarget) {
              e.currentTarget.style.borderColor = '#E7E6E4';
            }
          }}
          {...props}
        />

        {error && (
          <p
            id={`${fieldId}-error`}
            className="mt-2 font-body text-[13px]"
            style={{ color: '#D74A4A' }}
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {helper && !error && (
          <p
            id={`${fieldId}-helper`}
            className="mt-2 font-body text-[13px]"
            style={{ color: '#8C8C8C' }}
          >
            {helper}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

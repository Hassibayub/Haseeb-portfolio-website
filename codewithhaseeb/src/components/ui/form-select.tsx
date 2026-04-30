import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  error?: string;
  helper?: string;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, required, error, helper, id, options, ...props }, ref) => {
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

        <select
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className="w-full font-body text-[16px] rounded-xl transition-colors duration-160 focus:outline-none appearance-none cursor-pointer"
          style={{
            height: 56,
            padding: '0 44px 0 20px',
            backgroundColor: '#FFFFFF',
            border: error ? '1px solid #D74A4A' : '1px solid #E7E6E4',
            color: '#1D2020',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A5C5C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
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
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>

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
          <p className="mt-2 font-body text-[13px]" style={{ color: '#8C8C8C' }}>
            {helper}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

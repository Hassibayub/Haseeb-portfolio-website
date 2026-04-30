'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';

import { FormField } from '@/components/ui/form-field';
import { FormTextarea } from '@/components/ui/form-textarea';
import { FormSelect } from '@/components/ui/form-select';
import { ContactFormSuccess } from './ContactFormSuccess';
import { trackEvent } from '@/lib/analytics';

const serviceLabels: Record<string, string> = {
  'ai-saas-mvp': 'AI SaaS MVPs',
  'ai-agents': 'AI Agents',
  'voice-ai': 'Voice AI',
  'llm-cost-optimization': 'LLM Cost Optimization',
  'ai-automation': 'AI Workflow Automation',
  'senior-fullstack': 'Senior Full-Stack Engineering',
};

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(80),
  email: z.string().email('Enter a valid email address').max(120),
  project: z
    .string()
    .min(20, 'Please describe your project (at least 20 characters)')
    .max(1500),
  budget: z.enum(
    ['under-5k', '5-15k', '15-35k', '35-75k', '75k-plus', 'retainer'],
    { errorMap: () => ({ message: 'Please select a budget range' }) }
  ),
  company: z.string().max(120).optional(),
});

type FormValues = z.infer<typeof schema>;

const budgetOptions = [
  { value: '', label: 'Select one' },
  { value: 'under-5k', label: 'Under $5,000 (we\'ll likely refer you)' },
  { value: '5-15k', label: '$5,000 to $15,000' },
  { value: '15-35k', label: '$15,000 to $35,000' },
  { value: '35-75k', label: '$35,000 to $75,000' },
  { value: '75k-plus', label: '$75,000+' },
  { value: 'retainer', label: 'Retainer / ongoing work' },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const serviceSlug = searchParams.get('service');
  const serviceLabel = serviceSlug ? (serviceLabels[serviceSlug] ?? null) : null;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const startedRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const handleFocus = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('contact_form_start', {});
    }
  };

  const onSubmit = async (data: FormValues) => {
    trackEvent('contact_form_submit_attempt', {});
    setSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website_url: '' }),
      });

      if (res.ok) {
        setFirstName(data.name.split(' ')[0]);
        trackEvent('contact_form_submit_success', { budget: data.budget });
        setSubmitted(true);
        setTimeout(() => {
          successRef.current?.focus();
        }, 100);
      } else {
        const json = await res.json().catch(() => ({}));
        trackEvent('contact_form_submit_error', {
          error_type: json.error ?? 'server',
        });
        setServerError(
          'Something went wrong. Please try again or email haseeb@codewithhaseeb.com directly.'
        );
      }
    } catch {
      trackEvent('contact_form_submit_error', { error_type: 'network' });
      setServerError(
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section
        className="pb-[72px] md:pb-[128px]"
        style={{ backgroundColor: '#F3F2F1' }}
      >
        <div className="container-tight">
          <div ref={successRef} tabIndex={-1} className="outline-none">
            <ContactFormSuccess firstName={firstName} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="pb-[72px] md:pb-[128px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ maxWidth: 640 }}
        >
          {/* Service context banner — shown when arriving from /services */}
          {serviceLabel && (
            <div
              className="mb-8 px-5 py-4 rounded-xl font-body text-[14px]"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E7E6E4',
                borderLeft: '4px solid #D8F9B8',
                color: '#1D2020',
              }}
            >
              You are asking about: <strong>{serviceLabel}</strong>
            </div>
          )}

          {/* Honeypot — hidden from real users */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: -10000, top: 'auto', width: 1, height: 1, overflow: 'hidden' }}
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('company')}
              name="website_url_hp"
            />
          </div>

          {/* Field 1 — Name */}
          <div onFocus={handleFocus}>
            <FormField
              label="Your name"
              required
              placeholder=""
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          {/* Field 2 — Email */}
          <div className="mt-6">
            <FormField
              label="Work email"
              required
              type="email"
              placeholder="you@company.com"
              helper="We'll reply within one business day."
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {/* Field 3 — Project */}
          <div className="mt-6">
            <FormTextarea
              label="What are you building?"
              required
              rows={5}
              maxLength={1500}
              placeholder={`We're a YC-backed health-tech startup. We've built an MVP in React + Node. We want to add an AI voice agent that handles patient intake calls. Budget is firm at ~$20K. Timeline: 6 weeks to ship.`}
              helper="The more specific, the better. Include stack, timeline, and what done looks like if you can."
              error={errors.project?.message}
              {...register('project')}
            />
          </div>

          {/* Field 4 — Budget */}
          <div className="mt-6">
            <FormSelect
              label="Budget range"
              required
              options={budgetOptions}
              error={errors.budget?.message}
              defaultValue=""
              {...register('budget')}
            />
          </div>

          {/* Field 5 — Company (optional) */}
          <div className="mt-6">
            <FormField
              label="Company or website"
              placeholder="company.com"
              error={errors.company?.message}
              {...register('company')}
            />
          </div>

          {/* Server error */}
          {serverError && (
            <p
              className="mt-4 font-body text-[14px]"
              style={{ color: '#D74A4A' }}
              role="alert"
            >
              {serverError}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="mt-10 inline-flex items-center justify-center rounded-full font-body font-medium text-[15px] transition-all"
            style={{
              height: 52,
              paddingLeft: 32,
              paddingRight: 32,
              backgroundColor: submitting ? '#E7E6E4' : '#D8F9B8',
              color: submitting ? '#8C8C8C' : '#1D2020',
              border: '1px solid #1D2020',
              cursor: submitting ? 'wait' : 'pointer',
            }}
          >
            {submitting ? 'Sending...' : 'Send it over'}
          </button>

          {/* Micro-promise */}
          <p
            className="mt-4 font-body text-[13px]"
            style={{ color: '#8C8C8C' }}
          >
            Reply within one business day. Or we'll refund your time with a
            recommended alternative.
          </p>
        </form>
      </div>
    </section>
  );
}

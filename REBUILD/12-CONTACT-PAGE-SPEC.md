# 12. Contact Page Specification

**URL:** `/contact`
**Status:** Spec. Implement as part of Task 7. Depends on `/api/contact` route (currently empty folder in `src/app/api/contact/`).
**Design language:** Finns-reference. Minimal. Functional. Surface alternation. No em dashes, no `→` glyphs, no underscore_case.

## Structural decision

**Form-first with qualifying questions.** Not Calendly-first.

Why:
- A calendar picker as the primary CTA attracts **tire-kickers** (budget $500, want "an AI", expect it by Tuesday). They book 30-minute slots and no-show or waste the call.
- A short qualifying form filters. People who won't spend 60 seconds on 4 fields weren't going to hire you anyway.
- After submit, we present Calendly + direct email. Qualified leads get everything they need.

This matches the user's own stated positioning: "we push back if the scope is wrong" starts at the contact page, not the call.

---

## 0. Purpose

`/contact` answers **"how do I actually start working with you?"**

Success = visitor submits form OR books Calendly OR emails directly. All three are wins. We gently rank them: form > Calendly > email, based on how useful each channel is to us for scoping.

---

## 1. Page metadata

```ts
// src/app/contact/page.tsx
export const metadata = {
  title: 'Contact. Tell us what you\'re building. | codewithhaseeb',
  description:
    'Four questions. 60 seconds. If we\'re a fit, we\'ll send you a scoping-call link within a business day. If we\'re not, we\'ll tell you who is.',
  openGraph: {
    title: 'Contact codewithhaseeb.',
    description: 'Tell us what you\'re building. We\'ll reply within a business day.',
    images: ['/og/contact.png'],
    type: 'website',
  },
  alternates: { canonical: 'https://codewithhaseeb.com/contact' },
  robots: { index: true, follow: true, nocache: false },
};
```

OG route: `src/app/contact/opengraph-image.tsx`.

---

## 2. Page shell

```tsx
<main>
  <ContactHero />         {/* cream */}
  <ContactForm />         {/* cream, continues from hero */}
  <ContactAlternatives /> {/* white, quieter */}
  <ContactFAQ />          {/* cream */}
</main>
```

**No FinalCTA on this page.** We don't need to re-CTA after the form. Let the form be the action.

Surface alternation: cream → cream → white → cream. The hero and form share a surface (they're one visual unit). Then break to white for alternatives, back to cream for FAQ.

### Spacing

| Section | Desktop | Mobile |
|---|---|---|
| ContactHero | `pt-[160px] pb-[48px]` | `pt-[96px] pb-[32px]` |
| ContactForm | `pb-[128px]` | `pb-[72px]` |
| ContactAlternatives | `py-[96px]` | `py-[56px]` |
| ContactFAQ | `py-[120px]` | `py-[72px]` |

Container: `container-tight`.

---

## 3. Section specs

### 3.1 ContactHero

**Surface:** cream `#F3F2F1`.

**Layout:** Single column, left-aligned, max-width 720px. Minimal.

**Content:**

```
Eyebrow (IBM Plex Mono 12px tracking 0.08em lowercase, #8C8C8C):
  contact

Headline (Bricolage clamp(48px, 6.5vw, 72px) weight 500 tracking -0.02em, #1D2020):
  Four questions.
  Sixty seconds.

Subhead (Bricolage 20px leading 1.55, #5A5C5C, max-width 560px, mt-6):
  If we're a fit, you'll get a scoping-call link within one business day.
  If we're not, we'll tell you who is.

[No CTA here. The form IS the CTA.]
```

That's it. No decorative panel. Don't overdesign this. The headline + subhead set expectation, the form does the work.

### 3.2 ContactForm

**Surface:** cream (continues from hero).

**Layout:** Single column, max-width 640px, left-aligned.

**Fields (in order):**

1. **Your name** (required) — text input.
2. **Work email** (required) — email input. Validation: must be valid email.
3. **What are you building?** (required) — textarea, 4 rows, placeholder example.
4. **Budget range** (required) — select dropdown, 5 options.

**Optional extra (visible by default, not hidden):**

5. **Company / website** (optional) — text input.

**Total field count: 5 (4 required, 1 optional).** Short enough that no one bounces. Long enough to qualify.

#### Field styling

All inputs share a single token set:

```tsx
const inputStyles = {
  height: 56,
  padding: '0 20px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E7E6E4',
  borderRadius: 12,
  fontSize: 16,
  color: '#1D2020',
  fontFamily: 'inherit', // Bricolage
  transition: 'border-color 160ms',
};

// Focus: border-color: #1D2020, outline: 2px solid rgba(109, 94, 243, 0.2), outline-offset: 2px
// Hover: border-color: #C4C4C4
// Error: border-color: #D74A4A, background: #FEF6F6
```

Labels above inputs:

```tsx
<label className="block mb-2 text-[14px] font-medium" style={{ color: '#1D2020' }}>
  Your name <span style={{ color: '#D74A4A' }}>*</span>
</label>
```

Helper text below inputs (when present):

```tsx
<p className="mt-2 text-[13px]" style={{ color: '#8C8C8C' }}>
  We'll only use this to reply to you.
</p>
```

Spacing between fields: `mt-6`.

#### Field details

**1. Name:**

```
Label: Your name *
Placeholder: (empty)
Helper: (none)
```

**2. Email:**

```
Label: Work email *
Placeholder: you@company.com
Helper: We'll reply within one business day.
```

**3. What are you building?:**

```
Label: What are you building? *
Placeholder: We're a YC-backed health-tech startup. We've built an MVP
             in React + Node. We want to add an AI voice agent that handles
             patient intake calls. Budget is firm at ~$20K. Timeline: 6
             weeks to ship.
Helper: The more specific, the better. Include stack, timeline, and what
        "done" looks like if you can.
Rows: 5
Maxlength: 1500
```

The placeholder doubles as an instruction on what a good answer looks like. Don't put it in the helper.

**4. Budget range:**

```
Label: Budget range *
Options (select dropdown):
  Select one
  Under $5,000 (we'll likely refer you)
  $5,000 to $15,000
  $15,000 to $35,000
  $35,000 to $75,000
  $75,000+
  Retainer / ongoing work
```

The "Under $5,000 (we'll likely refer you)" is deliberate honesty. Filters out projects that aren't a fit without being rude about it.

**5. Company / website (optional):**

```
Label: Company or website
Placeholder: company.com
Helper: (none)
Optional — no asterisk
```

#### Submit button

Single button, lime pill, left-aligned (not full-width).

```tsx
<button type="submit"
        className="mt-10 inline-flex items-center justify-center px-8 h-[52px] rounded-full font-medium text-[15px] transition-all"
        style={{
          backgroundColor: '#D8F9B8',
          color: '#1D2020',
          border: '1px solid #1D2020',
        }}>
  Send it over
</button>
```

No icon. No `→`. Just text.

**Disabled state (during submission):**

```
Text: Sending...
Background: #E7E6E4
Color: #8C8C8C
Cursor: wait
```

**Micro-promise below button:**

```tsx
<p className="mt-4 text-[13px]" style={{ color: '#8C8C8C' }}>
  Reply within one business day. Or we'll refund your time with a
  recommended alternative.
</p>
```

That last line is opinion, not sales. Keep it.

#### Form behavior

- Client-side validation via `react-hook-form` + `zod`. Both already implied by user's stack.
- No inline validation while typing. Validate on blur and on submit.
- Error messages appear below the field, red (`#D74A4A`), 13px.
- On submit: POST to `/api/contact` → Resend sends to `miltech.haseeb@gmail.com` → success state replaces form in place (no toast, no modal, no redirect).

#### Success state (replaces form)

Same container. No redirect.

```
[Large lime checkmark, Tabler IconCheck 48px, #1D2020 on #D8F9B8 80px circle]

Headline (Bricolage 40px weight 500):
  Got it. Thanks, {firstName}.

Body (Bricolage 18px leading 1.55, #1D2020, max-width 520px, mt-6):
  I'll reply from haseeb@codewithhaseeb.com within one business day.
  If it's urgent or you'd rather just book a slot now, here are the
  direct options.

[Two CTAs row, mt-8]:
  Primary lime pill: "Book a 30-min call"  (opens Calendly in new tab)
  Secondary text link: "Email haseeb@codewithhaseeb.com"
```

Why this instead of a toast: toasts disappear. The success state is a reference page the visitor can keep open in a tab. It also offers Calendly as a next step without forcing it.

#### Spam protection

- Honeypot field: hidden input named `website_url` (distinct from the real optional "Company or website"). If filled, silently drop.
- Cloudflare Turnstile (invisible) if spam becomes a problem. Not v1.
- Server-side: rate-limit per IP (5 submits per hour) using Upstash or in-memory for v1.

### 3.3 ContactAlternatives

**Surface:** white `#FFFFFF`.

**Layout:** Centered container, max-width 800px. Three horizontal "alternative" blocks.

**Content:**

```
Eyebrow (mono 12px tracking 0.08em lowercase, #8C8C8C):
  or go direct

Headline (Bricolage 32px weight 500, #1D2020, max-width 560px):
  Already know what you want?

[3 option cards, grid-cols-1 md:grid-cols-3 gap-4, mt-10]:

  Calendly          |  Email              |  WhatsApp
  Book a 30-min     |  haseeb@            |  +92 314 3543 422
  scoping call.     |  codewithhaseeb.com |
  Visit             |  Send email         |  Open chat
```

**Card styling:** matches `LinkCard` from `/about`. White bg, `1px solid #E7E6E4`, `rounded-2xl`, `p-6`, `min-h-[160px]`.

- Title: Bricolage 18px weight 500 `#1D2020`.
- Detail: 14px `#5A5C5C` leading-1.55, mt-3.
- Action link: mono 12px tracking-wide lowercase `#6D5EF3`, mt-auto. Hover underline.
- No `→` glyph.
- Hover: translateY -2px, shadow `0 8px 24px rgba(0,0,0,0.05)`.

**Targets:**

- Calendly: `https://calendly.com/miltech-haseeb/30min`, opens new tab.
- Email: `mailto:haseeb@codewithhaseeb.com` (use new domain email; fall back to `miltech.haseeb@gmail.com` if not yet live). Subject prefill: "Project enquiry".
- WhatsApp: `https://wa.me/923143543422?text=Hi%20Haseeb%2C%20I%20wanted%20to%20talk%20about...`.

### 3.4 ContactFAQ

**Surface:** cream `#F3F2F1`.

**Layout:** Left heading column + right accordion. Same pattern as `ServicesFAQ`.

**Heading:**

```
Eyebrow: before you book

Headline (Bricolage 40px weight 500, #1D2020):
  A few things to know.

Body (Bricolage 18px leading 1.5, #5A5C5C, max-width 360px, mt-6):
  If you have a question that's not here, email
  haseeb@codewithhaseeb.com. I reply within one business day.
```

**Accordion** (shadcn, 6 items, first open by default):

1. **How quickly can you start?**
   > Usually 1 to 3 weeks out. We take one new project per month to keep quality high. If it's urgent, say so in the form and we'll tell you honestly.

2. **Do you work with clients outside US hours?**
   > Yes. We're UTC+5 (Islamabad). We overlap 3 to 4 hours daily with US East Coast and 5+ hours with Europe. Weekly sync happens on your clock.

3. **What's your minimum project size?**
   > $5,000 for one-off builds. $8,000 for anything that needs multiple engineers. Below that we'll refer you to a contractor we trust.

4. **Do you sign NDAs?**
   > Yes, standard practice. We'll sign yours or use ours. No charge for review on standard NDAs.

5. **How do you price?**
   > Fixed-price for fixed-scope work (most engagements). Retainer for ongoing work, $8,000 to $15,000 per month per dedicated senior. Hourly only for advisory or small tasks.

6. **What happens after I submit the form?**
   > You get a reply within one business day from Haseeb. If it's a fit, we send a Calendly link for a scoping call. If not, we usually recommend another team.

---

## 4. API route

### `/src/app/api/contact/route.ts`

```ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  project: z.string().min(20).max(1500),
  budget: z.enum([
    'under-5k',
    '5-15k',
    '15-35k',
    '35-75k',
    '75k-plus',
    'retainer',
  ]),
  company: z.string().max(120).optional(),
  website_url: z.string().max(0).optional(), // honeypot, must be empty
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Honeypot triggered — silently accept, don't email
    if (body.website_url && body.website_url.length > 0) {
      return NextResponse.json({ ok: true });
    }

    await resend.emails.send({
      from: 'codewithhaseeb contact <contact@codewithhaseeb.com>',
      to: 'haseeb@codewithhaseeb.com',
      replyTo: data.email,
      subject: `New enquiry from ${data.name} — ${budgetLabel(data.budget)}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company ?? '—'}`,
        `Budget: ${budgetLabel(data.budget)}`,
        '',
        'Project brief:',
        data.project,
      ].join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'validation', issues: err.issues }, { status: 400 });
    }
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}

function budgetLabel(key: string): string {
  return {
    'under-5k': 'Under $5,000 (refer)',
    '5-15k': '$5,000 – $15,000',
    '15-35k': '$15,000 – $35,000',
    '35-75k': '$35,000 – $75,000',
    '75k-plus': '$75,000+',
    'retainer': 'Retainer / ongoing',
  }[key] ?? key;
}
```

Note: the `–` in email subject/labels is fine (it's inside a mailto/server string, not rendered body copy). Page body copy still uses "to" not hyphens or em dashes.

### Env vars

```
RESEND_API_KEY=...
RESEND_FROM_EMAIL=contact@codewithhaseeb.com   (needs domain verification in Resend)
CONTACT_TO_EMAIL=haseeb@codewithhaseeb.com
```

Fallback to `miltech.haseeb@gmail.com` if the new domain isn't verified yet on Resend. Update after DNS is set.

---

## 5. Components

| Component | Path |
|---|---|
| `ContactHero` | `sections/contact/ContactHero.tsx` |
| `ContactForm` | `sections/contact/ContactForm.tsx` (client) |
| `ContactFormSuccess` | `sections/contact/ContactFormSuccess.tsx` |
| `ContactAlternatives` | `sections/contact/ContactAlternatives.tsx` |
| `ContactFAQ` | `sections/contact/ContactFAQ.tsx` |
| `FormField` | `ui/form-field.tsx` (shared label/input/error triple) |
| `FormTextarea` | `ui/form-textarea.tsx` |
| `FormSelect` | `ui/form-select.tsx` |

`LinkCard` from `/about` reused in `ContactAlternatives`.

---

## 6. SEO

### JSON-LD

`ContactPage` schema:

```ts
const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: 'https://codewithhaseeb.com/contact',
  name: 'Contact — codewithhaseeb',
  contactOption: [
    { '@type': 'ContactPoint', contactType: 'sales', email: 'haseeb@codewithhaseeb.com' },
    { '@type': 'ContactPoint', contactType: 'sales', telephone: '+92 314 3543 422' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
};
```

### Robots / canonical

Standard. Canonical to `/contact`.

---

## 7. Accessibility

- All form fields have visible `<label>` associations (not placeholder-as-label).
- Required fields marked with both `required` attribute and visible `*`.
- Error messages use `aria-live="polite"` so screen readers announce them on submit.
- Submit button has `aria-busy={submitting}`.
- Success state gets `role="status"` for screen reader announcement.
- Focus management: on success, move focus to success headline.
- Honeypot field has `aria-hidden="true"` and `tabIndex=-1`, visually hidden via `position: absolute; left: -10000px`.
- Contrast: cream form bg (`#FFFFFF` inputs on `#F3F2F1`) passes AA at 16px.

---

## 8. Motion

- **Hero:** no entrance animation (instant).
- **Form field focus:** border color transition 160ms.
- **Submit button:** on submit, smooth state change to "Sending..." 200ms.
- **Success state:** fade-in 320ms, form fades out 200ms. Total swap under 600ms.
- **FAQ accordion:** 280ms cubic-bezier(0.4,0,0.2,1).
- **Alternatives cards hover:** translateY -2px, 200ms.
- `prefers-reduced-motion` disables non-essential transitions. Form submit state swap stays (functional).

---

## 9. Responsive

| Breakpoint | Behavior |
|---|---|
| `<640px` | Form fields full-width. Submit button full-width. Headline drops to 40px. Alternatives cards stack 1-col. FAQ uses single column (heading stacks above accordion). |
| `640-1023px` | Form stays max 640px. Alternatives 2-col. |
| `≥1024px` | Full spec. Form at 640px, FAQ heading left / accordion right 4/8 split. |

---

## 10. Analytics events

| Event | Trigger | Params |
|---|---|---|
| `contact_view` | page mount | none |
| `contact_form_start` | first form field focus | none |
| `contact_form_submit_attempt` | submit button click | none |
| `contact_form_submit_success` | API returns 200 | `{ budget }` |
| `contact_form_submit_error` | API returns ≥400 or network fail | `{ error_type }` |
| `contact_alternative_click` | Calendly/email/WhatsApp link | `{ channel }` |
| `contact_faq_open` | FAQ item expands | `{ question_index }` |

Budget gets tracked on success so we can see qualified lead flow (don't send name/email/content to GA, that's PII).

---

## 11. Implementation order

1. Scaffold `/src/app/contact/page.tsx` with metadata + hero.
2. Build `FormField`, `FormTextarea`, `FormSelect` primitives.
3. Build `ContactForm` client component with `react-hook-form` + `zod`.
4. Build `/api/contact/route.ts` with Resend.
5. Add env vars to `.env.local` and Vercel.
6. Test submission end-to-end with a real Resend test key.
7. Build `ContactFormSuccess` component.
8. Build `ContactAlternatives` (reusing `LinkCard`).
9. Build `ContactFAQ`.
10. Add honeypot + rate limiting.
11. Emit JSON-LD.
12. Add OG image route.
13. Wire analytics.
14. Screenshot at 1440 and 390.

---

## 12. Acceptance checklist

- [ ] Form has 4 required + 1 optional fields, in correct order.
- [ ] Budget dropdown includes the "Under $5,000 (we'll likely refer you)" option verbatim.
- [ ] Submit button says "Send it over" with no arrow.
- [ ] On submit, form is replaced in-place by success state, not a toast.
- [ ] Success state shows Calendly + email as secondary options.
- [ ] API route sends an email via Resend successfully in production.
- [ ] Rate limit prevents >5 submits per IP per hour.
- [ ] Honeypot silently drops bot submissions.
- [ ] No `→` or em dashes in rendered body copy.
- [ ] No `underscore_case` in any user-facing label (server-side budget keys like `5-15k` are fine).
- [ ] Form works keyboard-only (tab through all fields, submit with enter).
- [ ] Screen reader announces errors via `aria-live`.
- [ ] Reply email arrives at `haseeb@codewithhaseeb.com` with correct subject and body.
- [ ] Alternatives cards all open correct target (Calendly new tab, mailto, wa.me).
- [ ] FAQ accordion works keyboard-only.
- [ ] JSON-LD validates.
- [ ] Lighthouse ≥95 (page is lightweight).

---

## 13. Out of scope

- Newsletter signup.
- Live chat widget.
- Intercom or any third-party messenger embed beyond Calendly.
- Scheduling inside the page (use Calendly link, don't embed iframe unless user explicitly requests — iframes hurt Lighthouse and feel heavy).
- Multi-step wizard. 5 fields fits on one screen, don't fragment.
- Budget calculator.

---

**End of 12-CONTACT-PAGE-SPEC.md**

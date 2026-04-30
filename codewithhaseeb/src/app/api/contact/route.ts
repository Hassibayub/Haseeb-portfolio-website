import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

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
  website_url: z.string().max(200).optional(), // honeypot — must be empty
});

function budgetLabel(key: string): string {
  return (
    ({
      'under-5k': 'Under $5,000 (refer)',
      '5-15k': '$5,000 to $15,000',
      '15-35k': '$15,000 to $35,000',
      '35-75k': '$35,000 to $75,000',
      '75k-plus': '$75,000+',
      retainer: 'Retainer / ongoing',
    } as Record<string, string>)[key] ?? key
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot — silently accept without emailing
    if (body.website_url && String(body.website_url).length > 0) {
      return NextResponse.json({ ok: true });
    }

    const data = schema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY ?? '');

    await resend.emails.send({
      from: process.env.CONTACT_FORM_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: process.env.CONTACT_FORM_TO_EMAIL ?? 'miltech.haseeb@gmail.com',
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
      return NextResponse.json(
        { ok: false, error: 'validation', issues: err.issues },
        { status: 400 }
      );
    }
    console.error('[contact] error', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional().or(z.literal('')),
  budget: z.string().max(50).optional().or(z.literal('')),
  message: z.string().min(10).max(5000),
  // Honeypot field. If filled, it's a bot.
  _hp: z.string().max(0).optional().or(z.literal('')),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'Invalid input', issues: parsed.error.issues },
        { status: 400 }
      );
    }

    // Honeypot silent success
    if (parsed.data._hp) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, company, budget, message } = parsed.data;

    // Lazy init so missing key doesn't crash the module at build time
    const resend = new Resend(process.env.RESEND_API_KEY ?? '');

    await resend.emails.send({
      from: process.env.CONTACT_FORM_FROM_EMAIL ?? 'onboarding@resend.dev',
      to: process.env.CONTACT_FORM_TO_EMAIL ?? 'miltech.haseeb@gmail.com',
      replyTo: email,
      subject: `New lead from ${name}${company ? ` (${company})` : ''}`,
      text: [
        `From: ${name} <${email}>`,
        company && `Company: ${company}`,
        budget && `Budget: ${budget}`,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] error', err);
    return NextResponse.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

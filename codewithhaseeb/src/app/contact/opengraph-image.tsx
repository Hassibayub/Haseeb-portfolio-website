import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const alt = "Contact. Tell us what you're building.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function ContactOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#1D2020',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: '#A6A6A6',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          contact
        </p>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 500,
            color: '#F3F2F1',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: 24,
          }}
        >
          Four questions.
          <br />
          Sixty seconds.
        </h1>

        <p
          style={{
            fontSize: 22,
            color: 'rgba(243,242,241,0.6)',
            lineHeight: 1.5,
            maxWidth: 640,
            marginBottom: 48,
          }}
        >
          If we're a fit, you'll get a scoping-call link within one business day.
        </p>

        <p
          style={{
            fontSize: 16,
            color: '#D8F9B8',
            letterSpacing: '0.04em',
          }}
        >
          codewithhaseeb.com/contact
        </p>
      </div>
    ),
    { ...size }
  );
}

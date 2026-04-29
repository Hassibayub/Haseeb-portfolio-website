import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const alt = 'AI Engineering Team for Funded Startups | codewithhaseeb';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#1D2020',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: wordmark */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: 'rgba(241,240,238,0.5)',
            letterSpacing: '-0.01em',
          }}
        >
          codewithhaseeb
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 400,
              color: '#F1F0EE',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            AI that runs in
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0 }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 400,
                color: '#F1F0EE',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                borderBottom: '3px solid #D8F9B8',
                paddingBottom: 2,
              }}
            >
              production.
            </div>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              fontWeight: 400,
              color: 'rgba(241,240,238,0.55)',
              letterSpacing: '-0.01em',
            }}
          >
            Not demos that break under load.
          </div>
        </div>

        {/* Bottom: stats line */}
        <div
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: 'rgba(241,240,238,0.35)',
            letterSpacing: '0.04em',
            display: 'flex',
            gap: 32,
          }}
        >
          <span>17K+ active users</span>
          <span style={{ color: 'rgba(241,240,238,0.15)' }}>·</span>
          <span>YC-backed clients</span>
          <span style={{ color: 'rgba(241,240,238,0.15)' }}>·</span>
          <span>7 years shipping AI</span>
          <span style={{ color: 'rgba(241,240,238,0.15)' }}>·</span>
          <span style={{ color: '#D8F9B8' }}>codewithhaseeb.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

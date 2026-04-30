import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#1D2020',
          padding: '80px 80px 0 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {/* Wordmark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 48,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 28,
                color: '#F3F2F1',
                letterSpacing: '0.08em',
              }}
            >
              codewithhaseeb
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: 56,
                fontWeight: 600,
                color: '#F3F2F1',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Six offers. No filler.
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
                fontSize: 56,
                fontWeight: 600,
                color: '#F3F2F1',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Fixed price.
            </span>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 14,
                color: '#8C8C8C',
                letterSpacing: '0.06em',
              }}
            >
              services / codewithhaseeb.com
            </span>
            <div
              style={{
                display: 'flex',
                gap: 24,
                fontFamily: 'monospace',
                fontSize: 14,
                color: '#D8F9B8',
              }}
            >
              <span>6 offers</span>
              <span>$8K to $50K</span>
              <span>4 to 10 weeks</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

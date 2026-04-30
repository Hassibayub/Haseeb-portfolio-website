import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const alt = 'Work. Production AI systems we\'ve shipped. | codewithhaseeb';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: '#F3F2F1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: wordmark + eyebrow */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: '#8C8C8C',
              letterSpacing: '-0.01em',
            }}
          >
            codewithhaseeb
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: '#8C8C8C',
              letterSpacing: '0.08em',
              marginTop: 8,
            }}
          >
            work
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 400,
              color: '#1D2020',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Eight systems. Real metrics.
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 400,
              color: '#1D2020',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            No demos.
          </div>
        </div>

        {/* Bottom: stats line */}
        <div
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: '#5A5C5C',
            letterSpacing: '0.04em',
            display: 'flex',
            gap: 32,
          }}
        >
          <span>17K users</span>
          <span style={{ color: '#C4C4C4' }}>·</span>
          <span>$100K to $1.5K LLM bill</span>
          <span style={{ color: '#C4C4C4' }}>·</span>
          <span>120x pipeline speedup</span>
          <span style={{ color: '#C4C4C4' }}>·</span>
          <span style={{ color: '#1D2020', fontWeight: 500 }}>codewithhaseeb.com/work</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

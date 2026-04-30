import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function BlogOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#F3F2F1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
        }}
      >
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: 14,
            letterSpacing: '0.08em',
            color: '#8C8C8C',
            marginBottom: 24,
            textTransform: 'lowercase',
          }}
        >
          notes · codewithhaseeb.com
        </p>
        <h1
          style={{
            fontFamily: 'sans-serif',
            fontSize: 72,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#1D2020',
            maxWidth: 900,
            margin: 0,
          }}
        >
          Field notes on shipping production AI.
        </h1>
        <div
          style={{
            marginTop: 48,
            width: 48,
            height: 4,
            backgroundColor: '#D8F9B8',
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  );
}

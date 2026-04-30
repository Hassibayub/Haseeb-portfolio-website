import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const alt = 'Resume. Muhammad Haseeb, lead AI engineer.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function ResumeOGImage() {
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
          fontFamily: 'sans-serif',
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
          resume · codewithhaseeb.com
        </p>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 500,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            color: '#1D2020',
            margin: 0,
          }}
        >
          Muhammad Haseeb.
          <br />
          Lead AI engineer.
        </h1>
        <p
          style={{
            fontSize: 22,
            color: '#5A5C5C',
            marginTop: 24,
            lineHeight: 1.5,
            maxWidth: 640,
          }}
        >
          Independent since 2020. 49 projects. 100% Upwork JSS.
        </p>
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

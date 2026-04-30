import Link from 'next/link';
import { resumeData } from '@/lib/resume';

export function ResumeTimeline() {
  return (
    <section
      id="timeline"
      className="py-[64px] md:py-[96px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div style={{ maxWidth: 880 }}>
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase"
            style={{ color: '#8C8C8C' }}
          >
            timeline
          </p>

          <h2
            className="font-body font-medium leading-[1.1] mt-4"
            style={{ fontSize: 32, color: '#1D2020' }}
          >
            How I got here.
          </h2>

          <p
            className="font-body leading-[1.5] mt-3"
            style={{ fontSize: 16, color: '#5A5C5C', maxWidth: 520 }}
          >
            Short version. The work above is the long version.
          </p>

          <dl className="mt-12">
            {resumeData.timeline.map((entry, i) => (
              <div
                key={entry.dates}
                className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-6 ${
                  i < resumeData.timeline.length - 1 ? 'border-b' : ''
                }`}
                style={{ borderColor: '#E7E6E4' }}
              >
                <dt
                  className="sm:col-span-3 font-mono text-[12px] tracking-[0.08em] lowercase pt-0 sm:pt-1"
                  style={{ color: '#8C8C8C' }}
                >
                  {entry.dates}
                </dt>
                <dd className="sm:col-span-9" style={{ maxWidth: 560 }}>
                  <p
                    className="font-body font-medium"
                    style={{ fontSize: 16, color: '#1D2020' }}
                  >
                    {entry.role}
                  </p>
                  <p
                    className="font-body leading-[1.6] mt-2"
                    style={{ fontSize: 15, color: '#5A5C5C' }}
                  >
                    {entry.body}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

import { resumeData } from '@/lib/resume';
import { ResumeWorkRow } from './ResumeWorkRow';

export function ResumeSelectedWork() {
  return (
    <section
      id="selected-work"
      className="py-[72px] md:py-[112px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight">
        <div style={{ maxWidth: 880 }}>
          {/* Header */}
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase"
            style={{ color: '#8C8C8C' }}
          >
            selected work
          </p>

          <h2
            className="font-body font-medium leading-[1.1] tracking-tight mt-4"
            style={{ fontSize: 40, letterSpacing: '-0.01em', color: '#1D2020' }}
          >
            The last three years, in order of weight.
          </h2>

          <p
            className="font-body leading-[1.5] mt-3"
            style={{ fontSize: 17, color: '#5A5C5C', maxWidth: 560 }}
          >
            Six engagements I would put in a job application. Not in chronological
            order. The rest of the 49 projects are on Upwork.
          </p>

          {/* Work rows */}
          {resumeData.work.map((entry, i) => (
            <ResumeWorkRow
              key={entry.slug}
              entry={entry}
              isLast={i === resumeData.work.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

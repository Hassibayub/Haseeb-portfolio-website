import { resumeData } from '@/lib/resume';

export function ResumeEducation() {
  const { degree, school, location, dates } = resumeData.education;

  return (
    <section
      id="education"
      className="py-[48px] md:py-[64px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <div style={{ maxWidth: 720 }}>
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase"
            style={{ color: '#8C8C8C' }}
          >
            education
          </p>

          <p
            className="font-body leading-[1.6] mt-4"
            style={{ fontSize: 18, color: '#1D2020' }}
          >
            {degree}
            <br />
            {school}, {location}. {dates}.
          </p>
        </div>
      </div>
    </section>
  );
}

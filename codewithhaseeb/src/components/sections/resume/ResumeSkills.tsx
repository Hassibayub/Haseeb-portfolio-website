import { resumeData } from '@/lib/resume';

export function ResumeSkills() {
  return (
    <section
      id="skills"
      className="py-[64px] md:py-[96px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight">
        <div style={{ maxWidth: 960 }}>
          <p
            className="font-mono text-[12px] tracking-[0.08em] lowercase"
            style={{ color: '#8C8C8C' }}
          >
            stack
          </p>

          <h2
            className="font-body font-medium leading-[1.1] mt-4"
            style={{ fontSize: 32, color: '#1D2020', maxWidth: 560 }}
          >
            What I actually reach for.
          </h2>

          <p
            className="font-body leading-[1.5] mt-3"
            style={{ fontSize: 16, color: '#5A5C5C', maxWidth: 520 }}
          >
            Anything shipped in the last 12 months. No "familiar with" padding.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {resumeData.skills.map((block) => (
              <div key={block.category}>
                <h3
                  className="font-body font-medium"
                  style={{ fontSize: 18, color: '#1D2020' }}
                >
                  {block.category}
                </h3>

                {block.groups.map((group) => (
                  <div key={group.label} className="mt-5">
                    <p
                      className="font-mono text-[11px] tracking-[0.08em] lowercase"
                      style={{ color: '#8C8C8C' }}
                    >
                      {group.label}
                    </p>
                    <p
                      className="font-body leading-[1.7] mt-2"
                      style={{ fontSize: 15, color: '#1D2020' }}
                    >
                      {group.items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

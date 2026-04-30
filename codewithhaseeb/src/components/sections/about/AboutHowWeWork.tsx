const steps = [
  {
    number: '01',
    title: 'Free 30-minute scoping call.',
    body: 'We ask about outcomes, not features. We push back on scope we think is wrong. Half the time the brief shifts during the call. That\'s fine.',
  },
  {
    number: '02',
    title: 'Written proposal within 3 business days.',
    body: 'Milestones, prices, deliverables, timeline. One page. No ambiguity. You either sign or tell us what needs to change.',
  },
  {
    number: '03',
    title: 'Weekly sprints with a Friday demo.',
    body: "We build against the milestones. Every Friday you see working software, not slides. You approve before we move on.",
  },
  {
    number: '04',
    title: 'Daily async updates.',
    body: "Slack, Loom, or email. Your call. You always know what's being built and what's blocked. If something's off, you hear it that day.",
  },
  {
    number: '05',
    title: '30 days of post-launch support.',
    body: "Bug fixes are on us for 30 days after we ship. After that, retainer or ad-hoc. Either way, you're not stranded.",
  },
];

export function AboutHowWeWork() {
  return (
    <section
      className="py-[64px] md:py-[112px]"
      style={{ backgroundColor: '#F3F2F1' }}
    >
      <div className="container-tight">
        <p
          className="text-label mb-6"
          style={{ color: '#8C8C8C' }}
        >
          the process
        </p>

        <h2
          className="font-body font-medium text-[32px] md:text-[40px] leading-[1.15] tracking-tight"
          style={{ color: '#1D2020', maxWidth: 560 }}
        >
          What actually happens when you hire us.
        </h2>

        <p
          className="font-body text-[18px] leading-[1.6] mt-4 mb-12"
          style={{ color: '#5A5C5C', maxWidth: 560 }}
        >
          This is the playbook for a typical engagement. Nothing surprising.
          That's the point.
        </p>

        <ol className="divide-y" style={{ borderColor: '#E7E6E4' }}>
          {steps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-12 gap-6 py-8 items-start"
            >
              {/* Number */}
              <div className="col-span-2 sm:col-span-1 pt-1">
                <span
                  className="font-body font-normal text-[28px] md:text-[32px] leading-none select-none"
                  style={{ color: 'rgba(29, 32, 32, 0.10)' }}
                  aria-hidden="true"
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="col-span-10 sm:col-span-9 md:col-span-8">
                <h3
                  className="font-body font-medium text-[18px] md:text-[20px] leading-[1.3] mb-2"
                  style={{ color: '#1D2020' }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-[16px] leading-[1.65]"
                  style={{ color: '#5A5C5C' }}
                >
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

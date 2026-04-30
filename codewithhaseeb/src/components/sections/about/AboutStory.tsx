'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const paragraphs = [
  'I started engineering professionally in 2019. By 2022 I\'d worked on survey data pipelines at Sony PlayStation scale, which taught me what "production" actually means: it\'s not the code, it\'s the discipline around the code.',
  'Since then I\'ve been independent. I\'ve helped a health-tech startup raise $1.2 million after shipping their AI therapist. I\'ve watched an enterprise LLM bill go from $100,000 a month to $1,500 after we rewrote the routing layer. I\'ve shipped an AI avatar that now serves 17,000 daily users.',
  'Every engagement since 2020 has been remote. Every one has closed with the client happy enough to rehire or refer. That\'s not a marketing claim, it\'s the Upwork record: 49 projects, 100% job success.',
  'I work with a small bench of senior engineers when the scope needs more than one pair of hands. Everyone I bring on is hand-picked and has shipped production systems in the last year. No juniors on billable code. No subcontractors the client can\'t reach directly.',
  "That's the whole pitch.",
];

function AnimatedParagraph({ text, delay }: { text: string; delay: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay }}
      className="font-body text-[19px] leading-[1.65]"
      style={{ color: '#1D2020', marginBottom: '1.5rem' }}
    >
      {text}
    </motion.p>
  );
}

export function AboutStory() {
  return (
    <section
      className="py-[72px] md:py-[120px]"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container-tight">
        <div className="max-w-[680px] mx-auto">
          <p
            className="text-label mb-6"
            style={{ color: '#8C8C8C' }}
          >
            the short version
          </p>

          <h2
            className="font-body font-medium text-[36px] md:text-[40px] leading-[1.15] tracking-tight mb-10"
            style={{ color: '#1D2020' }}
          >
            How we got here.
          </h2>

          <div>
            {paragraphs.map((p, i) => (
              <AnimatedParagraph key={i} text={p} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

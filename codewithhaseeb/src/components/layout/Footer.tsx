import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { caseStudies } from '@/content/case-studies-meta';

export function Footer() {
  const featured = caseStudies.slice(0, 4);

  return (
    <footer className="bg-[#1A1A1B] text-white" data-role="site-footer">
      <div className="container-tight py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-base font-medium tracking-tight hover:opacity-80 transition">
              codewithhaseeb
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Production AI for funded startups and SMB operations.
            </p>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Remote · UTC+5<br />
              {siteConfig.contact.location}
            </p>
          </div>

          {/* Site */}
          <div>
            <h4 className="text-label mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Site</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/work" className="hover:text-white transition">Work</Link></li>
              <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/resume" className="hover:text-white transition">Resume</Link></li>
            </ul>
          </div>

          {/* Featured Work */}
          <div>
            <h4 className="text-label mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Featured Work</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {featured.map((cs) => (
                <li key={cs.slug}>
                  <Link href={`/work/${cs.slug}`} className="hover:text-white transition">
                    {cs.client}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/work" className="hover:text-white transition underline underline-offset-4">
                  All case studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <h4 className="text-label mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Elsewhere</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.links.upwork} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Upwork (100% JSS)
                </a>
              </li>
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.links.email}`} className="hover:text-white transition">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-12" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <p>© {new Date().getFullYear()} codewithhaseeb. All rights reserved.</p>
          <p className="font-mono text-xs">Built in Islamabad. Code with Haseeb. 2026.</p>
          <Link href="/privacy" className="hover:text-white/60 transition">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

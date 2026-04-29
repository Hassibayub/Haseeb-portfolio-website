'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

import { siteConfig } from '@/lib/siteConfig';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <div
        className={cn(
          'fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-300',
          scrolled && 'top-3'
        )}
      >
        {/* Desktop pill */}
        <nav
          aria-label="Primary"
          className={cn(
            'hidden md:flex items-center gap-1 rounded-full bg-[#2B2D2D] pl-6 pr-2 py-2 text-white transition-shadow duration-300',
            scrolled
              ? 'shadow-[0_8px_32px_-4px_rgb(0_0_0/0.32),0_2px_8px_-2px_rgb(0_0_0/0.16)] backdrop-blur-sm'
              : 'shadow-lg'
          )}
        >
          <Link
            href="/"
            className="text-sm font-medium tracking-tight mr-4 hover:opacity-80 transition"
          >
            codewithhaseeb
          </Link>
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm text-white/90 hover:text-white transition rounded-full hover:bg-white/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={siteConfig.links.calendly}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('book_call_click', { location: 'navbar' })}
            className="group ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:brightness-95 whitespace-nowrap"
            style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
          >
            Book a call
            <ArrowUpRight
              size={14}
              className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Link>
        </nav>

        {/* Mobile pill trigger */}
        <nav
          aria-label="Primary mobile"
          className="flex md:hidden items-center justify-between rounded-full bg-[#2B2D2D] px-5 py-2.5 text-white shadow-lg min-w-[92vw]"
        >
          <Link
            href="/"
            className="text-sm font-medium tracking-tight"
            onClick={() => setMobileOpen(false)}
          >
            codewithhaseeb
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="p-2 -mr-2 rounded-full hover:bg-white/10 transition"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-[#1D2020] pt-24 px-6">
          <ul className="flex flex-col gap-6">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-2xl font-display tracking-tight text-white/80 hover:text-white transition"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href={siteConfig.links.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileOpen(false);
                  trackEvent('book_call_click', { location: 'mobile_nav' });
                }}
                className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors hover:brightness-95"
                style={{ backgroundColor: '#D8F9B8', color: '#1D2020' }}
              >
                Book a call
                <ArrowUpRight
                  size={15}
                  className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

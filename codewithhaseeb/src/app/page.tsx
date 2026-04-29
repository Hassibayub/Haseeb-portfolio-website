import { Hero } from '@/components/sections/Hero';
import { LogoBar } from '@/components/sections/LogoBar';
import { NumbersTicker } from '@/components/sections/NumbersTicker';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { ForFoundersEnterprise } from '@/components/sections/ForFoundersEnterprise';
import { Testimonials } from '@/components/sections/Testimonials';
import { Process } from '@/components/sections/Process';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata = {
  title: 'AI Engineering Team for Funded Startups | codewithhaseeb',
  description:
    'We ship production AI systems. Not demos that break. A 5-person senior engineering team building for YC-backed founders. Aphra (17K users). Capwell. Tula. Sony PlayStation.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoBar />
      <NumbersTicker />
      <ServicesGrid />
      <FeaturedWork />
      <ForFoundersEnterprise />
      <Testimonials />
      <Process />
      <FinalCTA />
    </>
  );
}

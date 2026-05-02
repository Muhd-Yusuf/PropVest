import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { PropertyTypes } from '@/components/sections/PropertyTypes';
import { FeaturedProperties } from '@/components/sections/FeaturedProperties';
import { ReturnsCalculator } from '@/components/sections/ReturnsCalculator';
import { ForDevelopers } from '@/components/sections/ForDevelopers';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { CTASection } from '@/components/sections/CTASection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HowItWorks />
        <PropertyTypes />
        <FeaturedProperties />
        <ReturnsCalculator />
        <ForDevelopers />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

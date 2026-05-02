'use client';

import { motion } from 'framer-motion';
import { Users, Zap, Shield, BarChart3 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Button } from '../ui/Button';
import { developerBenefits } from '@/lib/data';

const icons: Record<string, React.ElementType> = { Users, Zap, Shield, BarChart3 };

export function ForDevelopers() {
  return (
    <SectionWrapper id="for-developers">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <p className="text-royal text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              For Developers
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              Raise capital from{' '}
              <span className="text-royal">your followers</span>
            </h2>
            <p className="text-sm sm:text-base text-text-secondary mt-3 sm:mt-4 leading-relaxed">
              Your followers already want to invest in your properties. We give you the tool to let them do it. Funds go straight to your bank via Paystack — we only take a small platform fee.
            </p>
            <div className="flex gap-4 mt-8">
              <Button href="#cta">Partner With Us</Button>
              <Button variant="ghost" href="#how-it-works">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {developerBenefits.map((benefit, idx) => {
              const Icon = icons[benefit.icon];
              return (
                <motion.div
                  key={benefit.title}
                  className="bg-bg-secondary rounded-xl p-5 border border-border-default hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Icon className="w-6 h-6 text-royal mb-3" strokeWidth={1.5} />
                  <h3 className="font-semibold text-sm text-text-primary mb-1">{benefit.title}</h3>
                  <p className="text-xs text-text-tertiary leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

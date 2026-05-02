'use client';

import { motion } from 'framer-motion';
import { Search, MousePointerClick, CreditCard, TrendingUp } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionWrapper } from '../ui/SectionWrapper';
import { steps } from '@/lib/data';

const icons: Record<string, React.ElementType> = {
  Search,
  MousePointerClick,
  CreditCard,
  TrendingUp,
};

export function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="bg-bg-secondary">
      <Container>
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald text-xs font-semibold tracking-[0.15em] uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Start investing in 4 simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const Icon = icons[step.icon];
            return (
              <motion.div
                key={step.number}
                className="relative text-center md:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <span className="text-sm font-bold text-emerald">Step {step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}

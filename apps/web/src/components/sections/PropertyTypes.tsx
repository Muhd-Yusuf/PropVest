'use client';

import { motion } from 'framer-motion';
import { Home, Hammer, Map } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionWrapper } from '../ui/SectionWrapper';
import { propertyTypes } from '@/lib/data';

const icons: Record<string, React.ElementType> = { Home, Hammer, Map };

const colorMap: Record<string, { bg: string; icon: string }> = {
  rental: { bg: 'bg-emerald/10', icon: 'text-emerald' },
  build_sell: { bg: 'bg-royal/10', icon: 'text-royal' },
  land: { bg: 'bg-amber-500/10', icon: 'text-amber-600' },
};

export function PropertyTypes() {
  return (
    <SectionWrapper id="property-types">
      <Container>
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald text-xs font-semibold tracking-[0.15em] uppercase mb-3">
            Ways To Earn
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Choose your investment strategy
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {propertyTypes.map((pt, idx) => {
            const Icon = icons[pt.icon];
            const color = colorMap[pt.type];
            return (
              <motion.div
                key={pt.type}
                className="bg-white rounded-2xl p-5 sm:p-8 border border-border-default shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${color.icon}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{pt.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">{pt.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                  <div>
                    <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Yield</p>
                    <p className="font-mono font-bold text-emerald mt-0.5">{pt.exampleYield}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Payout</p>
                    <p className="font-semibold text-sm text-text-primary mt-0.5">{pt.payoutFrequency}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}

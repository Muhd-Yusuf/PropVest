'use client';

import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionWrapper } from '../ui/SectionWrapper';
import { testimonials } from '@/lib/data';
import { formatNairaFull } from '@/lib/format';

export function Testimonials() {
  return (
    <SectionWrapper className="bg-bg-secondary">
      <Container>
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-emerald text-xs font-semibold tracking-[0.15em] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Trusted by investors across Nigeria
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-border-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald/15 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-emerald">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-tertiary">{t.role}</p>
                </div>
              </div>

              {/* Quote */}
              <p className="text-sm text-text-secondary leading-relaxed italic mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Stats */}
              <div className="pt-4 border-t border-border-subtle flex items-center gap-4">
                <div>
                  <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Invested</p>
                  <p className="font-mono font-bold text-sm text-emerald">
                    {formatNairaFull(t.invested)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-text-tertiary uppercase tracking-wider">Properties</p>
                  <p className="font-semibold text-sm text-text-primary">{t.properties}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

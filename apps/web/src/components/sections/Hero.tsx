'use client';

import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { CountUp } from '../ui/CountUp';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-midnight to-midnight-light overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald/15 rounded-full blur-[120px]" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-royal/10 rounded-full blur-[100px]" />
      </div>

      <Container className="relative z-10 pt-24 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-3xl">
          {/* Overline */}
          <motion.p
            className="text-emerald text-xs font-semibold tracking-[0.15em] uppercase mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fractional Real Estate Investing
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Own Nigerian Real Estate{' '}
            <br className="hidden sm:block" />
            <span className="text-emerald font-mono">From ₦100,000</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/60 mt-4 sm:mt-6 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Invest in verified properties by trusted developers. Earn quarterly rent. Sell anytime.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" href="#cta">
              Start Investing
            </Button>
            <Button variant="outline-light" size="lg" href="#how-it-works">
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap gap-3 sm:gap-6 md:gap-10 mt-8 sm:mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <StatItem prefix="₦" end={450} suffix="M+" label="Managed" />
            <StatItem end={1200} suffix="+" label="Investors" />
            <StatItem label="Avg Yield" staticValue="8-12%" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function StatItem({
  end,
  prefix,
  suffix,
  label,
  staticValue,
}: {
  end?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  staticValue?: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 sm:px-5 sm:py-3">
      <p className="font-mono font-bold text-base sm:text-xl md:text-2xl text-white">
        {staticValue ? (
          staticValue
        ) : (
          <CountUp end={end!} prefix={prefix} suffix={suffix} />
        )}
      </p>
      <p className="text-xs text-white/50 mt-1">{label}</p>
    </div>
  );
}

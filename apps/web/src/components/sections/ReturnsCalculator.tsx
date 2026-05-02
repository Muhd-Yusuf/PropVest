'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CalendarDays, Wallet } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionWrapper } from '../ui/SectionWrapper';
import { formatNairaFull } from '@/lib/format';

type InvestmentType = 'rental' | 'build_sell' | 'land';

const typeOptions: { key: InvestmentType; label: string }[] = [
  { key: 'rental', label: 'Rental' },
  { key: 'build_sell', label: 'Build & Sell' },
  { key: 'land', label: 'Land' },
];

function calculateReturns(amount: number, type: InvestmentType) {
  switch (type) {
    case 'rental':
      return {
        annualReturn: Math.round(amount * 0.1),
        quarterlyPayout: Math.round(amount * 0.1 / 4),
        label: 'Annual Return (10% avg)',
        sublabel: 'Quarterly Payout',
        period: 'per year',
      };
    case 'build_sell':
      return {
        annualReturn: Math.round(amount * 0.4),
        quarterlyPayout: 0,
        label: 'Projected Profit (~40%)',
        sublabel: 'Timeline',
        period: 'over 18 months',
      };
    case 'land':
      return {
        annualReturn: Math.round(amount * 0.2),
        quarterlyPayout: 0,
        label: 'Annual Appreciation (~20%)',
        sublabel: 'Value After 1 Year',
        period: 'per year',
      };
  }
}

export function ReturnsCalculator() {
  const [amount, setAmount] = useState(500_000);
  const [type, setType] = useState<InvestmentType>('rental');

  const returns = calculateReturns(amount, type);

  return (
    <SectionWrapper id="returns-calculator" className="bg-gradient-to-br from-midnight to-midnight-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <p className="text-emerald text-xs font-semibold tracking-[0.15em] uppercase mb-3">
              Returns Calculator
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              See what your money could earn
            </h2>
            <p className="text-sm sm:text-base text-white/50 mt-3 sm:mt-4 leading-relaxed">
              Adjust the slider and select a property type to see projected returns. These are estimates based on average historical performance.
            </p>
          </div>

          {/* Right — Calculator */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
            {/* Amount Slider */}
            <div className="mb-8">
              <label className="text-sm text-white/60 mb-3 block">Investment Amount</label>
              <p className="font-mono font-bold text-2xl sm:text-3xl text-emerald mb-4">
                {formatNairaFull(amount)}
              </p>
              <input
                type="range"
                min={100_000}
                max={10_000_000}
                step={100_000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-emerald
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald [&::-webkit-slider-thumb]:shadow-lg"
              />
              <div className="flex justify-between text-xs text-white/40 mt-2">
                <span>₦100K</span>
                <span>₦10M</span>
              </div>
            </div>

            {/* Type Toggle */}
            <div className="mb-8">
              <label className="text-sm text-white/60 mb-3 block">Property Type</label>
              <div className="flex gap-2">
                {typeOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setType(opt.key)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      type === opt.key
                        ? 'bg-emerald text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <motion.div
                key={`${amount}-${type}`}
                className="bg-white/5 rounded-xl p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {returns.label}
                </div>
                <p className="font-mono font-bold text-2xl text-emerald">
                  {formatNairaFull(returns.annualReturn)}
                </p>
                <p className="text-xs text-white/40 mt-1">{returns.period}</p>
              </motion.div>

              {type === 'rental' && returns.quarterlyPayout > 0 && (
                <motion.div
                  className="bg-white/5 rounded-xl p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <Wallet className="w-3.5 h-3.5" />
                    {returns.sublabel}
                  </div>
                  <p className="font-mono font-bold text-xl text-white">
                    {formatNairaFull(returns.quarterlyPayout)}
                  </p>
                  <p className="text-xs text-white/40 mt-1">every 3 months</p>
                </motion.div>
              )}

              {type === 'land' && (
                <motion.div
                  className="bg-white/5 rounded-xl p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {returns.sublabel}
                  </div>
                  <p className="font-mono font-bold text-xl text-white">
                    {formatNairaFull(amount + returns.annualReturn)}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

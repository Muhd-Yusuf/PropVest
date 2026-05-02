'use client';

import { motion } from 'framer-motion';

export function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  return (
    <div className={`h-1.5 bg-bg-tertiary rounded-full overflow-hidden ${className || ''}`}>
      <motion.div
        className="h-full bg-emerald rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.round(progress * 100)}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      />
    </div>
  );
}

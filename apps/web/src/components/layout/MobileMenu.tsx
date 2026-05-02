'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { navLinks } from '@/lib/constants';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-64 sm:w-72 bg-midnight z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="p-2 text-white/70 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-1 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="py-3 text-lg font-medium text-white/80 hover:text-emerald transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-auto p-6">
              <Button size="lg" className="w-full" href="#cta" onClick={onClose}>
                Get Started
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

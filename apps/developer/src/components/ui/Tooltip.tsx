'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div
        className={clsx(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 text-xs font-medium text-white bg-midnight rounded-md shadow-md whitespace-nowrap pointer-events-none transition-opacity duration-150 z-50',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-midnight" />
      </div>
    </div>
  );
}

import { clsx } from 'clsx';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-border-default p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}

import { clsx } from 'clsx';

interface ProgressBarProps {
  progress?: number;
  value?: number;
  className?: string;
}

export function ProgressBar({ progress, value, className }: ProgressBarProps) {
  const raw = value !== undefined ? value / 100 : (progress ?? 0);
  const clampedProgress = Math.min(1, Math.max(0, raw));

  return (
    <div className={clsx('w-full bg-bg-tertiary h-2 rounded-full overflow-hidden', className)}>
      <div
        className="bg-emerald h-full rounded-full transition-all duration-300"
        style={{ width: `${clampedProgress * 100}%` }}
      />
    </div>
  );
}

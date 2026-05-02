import { clsx } from 'clsx';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <div className={clsx('w-full bg-bg-tertiary h-2 rounded-full overflow-hidden', className)}>
      <div
        className="bg-emerald h-full rounded-full transition-all duration-300"
        style={{ width: `${clampedProgress * 100}%` }}
      />
    </div>
  );
}

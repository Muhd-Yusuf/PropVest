import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer';

  const variants: Record<Variant, string> = {
    primary: 'bg-emerald text-white hover:bg-emerald-dark shadow-md hover:shadow-lg',
    secondary:
      'bg-transparent border-2 border-border-default text-text-primary hover:bg-bg-tertiary',
    ghost: 'bg-transparent text-text-secondary hover:bg-bg-tertiary',
    'outline-light':
      'bg-transparent border-2 border-white/30 text-white hover:bg-white/10',
  };

  const sizes: Record<Size, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-5 text-[15px]',
    lg: 'h-13 px-7 text-base',
  };

  const cls = clsx(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

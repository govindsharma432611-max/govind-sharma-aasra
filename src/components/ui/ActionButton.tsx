import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utilities';

interface ActionButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'secondary-dark';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  to,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ariaLabel,
}) => {
  const base =
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-wide transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-4 py-2 text-xs min-h-[40px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
    lg: 'px-7 py-3.5 text-sm min-h-[48px]',
  };

  const variants = {
    primary:
      'bg-[#6327FB] text-white hover:bg-[#1D0D42] hover:shadow-[0_12px_28px_-8px_rgba(99,39,251,0.45)]',
    secondary:
      'bg-transparent border border-[#050404]/20 text-[#050404] hover:border-[#6327FB] hover:text-[#6327FB] hover:bg-[#1D0D42]/5',
    'secondary-dark':
      'bg-transparent border border-white/25 text-white hover:border-[#A786FC] hover:bg-white/10',
  };

  const content = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
          variant === 'primary'
            ? 'bg-white/15 text-white'
            : variant === 'secondary-dark'
            ? 'bg-white/10 text-white'
            : 'bg-[#1D0D42]/8 text-[#1D0D42] group-hover:bg-[#6327FB]/10 group-hover:text-[#6327FB]'
        )}
      >
        <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
    </>
  );

  const classes = cn(base, sizes[size], variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
};

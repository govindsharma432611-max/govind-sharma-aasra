import React from 'react';
import { cn } from '../../lib/utilities';

interface AasraLogoProps {
  variant?: 'dark' | 'light';
  showText?: boolean;
  className?: string;
}

export const AasraLogo: React.FC<AasraLogoProps> = ({
  variant = 'dark',
  showText = true,
  className,
}) => {
  const isLight = variant === 'light';
  return (
    <span className={cn('inline-flex items-center gap-2.5 whitespace-nowrap shrink-0', className)}>
      <span
        className={cn(
          'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 p-1',
          isLight ? 'bg-white/10 border border-white/15' : 'bg-[#EAEAEA]/60 border border-[#050404]/10'
        )}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 512 512"
          fill="none"
          aria-hidden="true"
          className="w-full h-full"
        >
          <path
            d="M214 148C144 170 96 208 66 250C54 316 74 398 138 446C200 492 278 468 322 392C274 428 206 426 164 384C116 336 120 236 214 148Z"
            fill="#CFD2D9"
          />
          <path
            d="M214 148C136 218 118 326 166 382C206 426 274 428 322 392C282 454 206 476 146 438C92 404 72 328 84 268C116 218 160 176 214 148Z"
            fill="#FFFFFF"
          />
          <path
            d="M214 148C144 170 96 208 66 250C54 316 74 398 138 446C200 492 278 468 322 392C274 428 206 426 164 384C116 336 120 236 214 148Z"
            fill="none"
            stroke="#050404"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M66 250C72 135 164 62 272 68C376 74 446 154 442 268C439 354 388 438 296 484C352 408 386 324 374 242C362 162 296 122 214 148C144 170 96 208 66 250Z"
            fill="#3D63F2"
            stroke="#050404"
            strokeWidth="8"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showText && (
        <span
          className={cn(
            'font-display font-bold tracking-tight text-lg leading-none',
            isLight ? 'text-white' : 'text-[#050404]'
          )}
        >
          AASRA <span className={isLight ? 'text-[#A786FC] font-medium' : 'text-[#6327FB] font-medium'}>Web Devs</span>
        </span>
      )}
    </span>
  );
};

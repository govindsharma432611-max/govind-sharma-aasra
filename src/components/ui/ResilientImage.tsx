import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { assetUrl, cn } from '../../lib/utilities';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClass?: string;
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className,
  aspectClass = 'aspect-[4/3]',
  priority = false,
}) => {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = assetUrl(src);

  if (failed || !resolvedSrc) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'relative flex flex-col items-center justify-center bg-[#1D0D42] text-white p-6 text-center overflow-hidden',
          aspectClass,
          className
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 25%, #6327FB 0%, transparent 60%)',
          }}
        />
        <Layers className="w-8 h-8 text-[#A786FC] mb-2 relative z-10" />
        <p className="font-display text-xs uppercase tracking-widest text-white/80 relative z-10 max-w-xs">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-[#EAEAEA]', aspectClass, className)}>
      <img
        src={resolvedSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

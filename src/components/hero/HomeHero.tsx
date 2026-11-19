import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Smartphone, Sparkles, Terminal } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { ResilientImage } from '../ui/ResilientImage';
import { isTouchDevice, prefersReducedMotion } from '../../lib/utilities';

const PREVIEW_MODES = [
  {
    id: 'web',
    label: 'Web Platforms',
    icon: Layers,
    caption: 'Custom Websites & Installable PWAs',
    image: '/src/assets/images/hero_studio_showcase_1795014320813.jpg',
    alt: 'AASRA Web Devs floating digital studio interface frames on white stage',
  },
  {
    id: 'app',
    label: 'Applications',
    icon: Smartphone,
    caption: 'Cross-Platform & Mobile-First Software',
    image: '/src/assets/images/case_mobile_app_1795014320945.jpg',
    alt: 'Smartphone interface showing mobile workspace application in dark purple and white',
  },
  {
    id: 'brand',
    label: 'Brand Systems',
    icon: Sparkles,
    caption: 'Logo, Typography & Promotional Direction',
    image: '/src/assets/images/case_brand_identity_1795014322320.jpg',
    alt: 'Bespoke brand stationery and typography specimen flat-lay',
  },
  {
    id: 'ai',
    label: 'AI & Workflows',
    icon: Terminal,
    caption: 'Guarded AI Agents & Business Workflows',
    image: '/src/assets/images/case_ai_automation_1795014319906.jpg',
    alt: 'Modular frosted glass and deep purple nodes representing AI workflow architecture',
  },
] as const;

export const HomeHero: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [enableCursorEffect, setEnableCursorEffect] = useState(false);

  useEffect(() => {
    setEnableCursorEffect(!isTouchDevice() && !prefersReducedMotion());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableCursorEffect || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 6,
      rotateY: x * 6,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const current = PREVIEW_MODES[activeIdx];

  return (
    <section className="relative bg-white text-[#050404] pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle localized Lavender ambient light (non-interactive) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] w-[520px] h-[520px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #A786FC 0%, #6327FB 45%, transparent 75%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Editorial Hero Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-[#6327FB]">
              AASRA Web Devs · Digital Studio &amp; Growth Partner
            </p>

            <motion.h1
              initial={prefersReducedMotion() ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-[68px] font-bold tracking-tight leading-[0.98] text-[#1D0D42]"
            >
              WE BUILD.
              <br />
              WE BRAND.
              <br />
              <span className="text-[#6327FB]">WE GROW.</span>
            </motion.h1>

            <p className="font-display text-xl sm:text-2xl font-medium text-[#050404] leading-snug max-w-xl">
              Your ideas deserve more than an ordinary digital presence.
            </p>

            <p className="text-base sm:text-lg text-[#050404]/75 leading-relaxed max-w-xl">
              We combine technology, design, marketing, and intelligent automation to help businesses build stronger brands and achieve sustainable digital growth.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <ActionButton to="/contact" size="lg">
                START A PROJECT
              </ActionButton>
              <ActionButton to="/work" variant="secondary" size="lg">
                EXPLORE OUR WORK
              </ActionButton>
            </div>

            <div className="pt-4 border-t border-[#050404]/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-display font-medium text-[#050404]/65">
              <span>Development</span>
              <span aria-hidden="true">·</span>
              <span>Creative &amp; Branding</span>
              <span aria-hidden="true">·</span>
              <span>Marketing &amp; Growth</span>
              <span aria-hidden="true">·</span>
              <span>AI, Data &amp; Automation</span>
            </div>
          </div>

          {/* Right: Cursor-Responsive Showcase Frame */}
          <div className="lg:col-span-6">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: enableCursorEffect
                  ? `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
                  : undefined,
                transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="rounded-2xl border border-[#1D0D42]/12 bg-[#EAEAEA]/45 p-3 sm:p-4 shadow-[0_24px_60px_-24px_rgba(29,13,66,0.22)]"
            >
              {/* Interactive Discipline Switcher */}
              <div
                role="tablist"
                aria-label="AASRA capability preview"
                className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1.5 p-1.5 rounded-xl bg-white border border-[#050404]/8 mb-3"
              >
                {PREVIEW_MODES.map((mode, idx) => {
                  const Icon = mode.icon;
                  const active = idx === activeIdx;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveIdx(idx)}
                      className={`min-h-[40px] px-2.5 py-2 rounded-lg font-display text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#1D0D42] text-white'
                          : 'text-[#050404]/70 hover:text-[#1D0D42] hover:bg-[#EAEAEA]/60'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{mode.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-xl overflow-hidden bg-white border border-[#050404]/8">
                <ResilientImage
                  src={current.image}
                  alt={current.alt}
                  aspectClass="aspect-[16/10]"
                  priority
                />
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-white">
                  <div>
                    <p className="font-display text-xs font-semibold uppercase tracking-wider text-[#6327FB]">
                      {current.label}
                    </p>
                    <p className="font-display text-sm sm:text-base font-semibold text-[#1D0D42] mt-0.5">
                      {current.caption}
                    </p>
                  </div>
                  <span className="font-display text-xs font-semibold text-[#050404]/50 tabular-nums shrink-0">
                    0{activeIdx + 1} / 04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

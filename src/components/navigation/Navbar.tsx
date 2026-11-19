import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Download, Menu, X } from 'lucide-react';
import { PRIMARY_NAV_LINKS } from '../../data/navigation';
import { AasraLogo } from '../ui/AasraLogo';
import { ActionButton } from '../ui/ActionButton';
import { usePWA } from '../pwa/PWAContext';
import { cn } from '../../lib/utilities';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { isInstalled, canPromptNatively, isIOS, openInstallModal, triggerNativeInstall } = usePWA();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleInstallAction = async () => {
    if (canPromptNatively) {
      await triggerNativeInstall();
    } else {
      openInstallModal();
    }
  };

  // Show Install App trigger whenever not already installed in standalone mode
  const showInstallControl = !isInstalled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b',
        scrolled
          ? 'bg-white/92 backdrop-blur-md border-[#050404]/10 shadow-[0_8px_24px_-12px_rgba(29,13,66,0.12)]'
          : 'bg-white/80 backdrop-blur-sm border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-8 xl:px-12 h-16 lg:h-20 flex items-center justify-between gap-4 xl:gap-6">
        {/* Left: AASRA Web Devs Logo */}
        <Link to="/" aria-label="AASRA Web Devs home" className="shrink-0 focus-visible:rounded-md">
          <AasraLogo variant="dark" />
        </Link>

        {/* Center: Desktop Horizontal Nav */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-4 xl:gap-7">
          {PRIMARY_NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative py-1.5 font-display text-sm font-medium whitespace-nowrap shrink-0 transition-colors',
                  isActive ? 'text-[#6327FB]' : 'text-[#050404]/80 hover:text-[#1D0D42]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#6327FB] transition-transform duration-200 origin-left',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: Contact, Start a Project, Install App */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-4 shrink-0">
          {showInstallControl && (
            <button
              type="button"
              onClick={handleInstallAction}
              aria-label={isIOS ? 'Install AASRA app on iOS' : 'Install AASRA Web App'}
              className="inline-flex items-center gap-1.5 px-3 xl:px-3.5 py-2 min-h-[40px] rounded-full border border-[#1D0D42]/20 text-xs font-display font-semibold text-[#1D0D42] hover:border-[#6327FB] hover:text-[#6327FB] hover:bg-[#1D0D42]/5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Install App</span>
            </button>
          )}
          <Link
            to="/contact"
            className="hidden xl:inline-block font-display text-sm font-medium text-[#050404]/80 hover:text-[#6327FB] transition-colors whitespace-nowrap shrink-0"
          >
            Contact Us
          </Link>
          <ActionButton to="/contact" size="sm">
            Start a Project
          </ActionButton>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#1D0D42] hover:bg-[#EAEAEA] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-In Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-white border-b border-[#050404]/10 shadow-xl px-5 pt-3 pb-7"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#EAEAEA]">
              {PRIMARY_NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'min-h-[48px] flex items-center justify-between font-display text-base font-medium',
                      isActive ? 'text-[#6327FB]' : 'text-[#050404]'
                    )
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <Link
                to="/process"
                className="min-h-[48px] flex items-center font-display text-base font-medium text-[#050404]"
              >
                Our Process
              </Link>
              <Link
                to="/contact"
                className="min-h-[48px] flex items-center font-display text-base font-medium text-[#050404]"
              >
                Contact Us
              </Link>
            </nav>

            <div className="mt-5 flex flex-col gap-3">
              <ActionButton to="/contact" size="md" className="w-full">
                Start a Project
              </ActionButton>
              {showInstallControl && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleInstallAction();
                  }}
                  className="w-full min-h-[48px] rounded-full border border-[#1D0D42]/25 text-[#1D0D42] font-display text-sm font-semibold inline-flex items-center justify-center gap-2 hover:bg-[#EAEAEA]/60 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Install AASRA App</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

import React from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import { usePWA } from './PWAContext';

export const PWAStatusBanners: React.FC = () => {
  const { isOnline, updateAvailable, applyAppUpdate } = usePWA();

  return (
    <>
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 rounded-full bg-[#1D0D42] text-white px-4 py-2.5 text-xs font-medium shadow-xl border border-[#A786FC]/30"
        >
          <WifiOff className="w-4 h-4 text-[#A786FC]" aria-hidden="true" />
          <span>Offline Mode — Viewing cached AASRA pages</span>
        </div>
      )}

      {updateAvailable && (
        <div
          role="alert"
          className="fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-2xl bg-[#1D0D42] text-white px-4 py-3 text-xs shadow-2xl border border-[#A786FC]/30 max-w-sm"
        >
          <div className="flex-1">
            <p className="font-display font-semibold text-sm">New version ready</p>
            <p className="text-white/75 mt-0.5">Update AASRA to load the latest improvements.</p>
          </div>
          <button
            type="button"
            onClick={applyAppUpdate}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#6327FB] hover:bg-[#A786FC] hover:text-[#1D0D42] px-3.5 py-2 font-display font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            UPDATE APP
          </button>
        </div>
      )}
    </>
  );
};

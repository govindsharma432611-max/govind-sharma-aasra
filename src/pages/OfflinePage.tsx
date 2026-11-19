import React, { useEffect } from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import { AasraLogo } from '../components/ui/AasraLogo';
import { ActionButton } from '../components/ui/ActionButton';
import { applyDocumentMetadata } from '../lib/metadata';

export const OfflinePage: React.FC = () => {
  useEffect(() => {
    applyDocumentMetadata({
      title: 'Offline — AASRA Web Devs',
      description: 'You are currently offline. Reconnect to load new AASRA Web Devs pages.',
      path: '/offline',
    });
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <section className="min-h-[80vh] bg-white text-[#050404] flex items-center justify-center px-5 pt-28 pb-20">
      <div className="max-w-lg w-full rounded-2xl border border-[#1D0D42]/12 bg-[#EAEAEA]/45 p-8 sm:p-10 text-center space-y-6">
        <div className="flex justify-center">
          <AasraLogo variant="dark" />
        </div>

        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1D0D42] text-[#A786FC] flex items-center justify-center">
          <WifiOff className="w-7 h-7" aria-hidden="true" />
        </div>

        <div className="space-y-2.5">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1D0D42]">
            You&apos;re currently offline.
          </h1>
          <p className="text-sm sm:text-base text-[#050404]/75 leading-relaxed">
            It looks like your internet connection dropped. Previously visited public AASRA pages remain accessible from cache, while live pages and enquiry submissions require an active connection.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 rounded-full bg-[#6327FB] text-white px-6 py-3 min-h-[44px] font-display text-sm font-semibold hover:bg-[#1D0D42] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Retry Connection</span>
          </button>
          <ActionButton to="/" variant="secondary" size="md">
            Home
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

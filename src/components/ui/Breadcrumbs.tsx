import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; dark?: boolean }> = ({ items, dark = false }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={`flex flex-wrap items-center gap-1.5 text-xs font-medium ${dark ? 'text-white/70' : 'text-[#050404]/60'}`}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className={`transition-colors ${dark ? 'hover:text-white' : 'hover:text-[#6327FB]'}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? (dark ? 'text-[#A786FC]' : 'text-[#1D0D42]') : undefined} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

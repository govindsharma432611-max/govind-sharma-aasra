import React, { useEffect } from 'react';
import { LegalDocumentData } from '../../data/legal';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { ActionButton } from '../ui/ActionButton';
import { applyDocumentMetadata } from '../../lib/metadata';

export const LegalPageTemplate: React.FC<{ doc: LegalDocumentData }> = ({ doc }) => {
  useEffect(() => {
    applyDocumentMetadata({
      title: `${doc.title} — AASRA Web Devs`,
      description: doc.subtitle,
      path: `/${doc.slug}`,
    });
  }, [doc]);

  return (
    <article className="bg-white text-[#050404]">
      {/* Header Band */}
      <section className="bg-[#EAEAEA]/60 border-b border-[#050404]/10 pt-28 pb-14 lg:pt-36 lg:pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: doc.title }]} />
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#1D0D42] max-w-3xl">
            {doc.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            {doc.subtitle}
          </p>
          <p className="mt-4 text-xs font-display font-medium uppercase tracking-wider text-[#6327FB]">
            {doc.lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Content + Table of Contents */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/40 p-6">
              <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-[#1D0D42] mb-4">
                Table of Contents
              </h2>
              <nav aria-label={`${doc.title} sections`}>
                <ul className="space-y-2.5">
                  {doc.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-baseline gap-2.5 text-sm text-[#050404]/75 hover:text-[#6327FB] transition-colors"
                      >
                        <span className="font-display text-xs font-semibold text-[#6327FB] tabular-nums">
                          {section.number}.
                        </span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Numbered Sections */}
          <div className="lg:col-span-8 space-y-10">
            <div className="rounded-xl border border-[#1D0D42]/15 bg-[#1D0D42]/[0.03] p-5 text-sm text-[#050404]/80 leading-relaxed">
              <strong className="font-display text-[#1D0D42]">Editorial &amp; Legal Review Note: </strong>
              {doc.reviewNotice}
            </div>

            <div className="divide-y divide-[#050404]/10">
              {doc.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="py-8 first:pt-0 scroll-mt-28"
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-display text-sm font-bold text-[#6327FB] tabular-nums">
                      {section.number}.
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-[#1D0D42] tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-3.5 text-base text-[#050404]/80 leading-relaxed max-w-prose">
                    {section.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="pt-8 border-t border-[#050404]/10 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-[#050404]/70">
                Questions regarding this policy? Reach out through our enquiry page.
              </p>
              <ActionButton to="/contact" variant="secondary" size="sm">
                Contact AASRA
              </ActionButton>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

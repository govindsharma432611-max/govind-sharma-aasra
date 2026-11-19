import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PortfolioCategory, PROJECTS } from '../data/projects';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ResilientImage } from '../components/ui/ResilientImage';
import { ActionButton } from '../components/ui/ActionButton';
import { applyDocumentMetadata } from '../lib/metadata';

export const WorkPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('All Projects');

  useEffect(() => {
    applyDocumentMetadata({
      title: 'Selected Work & Case Studies — AASRA Web Devs',
      description:
        'Explore AASRA Web Devs architecture showcases and creative case studies across Websites, Applications, Branding, Creative Design, Marketing, and AI & Automation.',
      path: '/work',
    });
  }, []);

  const filteredProjects =
    activeCategory === 'All Projects'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white text-[#050404]">
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-18 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Work' }]} />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            Portfolio &amp; Capability Blueprints
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl">
            IDEAS TURNED INTO EXPERIENCES.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            Explore our studio blueprints across web engineering, applications, visual identity, creative design, marketing frameworks, and AI automation.
          </p>

          {/* Category Filters */}
          <div
            role="tablist"
            aria-label="Filter portfolio projects by category"
            className="mt-8 flex flex-wrap gap-2"
          >
            {PORTFOLIO_CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 min-h-[44px] rounded-full font-display text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#6327FB] text-white'
                      : 'bg-[#EAEAEA]/70 text-[#050404]/75 hover:bg-[#EAEAEA] hover:text-[#1D0D42]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-[#050404]/10 p-12 text-center">
              <p className="font-display text-xl font-semibold text-[#1D0D42]">
                No showcases match this filter yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              {filteredProjects.map((project, idx) => {
                // Asymmetrical rhythm on desktop: alternating 7 / 5 spans
                const spanClass =
                  filteredProjects.length > 1
                    ? idx % 4 === 0 || idx % 4 === 3
                      ? 'lg:col-span-7'
                      : 'lg:col-span-5'
                    : 'lg:col-span-12';

                return (
                  <article
                    key={project.slug}
                    className={`${spanClass} group rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/40 overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(29,13,66,0.22)]`}
                  >
                    <div className="overflow-hidden bg-white">
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        aspectClass="aspect-[16/10]"
                        className="group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 sm:p-8 bg-white flex-1 flex flex-col justify-between gap-5">
                      <div>
                        <p className="text-xs font-display font-semibold uppercase tracking-wider text-[#6327FB]">
                          {project.projectTypeLabel}
                        </p>
                        <h2 className="mt-2 font-display text-2xl font-bold text-[#1D0D42]">
                          {project.title}
                        </h2>
                        <p className="mt-2.5 text-sm sm:text-base text-[#050404]/75 leading-relaxed">
                          {project.shortDescription}
                        </p>
                      </div>
                      <div>
                        <Link
                          to={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[#1D0D42] hover:text-[#6327FB] transition-colors min-h-[44px]"
                        >
                          <span>View Project</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#1D0D42] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-5 text-center space-y-5">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Want to Build Something Tailored to Your Brand?
          </h2>
          <ActionButton to="/contact" size="lg">
            START A PROJECT
          </ActionButton>
        </div>
      </section>
    </div>
  );
};

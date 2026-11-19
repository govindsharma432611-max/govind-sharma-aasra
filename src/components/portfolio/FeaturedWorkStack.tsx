import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import { ResilientImage } from '../ui/ResilientImage';
import { ActionButton } from '../ui/ActionButton';
import { prefersReducedMotion } from '../../lib/utilities';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedWorkStack: React.FC = () => {
  const stackContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.aasra-stack-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.72,
          scrollTrigger: {
            trigger: card,
            start: 'top 140px',
            end: 'bottom 140px',
            scrub: true,
          },
        });
      });
    }, stackContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white text-[#050404] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#050404]/10">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
              Selected Work &amp; Blueprints
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1D0D42]">
              IDEAS TURNED INTO EXPERIENCES.
            </h2>
          </div>
          <ActionButton to="/work" variant="secondary">
            View All Case Studies
          </ActionButton>
        </div>

        {/* Desktop Layered Card Stack */}
        <div ref={stackContainerRef} className="hidden lg:block mt-12 space-y-10">
          {PROJECTS.map((project, index) => {
            const isOdd = index % 2 === 0;
            return (
              <div
                key={project.slug}
                style={{ top: `${104 + index * 14}px` }}
                className="aasra-stack-card sticky rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/60 backdrop-blur-sm p-8 shadow-[0_20px_50px_-24px_rgba(29,13,66,0.18)]"
              >
                <div className="grid grid-cols-12 gap-8 items-center">
                  <div className={isOdd ? 'col-span-7' : 'col-span-5 order-2'}>
                    <div className="rounded-xl overflow-hidden border border-[#050404]/8 bg-white">
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        aspectClass="aspect-[16/10]"
                      />
                    </div>
                  </div>
                  <div className={isOdd ? 'col-span-5 space-y-4' : 'col-span-7 order-1 space-y-4'}>
                    <div className="flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-wider text-[#6327FB]">
                      <span className="tabular-nums">0{index + 1}</span>
                      <span aria-hidden="true">/</span>
                      <span>{project.projectTypeLabel}</span>
                    </div>
                    <h3 className="font-display text-3xl font-bold tracking-tight text-[#1D0D42]">
                      {project.title}
                    </h3>
                    <p className="text-base text-[#050404]/75 leading-relaxed">
                      {project.shortDescription}
                    </p>
                    <ul className="space-y-1.5 text-sm text-[#050404]/70 pt-1">
                      {project.deliverables.slice(0, 3).map((d) => (
                        <li key={d} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6327FB]" aria-hidden="true" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3">
                      <Link
                        to={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#1D0D42] hover:text-[#6327FB] transition-colors"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Clean Vertical Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 lg:hidden">
          {PROJECTS.map((project, index) => (
            <article
              key={project.slug}
              className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/50 overflow-hidden flex flex-col"
            >
              <ResilientImage
                src={project.image}
                alt={project.imageAlt}
                aspectClass="aspect-[4/3]"
              />
              <div className="p-6 flex-1 flex flex-col justify-between gap-4 bg-white">
                <div>
                  <p className="text-xs font-display font-semibold uppercase tracking-wider text-[#6327FB]">
                    0{index + 1} · {project.projectTypeLabel}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-[#1D0D42]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#050404]/75 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
                <Link
                  to={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[#6327FB] min-h-[44px]"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

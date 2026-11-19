import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { getProjectBySlug, PROJECTS } from '../data/projects';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ResilientImage } from '../components/ui/ResilientImage';
import { ActionButton } from '../components/ui/ActionButton';
import { applyDocumentMetadata } from '../lib/metadata';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    if (project) {
      applyDocumentMetadata({
        title: `${project.title} — Case Study | AASRA Web Devs`,
        description: project.shortDescription,
        path: `/work/${project.slug}`,
      });
    }
  }, [project]);

  if (!project) {
    return (
      <section className="pt-36 pb-24 max-w-4xl mx-auto px-5 text-center space-y-5">
        <h1 className="font-display text-4xl font-bold text-[#1D0D42]">Case Study Not Found</h1>
        <ActionButton to="/work">Back to Portfolio</ActionButton>
      </section>
    );
  }

  const related = PROJECTS.filter((p) => project.relatedSlugs.includes(p.slug));

  return (
    <article className="bg-white text-[#050404]">
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Work', to: '/work' },
              { label: project.title },
            ]}
          />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            {project.projectTypeLabel}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            {project.shortDescription}
          </p>

          <div className="mt-10 rounded-2xl overflow-hidden border border-[#050404]/10">
            <ResilientImage
              src={project.image}
              alt={project.imageAlt}
              aspectClass="aspect-[16/9]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1D0D42]">Project Overview</h2>
              <p className="mt-3 text-base text-[#050404]/80 leading-relaxed">{project.overview}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1D0D42]">Challenge</h2>
              <p className="mt-3 text-base text-[#050404]/80 leading-relaxed">{project.challenge}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1D0D42]">Strategy</h2>
              <p className="mt-3 text-base text-[#050404]/80 leading-relaxed">{project.strategy}</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1D0D42]">Execution</h2>
              <p className="mt-3 text-base text-[#050404]/80 leading-relaxed">{project.execution}</p>
            </div>

            {/* Project Gallery */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#1D0D42]">Project Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {project.galleryCaptions.map((caption) => (
                  <figure key={caption} className="rounded-2xl border border-[#050404]/10 overflow-hidden bg-[#EAEAEA]/40">
                    <ResilientImage src={project.image} alt={caption} aspectClass="aspect-[4/3]" />
                    <figcaption className="p-4 text-xs text-[#050404]/75 bg-white">{caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Deliverables & Results Note */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/45 p-6 space-y-4">
              <h2 className="font-display text-lg font-bold text-[#1D0D42]">Deliverables</h2>
              <ul className="space-y-2.5 text-sm text-[#050404]/80">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#6327FB] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#1D0D42] text-white p-6 space-y-3">
              <h2 className="font-display text-lg font-bold text-[#A786FC]">Results &amp; Transparency</h2>
              <p className="text-sm text-white/80 leading-relaxed">{project.resultsNote}</p>
              <div className="pt-2">
                <ActionButton to="/contact" size="sm">
                  Discuss Similar Scope
                </ActionButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[#EAEAEA]/55 py-16 border-t border-[#050404]/8">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="font-display text-2xl font-bold text-[#1D0D42] mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/work/${rel.slug}`}
                  className="rounded-2xl border border-[#050404]/10 bg-white p-6 flex items-center justify-between gap-4 hover:border-[#6327FB] transition-colors"
                >
                  <div>
                    <p className="text-xs font-display font-semibold uppercase tracking-wider text-[#6327FB]">
                      {rel.projectTypeLabel}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-[#1D0D42]">
                      {rel.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#6327FB] shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

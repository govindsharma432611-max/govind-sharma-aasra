import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ARTICLES, getArticleBySlug } from '../data/articles';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ResilientImage } from '../components/ui/ResilientImage';
import { ActionButton } from '../components/ui/ActionButton';
import { applyDocumentMetadata } from '../lib/metadata';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  useEffect(() => {
    if (article) {
      applyDocumentMetadata({
        title: `${article.title} — AASRA Insights`,
        description: article.excerpt,
        path: `/insights/${article.slug}`,
      });
    }
  }, [article]);

  if (!article) {
    return (
      <section className="pt-36 pb-24 max-w-4xl mx-auto px-5 text-center space-y-5">
        <h1 className="font-display text-4xl font-bold text-[#1D0D42]">Article Not Found</h1>
        <ActionButton to="/insights">Back to Insights</ActionButton>
      </section>
    );
  }

  const otherArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="bg-white text-[#050404]">
      <section className="pt-28 pb-10 lg:pt-36 lg:pb-14 border-b border-[#050404]/10">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Insights', to: '/insights' },
              { label: article.category },
            ]}
          />
          <div className="flex flex-wrap items-center gap-2 text-xs font-display text-[#050404]/65">
            <span className="font-semibold text-[#6327FB] uppercase tracking-wider">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1D0D42] leading-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-[#050404]/75 leading-relaxed">{article.excerpt}</p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-10">
          <div className="rounded-2xl overflow-hidden border border-[#050404]/10">
            <ResilientImage
              src={article.coverImage}
              alt={article.coverAlt}
              aspectClass="aspect-[16/9]"
              priority
            />
          </div>

          <div className="space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42]">
                  {section.heading}
                </h2>
                {section.body.map((para, i) => (
                  <p key={i} className="text-base sm:text-lg text-[#050404]/80 leading-relaxed max-w-prose">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="pt-8 border-t border-[#050404]/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 font-display text-sm font-semibold text-[#1D0D42] hover:text-[#6327FB]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>All Insights</span>
            </Link>
            <ActionButton to="/contact" size="sm">
              Discuss a Project
            </ActionButton>
          </div>
        </div>
      </section>

      <section className="bg-[#EAEAEA]/55 py-14 border-t border-[#050404]/8">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="font-display text-xl font-bold text-[#1D0D42] mb-6">Continue Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.map((other) => (
              <Link
                key={other.slug}
                to={`/insights/${other.slug}`}
                className="rounded-2xl bg-white border border-[#050404]/10 p-6 hover:border-[#6327FB] transition-colors"
              >
                <p className="text-xs font-display font-semibold text-[#6327FB]">{other.category}</p>
                <h3 className="mt-1.5 font-display text-lg font-bold text-[#1D0D42]">{other.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

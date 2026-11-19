import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { ARTICLE_CATEGORIES, ArticleCategory, ARTICLES } from '../data/articles';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ResilientImage } from '../components/ui/ResilientImage';
import { applyDocumentMetadata } from '../lib/metadata';

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    applyDocumentMetadata({
      title: 'Insights & Editorial Perspectives — AASRA Web Devs',
      description:
        'Practical articles on Web Development, Branding, Marketing, AI & Automation, Data Analytics, and Business Growth from AASRA Web Devs.',
      path: '/insights',
    });
  }, []);

  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  const filtered = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const q = query.trim().toLowerCase();
    const matchesSearch =
      !q ||
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q) ||
      article.sections.some(
        (section) =>
          section.heading.toLowerCase().includes(q) ||
          section.body.some((paragraph) => paragraph.toLowerCase().includes(q))
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white text-[#050404]">
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-18 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights' }]} />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            Journal &amp; Technical Perspectives
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl">
            INSIGHTS ON DESIGN, SOFTWARE &amp; GROWTH.
          </h1>

          {/* Search & Category Controls */}
          <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter insights by category">
              {ARTICLE_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 min-h-[40px] rounded-full font-display text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
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

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 text-[#050404]/45 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <label htmlFor="insights-search" className="sr-only">
                Search articles
              </label>
              <input
                id="insights-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full border border-[#050404]/15 bg-white pl-10 pr-4 py-2.5 text-sm text-[#050404] placeholder:text-[#050404]/45 focus:border-[#6327FB] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article (when viewing All & no search filter) */}
      {selectedCategory === 'All' && !query.trim() && featuredArticle && (
        <section className="py-14 bg-[#EAEAEA]/50 border-b border-[#050404]/8">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <article className="rounded-2xl border border-[#050404]/10 bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-6">
                <ResilientImage
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.coverAlt}
                  aspectClass="aspect-[16/10] lg:h-full"
                  priority
                />
              </div>
              <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-display font-medium text-[#6327FB]">
                    <span className="uppercase tracking-wider font-semibold">Featured</span>
                    <span aria-hidden="true">·</span>
                    <span>{featuredArticle.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#050404]/60">{featuredArticle.readingTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#050404]/60">{featuredArticle.publishedAt}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-[#1D0D42] leading-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="mt-3 text-base text-[#050404]/75 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/insights/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[#6327FB] hover:text-[#1D0D42] transition-colors min-h-[44px]"
                  >
                    <span>Read Full Article</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Article Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-[#050404]/10 p-12 text-center space-y-3">
              <p className="font-display text-xl font-bold text-[#1D0D42]">
                No matching articles found
              </p>
              <p className="text-sm text-[#050404]/70">
                Try clearing your search term or selecting a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#1D0D42] text-white font-display text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-2xl border border-[#050404]/10 bg-white overflow-hidden flex flex-col justify-between hover:shadow-[0_18px_40px_-24px_rgba(29,13,66,0.2)] transition-shadow"
                >
                  <div>
                    <ResilientImage
                      src={article.coverImage}
                      alt={article.coverAlt}
                      aspectClass="aspect-[4/3]"
                    />
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#050404]/60 font-display">
                        <span className="font-semibold text-[#6327FB]">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readingTime}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.publishedAt}</span>
                      </div>
                      <h2 className="mt-2.5 font-display text-xl font-bold text-[#1D0D42] leading-snug">
                        {article.title}
                      </h2>
                      <p className="mt-2.5 text-sm text-[#050404]/75 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to={`/insights/${article.slug}`}
                      className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[#1D0D42] hover:text-[#6327FB] transition-colors min-h-[44px]"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

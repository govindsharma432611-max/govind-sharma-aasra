import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const rawBase = process.env.VITE_BASE_PATH?.trim() || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ and generates static route entrypoints + 404.html
      // so all SPA routes resolve cleanly on static hosts such as GitHub Pages.
      {
        name: 'static-github-pages-prep',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }

          const distIndex = path.join(distDir, 'index.html');
          if (!fs.existsSync(distIndex)) {
            return;
          }

          const indexHtml = fs.readFileSync(distIndex, 'utf8');
          fs.writeFileSync(path.join(distDir, '404.html'), indexHtml);

          const extractSlugs = (relFile: string): string[] => {
            const fullPath = path.resolve(__dirname, relFile);
            if (!fs.existsSync(fullPath)) return [];
            const content = fs.readFileSync(fullPath, 'utf8');
            return Array.from(content.matchAll(/\bslug:\s*'([^']+)'/g), (m) => m[1]);
          };

          const staticRoutes = [
            'about',
            'services',
            'work',
            'pricing',
            'process',
            'insights',
            'contact',
            'privacy-policy',
            'terms-and-conditions',
            'cookie-policy',
            'refund-cancellation-policy',
            'disclaimer',
            'offline',
            ...extractSlugs('src/data/services.ts').map((slug) => `services/${slug}`),
            ...extractSlugs('src/data/portfolio.ts').map((slug) => `work/${slug}`),
            ...extractSlugs('src/data/articles.ts').map((slug) => `insights/${slug}`),
          ];

          for (const route of staticRoutes) {
            const routeDir = path.join(distDir, route);
            fs.mkdirSync(routeDir, {recursive: true});
            fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

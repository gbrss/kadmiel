import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Cloudflare Pages / Workers (no usar @astrojs/node aquí)
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  server: {
    port: 4321,
    host: true,
  },
});

import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://danilovw27.github.io/cyan-chroma/',
  integrations: [tailwind()]
});
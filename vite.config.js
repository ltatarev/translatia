import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/translatia/',
  assetsInclude: ['**/*.srt'],
  plugins: [react(),
    vitePluginRequire({
      // @fileRegex RegExp
      // optional：default file processing rules are as follows
      // fileRegex:/(.jsx?|.tsx?|.vue)$/

      // Conversion mode. The default mode is import
      // importMetaUrl | import
      // importMetaUrl see https://vitejs.cn/guide/assets.html#new-url-url-import-meta-url
      // translateType: "importMetaUrl" | "import";
    }),
  ],
});

import { join } from 'node:path';
import { defineConfig, build } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, './src/popup/'),
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
  },
  base: './',
  build: {
    outDir: join(__dirname, './dist/popup/'),
  },
});

// libraries
const libraries = [
  {
    entry: join(__dirname, './src/content_scripts'),
    name: 'content_scripts',
    fileName: 'index',
  },
  {
    entry: join(__dirname, './src/service_worker'),
    name: 'service_worker',
    fileName: 'index',
  }
];

// build
libraries.forEach(async (libItem) => {
  await build({
    configFile: false,
    build: {
      lib: libItem,
      emptyOutDir: false,
      rollupOptions: {
        output: {
          dir: join(__dirname, './dist', libItem.name)
        }
      },
    },
  });
});

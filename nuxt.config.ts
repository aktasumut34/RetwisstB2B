import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  vite: false,
  ssr: false,
  css: ['~/assets/css/tailwind.css', '~/assets/css/fonts.css'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    },
    transpile: ['@vueform/slider']
  },
  buildModules: ['@pinia/nuxt']
});

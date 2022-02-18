import { defineNuxtPlugin } from '#app';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import VueEasyLightbox from 'vue-easy-lightbox';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .component('carousel', Carousel)
    .component('slide', Slide)
    .component('pagination', Pagination)
    .component('navigation', Navigation)
    .component('lightbox', VueEasyLightbox);
});

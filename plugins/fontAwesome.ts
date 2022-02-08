import { defineNuxtPlugin } from '#app';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faLock,
  faAt,
  faIdBadge,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default defineNuxtPlugin((nuxtApp) => {
  config.autoAddCss = false;
  library.add(faIdBadge, faLock, faAt, faSpinner);
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});

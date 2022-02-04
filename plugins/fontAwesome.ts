import { defineNuxtPlugin } from "#app";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineNuxtPlugin((nuxtApp) => {
  config.autoAddCss = false;
  library.add(faUserLock);
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});

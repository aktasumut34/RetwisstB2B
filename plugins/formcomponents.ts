import VueMultiselect from '@aktasumut34/vue-multiselect';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import { defineNuxtPlugin } from '#app';
import vueDebounce from 'vue-debounce';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .component('v-multiselect', VueMultiselect)
    .component(VueNumberInput.name, VueNumberInput)
    .use(vueDebounce);
});

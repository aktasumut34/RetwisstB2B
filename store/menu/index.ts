import { defineStore } from 'pinia';
export default defineStore('menu', {
  state: () => ({
    open: false
  }),
  actions: {
    toggle() {
      this.open = !this.open;
    }
  }
});

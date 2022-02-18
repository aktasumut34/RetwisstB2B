import { defineStore } from 'pinia';
import { useUserStore } from '..';

export default defineStore('product', {
  state: () => ({
    categories: []
  }),
  actions: {
    async getCategories() {
      try {
        const user = useUserStore();
        const response = await fetch(
          'http://localhost:3100/api/product/categories',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );
        const { categories } = await response.json();
        this.categories = categories;
      } catch (e) {
        console.log(e);
      }
    }
  }
});

import { defineStore } from 'pinia';
const getToken = () => {
  if (process.client) {
    return localStorage.getItem('token');
  }
  return '';
};
export default defineStore('user', {
  state: (): {
    token: string;
    user?: {
      name?: 'string';
      email?: string;
      Adresses?: any[];
      CartItems?: any[];
      Phones?: any[];
    };
  } => ({
    token: getToken(),
    user: {}
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      if (process.client) {
        localStorage.setItem('token', token);
      }
    },
    setUser(user: any) {
      this.user = user;
    },
    async syncUser() {
      try {
        const userResponse = await fetch('http://localhost:3100/api/user', {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        if (userResponse.status === 200) {
          const { user } = await userResponse.json();
          this.setUser(user);
        }
      } catch (e) {}
    },
    async updateCartItemQuantity(cart_item_id: number, quantity: number) {
      await $fetch('http://localhost:3100/api/cart/update', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        body: { cart_item_id, quantity }
      });
    },
    async removeCartItem(cart_item_id: number) {
      await $fetch('http://localhost:3100/api/cart/remove', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        body: { cart_item_id }
      });
      await this.syncUser();
    },
    async logout() {
      try {
        const response = await fetch('http://localhost:3100/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        });
      } catch (error) {
        return false;
      } finally {
        if (process.client) {
          localStorage.removeItem('token');
          this.token = '';
        }
        const router = useRouter();
        router.push('/login');
      }
    }
  }
});

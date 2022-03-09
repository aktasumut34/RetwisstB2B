import { defineStore } from 'pinia';
import { singleButtonSwal } from '~~/utils/swal';
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
      id?: number;
      name?: string;
      email?: string;
      Addresses?: any[];
      CartItems?: any[];
      Phones?: any[];
      Role?: { [key: string]: any };
      Tickets?: any[];
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
          return user;
        } else {
          this.logout();
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
    async updateOrCreateAddress(address: any) {
      const errors = [];
      Object.keys(address).forEach((key) => {
        if (address[key] === '' && key !== 'id') {
          errors.push(key);
        }
      });
      if (errors.length > 0) {
        singleButtonSwal.fire({
          title: 'Error!',
          html: `Please fill out the following fields: <b>${errors.join(
            ', '
          )}</b>`,
          icon: 'error'
        });
        return;
      }
      const answer = await $fetch(
        'http://localhost:3100/api/user/address/update',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: address
        }
      );
      await this.syncUser();
      return answer;
    },
    async createPhone(phone: any) {
      const answer = await $fetch(
        'http://localhost:3100/api/user/phone/create',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: { phone }
        }
      );
      await this.syncUser();
      return answer;
    },
    async createTicket(ticket: any) {
      const answer = await $fetch(
        'http://localhost:3100/api/support/ticket/create',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: { ticket }
        }
      );
      await this.syncUser();
      return answer;
    },
    async getTicket(ticket_id: string): Promise<{
      ticket: {
        user_id?: number;
        subject?: string;
        TicketMessages?: [
          {
            [key: string]: string;
          }
        ];
        createdAt?: string;
        TicketStatus?: {
          [key: string]: string;
        };
      };
    }> {
      const answer: { ticket: {} } = await $fetch(
        `http://localhost:3100/api/support/ticket/${ticket_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
      return answer;
    },
    async markAsSolved(ticket_id: string): Promise<{ success: boolean }> {
      const answer: { success: boolean } = await $fetch(
        `http://localhost:3100/api/support/ticket/mark`,
        {
          method: 'POST',
          body: { ticket_id, status: 2 },
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        }
      );
      await this.syncUser();
      return answer;
    },
    async sendTicketMessage(ticket_message): Promise<{ success?: boolean }> {
      const answer = await $fetch(
        'http://localhost:3100/api/support/ticket/send-message',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: ticket_message
        }
      );
      await this.syncUser();
      return answer;
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
    async removeAddress(address_id: number) {
      const answer = await $fetch(
        'http://localhost:3100/api/user/address/remove',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: { address_id }
        }
      );
      await this.syncUser();
      return answer;
    },
    async removePhone(phone_id: number) {
      const answer = await $fetch(
        'http://localhost:3100/api/user/phone/remove',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          body: { phone_id }
        }
      );
      await this.syncUser();
      return answer;
    },
    async checkout(address_id, shipping_method_id) {
      const answer = await $fetch('http://localhost:3100/api/order/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        body: {
          address_id,
          shipping_method_id,
          items: this.user.CartItems.map((item) => {
            return {
              variant_id: item.Variant.id,
              quantity: item.quantity,
              unitPrice: item.Variant.price
            };
          })
        }
      });
      return answer;
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

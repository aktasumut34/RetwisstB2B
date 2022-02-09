import { defineStore } from 'pinia';
const getToken = () => {
  if (process.client) {
    return localStorage.getItem('token');
  }
  return '';
};
export default defineStore('user', {
  state: () => ({
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

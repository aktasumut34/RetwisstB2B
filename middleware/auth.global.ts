import { useUserStore } from '~~/store';
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) {
    return;
  }
  const userStore = useUserStore();
  if (!userStore.token) {
    const localToken = localStorage.getItem('token');
    if (localToken) userStore.setToken(localToken);
    else if (getCookie('refresh_token')) {
      try {
        const response = await fetch(
          'http://localhost:3100/api/auth/refresh-token',
          {
            method: 'POST',
            credentials: 'include'
          }
        );
        const { token } = await response.json();
        if (token) {
          userStore.setToken(token);
        }
      } catch (e) {}
    }
  }
  if (userStore.token) {
    await userStore.syncUser();
  }
  if (to.path === '/login' || to.path === '/register') {
    if (userStore.token) {
      window.location.href = userStore.user?.Role?.id === 1337 ? '/admin' : '/';
    }
  } else {
    if (!userStore.token) {
      window.location.href = '/login';
    } else {
      if (userStore.user?.Role?.id !== 1337 && to.path.startsWith('/admin')) {
        window.location.href = '/';
      } else if (
        userStore.user?.Role?.id === 1337 &&
        !to.path.startsWith('/admin')
      )
        window.location.href = '/admin';
    }
  }
});

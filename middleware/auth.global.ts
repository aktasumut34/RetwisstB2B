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
          'http://localhost:3000/api/auth/refresh-token',
          {
            method: 'POST',
            credentials: 'include'
          }
        );
        const { token } = await response.json();
        if (token) {
          userStore.setToken(token);
        }
      } catch (e) {
        console.log(e);
      }
    }
    try {
      const userResponse = await fetch('http://localhost:3000/api/user', {
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
      if (userResponse.status === 200) {
        const { user } = await userResponse.json();
        userStore.setUser(user);
      }
    } catch (e) {}
  }
  if (to.path === '/login' || to.path === '/register') {
    if (userStore.token) {
      return navigateTo('/');
    }
  } else {
    if (!userStore.token) {
      return navigateTo('/login');
    }
  }
});

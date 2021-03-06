<template>
  <div class="flex h-full min-h-screen w-full items-center justify-center p-10">
    <div
      class="m-12 flex min-w-[35%] flex-col rounded-md p-6 shadow-2xl lg:p-10 2xl:p-16"
    >
      <div class="flex flex-col gap-6">
        <div class="mx-auto">
          <img src="/logo.png" alt="Retwisst B2B Logo" class="" />
        </div>
        <h1
          class="text-center text-3xl font-thin text-slate-700 lg:text-4xl 2xl:text-5xl"
        >
          Log In
        </h1>
        <span class="text-center text-sm text-slate-400">
          Log in to your account to continue to Retwisst B2B.
        </span>
      </div>
      <div class="mt-10 flex flex-col gap-6">
        <span
          v-if="triedLogin && whyNot.length"
          class="mb-2 text-sm text-red-600"
        >
          {{ whyNot }}
        </span>
        <div
          class="group relative"
          :class="{
            'danger-shake': dangers.includes('email')
          }"
        >
          <input
            type="text"
            class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
            :class="{
              'ring-retwisst-purple-normal': !validMail,
              'ring-retwisst-green-normal': validMail,
              ring: email.length > 0 || triedLogin
            }"
            v-on:keyup.enter="login"
            v-model="email"
          />

          <span
            class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
            :class="{
              '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                email.length > 0
            }"
            >E-mail</span
          >
        </div>
        <div
          class="group relative"
          :class="{
            'danger-shake': dangers.includes('password')
          }"
        >
          <input
            type="password"
            class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
            v-model="password"
            v-on:keyup.enter="login"
            :class="{
              'ring-retwisst-purple-normal': !validPassword,
              'ring-retwisst-green-normal': validPassword,
              ring: password.length > 0 || triedLogin
            }"
          />

          <span
            class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
            :class="{
              '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                password.length > 0
            }"
            >Password</span
          >
        </div>
        <button
          class="w-full rounded bg-retwisst-purple-normal py-2 font-thin text-white outline-none ring-0 ring-retwisst-purple-normal ring-offset-2 transition-colors hover:bg-retwisst-purple-dark focus:outline-none focus:ring-2 active:bg-retwisst-purple-darkest"
          :class="{
            'bg-retwisst-green-normal ring-retwisst-green-normal hover:bg-retwisst-green-dark active:bg-retwisst-green-darkest':
              validMail
          }"
          @click="login"
        >
          Continue
        </button>
      </div>
      <div class="or-section relative mt-8 flex">
        <span class="orspan text-center text-slate-500">OR</span>
      </div>
      <div class="mt-8 flex flex-col gap-2">
        <NuxtLink to="/register">Forgot password?</NuxtLink>
        <NuxtLink to="/register">Create a new account</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import is from 'is_js';
import { useUserStore } from '~~/store';
const email = ref('');
const password = ref('');
const route = useRouter();
const triedLogin = ref(false);
const validMail = computed(() => is.email(email.value));
const validPassword = computed(() => password.value.length >= 5);
const loginLoading = ref(false);
const dangers = ref([]);
const userStore = useUserStore();
const whyNot = ref('');
const login = async () => {
  triedLogin.value = true;
  if (!validMail.value) dangers.value.push('email');
  if (dangers.value.length > 0) {
    setTimeout(() => {
      dangers.value = [];
    }, 250);
    return;
  } else {
    loginLoading.value = true;
    try {
      const response = await fetch('http://localhost:3100/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      });
      if (response.status === 200) {
        const { token } = await response.json();
        userStore.setToken(token);
        route.push('/');
      } else {
        const { errors } = await response.json();
        email.value = '';
        password.value = '';
        if (errors[0].type && errors[0].message) {
          whyNot.value = errors[0].message;
          dangers.value.push(errors[0].type);
        } else throw new Error('Unknown error');
      }
    } catch (error) {
      whyNot.value = 'Something went wrong';
    }
  }
};
definePageMeta({
  layout: false
});
useMeta({
  title: `Login - Retwisst B2B`
});
</script>

<style scoped>
.or-section::before,
.or-section::after {
  content: '';
  height: 0.5em;
  border-bottom: 1px solid rgb(203, 213, 225);
  flex: 1 0 auto;
}
.orspan {
  flex: 0.2 0 auto;
  font-size: 1em;
  line-height: 1em;
}
.danger-shake {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
@keyframes shake {
  0% {
    transform: skewY(0);
  }
  20% {
    transform: skewY(1deg);
  }
  40% {
    transform: skewY(-1deg);
  }
  60% {
    transform: skewY(1deg);
  }
  100% {
    transform: skewY(0);
  }
}
</style>

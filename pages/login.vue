<template>
  <div class="flex h-screen w-full items-center justify-center">
    <div class="flex flex-col rounded-md p-6 shadow-2xl lg:p-10 2xl:p-16">
      <div class="flex flex-col gap-6">
        <div class="mx-auto">
          <img src="/logo.png" alt="Retwisst B2B Logo" class="" />
        </div>
        <h1
          class="text-center text-3xl font-thin text-slate-700 lg:text-4xl 2xl:text-5xl"
        >
          Retwisst B2B
        </h1>
        <span class="text-sm text-slate-400">
          Log in to your account to continue to Retwisst B2B.
        </span>
      </div>
      <div class="mt-10 flex flex-col gap-6">
        <div
          class="group relative"
          :class="{
            'danger-shake': dangers.includes('email')
          }"
        >
          <input
            type="text"
            class="relative w-full rounded border-0 bg-white py-3 pl-12 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
            :class="{
              'ring-retwisst-purple-normal': !validMail,
              'ring-retwisst-green-normal': validMail,
              ring: email.length > 0 || triedLogin
            }"
            v-model="email"
          />
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <font-awesome-icon
              :icon="['fas', 'user-lock']"
              fixed-width
              class="text-slate-300 group-focus-within:text-slate-500"
              :class="{
                'text-slate-500': email.length > 0 || triedLogin
              }"
            />
          </div>

          <span
            class="pointer-events-none absolute top-2 left-12 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
            :class="{
              '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                email.length > 0
            }"
            >E-mail</span
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
        <a
          href="#"
          class="flex w-full items-center rounded border border-slate-300 px-4 py-2 text-left text-lg font-thin text-slate-600 ring-slate-400 hover:bg-slate-200 focus:outline-none focus:ring-1 active:bg-slate-300"
        >
          <img src="/google.svg" class="mr-4 h-5 w-5" />
          Continue with Google
        </a>
        <a
          href="#"
          class="flex w-full items-center rounded border border-slate-300 px-4 py-2 text-left text-lg font-thin text-slate-600 ring-slate-400 hover:bg-slate-200 focus:outline-none focus:ring-1 active:bg-slate-300"
        >
          <img src="/linkedin.svg" class="mr-4 h-5 w-5" />
          Continue with LinkedIn
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import is from 'is_js';
const email = ref('');
const triedLogin = ref(false);
const validMail = computed(() => is.email(email.value));
const dangers = ref([]);
const login = () => {
  triedLogin.value = true;
  if (!validMail.value) dangers.value.push('email');
  if (dangers.value.length > 0) {
    setTimeout(() => {
      dangers.value = [];
    }, 250);
    return;
  }
};
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

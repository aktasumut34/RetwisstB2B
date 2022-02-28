<template>
  <button
    class="relative flex items-center justify-center gap-1 rounded-xl bg-retwisst-green-darkest px-2 py-2 text-slate-100 shadow-md shadow-retwisst-green-normal transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal sm:px-4"
  >
    <span
      v-if="cartCount > 0"
      class="pointer-events-none absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-retwisst-purple-normal text-xs"
      >{{ cartCount }}</span
    >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="pointer-events-none h-8 w-8 sm:h-6 sm:w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    <span class="pointer-events-none hidden sm:block"> Cart </span>
  </button>
</template>

<script lang="ts" setup>
import { useUserStore } from '~~/store';
const user = useUserStore();
const cartCount = computed(() => user.user.CartItems?.length || 0);
</script>

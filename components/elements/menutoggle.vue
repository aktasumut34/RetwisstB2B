<template>
  <button
    class="flex items-center justify-center gap-1 rounded-full px-2 py-2 text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200 sm:px-4"
    @click="toggleMenu"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 sm:h-6 sm:w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
    <span class="hidden sm:block"> MENU </span>
  </button>
</template>

<script setup lang="ts">
import { useMenuStore } from '~~/store';
const menu = useMenuStore();
const toggleMenu = () => menu.toggle();
</script>

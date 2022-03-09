<template>
  <NuxtLink
    :to="'/admin/' + to"
    class="group relative flex items-center justify-between gap-8 text-2xl uppercase text-slate-700 transition-colors hover:bg-gray-300 active:bg-gray-200"
    :class="{
      'rounded-full p-3': !isOpen,
      'rounded-md py-2 px-8': isOpen
    }"
    ><div class="flex items-center gap-4">
      <i class="pi !text-3xl" :class="icon"></i
      ><span v-if="isOpen">{{ title }}</span>
    </div>
    <div v-if="isOpen"><i class="pi pi-chevron-right"></i></div>
    <div
      class="popover absolute left-[110%] hidden rounded-full bg-slate-900 px-4 py-1 text-sm text-white"
      :class="{ 'group-hover:block': !isOpen }"
    >
      <span class="relative">{{ title }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: '/admin/orders'
  },
  title: {
    type: String,
    default: 'Admin'
  },
  icon: {
    type: String,
    default: 'pi-box'
  }
});
</script>

<style scoped>
.popover::before {
  @apply absolute bg-slate-900;
  content: '';
  width: 10px;
  height: 10px;
  left: 0%;
  top: 50%;
  transform-origin: center;
  transform: rotate(45deg) translate(-50%, -25%);
}
.router-link-exact-active {
  @apply bg-gray-300;
}
</style>

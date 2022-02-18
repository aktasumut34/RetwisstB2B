<template>
  <NuxtLink
    :to="'/category/' + props.href"
    class="router-link relative text-xl font-thin uppercase text-slate-800 hover:text-slate-700 active:text-slate-600 2xl:text-2xl"
    >{{ props.text }}</NuxtLink
  >
</template>

<script setup lang="ts">
const props = defineProps({
  href: {
    type: String,
    default: '#'
  },
  text: {
    type: String,
    default: ''
  }
});
</script>

<style>
.router-link::after {
  content: '';
  position: absolute;
  left: 8px;
  bottom: -4px;
  width: 0%;
  height: 1px;
  background-color: rgb(51, 65, 85);
}
.router-link::before {
  content: '';
  position: absolute;
  right: -8px;
  top: 4px;
  width: 1px;
  height: 0%;
  background-color: rgb(51, 65, 85);
}
.router-link.router-link-exact-active::after {
  transition: width 0.2s ease-out;
  width: 100%;
}
.router-link.router-link-exact-active::before {
  transition: height 0.1s ease-out 0.2s;
  height: 100%;
}
</style>

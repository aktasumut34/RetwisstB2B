<template>
  <a
    :href="props.href"
    class="text-xl font-semibold uppercase text-slate-800 hover:text-slate-700 active:text-slate-600 2xl:text-2xl"
    >{{ props.text }}</a
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

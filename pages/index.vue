<template>
  <div v-if="userStore?.token">Selamm</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store';
const userStore = useUserStore();
useMeta({
  title: `Home - Retwisst B2B`
});
</script>

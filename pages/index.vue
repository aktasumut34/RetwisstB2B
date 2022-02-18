<template>
  <div v-if="userStore?.token">
    <AuthHead></AuthHead>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store';
const userStore = useUserStore();
</script>

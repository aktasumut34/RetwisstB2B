<template>
  <div v-if="user.token"><AuthHead></AuthHead></div>
  <div v-else>Selam</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~~/store';
const user = useUserStore();
</script>

<style></style>

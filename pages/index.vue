<template>
  <div><button @click="logout">Logout</button></div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~~/store';
const user = useUserStore();
const logout = () => user.logout();
</script>

<style></style>

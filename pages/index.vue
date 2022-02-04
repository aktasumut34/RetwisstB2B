<template>
  <button @click="log">{{ user }}</button>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store";
import { storeToRefs } from "pinia";
const userState = useUserStore();
const { user } = storeToRefs(userState);
const log = () => {
  userState.login("asd");
};
</script>

<style></style>

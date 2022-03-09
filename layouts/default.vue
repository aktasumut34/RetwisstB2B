<template>
  <div class="flex min-h-[100vh] flex-col items-center justify-center">
    <div
      class="flex w-full max-w-[1500px] flex-col px-2 pt-10 md:px-6 xl:px-10"
    >
      <AuthHead></AuthHead>
      <slot></slot>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

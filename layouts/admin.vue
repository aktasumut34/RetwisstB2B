<template>
  <div class="relative flex">
    <AdminSidebar class="z-[999]"></AdminSidebar>
    <div class="flex max-h-screen flex-1 flex-col overflow-y-scroll">
      <slot id="page" />
    </div>
  </div>
</template>

<style>
.mainContent > :last-child {
  padding-bottom: 32px;
}
</style>

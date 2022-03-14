<template>
  <div
    class="flex h-screen flex-col gap-12 bg-gray-100 py-6 px-4"
    :class="{ '!px-2': !menu.open }"
  >
    <div class="flex items-center justify-center p-4">
      <img v-if="menu.open" src="/logo.png" alt="" />
    </div>
    <div class="flex flex-1 flex-col gap-4">
      <AdminSidebarlink
        title="Users"
        to="users"
        icon="pi-user"
        :isOpen="menu.open"
      ></AdminSidebarlink>
      <AdminSidebarlink
        title="Categories"
        to="categories"
        icon="pi-folder"
        :isOpen="menu.open"
      ></AdminSidebarlink>
      <AdminSidebarlink
        title="Products"
        to="products"
        icon="pi-box"
        :isOpen="menu.open"
      ></AdminSidebarlink>
      <AdminSidebarlink
        title="Orders"
        to="orders"
        icon="pi-list"
        :isOpen="menu.open"
      ></AdminSidebarlink>
      <AdminSidebarlink
        title="Tickets"
        to="support"
        icon="pi-ticket"
        :isOpen="menu.open"
      ></AdminSidebarlink>
      <AdminSidebarlink
        title="Logout"
        to="logout"
        icon="pi-sign-out"
        class="mt-auto"
        :isOpen="menu.open"
        @click.prevent="logout"
      ></AdminSidebarlink>
    </div>
    <button @click="setIsOpen">
      <i
        class="pi !text-3xl"
        :class="{
          'pi-chevron-left': menu.open,
          'pi-chevron-right': !menu.open
        }"
      ></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore, useMenuStore } from '~~/store';

const user = useUserStore();
const menu = useMenuStore();
const setIsOpen = () => menu.toggle();
const logout = () => user.logout();
</script>

<style scoped></style>

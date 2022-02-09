<template>
  <div class="flex flex-col gap-12 px-5 py-10">
    <div class="flex items-center justify-between">
      <div class="flex lg:hidden">
        <ElementsMenutoggle />
      </div>
      <div>
        <img src="/logo.png" alt="Retwisst B2B Logo" class="" />
      </div>
      <div class="flex gap-2">
        <ElementsCart />
        <ElementsUserdropdown class="hidden sm:flex" />
      </div>
    </div>
    <div class="hidden items-center justify-evenly lg:flex">
      <ElementsCategorylink text="Tshirt Yarn" />
      <ElementsCategorylink text="Ribbon" />
      <ElementsCategorylink text="XXLace" />
      <ElementsCategorylink text="Slim Cotton" />
      <ElementsCategorylink text="Macrame Yarns" />
      <ElementsCategorylink text="Cake Yarns" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store';
import Menutoggle from './elements/menutoggle.vue';
const user = useUserStore();
const logout = () => user.logout();

const mobileMenu = ref(false);
const setMobileMenu = () => (mobileMenu.value = !mobileMenu.value);
</script>

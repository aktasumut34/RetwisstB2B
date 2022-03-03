<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full items-center justify-center gap-1 rounded-full px-4 py-2 text-slate-700 shadow-md transition-colors hover:bg-slate-100 active:bg-slate-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span> {{ userDetails.name }} </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-2">
          <div class="pl-1">
            <span class="text-md font-bold leading-3 text-slate-700"
              >ORDERS</span
            >
          </div>
          <MenuItem v-slot="{ active }">
            <NuxtLink
              to="/orders"
              class="rounded-sm"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block w-full px-4 py-2 text-left text-sm'
              ]"
            >
              My Orders
            </NuxtLink>
          </MenuItem>
        </div>
        <div class="px-1 py-2">
          <div class="pl-1">
            <span class="text-md font-bold leading-3 text-slate-700">HELP</span>
          </div>
          <MenuItem v-slot="{ active }">
            <NuxtLink
              to="/faq"
              class="rounded-sm"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block w-full px-4 py-2 text-left text-sm'
              ]"
            >
              FAQ
            </NuxtLink> </MenuItem
          ><MenuItem v-slot="{ active }">
            <NuxtLink
              to="/support"
              class="rounded-sm"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block w-full px-4 py-2 text-left text-sm'
              ]"
            >
              Support
            </NuxtLink>
          </MenuItem>
        </div>
        <div class="px-1 py-2">
          <div class="pl-1">
            <span class="text-md font-bold leading-3 text-slate-700"
              >ACCOUNT</span
            >
          </div>
          <MenuItem v-slot="{ active }">
            <NuxtLink
              to="/account"
              class="rounded-sm"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block w-full px-4 py-2 text-left text-sm'
              ]"
            >
              My Account
            </NuxtLink> </MenuItem
          ><MenuItem v-slot="{ active }">
            <button
              @click="logout"
              class="rounded-sm"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block w-full px-4 py-2 text-left text-sm'
              ]"
            >
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { useUserStore } from '~~/store';
const user = useUserStore();
const userDetails = user.user;
const logout = () => user.logout();
</script>

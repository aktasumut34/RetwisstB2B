<template>
  <div class="mainContent flex flex-1 flex-col">
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold"
        >USER:
        <span class="text-lg font-normal"
          >{{ user.name }} &lt;{{ user.email }}&gt;</span
        ></span
      >
    </div>
    <div class="flex max-h-screen flex-1 px-8 py-4 lg:max-h-[60%]">
      <div
        class="grid w-full grid-cols-1 grid-rows-none items-stretch justify-center gap-4 lg:grid-cols-3 lg:grid-rows-2"
      >
        <div
          class="flex flex-col gap-8 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">General Information</span>
          </div>
          <div class="flex flex-col gap-4">
            <span class="font-light"
              >Name:
              <span class="text-sm font-semibold xl:text-lg">{{
                user.name
              }}</span></span
            >
            <span class="font-light"
              >E-Mail:
              <span class="text-sm font-semibold xl:text-lg">{{
                user.email
              }}</span></span
            >
            <span class="font-light"
              >Register:
              <span class="text-sm font-semibold xl:text-lg">{{
                dayjs(user.createdAt).format('LLL')
              }}</span></span
            >
            <span class="font-light"
              >Current Status:
              <span
                class="text-sm font-semibold xl:text-lg"
                :class="activeStatusNameGetter(user.status).color"
                >{{ activeStatusNameGetter(user.status).text }}</span
              ></span
            >
          </div>
        </div>
        <div
          class="flex flex-col gap-6 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">Addresses</span>
          </div>
          <div class="flex flex-col gap-2">
            <template v-if="user.Addresses.length > 0">
              <Disclosure
                as="div"
                v-for="address in user.Addresses"
                v-slot="{ open }"
              >
                <DisclosureButton
                  class="flex w-full justify-between rounded-t-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-800 transition-colors hover:bg-slate-300 focus:outline-none focus-visible:ring"
                  :class="{
                    'rounded-b-lg': !open,
                    'bg-slate-600 !text-white hover:bg-slate-600': open
                  }"
                  ><span>{{ address.name }}</span
                  ><svg
                    v-if="!open"
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
                  <svg
                    v-else
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
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </DisclosureButton>
                <transition
                  enter-active-class="transition ease-in"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition ease-out"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <DisclosurePanel
                    class="rounded-b-lg bg-white px-4 pt-4 pb-2 text-sm"
                    ><div class="flex flex-col">
                      <span>{{ address.street }}</span>
                      <span>{{ address.zip }}</span>
                      <span>{{ address.city }}, {{ address.state }}</span>
                      <span class="mt-4 font-bold">{{ address.country }}</span>
                    </div>
                  </DisclosurePanel>
                </transition>
              </Disclosure>
            </template>
            <template v-else>
              <span>This user doesn't have any address yet.</span>
            </template>
          </div>
        </div>
        <div
          class="flex flex-col gap-6 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">Phone Numbers</span>
          </div>
          <div class="flex flex-col gap-2">
            <template v-if="user.Phones.length > 0">
              <div
                class="flex w-full justify-between rounded-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-800"
                v-for="phone in user.Phones"
              >
                {{ phone.number }}
              </div></template
            >
            <template v-else>
              <span>This user doesn't have any phone number yet.</span>
            </template>
          </div>
        </div>
        <div
          class="flex flex-col gap-6 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">Orders</span>
          </div>
          <template v-if="user.Orders.length > 0">
            <div class="flex flex-col gap-2">
              <NuxtLink
                :to="`/admin/orders/order-${order.id}`"
                class="flex w-full justify-between rounded-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-800"
                v-for="order in user.Orders"
              >
                ORDER: #{{ order.id }}
                <span class="text-sm"
                  >({{ dayjs(order.createdAt).format('LLL') }})</span
                >
              </NuxtLink>
            </div></template
          >
          <template v-else>
            <span>This user doesn't have any order yet.</span>
          </template>
        </div>
        <div
          class="flex flex-col gap-6 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">Tickets</span>
          </div>
          <template v-if="user.Tickets.length > 0">
            <div class="flex flex-col gap-2">
              <NuxtLink
                :to="`/admin/support/ticket-${ticket.id}`"
                class="flex w-full justify-between rounded-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-800"
                v-for="ticket in user.Tickets"
              >
                TICKET: #{{ ticket.id }}
                <span class="text-sm"
                  >({{ dayjs(ticket.createdAt).format('LLL') }})</span
                >
              </NuxtLink>
            </div></template
          >
          <template v-else>
            <span>This user doesn't have any ticket yet.</span>
          </template>
        </div>
        <div
          class="flex flex-col gap-6 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">Current Logins</span>
          </div>
          <template v-if="user.Tokens.length > 0">
            <div>
              <div
                class="flex w-full justify-between rounded-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-800"
                v-for="token in user.Tokens"
              >
                TOKEN: #{{ token.id }}
                <span class="text-sm"
                  >({{ dayjs(token.createdAt).format('LLL') }})</span
                >
              </div>
            </div></template
          >
          <template v-else>
            <span>This user doesn't have any active login.</span>
          </template>
        </div>
      </div>
    </div>
    <div class="flex w-full px-8 py-4">
      <div
        class="flex h-[25vh] flex-1 flex-col gap-6 rounded-md bg-slate-100 p-4"
      >
        <div>
          <span class="text-2xl">Actions</span>
        </div>
        <div class="flex gap-2">
          <button
            v-if="user.status === 1"
            class="group flex items-center gap-2 rounded-md border border-retwisst-purple-darkest px-2 py-1 uppercase text-retwisst-purple-darkest transition-colors hover:bg-retwisst-purple-darkest hover:text-white active:bg-retwisst-purple-dark active:text-white"
            @click="userStatusChange(-1)"
          >
            <i class="pi pi-times-circle"></i> <span>Block User</span></button
          ><button
            v-else
            class="group flex items-center gap-2 rounded-md border border-retwisst-green-darkest px-2 py-1 uppercase text-retwisst-green-darkest transition-colors hover:bg-retwisst-green-darkest hover:text-white active:bg-retwisst-green-dark active:text-white"
            @click="userStatusChange(1)"
          >
            <i class="pi pi-check-circle"></i> <span>Allow User</span>
          </button>
          <button
            class="group flex items-center gap-2 rounded-md border border-retwisst-purple-darkest px-2 py-1 uppercase text-retwisst-purple-darkest transition-colors hover:bg-retwisst-purple-darkest hover:text-white active:bg-retwisst-purple-dark active:text-white"
            @click="removeUser()"
          >
            <i class="pi pi-times-circle"></i> <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { useUserStore } from '~~/store';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/vue';
import { yesNoSwal, singleButtonSwal } from '~~/utils/swal';
dayjs.extend(LocalizedFormat);
definePageMeta({
  title: 'Admin',
  layout: 'admin'
});
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const fetchUser = async () =>
  $fetch(`http://localhost:3100/api/admin/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userStore.token}`
    }
  });
const {
  data
}: {
  data: Ref<{
    user?: {
      id?: number;
      name?: string;
      email?: string;
      status?: number;
      createdAt?: string;
      updatedAt?: string;
      Addresses?: any[];
      Phones?: any[];
      Role?: { [key: string]: any };
      Tickets?: any[];
      Tokens?: any[];
      Orders?: any[];
    };
    success?: boolean;
  }>;
} = await useAsyncData(`user-${id}`, fetchUser);
const activeStatusNameGetter = (status) => {
  switch (status) {
    case 1:
      return { text: 'Approved', color: 'text-green-500' };
    case 0:
      return { text: 'Pending Approval', color: 'text-blue-500' };
    case -1:
      return { text: 'Blocked', color: 'text-red-500' };
  }
};
if (!data.value) router.push('/admin/users');
const user = computed(() => data.value.user);

const refreshUser = async () => {
  data.value = await fetchUser();
};

const userStatusChange = async (status) => {
  let html = '';
  let confirmText = '';
  switch (status) {
    case 1:
      html = `User <b>ID #${id}</b> will be approved and now can access Retwisst B2B!`;
      confirmText = 'User has been approved.';
      break;
    case -1:
      html = `User <b>ID #${id}</b> will be blocked and they cannot access Retwisst B2B no longer!`;
      confirmText = 'User has been blocked.';
      break;
  }
  yesNoSwal
    .fire({
      title: 'Are you sure?',
      html: html,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then(async (result) => {
      if (result.value) {
        const response: { success: boolean } = await $fetch(
          `http://localhost:3100/api/admin/users/approve`,
          {
            method: 'POST',
            body: { id: user.value.id, status },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userStore.token}`
            }
          }
        );
        if (response.success) {
          singleButtonSwal
            .fire('Success!', confirmText, 'success')
            .then(() => refreshUser());
        }
      }
    });
};
const removeUser = async () => {
  yesNoSwal
    .fire({
      title: 'Are you sure?',
      html: `User <b>ID #${user.value.id}</b> will be removed from the database and you cannot retrieve it back!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then(async (result) => {
      if (result.value) {
        const response: { success: boolean } = await $fetch(
          `http://localhost:3100/api/admin/users/remove`,
          {
            method: 'POST',
            body: { id: user.value.id },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userStore.token}`
            }
          }
        );
        if (response.success) {
          singleButtonSwal
            .fire('Success!', 'User has been removed.', 'success')
            .then(() => refreshUser());
        }
      }
    });
};
useMeta({
  title: `User: ${user.value.email} - Admin - Retwisst`
});
</script>

<style scoped></style>

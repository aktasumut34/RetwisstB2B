<template>
  <div class="mainContent flex flex-1 flex-col">
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold">USERS</span>
      <div class="flex">
        <RadioGroup v-model="activeStatus" class="flex gap-4">
          <RadioGroupOption :key="1" :value="1" v-slot="{ checked }">
            <div
              :class="[
                checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white '
              ]"
              class="relative flex cursor-pointer rounded-lg px-4 py-1 text-sm shadow-md focus:outline-none"
            >
              Active Users
            </div>
          </RadioGroupOption>
          <RadioGroupOption :key="2" :value="0" v-slot="{ checked }">
            <div
              :class="[
                checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white '
              ]"
              class="relative flex cursor-pointer rounded-lg px-4 py-1 text-sm shadow-md focus:outline-none"
            >
              Pending Approval Users

              <div
                class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white"
              >
                {{ data.pending.length }}
              </div>
            </div>
          </RadioGroupOption>
          <RadioGroupOption :key="3" :value="-1" v-slot="{ checked }">
            <div
              :class="[
                checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white '
              ]"
              class="relative flex cursor-pointer rounded-lg px-4 py-1 text-sm shadow-md focus:outline-none"
            >
              Blocked Users
            </div>
          </RadioGroupOption>
        </RadioGroup>
      </div>
    </div>
    <div class="flex-1">
      <Datatable
        :value="activeStatusTableGetter"
        :auto-layout="true"
        :paginator="true"
        :rows="10"
        v-model:filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :rowsPerPageOptions="[10, 25, 50]"
        :row-hover="true"
        selectionMode="single"
        v-model:selection="selectedUser"
        class="p-datatable-customers"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h5 class="m-0 text-2xl">{{ activeStatusNameGetter }}</h5>
            <div class="flex items-center bg-white">
              <input
                type="text"
                v-model="filters['global'].value"
                placeholder="Search"
                class="text-md rounded-md px-4 py-2 text-slate-700 focus:outline-none"
              />
              <div class="mr-2 flex items-center justify-center">
                <i class="pi pi-search" />
              </div>
            </div>
          </div>
        </template>
        <Column field="id" header="User ID" :sortable="true">
          <template #body="{ data }">
            <NuxtLink class="block" :to="`/orders/${data.id}`"
              ># {{ data.id }}
            </NuxtLink></template
          >
        </Column>
        <Column field="name" header="Name" :sortable="true">
          <template #body="{ data }">
            <span>{{ data.name }}</span>
          </template>
        </Column>
        <Column field="email" header="E-Mail" :sortable="true">
          <template #body="{ data }">
            <span>{{ data.email }}</span>
          </template>
        </Column>
        <Column header="Phone">
          <template #body="{ data }">
            <span>{{ data.Phones[0]?.number || '' }}</span>
          </template>
        </Column>
        <Column field="createdAt" header="Register Date" :sortable="true">
          <template #body="{ data }">
            <span>{{ dayjs(data.createdAt).format('LLL') }}</span>
          </template>
        </Column>
        <Column header="ACTIONS">
          <template #body="{ data }">
            <div v-if="activeStatus === 0" class="flex gap-2">
              <button
                class="group flex items-center gap-2 rounded-md border border-retwisst-green-darkest px-2 py-1 uppercase text-retwisst-green-darkest transition-colors hover:bg-retwisst-green-darkest hover:text-white active:bg-retwisst-green-dark active:text-white"
                @click="userStatusChange(data.id, 1)"
              >
                <i class="pi pi-check-circle"></i> <span>Approve</span>
              </button>
              <button
                class="group flex items-center gap-2 rounded-md border border-retwisst-purple-darkest px-2 py-1 uppercase text-retwisst-purple-darkest transition-colors hover:bg-retwisst-purple-darkest hover:text-white active:bg-retwisst-purple-dark active:text-white"
                @click="removeUser(data.id)"
              >
                <i class="pi pi-times-circle"></i> <span>Remove</span>
              </button>
            </div>
            <div v-if="activeStatus === 1" class="flex gap-2">
              <button
                class="group flex items-center gap-2 rounded-md border border-retwisst-purple-darkest px-2 py-1 uppercase text-retwisst-purple-darkest transition-colors hover:bg-retwisst-purple-darkest hover:text-white active:bg-retwisst-purple-dark active:text-white"
                @click="userStatusChange(data.id, -1)"
              >
                <i class="pi pi-times-circle"></i> <span>Block User</span>
              </button>
            </div>
            <div v-if="activeStatus === -1" class="flex gap-2">
              <button
                class="group flex items-center gap-2 rounded-md border border-retwisst-green-darkest px-2 py-1 uppercase text-retwisst-green-darkest transition-colors hover:bg-retwisst-green-darkest hover:text-white active:bg-retwisst-green-dark active:text-white"
                @click="userStatusChange(data.id, 1)"
              >
                <i class="pi pi-check-circle"></i> <span>Unblock User</span>
              </button>
              <button
                class="group flex items-center gap-2 rounded-md border border-retwisst-purple-darkest px-2 py-1 uppercase text-retwisst-purple-darkest transition-colors hover:bg-retwisst-purple-darkest hover:text-white active:bg-retwisst-purple-dark active:text-white"
                @click="removeUser(data.id)"
              >
                <i class="pi pi-times-circle"></i> <span>Remove</span>
              </button>
            </div>
          </template>
        </Column>
        <template #empty> No users found. </template>
      </Datatable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { FilterMatchMode } from 'primevue/api';
import { yesNoSwal, singleButtonSwal } from '~~/utils/swal';
import { useUserStore } from '~~/store';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import Datatable from 'primevue/datatable';
import Column from 'primevue/column';
dayjs.extend(LocalizedFormat);
const user = useUserStore();
const router = useRouter();
const fetchUser = async () =>
  await $fetch('http://localhost:3100/api/admin/users/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    }
  });
const { data }: { data: Ref<{ approved?: []; pending?: []; blocked?: [] }> } =
  await useAsyncData('allUsers', fetchUser);

const refreshUsers = async () => {
  data.value = await fetchUser();
};
const approved = computed(() => data.value.approved);
const pending = computed(() => data.value.pending);
const blocked = computed(() => data.value.blocked);
const filters: {} = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const activeStatus = ref(1);
const activeStatusNameGetter = computed(() => {
  switch (activeStatus.value) {
    case 1:
      return 'Approved Users';
    case 0:
      return 'Pending Approval Users';
    case -1:
      return 'Blocked Users';
  }
});
const activeStatusTableGetter = computed(() => {
  switch (activeStatus.value) {
    case 1:
      return approved.value;
    case 0:
      return pending.value;
    case -1:
      return blocked.value;
  }
});
const userStatusChange = async (id, status) => {
  let html = '';
  let confirmText = '';
  switch (activeStatus.value) {
    case 0:
      html = `User <b>ID #${id}</b> will be approved and now can access Retwisst B2B!`;
      confirmText = 'User has been approved.';
      break;
    case 1:
      html = `User <b>ID #${id}</b> will be blocked and they cannot access Retwisst B2B no longer!`;
      confirmText = 'User has been blocked.';
      break;
    case -1:
      html = `User with <b>ID #${id}</b> will be approved and now they can continue to access Retwisst B2B!`;
      confirmText = 'User has been unblocked';
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
            body: { id, status },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`
            }
          }
        );
        if (response.success) {
          singleButtonSwal
            .fire('Success!', confirmText, 'success')
            .then(() => refreshUsers());
        }
      }
    });
};
const removeUser = async (id) => {
  yesNoSwal
    .fire({
      title: 'Are you sure?',
      html: `User <b>ID #${id}</b> will be removed from the database and you cannot retrieve it back!`,
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
            body: { id },
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`
            }
          }
        );
        if (response.success) {
          singleButtonSwal
            .fire('Success!', 'User has been removed.', 'success')
            .then(() => refreshUsers());
        }
      }
    });
};
const selectedUser = ref(null);
watch(selectedUser, (val) => {
  router.push(`/admin/users/user-${val.id}`);
});
definePageMeta({
  layout: 'admin'
});
useMeta({
  title: `Users - Admin - Retwisst`
});
</script>

<style scoped></style>

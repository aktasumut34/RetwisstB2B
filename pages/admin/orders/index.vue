<template>
  <div class="mainContent flex flex-1 flex-col">
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold">ORDERS</span>
    </div>
    <div class="flex-1">
      <Datatable
        :value="orders"
        :auto-layout="true"
        :paginator="true"
        :rows="10"
        v-model:filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :rowsPerPageOptions="[10, 25, 50]"
        :row-hover="true"
        selectionMode="single"
        v-model:selection="selectedOrders"
        class="p-datatable-customers"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h5 class="m-0 text-2xl">All Orders</h5>
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
        <Column field="id" header="Order ID" :sortable="true">
          <template #body="{ data }"> # {{ data.id }} </template>
        </Column>
        <Column field="User.name" header="From" :sortable="true">
          <template #body="{ data }">
            {{ data.User.name }} ({{ data.User.email }})
          </template>
        </Column>
        <Column field="createdAt" header="Order Date" :sortable="true">
          <template #body="{ data }">
            <span>{{ dayjs(data.createdAt).format('LLL') }}</span>
          </template>
        </Column>

        <template #empty> No tickets found. </template>
      </Datatable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { FilterMatchMode } from 'primevue/api';
import { useUserStore } from '~~/store';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Datatable from 'primevue/datatable';
import Column from 'primevue/column';
dayjs.extend(LocalizedFormat);
const user = useUserStore();
const router = useRouter();
const fetchOrders = async () =>
  await $fetch('http://localhost:3100/api/admin/orders/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    }
  });
const {
  data
}: {
  data: Ref<{
    orders?: any;
  }>;
} = await useAsyncData('allOrders', fetchOrders);

const refreshOrders = async () => {
  data.value = await fetchOrders();
};
const filters: {} = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const orders = data.value.orders;
const selectedOrders = ref(null);
watch(selectedOrders, (val) => {
  router.push(`/admin/orders/order-${val.id}`);
});
definePageMeta({
  layout: 'admin'
});
useMeta({
  title: `Orders - Admin - Retwisst`
});
</script>

<style scoped></style>

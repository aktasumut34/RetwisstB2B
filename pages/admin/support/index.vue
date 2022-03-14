<template>
  <div class="mainContent flex flex-1 flex-col">
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold">SUPPORT TICKETS</span>
      <div class="flex">
        <RadioGroup v-model="activeStatus" class="flex gap-4">
          <RadioGroupOption
            v-for="(ticketStatus, index) in tickets"
            :value="index"
            v-slot="{ checked }"
          >
            <div
              :class="[
                checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white '
              ]"
              class="relative flex cursor-pointer rounded-lg px-4 py-1 text-sm shadow-md focus:outline-none"
            >
              {{ ticketStatus.name }}
            </div>
          </RadioGroupOption>
        </RadioGroup>
      </div>
    </div>
    <div class="flex-1">
      <Datatable
        :value="activeDataTable"
        :auto-layout="true"
        :paginator="true"
        :rows="10"
        v-model:filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :rowsPerPageOptions="[10, 25, 50]"
        :row-hover="true"
        selectionMode="single"
        v-model:selection="selectedTicket"
        class="p-datatable-customers"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h5 class="m-0 text-2xl">{{ tickets[activeStatus].name }}</h5>
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
        <Column field="id" header="Ticket ID" :sortable="true">
          <template #body="{ data }"> # {{ data.id }} </template>
        </Column>
        <Column field="User.name" header="From" :sortable="true">
          <template #body="{ data }">
            {{ data.User.name }} ({{ data.User.email }})
          </template>
        </Column>
        <Column field="subject" header="Subject" :sortable="true">
          <template #body="{ data }">
            <span>{{ data.subject }}</span>
          </template>
        </Column>
        <Column
          field="lastMessageDate"
          header="Last Message Date"
          :sortable="true"
        >
          <template #body="{ data }">
            <span>{{ dayjs(data.lastMessageDate).format('LLL') }}</span>
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
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import Datatable from 'primevue/datatable';
import Column from 'primevue/column';
dayjs.extend(LocalizedFormat);
const user = useUserStore();
const router = useRouter();
const fetchTickets = async () =>
  await $fetch('http://localhost:3100/api/admin/support/all', {
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
    tickets?: [
      {
        name: string;
        Tickets: any[];
      }
    ];
  }>;
} = await useAsyncData('allTickets', fetchTickets);

const refreshTickets = async () => {
  data.value = await fetchTickets();
};
const filters: {} = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const tickets = data.value.tickets;
const activeStatus = ref(0);
const activeDataTable = computed(() => {
  return tickets[activeStatus.value].Tickets.sort((a, b) => {
    return b.lastMessageDate > a.lastMessageDate ? 1 : -1;
  });
});

const selectedTicket = ref(null);
watch(selectedTicket, (val) => {
  router.push(`/admin/support/ticket-${val.id}`);
});
definePageMeta({
  layout: 'admin'
});
useMeta({
  title: `Support - Admin - Retwisst`
});
</script>

<style scoped></style>

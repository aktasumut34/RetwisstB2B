<template>
  <div v-if="userStore?.token">
    <div class="flex flex-col gap-4 py-4">
      <div class="flex items-center gap-4 lg:gap-6">
        <span class="text-2xl uppercase text-slate-700">Tickets</span>
        <button
          class="flex items-center gap-1 rounded-md bg-retwisst-green-darkest px-4 py-1 text-white transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
          @click="createSupportTicket()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>New Support Ticket</span>
        </button>
      </div>

      <div
        class="flex h-[60vh] flex-col gap-6 rounded-lg border-2 border-slate-300 bg-slate-100 bg-opacity-50 p-6"
        :class="{
          'max-h-[400px]': ticketsFiltered.length <= 0
        }"
      >
        <div
          class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6"
        >
          <span class="uppercase text-slate-700">Status</span>
          <RadioGroup v-model="activeStatus" class="flex gap-2">
            <RadioGroupOption
              v-for="ticketStatus in ticketStatuses"
              :key="ticketStatus.id"
              :value="ticketStatus"
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
        <div
          v-if="ticketsFiltered.length > 0"
          class="flex flex-1 flex-col gap-1 overflow-y-auto"
        >
          <NuxtLink
            v-for="ticket in ticketsFiltered"
            class="flex cursor-pointer rounded-md border border-slate-300 bg-slate-100 px-4 py-2 shadow-sm transition-colors hover:bg-slate-200 focus:outline-none"
            :to="`/support/ticket-${ticket.id}`"
          >
            <div class="flex flex-1 items-center justify-between gap-4">
              <div
                v-if="unreadMessages(ticket) > 0"
                class="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
              >
                {{ unreadMessages(ticket) }}
              </div>
              <div class="flex flex-1 flex-col">
                <span
                  class="text-lg"
                  :class="{
                    '!font-semibold text-slate-700': unreadMessages(ticket) > 0,
                    'font-normal italic text-slate-600':
                      unreadMessages(ticket) <= 0
                  }"
                  >{{ ticket.subject }}</span
                >
                <span
                  v-if="ticket.TicketMessages.length > 0"
                  class="text-sm"
                  :class="{
                    '!font-light text-slate-700': unreadMessages(ticket) > 0,
                    'font-extralight italic text-slate-500':
                      unreadMessages(ticket) <= 0
                  }"
                  ><span
                    v-if="
                      ticket.TicketMessages[0].user.id === userStore.user.id
                    "
                    class="text-slate-500"
                    >You:
                  </span>
                  <span v-else class="text-slate-500"
                    >{{ ticket.TicketMessages[0].user.name }}:
                  </span>
                  {{ ticket.TicketMessages[0].message }}</span
                >
              </div>
              <div v-if="ticket.TicketMessages.length > 0">
                <span class="text-sm text-slate-700">
                  {{ humanReadable(ticket.TicketMessages[0].createdAt) }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
        <div
          v-else
          class="flex flex-1 flex-col items-center justify-center gap-4"
        >
          <img src="/ticket.svg" class="h-20 w-20" />
          <div class="text-center text-2xl text-slate-700">
            You don't have any <b>{{ activeStatus.name }}</b> tickets yet.
          </div>
        </div>
      </div>
    </div>
    <ElementsNewticket
      :isOpen="isOpenNewTicket"
      @cls="setIsOpenNewTicket(false)"
    >
    </ElementsNewticket>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store';
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const userStore = useUserStore();
const {
  data
}: { data?: Ref<{ ticketStatuses?: [{ id: number; name: string }] }> } =
  await useAsyncData('ticket_status', async () => {
    return await $fetch('http://localhost:3100/api/support/ticket-statuses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userStore.token}`
      }
    });
  });
const isOpenNewTicket = ref(false);
const setIsOpenNewTicket = (v: boolean) => {
  isOpenNewTicket.value = v;
};
const ticketStatuses = data.value?.ticketStatuses;
const activeStatus = ref(
  data.value?.ticketStatuses[0] || { id: 0, name: 'All' }
);
const ticketsFiltered = computed(() => {
  return (
    userStore.user?.Tickets?.filter(
      (t) => t.TicketStatus.id === activeStatus.value.id
    ).sort((a, b) => {
      return a.TicketMessages[0]?.createdAt > b.TicketMessages[0]?.createdAt
        ? -1
        : 1;
    }) || []
  );
});
const createSupportTicket = () => {
  setIsOpenNewTicket(true);
};
const humanReadable = (date: string) => {
  return dayjs(date).fromNow();
};
const unreadMessages = (ticket) => {
  return ticket.TicketMessages.filter(
    (m) => !m.read && m.user_id !== userStore.user.id
  ).length;
};
useMeta({
  title: `Support - Retwisst B2B`
});
</script>

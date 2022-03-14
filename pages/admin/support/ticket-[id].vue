<template>
  <div class="mainContent flex h-full flex-1 flex-col">
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold"
        >TICKET: #{{ ticket.id
        }}<span class="text-lg font-normal">
          &lt;{{ ticket.subject }}&gt;</span
        ></span
      >
    </div>
    <div class="flex flex-col gap-4 p-4">
      <div class="flex items-center justify-between gap-4 lg:gap-6">
        <NuxtLink
          to="/admin/support"
          class="flex h-8 w-8 items-center justify-center gap-1 rounded-sm bg-slate-700 text-white transition-colors hover:bg-slate-800 active:bg-slate-900"
          ><svg
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </NuxtLink>
        <span class="text-2xl text-slate-700"
          >{{ ticket.subject
          }}<span class="pl-2 text-sm text-slate-500"
            >({{ humanReadable(ticket.createdAt) }})</span
          ></span
        >
        <div class="flex gap-2">
          <button
            v-show="parseInt(ticket.TicketStatus.id) !== 1"
            class="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-1 text-white transition-colors hover:bg-blue-500 active:bg-blue-400"
            @click="markAsSolved(1)"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Mark as In Progress
          </button>
          <button
            v-show="parseInt(ticket.TicketStatus.id) !== 2"
            class="flex items-center gap-1 rounded-md bg-retwisst-green-darkest px-4 py-1 text-white transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
            @click="markAsSolved(2)"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Mark as Solved
          </button>
          <button
            v-show="parseInt(ticket.TicketStatus.id) !== 3"
            class="flex items-center gap-1 rounded-md bg-retwisst-purple-darkest px-4 py-1 text-white transition-colors hover:bg-retwisst-purple-dark active:bg-retwisst-purple-normal"
            @click="markAsSolved(3)"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Mark as Closed
          </button>
        </div>
      </div>
      <div
        class="flex flex-col gap-2 rounded-lg border-2 border-slate-300 bg-slate-100 bg-opacity-50 p-2"
      >
        <div class="flex h-[60vh] flex-col-reverse gap-4 overflow-y-auto p-6">
          <div
            class="group flex items-center gap-2"
            v-for="ticketMessage in ticket.TicketMessages"
            :class="{
              'justify-end':
                parseInt(ticketMessage.user_id) === userStore.user.id,
              'flex-row-reverse justify-end':
                parseInt(ticketMessage.user_id) !== userStore.user.id
            }"
          >
            <span class="hidden text-xs text-slate-500 group-hover:block">{{
              humanReadable(ticketMessage.createdAt)
            }}</span>
            <span
              :class="{
                'bg-green-500 text-slate-100':
                  parseInt(ticketMessage.user_id) === userStore.user.id,
                'bg-slate-300 text-slate-700':
                  parseInt(ticketMessage.user_id) !== userStore.user.id
              }"
              class="xl:[60%] 2xl:[50%] flex w-[90%] break-words rounded-md px-4 py-2 md:w-[75%]"
              >{{ ticketMessage.message }}</span
            >
          </div>
        </div>
        <div class="flex" v-if="parseInt(ticket.TicketStatus.id) === 1">
          <div class="relative flex flex-1 items-end gap-2">
            <textarea
              v-model="newMessage"
              class="h-[60px] max-h-[20vh] w-full flex-1 resize-none rounded-lg border border-slate-300 bg-white p-2 focus:outline-none"
              placeholder="Type your message here..."
              @keydown="kdown"
              ref="messageArea"
              id="messageArea"
            ></textarea>
            <button
              @click="sendMessage"
              class="flex items-center gap-1 rounded-lg bg-slate-700 py-4 px-4 transition-colors hover:bg-slate-800 active:bg-slate-900"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 495.003 495.003"
                stroke="currentColor"
                class="h-6 w-6 text-slate-200"
                fill="currentColor"
              >
                <g id="XMLID_51_">
                  <path
                    id="XMLID_53_"
                    d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616
          l-67.6-32.22V456.687z"
                  />
                  <path
                    id="XMLID_52_"
                    d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422
          c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414
          l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956
          L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { singleButtonSwal, yesNoSwal } from '~~/utils/swal';
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
const route = useRoute();
const router = useRouter();
dayjs.extend(relativeTime);
const newMessage = ref('');
const messageArea = ref(null);
defineExpose({ messageArea });
const userStore = useUserStore();
const ticket_id = route.params.id;
const fetchTicket = async () =>
  await $fetch('http://localhost:3100/api/admin/support/' + ticket_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userStore.token
    }
  });
const {
  data
}: {
  data: Ref<{
    ticket?: {
      id: number;
      TicketStatus: any;
      TicketMessages?: any[];
      subject: string;
      createdAt: string;
    };
  }>;
} = await useAsyncData('fetchTicket', fetchTicket);
const ticket = computed(() => data.value.ticket);
const refreshTicket = async () => {
  return await fetchTicket();
};
onMounted(() => {
  nextTick(() => {
    messageArea.value.focus();
  });
});
const sendMessage = async () => {
  if (newMessage.value.length > 0) {
    const ticketMessage = {
      message: newMessage.value,
      ticket_id: route.params.id
    };
    const answer: { success: boolean } = await $fetch(
      'http://localhost:3100/api/admin/support/send-message',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userStore.token
        },
        body: ticketMessage
      }
    );
    if (!answer.success)
      singleButtonSwal.fire('Error!', 'Something went wrong.', 'error');
    else {
      newMessage.value = '';
      data.value = await refreshTicket();
    }
  }
};
const markAsSolved = async (status: number) => {
  let status_text = '';
  switch (status) {
    case 1:
      status_text = 'In Progress';
      break;
    case 2:
      status_text = 'Solved';
      break;
    case 3:
      status_text = 'Closed';
      break;
  }
  yesNoSwal
    .fire({
      title: `Mark as ${status_text}?`,
      html: `Are you sure you want to mark this ticket as <b>${status_text}</b>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, mark as ${status_text}!`
    })
    .then(async (result) => {
      if (result.value) {
        const answer: { success: boolean } = await $fetch(
          'http://localhost:3100/api/admin/support/mark',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userStore.token
            },
            body: {
              ticket_id: route.params.id,
              status: status
            }
          }
        );
        if (!answer.success)
          singleButtonSwal.fire('Error!', 'Something went wrong.', 'error');
        else {
          singleButtonSwal
            .fire(
              'Success!',
              `The ticket has been marked as ${status_text}.`,
              'success'
            )
            .then(() => {
              router.push('/admin/support');
            });
        }
      }
    });
};
watch(newMessage, () => {
  messageArea.value.style.height =
    messageArea.value.scrollHeight > messageArea.value.clientHeight
      ? messageArea.value.scrollHeight + 'px'
      : '60px';
});
const kdown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
const humanReadable = (date: string) => {
  return dayjs(date).fromNow();
};
definePageMeta({
  layout: 'admin'
});
useMeta({
  title: `${ticket.value.subject} - Support - Admin - Retwisst B2B`
});
</script>

<style>
textarea {
  transition: height 0.2s;
}
</style>

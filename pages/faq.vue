<template>
  <div v-if="userStore?.token">
    <AuthHead></AuthHead>
    <div class="mt-4 flex items-center justify-between">
      <span class="block w-full text-4xl">FAQ</span>
      <input
        type="text"
        v-model="query"
        class="rounded-md border border-slate-200 px-4 py-2 text-slate-700 placeholder-slate-400 focus:outline-none"
        placeholder="Search"
      />
    </div>
    <div class="mt-6 flex flex-col gap-2" v-if="qaFiltered.length > 0">
      <Disclosure as="div" v-for="q in qaFiltered" v-slot="{ open }">
        <DisclosureButton
          class="flex w-full justify-between rounded-t-lg bg-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-800 transition-colors hover:bg-slate-300 focus:outline-none focus-visible:ring"
          :class="{
            'rounded-b-lg': !open,
            'bg-slate-600 !text-white hover:bg-slate-600': open
          }"
          ><span>{{ q.question }}</span
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
            class="rounded-b-lg bg-slate-100 px-4 pt-4 pb-2 text-sm"
            >{{ q.answer }}</DisclosurePanel
          ></transition
        >
      </Disclosure>
    </div>
    <div v-else class="mt-6 flex flex-col gap-2">
      <span class="text-2xl text-slate-700">No Results Found</span>
      <span class="text-lg text-slate-500"
        >We cannot find any question or answer with your search. You can still
        contact with our sales team and they will happily answer your questions!
      </span>
      <div>
        <NuxtLink
          to="/support"
          class="flex max-w-max items-center justify-center gap-2 rounded-md bg-retwisst-green-darkest py-2 px-8 text-sm font-light text-white shadow-sm transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
        >
          <span class="font-bold uppercase">Contact Sales</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~~/store';
import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/vue';
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
const userStore = useUserStore();
const query = ref('');
let { data }: { data: Ref<{ qa?: [{ question?: string; answer?: string }] }> } =
  await useAsyncData('faq1', () =>
    $fetch('http://localhost:3100/api/faq?language=1', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userStore.token}`
      }
    })
  );
const qa = data.value.qa || [];
const qaFiltered = computed(() => {
  const qv = query.value.toLowerCase();
  return qa.filter((q) => {
    return (
      q.question.toLowerCase().includes(qv) ||
      q.answer.toLowerCase().includes(qv)
    );
  });
});
</script>

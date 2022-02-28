<template>
  <TransitionRoot appear :show="props.isOpen" as="div">
    <Dialog as="div">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-black bg-opacity-70"
              @click="cls"
            />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ props.type }} New Address
              </DialogTitle>
              <div class="mt-4 flex flex-col gap-4">
                <div class="group relative">
                  <input
                    type="text"
                    class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.address.name"
                  />

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.address.name.length > 0
                    }"
                    >Name</span
                  >
                </div>
                <div class="group relative">
                  <input
                    type="text"
                    class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.address.street"
                  />

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.address.street.length > 0
                    }"
                    >Street</span
                  >
                </div>
                <div class="group relative">
                  <input
                    type="text"
                    class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.address.zip"
                  />

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.address.zip.length > 0
                    }"
                    >Zip Code</span
                  >
                </div>
                <div class="group relative">
                  <input
                    type="text"
                    class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.address.city"
                  />

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.address.city.length > 0
                    }"
                    >City</span
                  >
                </div>
                <div class="group relative">
                  <input
                    type="text"
                    class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.address.state"
                  />

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.address.state.length > 0
                    }"
                    >State</span
                  >
                </div>
                <div class="group relative">
                  <input
                    type="text"
                    class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.address.country"
                  />

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.address.country.length > 0
                    }"
                    >Country</span
                  >
                </div>
              </div>

              <div class="mt-4 flex gap-2">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
                  @click="save"
                >
                  Save
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-slate-500 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                  @click="cls"
                >
                  Cancel
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue';
import { useUserStore } from '~~/store';
import { singleButtonSwal } from '~~/utils/swal';
const user = useUserStore();
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'Add'
  },
  address: {
    type: Object,
    default: () => ({
      name: '',
      street: '',
      zip: '',
      city: '',
      state: '',
      country: '',
      id: -1
    })
  }
});
const emits = defineEmits(['cls']);
const cls = () => {
  emits('cls');
};
const save = async () => {
  const ans: { success?: boolean } = await user.updateOrCreateAddress(
    props.address
  );
  if (ans.success === true) {
    emits('cls');
    singleButtonSwal.fire(
      'Success!',
      `Your address has been ${
        props.address.id === -1 || props.address.id === ''
          ? 'created.'
          : 'updated.'
      }`,
      'success'
    );
  } else singleButtonSwal.fire('Error!', 'Something went wrong.', 'error');
};
</script>

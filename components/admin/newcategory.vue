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
                Create New Category
              </DialogTitle>
              <div class="mt-4 flex flex-col gap-4">
                <div class="group relative">
                  <input
                    type="text"
                    class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.category.name"
                  />

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.category.name.length > 0
                    }"
                    >Name</span
                  >
                </div>
                <div class="group relative">
                  <input
                    type="text"
                    class="relative w-full rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.category.slug"
                  />

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.category.slug.length > 0
                    }"
                    >Slug</span
                  >
                </div>
                <div class="group relative">
                  <textarea
                    type="text"
                    class="relative w-full resize-none rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                    v-model="props.category.description"
                    rows="6"
                  ></textarea>

                  <span
                    class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                    :class="{
                      '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                        props.category.description.length > 0
                    }"
                    >Description</span
                  >
                </div>
              </div>

              <div class="mt-4 flex gap-2">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
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
  category: {
    type: Object,
    default: () => ({
      name: '',
      slug: '',
      description: ''
    })
  }
});
const emits = defineEmits(['cls', 'success']);
const cls = () => {
  emits('cls');
};
const save = async () => {
  const ans: { success?: boolean } = await $fetch(
    'http://localhost:3100/api/admin/categories/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: {
        name: props.category.name,
        slug: props.category.slug,
        description: props.category.description
      }
    }
  );
  if (ans.success === true) {
    emits('success');
    emits('cls');
    singleButtonSwal.fire(
      'Success!',
      `New category has been created.`,
      'success'
    );
  } else singleButtonSwal.fire('Error!', 'Something went wrong.', 'error');
};
</script>

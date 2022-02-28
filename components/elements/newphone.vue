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
                New Phone
              </DialogTitle>
              <div class="mt-4 flex flex-col gap-4">sa.</div>

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
  phone: {
    type: Object,
    default: () => ({
      number: '1234567'
    })
  }
});
const emits = defineEmits(['cls']);
const cls = () => {
  emits('cls');
};

const save = async () => {
  const ans: {
    success?: boolean;
    errors?: [{ type: string; message: string }];
  } = await user.createPhone(props.phone);
  if (ans.success === true) {
    emits('cls');
    singleButtonSwal.fire(
      'Success!',
      `Your phone number has been ${
        props.phone.id === -1 || props.phone.id === '' ? 'created.' : 'updated.'
      }`,
      'success'
    );
  } else if (ans.errors.length > 0 && ans.errors[0].type === 'unique') {
    singleButtonSwal.fire('Error!', ans.errors[0].message, 'error');
  } else {
    singleButtonSwal.fire('Error!', 'Something went wrong.', 'error');
  }
};
</script>

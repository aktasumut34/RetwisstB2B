<template>
  <div v-if="userStore?.token">
    <AuthHead></AuthHead>
    <div class="flex flex-col divide-y">
      <div class="flex flex-col gap-4 py-8 px-2">
        <div class="flex items-center gap-4 lg:gap-6">
          <span class="text-2xl uppercase text-slate-700">Addresses</span>
          <button
            class="flex items-center gap-1 rounded-md bg-retwisst-green-darkest px-4 py-1 text-white transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
            @click="createAddress()"
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
            <span>New Address</span>
          </button>
        </div>
        <div
          v-if="userStore.user?.Addresses?.length > 0"
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="address in userStore.user.Addresses"
            class="flex h-[200px] flex-col gap-4 rounded-lg border border-slate-200 px-6 py-4 shadow-sm"
          >
            <div class="flex items-center justify-between">
              <div class="text-xl uppercase text-slate-700 xl:text-2xl">
                {{ address.name.substr(0, 25) }}
                <span v-if="address.name.length > 25">...</span>
              </div>
              <div class="flex items-center gap-1">
                <button
                  class="group rounded-full p-1 text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200"
                  @click="updateAddress(address)"
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  class="group rounded-full p-1 text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200"
                  @click="removeAddress(address)"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex flex-col">
              <span>{{ address.street }}</span>
              <span>{{ address.zip }}</span>
              <span>{{ address.city }}, {{ address.state }}</span>
              <span class="mt-4 font-bold">{{ address.country }}</span>
            </div>
          </div>
        </div>
        <div v-else class="text-lg text-slate-600">
          Sorry, you don't have any addresses. Please add one to continue.
        </div>
      </div>
      <div class="flex flex-col gap-4 py-8 px-2">
        <div class="flex items-center gap-4 lg:gap-6">
          <span class="text-2xl uppercase text-slate-700">Phone Numbers</span>
          <button
            class="flex items-center gap-1 rounded-md bg-retwisst-green-darkest px-4 py-1 text-white transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
            @click="setIsOpenPhone(true)"
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
            <span>New Phone</span>
          </button>
        </div>
        <div
          v-if="userStore.user?.Phones?.length > 0"
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(phone, index) in userStore.user.Phones"
            class="flex flex-col gap-4 rounded-lg border border-slate-200 px-6 py-4 shadow-sm"
          >
            <div class="flex items-center justify-between">
              <div class="text-xl uppercase text-slate-700 xl:text-2xl">
                PHONE {{ index + 1 }}
              </div>
              <div class="flex items-center gap-1">
                <button
                  class="group rounded-full p-1 text-retwisst-green-normal transition-colors hover:bg-slate-100 active:bg-slate-200"
                  v-if="!phone.verified"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  class="group rounded-full p-1 text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200"
                  @click="removePhone(phone)"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <span
                >Number: <span class="font-bold">{{ phone.number }}</span></span
              >
              <span
                class="flex items-center gap-1 py-1 text-retwisst-green-normal"
                v-if="phone.verified"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Verified </span
              ><span
                class="flex items-center justify-between gap-1 text-retwisst-purple-normal"
                v-else
                ><div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Not Verified</span>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-lg text-slate-600">
          Sorry, you don't have any phones. Please add one to continue.
        </div>
      </div>
    </div>

    <ElementsNewaddress
      :isOpen="isOpenAddress"
      @cls="setIsOpenAddress(false)"
      :address="addressProp"
      :type="addressTypeProp"
    ></ElementsNewaddress>

    <ElementsNewphone
      :isOpen="isOpenPhone"
      @cls="setIsOpenPhone(false)"
    ></ElementsNewphone>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~~/store';
import 'sweetalert2/src/sweetalert2.scss';
import { singleButtonSwal, yesNoSwal } from '~~/utils/swal';
const userStore = useUserStore();
const isOpenAddress = ref(false);
const isOpenPhone = ref(false);
const addressProp = reactive({
  name: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  id: -1
});
const addressTypeProp = ref('Create');
const setIsOpenAddress = (value: boolean) => {
  isOpenAddress.value = value;
};
const setIsOpenPhone = (value: boolean) => {
  isOpenPhone.value = value;
};
const createAddress = () => {
  Object.keys(addressProp).forEach((k) => {
    addressProp[k] = '';
  });
  addressTypeProp.value = 'Create';
  setIsOpenAddress(true);
};
const updateAddress = (address: {}) => {
  Object.keys(addressProp).forEach((k) => {
    addressProp[k] = address[k];
  });
  addressTypeProp.value = 'Update';
  setIsOpenAddress(true);
};

const removeAddress = (address) => {
  yesNoSwal
    .fire({
      title: 'Are you sure?',
      html: `<b>${address.name}</b> will be deleted and you won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const ans: { success?: boolean } = await userStore.removeAddress(
          address.id
        );
        if (ans.success)
          singleButtonSwal.fire(
            'Deleted!',
            'Your address has been deleted.',
            'success'
          );
        else singleButtonSwal.fire('Error!', 'Something went wrong.', 'error');
      }
    });
};
const removePhone = (phone) => {
  yesNoSwal
    .fire({
      title: 'Are you sure?',
      html: `<b>${phone.number}</b> will be deleted and you won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const ans: { success?: boolean } = await userStore.removePhone(
          phone.id
        );
        if (ans.success)
          singleButtonSwal.fire(
            'Deleted!',
            'Your phone number has been deleted.',
            'success'
          );
        else singleButtonSwal.fire('Error!', 'Something went wrong.', 'error');
      }
    });
};
</script>

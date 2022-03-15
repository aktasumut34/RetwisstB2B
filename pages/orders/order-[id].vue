<template>
  <div v-if="userStore?.token">
    <TransitionRoot appear :show="isOpenFileUpload" as="div">
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
                @click="setIsOpenFileUpload(false)"
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
                  Upload Payment Notice
                </DialogTitle>
                <div class="mt-4 flex flex-col gap-5">
                  <div class="flex flex-col gap-1">
                    <span
                      >File
                      <span class="text-xs text-slate-500"
                        >(png, jpg or pdf files are accepted)</span
                      ></span
                    >
                    <input
                      class="block w-full cursor-pointer rounded-lg border border-slate-100 bg-slate-50 px-2 py-1 text-sm text-gray-900 focus:border-transparent focus:outline-none"
                      type="file"
                      @change="fileUpload"
                    />
                  </div>
                  <div class="group relative">
                    <textarea
                      type="text"
                      class="relative w-full resize-none rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                      v-model="fileDescription"
                      rows="6"
                    ></textarea>

                    <span
                      class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                      :class="{
                        '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                          fileDescription.length > 0
                      }"
                      >Description</span
                    >
                  </div>
                </div>

                <div class="mt-4 flex gap-2">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
                    @click="uploadFile"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-slate-500 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    @click="setIsOpenFileUpload(false)"
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
    <div class="flex flex-1 flex-col gap-6" id="printable">
      <div class="flex items-center justify-between gap-4 lg:gap-6">
        <NuxtLink
          to="/orders"
          class="no-print flex h-8 w-8 items-center justify-center gap-1 rounded-sm bg-slate-700 text-white transition-colors hover:bg-slate-800 active:bg-slate-900"
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
            /></svg></NuxtLink
        ><span class="block w-full text-3xl font-thin">ORDER #{{ id }}</span>
      </div>
      <div class="flex gap-4">
        <button
          v-print="printObj"
          class="no-print rounded-md bg-sky-600 px-4 py-1 text-white transition-colors hover:bg-sky-700 active:bg-sky-900"
        >
          <span
            v-if="printLoading"
            class="flex items-center justify-center gap-2"
            ><i class="pi pi-spin pi-spinner"></i><span>Preparing</span></span
          >
          <span v-else class="flex items-center justify-center gap-2"
            ><i class="pi pi-print"></i><span>Print</span></span
          >
        </button>
        <button
          class="no-print rounded-md bg-blue-600 px-4 py-1 text-white transition-colors hover:bg-blue-700 active:bg-blue-900"
          @click="setIsOpenFileUpload(true)"
        >
          <span class="flex items-center justify-center gap-2"
            ><i class="pi pi-plus"></i><span>Payment Notice</span></span
          >
        </button>
      </div>
      <div class="flex flex-col">
        <div class="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
          <div class="flex flex-col gap-2">
            <div class="text-xl font-light text-slate-700">
              Shipping Address
            </div>
            <div
              class="flex flex-1 rounded-lg bg-sky-900 bg-opacity-75 px-5 py-4 text-white shadow-md"
            >
              <div class="flex">
                <div class="text-sm">
                  <p class="text-xl font-medium text-white">
                    {{ address.name }}
                  </p>
                  <span class="flex flex-col text-sky-100">
                    <span>{{ address.street }}</span>
                    <span>{{ address.zip }}</span>
                    <span>{{ address.city }}, {{ address.state }}</span>
                    <span class="mt-4 font-bold">{{ address.country }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-xl font-light text-slate-700">Shipping Method</div>
            <div
              class="flex flex-1 rounded-lg bg-blue-900 bg-opacity-75 px-5 py-4 text-white shadow-md"
            >
              <div class="flex">
                <div class="text-sm">
                  <p class="font-medium">
                    <span class="text-xl text-white">{{ method.acronym }}</span>
                  </p>
                  <p class="mb-2 font-medium">
                    <span class="mr-2 text-sm text-slate-100">{{
                      method.name
                    }}</span>
                  </p>
                  <span class="flex flex-col text-sky-100">
                    <span>{{ method.description }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="text-xl font-light text-slate-700">Current Status</div>
            <div
              class="flex flex-1 overflow-hidden rounded-lg bg-opacity-75 px-5 py-4 text-white shadow-md"
              :style="{
                backgroundColor: getStatusBackgroundColor(status.type)
              }"
            >
              <div class="flex-1 text-sm">
                <p class="font-medium">
                  <span class="text-xl text-white">{{ status.name }}</span>
                </p>
                <span class="flex flex-col text-lg text-white">
                  <span>{{ status.description }}</span>
                </span>
              </div>
              <div>
                <i
                  class="no-print !text-9xl opacity-90"
                  :class="'pi pi-' + getStatusIcon(status.type)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid flex-1 grid-cols-1 gap-12 divide-x-0 xl:grid-cols-2 xl:gap-0 xl:divide-x"
      >
        <div class="flex flex-col gap-2 px-3">
          <div class="text-xl font-light text-slate-700">PRODUCTS</div>
          <div class="flex flex-col divide-y">
            <div
              class="grid grid-cols-12 items-center justify-center gap-2 rounded-sm py-4"
              v-for="cartItem in items"
            >
              <div
                class="hidden items-center justify-center text-slate-700 sm:col-span-2 sm:flex"
              >
                <img :src="cartItem.Variant.Images[0].image" class="max-h-20" />
              </div>
              <div class="col-span-4 flex flex-col">
                <span>{{
                  cartItem.Variant.Product.ProductDescriptions[0].name
                }}</span>
                <span class="text-sm text-slate-600">
                  {{
                    cartItem.Variant.ProductVariantOptionValues.map((o) =>
                      o.value.toUpperCase()
                    ).join(', ')
                  }}
                </span>
                <span class="text-xs text-slate-600">
                  {{ cartItem.Variant.productPerBox }} pieces per box
                </span>
                <span class="text-xs text-slate-600">
                  {{ cartItem.Variant.boxPerPallet }} box per pallet
                </span>
              </div>
              <div class="col-span-2 flex flex-col items-center justify-center">
                <span class="text-center text-sm font-light text-slate-600"
                  >Qty.</span
                >
                <span class="text-lg font-semibold text-slate-700">{{
                  cartItem.quantity
                }}</span>
                <span class="text-center text-xs font-extralight text-slate-700"
                  >({{
                    cartItem.quantity * cartItem.Variant.productPerBox
                  }}
                  pcs.)</span
                >
              </div>
              <div
                class="col-span-3 flex flex-col items-center justify-center sm:col-span-2"
              >
                <span class="text-center text-sm font-light text-slate-600">
                  Price</span
                >
                <span
                  class="whitespace-nowrap text-lg font-semibold text-slate-700"
                  >$ {{ cartItem.unitPrice.toFixed(2) }}</span
                >
                <span
                  class="whitespace-nowrap text-xs font-extralight text-slate-700"
                  >($
                  {{
                    (
                      cartItem.unitPrice / cartItem.Variant.productPerBox
                    ).toFixed(2)
                  }}
                  per pc.)</span
                >
              </div>
              <div
                class="col-span-3 flex flex-col items-center justify-center sm:col-span-2"
              >
                <span class="text-sm font-light text-slate-600">Total</span>
                <span
                  class="whitespace-nowrap text-lg font-semibold text-slate-700"
                  >$
                  {{
                    (cartItem.unitPrice * cartItem.quantity).toFixed(2)
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-12 px-3">
          <div
            class="flex flex-col gap-2"
            :class="{ 'no-print': history.length <= 0 }"
          >
            <div class="text-xl font-light text-slate-700">
              ORDER STATUS HISTORY
            </div>
            <div class="flex flex-col gap-4" v-if="history.length > 0">
              <div
                class="flex items-center gap-12 rounded-md px-4 py-2 text-white shadow-md"
                :style="{
                  backgroundColor: getStatusBackgroundColor(h.OrderStatus.type)
                }"
                v-for="(h, index) in history"
              >
                <div class="text-2xl">#{{ history.length - index }}</div>
                <div class="flex flex-1 flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <div>{{ h.description }}</div>
                    <div class="text-xs text-slate-100">
                      {{ dayjs(h.createdAt).format('LLL') }}
                    </div>
                  </div>
                  <div class="text-sm">
                    <i
                      class="no-print !text-sm opacity-90"
                      :class="'pi pi-' + getStatusIcon(h.OrderStatus.type)"
                    />
                    {{ h.OrderStatus.name }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col rounded-lg bg-slate-700 px-4 py-4 text-slate-100"
              v-else
            >
              <span class="text-lg font-bold">No History</span>
              <span class="text-md font-light"
                >Your order (#{{ id }}) doesn't have any status history. When
                anything about your order gets updated, your order status will
                appear here.</span
              >
            </div>
          </div>
          <div class="no-print flex flex-col gap-2">
            <div class="text-xl font-light text-slate-700">UPLOADED FILES</div>
            <div class="flex flex-col gap-4" v-if="files.length > 0">
              <div
                class="flex items-center gap-12 rounded-md px-4 py-2 text-slate-700 shadow-md"
                v-for="(f, index) in files"
              >
                <div class="text-2xl">#{{ files.length - index }}</div>
                <div class="flex flex-1 flex-col gap-2">
                  <div class="flex items-center justify-between">
                    <div>{{ f.description || 'No description.' }}</div>
                    <div class="text-xs text-slate-500">
                      {{ dayjs(f.createdAt).format('LLL') }}
                    </div>
                  </div>
                  <div class="text-sm">
                    <a :href="f.file" target="_blank">
                      <i class="no-print pi pi-external-link mr-1 !text-sm" />
                      Show File
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col rounded-lg bg-slate-700 px-4 py-4 text-slate-100"
              v-else
            >
              <span class="text-lg font-bold">No Files</span>
              <span class="text-md font-light"
                >Your order (#{{ id }}) doesn't have any uploaded files. You can
                upload your payment notice with the "Payment Notice" button
                above.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { useUserStore } from '~~/store';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue';
import { singleButtonSwal } from '~~/utils/swal';

dayjs.extend(LocalizedFormat);
const userStore = useUserStore();
const route = useRoute();
const id = route.params.id;
const fetchOrder = async () =>
  await $fetch(`http://localhost:3100/api/order/one/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  });
const {
  data
}: {
  data: Ref<{
    order?: {
      id?: number;
      OrderItems?: [
        {
          Variant?: {
            price: number;
            Product?: { ProductDescriptions?: [{ name: string }] };
            Images?: [{ [key: string]: string }];
            ProductVariantOptionValues?: [{ [key: string]: string }];
            boxPerPallet: number;
            productPerBox: number;
          };
          unitPrice: number;
          quantity: number;
        }
      ];
      OrderStatus?: {
        OrderStatus: { name: string; id: number };
        createdAt: string;
        type: string;
        description: string;
        name: string;
      };
      OrderStatusHistories?: [
        {
          OrderStatus?: {
            OrderStatus: { name: string; id: number };
            createdAt: string;
            type: string;
            description: string;
            name: string;
          };
          description: string;
          createdAt: string;
          name: string;
        }
      ];
      ShippingAddress?: { [key: string]: string };
      ShippingMethod?: { [key: string]: string };
      OrderFiles?: [
        { id: number; file: string; createdAt: string; description: string }
      ];
      totalPrice?: number;
      status?: string;
      createdAt: string;
    };
    success?: boolean;
  }>;
} = await useAsyncData('order', fetchOrder);
const order = computed(() => data.value.order);
const items = computed(() => order.value.OrderItems);
const address = computed(() => order.value.ShippingAddress);
const method = computed(() => order.value.ShippingMethod);
const status = computed(() => order.value.OrderStatus);
const history = computed(() => order.value.OrderStatusHistories);
const files = computed(() => order.value.OrderFiles);

const getStatusBackgroundColor = (type: string) => {
  switch (type) {
    case 'info':
      return '#5bc0de';
    case 'success':
      return '#5cb85c';
    case 'warning':
      return '#f0ad4e';
    case 'danger':
      return '#d9534f';
    default:
      return '#d9edf7';
  }
};
const getStatusIcon = (type: string) => {
  switch (type) {
    case 'info':
      return 'clock';
    case 'success':
      return 'check-circle';
    case 'warning':
      return 'exclamation-circle';
    case 'danger':
      return 'times-circle';
    default:
      return 'circle';
  }
};

const printLoading = ref(false);

const printObj = {
  id: 'printable',
  popTitle: 'Retwisst B2B - Order #' + order.value.id,
  beforeOpenCallback: () => {
    printLoading.value = true;
  },
  openCallback: () => {
    printLoading.value = false;
  }
};

const isOpenFileUpload = ref(false);
const setIsOpenFileUpload = (value: boolean) => {
  isOpenFileUpload.value = value;
};
const file = ref('');
const fileDescription = ref('');
const fileUpload = (event) => {
  file.value = event.target.files[0];
};
const uploadFile = async () => {
  let formData = new FormData();
  formData.append('file', file.value);
  formData.append('id', order.value.id.toString());
  formData.append('description', fileDescription.value);
  const { success }: { success?: boolean } = await $fetch(
    `http://localhost:3100/api/order/upload-file`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userStore.token}`
      },
      body: formData
    }
  );
  if (success)
    singleButtonSwal
      .fire('Success', 'File uploaded successfully.', 'success')
      .then(async () => {
        setIsOpenFileUpload(false);
        data.value = await fetchOrder();
      });
  else
    singleButtonSwal.fire(
      'Error',
      'Something went wrong. Please try again.',
      'error'
    );
};
useMeta({
  title: `ORDER #${id} - Orders - Retwisst B2B`
});
</script>

<style lang="scss">
@media print {
  .p-paginator {
    display: none !important;
  }
  .no-print,
  .no-print * {
    display: none !important;
  }
}
</style>

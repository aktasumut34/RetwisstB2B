<template>
  <div v-if="userStore?.token">
    <AuthHead></AuthHead>
    <div class="flex flex-col gap-6" id="printable">
      <div class="flex items-center justify-between gap-4 lg:gap-6">
        <NuxtLink
          to="/orders"
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
            /></svg></NuxtLink
        ><span class="block w-full text-3xl font-thin">ORDER #{{ id }}</span>
      </div>
      <div class="flex flex-col items-start">
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
        class="grid grid-cols-1 gap-12 divide-x-0 xl:grid-cols-2 xl:gap-0 xl:divide-x"
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
              <div class="col-span-6 flex flex-col sm:col-span-4">
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
                <span class="text-sm font-light text-slate-600">Qty.</span>
                <span class="text-lg font-semibold text-slate-700">{{
                  cartItem.quantity
                }}</span>
              </div>
              <div class="col-span-2 flex flex-col items-center justify-center">
                <span class="text-sm font-light text-slate-600"
                  >Unit Price</span
                >
                <span
                  class="whitespace-nowrap text-lg font-semibold text-slate-700"
                  >$ {{ cartItem.Variant.price.toFixed(2) }}</span
                >
              </div>
              <div class="col-span-2 flex flex-col items-center justify-center">
                <span class="text-sm font-light text-slate-600">Total</span>
                <span
                  class="whitespace-nowrap text-lg font-semibold text-slate-700"
                  >$
                  {{
                    (cartItem.Variant.price * cartItem.quantity).toFixed(2)
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 px-3">
          <div class="text-xl font-light text-slate-700">
            ORDER STATUS HISTORY
          </div>
          <div class="flex flex-col divide-y" v-if="history.length > 0"></div>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { useUserStore } from '~~/store';
const userStore = useUserStore();
const route = useRoute();
const id = route.params.id;

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
          quantity: number;
        }
      ];
      OrderStatus?: { [key: string]: string };
      OrderStatusHistories?: [{ [key: string]: string }];
      ShippingAddress?: { [key: string]: string };
      ShippingMethod?: { [key: string]: string };
      totalPrice?: number;
      status?: string;
    };
    success?: boolean;
  }>;
} = await useAsyncData('order', () =>
  $fetch(`http://localhost:3100/api/order/one/${id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
);
const order = data.value.order;
const items = order.OrderItems;
const address = order.ShippingAddress;
const method = order.ShippingMethod;
const status = order.OrderStatus;
const history = order.OrderStatusHistories;

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
  popTitle: 'Retwisst B2B - Order #' + order.id,
  beforeOpenCallback: () => {
    printLoading.value = true;
  },
  openCallback: () => {
    printLoading.value = false;
  }
};

useMeta({
  title: `ORDER #${id} - Orders - Retwisst B2B`
});
</script>

<style lang="scss">
@media print {
  .no-print,
  .no-print * {
    display: none !important;
  }
}
</style>

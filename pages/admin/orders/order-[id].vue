<template>
  <div class="mainContent flex h-full flex-1 flex-col gap-4">
    <TransitionRoot appear :show="isOpenAddStatus" as="div">
      <Dialog as="div">
        <div class="fixed inset-0 overflow-y-auto">
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
                @click="setIsOpenAddStatus(false)"
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
                class="my-8 inline-block w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Order Status History
                </DialogTitle>
                <div class="mt-4 flex flex-col gap-4">
                  <Listbox class="z-[10]" v-model="selectedStatus">
                    <div class="relative mt-1">
                      <ListboxButton
                        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                      >
                        <span class="block truncate">{{
                          selectedStatus.name
                        }}</span>
                        <span
                          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            />
                          </svg>
                        </span>
                      </ListboxButton>

                      <transition
                        leave-active-class="transition duration-100 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <ListboxOptions
                          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                          <ListboxOption
                            v-slot="{ active, selected }"
                            v-for="status in statuses"
                            :key="status.id"
                            :value="status"
                            as="template"
                          >
                            <li
                              :class="[
                                active
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-10 pr-4'
                              ]"
                            >
                              <span
                                :class="[
                                  selected ? 'font-medium' : 'font-normal',
                                  'block truncate'
                                ]"
                                >{{ status.name }}</span
                              >
                              <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </span>
                            </li>
                          </ListboxOption>
                        </ListboxOptions>
                      </transition>
                    </div>
                  </Listbox>
                  <div class="group relative">
                    <textarea
                      type="text"
                      class="relative w-full resize-none rounded border-0 bg-white py-3 pl-6 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
                      v-model="statusDescription"
                      rows="6"
                    ></textarea>

                    <span
                      class="pointer-events-none absolute top-2 left-6 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
                      :class="{
                        '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                          statusDescription.length > 0
                      }"
                      >Description</span
                    >
                  </div>
                </div>
                <div class="mt-4 flex flex-col gap-4"></div>
                <div class="mt-4 flex gap-2">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
                    @click="addStatus"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-slate-500 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                    @click="setIsOpenAddStatus(false)"
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
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold"
        >ORDER: #{{ order.id
        }}<span class="text-lg font-normal">
          &lt;{{ dayjs(order.createdAt).format('LLL') }}&gt;</span
        ></span
      >
    </div>
    <div class="flex items-center justify-between gap-4 px-6 lg:gap-6">
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
      ><span class="block w-full text-3xl font-thin"
        >ORDER #{{ order.id }}</span
      >
    </div>
    <div class="flex flex-1 flex-col gap-12 px-6" id="printable">
      <div class="flex flex-col gap-4">
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
        <div class="grid grid-cols-1 items-stretch gap-4 md:grid-cols-4">
          <div class="flex flex-col gap-2">
            <div class="text-xl font-light text-slate-700">Customer</div>
            <div
              class="flex flex-1 rounded-lg bg-green-700 bg-opacity-75 px-5 py-4 text-white shadow-md"
            >
              <div class="flex">
                <div class="flex flex-col">
                  <p class="text-xl font-medium text-white">
                    {{ customer.name }}
                  </p>
                  <span class="flex flex-col text-sky-100">
                    <span>{{ customer.email }}</span>
                  </span>
                  <div class="flex flex-1 items-end">
                    <NuxtLink
                      class="flex items-center gap-2"
                      :to="`/admin/users/user-${customer.id}`"
                      ><span>Details</span>
                      <i class="pi pi-chevron-right !text-sm"></i
                    ></NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <div class="self-center">
                <i
                  class="no-print !text-7xl opacity-90"
                  :class="'pi pi-' + getStatusIcon(status.type)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <Datatable
          :value="items"
          :auto-layout="true"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          :rowsPerPageOptions="[10, 25, 50]"
          class="p-datatable-customers"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <h5 class="m-0 text-2xl">ORDER ITEMS</h5>
                <button
                  class="flex items-center gap-1 rounded-md bg-blue-500 px-4 py-1 text-white transition-colors hover:bg-blue-600 active:bg-blue-700"
                  @click="updateOrderItems"
                >
                  <i class="pi pi-refresh"></i>
                  <span>Update Order</span>
                </button>
              </div>
              <div class="flex items-center">
                ORDER TOTAL : ${{
                  order.totalPrice.toLocaleString('en', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }}
              </div>
            </div>
          </template>
          <Column header="Model">
            <template #body="{ data }">
              {{ data.Variant.model }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="{ data }">
              <img :src="data.Variant.Images[0].image" class="max-h-20" />
            </template>
          </Column>
          <Column header="Product Details">
            <template #body="{ data }">
              <div class="col-span-4 flex flex-col">
                <span>{{
                  data.Variant.Product.ProductDescriptions[0].name
                }}</span>
                <span class="text-sm text-slate-600">
                  {{
                    data.Variant.ProductVariantOptionValues.map((o) =>
                      o.value.toUpperCase()
                    ).join(', ')
                  }}
                </span>
                <span class="text-xs text-slate-600">
                  {{ data.Variant.productPerBox }} pieces per box
                </span>
                <span class="text-xs text-slate-600">
                  {{ data.Variant.boxPerPallet }} box per pallet
                </span>
              </div>
            </template>
          </Column>
          <Column field="quantity" header="Quantity">
            <template #body="{ data }">
              <div class="flex flex-col gap-2">
                <input
                  class="rounded-md border border-slate-300 px-4 py-1 focus:border-slate-600 focus:outline-none"
                  v-model="itemPropsReactive[data.variant_id].quantity"
                />
                <span class="text-xs"
                  >Current Quantity: {{ data.quantity }}</span
                >
              </div>
            </template>
          </Column>
          <Column field="price" header="Unit Price ($)">
            <template #body="{ data }">
              <div class="flex flex-col gap-2">
                <input
                  class="rounded-md border border-slate-300 px-4 py-1 focus:border-slate-600 focus:outline-none"
                  v-model="itemPropsReactive[data.variant_id].unitPrice"
                />
                <span class="text-xs"
                  >Default Price: {{ data.Variant.price.toFixed(2) }}</span
                >
              </div>
            </template>
          </Column>
          <Column header="Total Price">
            <template #body="{ data }"
              ><div class="w-[100px] overflow-x-auto">
                $
                {{
                  (
                    itemPropsReactive[data.variant_id].quantity *
                    itemPropsReactive[data.variant_id].unitPrice
                  ).toLocaleString('en', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })
                }}
              </div>
            </template>
          </Column>
          <template #empty> No products found in this Order. </template>
        </Datatable>
      </div>
      <div
        class="flex flex-col gap-6 px-3"
        :class="{ 'no-print': history.length <= 0 }"
      >
        <div class="flex gap-2">
          <h5 class="m-0 text-2xl">ORDER STATUS HISTORY</h5>
          <button
            class="flex items-center gap-1 rounded-md bg-green-500 px-4 py-1 text-white transition-colors hover:bg-green-600 active:bg-green-700"
            @click="setIsOpenAddStatus(true)"
          >
            <i class="pi pi-plus"></i>
            <span>Add Action</span>
          </button>
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
            >Order (#{{ order.id }}) doesn't have any status history. When
            anything about this order gets updated, order status will appear
            here.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store';
import dayjs from 'dayjs';
import { singleButtonSwal } from '~~/utils/swal';
import Datatable from 'primevue/datatable';
import Column from 'primevue/column';
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue';
dayjs.extend(LocalizedFormat);
const route = useRoute();
const userStore = useUserStore();
const order_id = route.params.id;
const fetchOrder = async () =>
  await $fetch('http://localhost:3100/api/admin/orders/' + order_id, {
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
    order?: {
      id?: number;
      User?: {
        name: string;
        id: number;
        email: string;
      };
      OrderItems?: [
        {
          variant_id: number;
          Variant?: {
            price: number;
            Product?: { ProductDescriptions?: [{ name: string }] };
            Images?: [{ [key: string]: string }];
            ProductVariantOptionValues?: [{ [key: string]: string }];
            boxPerPallet: number;
            productPerBox: number;
          };
          quantity: number;
          unitPrice: number;
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
      totalPrice?: number;
      status?: string;
      createdAt: string;
    };
    success?: boolean;
  }>;
} = await useAsyncData('fetchOrder', fetchOrder);
const { statuses }: { statuses?: any[] } = await $fetch(
  'http://localhost:3100/api/admin/orders/statuses',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userStore.token
    }
  }
);
const selectedStatus = ref(statuses[0]);
const order = computed(() => data.value.order);
const items = computed(() => order.value.OrderItems);
const address = computed(() => order.value.ShippingAddress);
const method = computed(() => order.value.ShippingMethod);
const status = computed(() => order.value.OrderStatus);
const history = computed(() => order.value.OrderStatusHistories);
const customer = computed(() => order.value.User);
const itemProps = {};
const isOpenAddStatus = ref(false);
const setIsOpenAddStatus = (value: boolean) => {
  isOpenAddStatus.value = value;
};

const statusDescription = ref('');
const addStatus = async () => {
  const { success }: { success?: boolean } = await $fetch(
    'http://localhost:3100/api/admin/orders/add-history',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userStore.token
      },
      body: {
        order_id: order.value.id,
        status_id: selectedStatus.value.id,
        description: statusDescription.value
      }
    }
  );
  setIsOpenAddStatus(false);
  if (success)
    singleButtonSwal
      .fire('Success', 'Order items updated successfully.', 'success')
      .then(async () => {
        data.value = await refreshOrder();
      });
  else
    singleButtonSwal
      .fire('Error', 'Something went wrong. Please try again.', 'error')
      .then(async () => {
        data.value = await refreshOrder();
      });
};
items.value.forEach((item) => {
  itemProps[item.variant_id] = {
    quantity: item.quantity,
    unitPrice: item.unitPrice
  };
});
const itemPropsReactive = reactive(itemProps);
const updateOrderItems = async () => {
  const { success }: { success?: boolean } = await $fetch(
    'http://localhost:3100/api/admin/orders/update-items',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userStore.token
      },
      body: {
        order_id: order_id,
        items: itemPropsReactive
      }
    }
  );
  if (success)
    singleButtonSwal
      .fire('Success', 'Order items updated successfully.', 'success')
      .then(async () => {
        data.value = await refreshOrder();
      });
  else
    singleButtonSwal
      .fire('Error', 'Something went wrong. Please try again.', 'error')
      .then(async () => {
        data.value = await refreshOrder();
      });
};

const refreshOrder = async () => {
  return await fetchOrder();
};
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
definePageMeta({
  layout: 'admin'
});
useMeta({
  title: `#${order.value.id} - Order - Admin - Retwisst B2B`
});
</script>

<style>
textarea {
  transition: height 0.2s;
}
</style>

<template>
  <div v-if="user?.token">
    <AuthHead></AuthHead>
    <div
      class="mt-4 grid grid-cols-1 gap-14 px-1 lg:grid-cols-2 lg:px-8"
      v-if="user?.user?.CartItems?.length > 0"
    >
      <div class="flex flex-col gap-6">
        <div class="flex">
          <span
            class="block w-full border-b border-slate-300 text-3xl font-thin"
            >CART</span
          >
        </div>
        <div class="flex flex-col divide-y">
          <div
            class="grid grid-cols-12 items-center justify-center gap-2 rounded-sm py-4"
            v-for="cartItem in user.user?.CartItems"
          >
            <div
              class="hidden items-center justify-center text-slate-700 sm:col-span-2 sm:flex"
            >
              <img :src="cartItem.Variant.Images[0].image" class="max-h-20" />
            </div>
            <div class="col-span-6 flex flex-col sm:col-span-5">
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
            <div class="col-span-5 flex flex-col gap-1 sm:col-span-4">
              <div class="text-sm text-slate-700">Box Quantity</div>
              <vue-number-input
                controls
                :min="1"
                :model-value="cartItem.quantity"
                @update:model-value="
                  (newVal, oldVal) => {
                    if (newVal !== cartItem.quantity)
                      updateCartItemQuantity(cartItem.id, newVal);
                  }
                "
                center
              ></vue-number-input>
              <div class="text-xs text-slate-700">
                ({{ cartItem.quantity * cartItem.Variant.productPerBox }} pcs.
                total)
              </div>
            </div>
            <div class="col-span-1 flex items-end justify-end">
              <button
                class="flex items-center justify-center rounded-full bg-slate-700 transition-colors hover:bg-slate-800 active:bg-slate-900"
                @click="removeCartItem(cartItem.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-between">
          <span class="text-2xl text-slate-700">SUBTOTAL</span>
          <span class="text-2xl text-slate-700"
            >${{
              user.user.CartItems.reduce(
                (prev, cur) => prev + cur.quantity * cur.Variant.price,
                0
              ).toFixed(2)
            }}</span
          >
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <div class="flex">
          <span
            class="block w-full border-b border-slate-300 text-3xl font-thin"
            >PALLET SUMMARY</span
          >
        </div>
        <div class="hidden flex-wrap lg:flex">
          <div
            class="flex w-1/3 flex-col rounded-sm px-1 py-1 lg:px-4 lg:py-2"
            v-for="fullPallet in Math.floor(percentage / 100)"
          >
            <div
              class="relative flex h-[30vw] max-h-[360px] flex-wrap items-end justify-end lg:h-[11vw] lg:max-h-[180px]"
            >
              <div
                class="absolute inset-0 flex items-center justify-center text-3xl font-bold text-retwisst-green-normal text-opacity-70"
              >
                100%
              </div>
              <div
                class="flex h-1/3 w-1/3 items-center justify-center"
                v-for="box in 9"
              >
                <img src="/box.svg" />
              </div>
            </div>
            <img src="/pallet_empty.svg" />
            <span class="mt-1 text-slate-700">PALLET {{ fullPallet }}</span>
          </div>
          <div
            class="flex w-1/3 flex-col px-1 py-1 lg:px-4 lg:py-2"
            v-if="Math.floor(percentage % 100) > 0"
          >
            <div
              class="relative flex h-[30vw] max-h-[360px] flex-wrap-reverse lg:h-[11vw] lg:max-h-[180px]"
            >
              <div
                class="absolute inset-0 flex items-center justify-center text-3xl font-bold text-retwisst-purple-normal text-opacity-70"
              >
                ~{{ Math.floor(percentage % 100) }}%
              </div>
              <div
                class="flex h-1/3 w-1/3 items-center justify-center"
                :id="box.toString()"
                v-for="box in 9"
              >
                <img
                  v-if="Math.ceil((percentage % 100) / (100 / 9)) >= box"
                  src="/box.svg"
                />
              </div>
            </div>
            <img src="/pallet_empty.svg" />
            <span class="mt-1 text-slate-700"
              >PALLET {{ Math.ceil(percentage / 100) }}</span
            >
          </div>
        </div>
        <div class="flex flex-wrap gap-y-4 lg:hidden">
          <div
            v-if="Math.floor(percentage / 100) > 0"
            class="flex w-1/2 flex-col rounded-sm px-1 py-1 sm:flex-row md:px-4 md:py-4"
          >
            <div
              class="flex w-full flex-col rounded-sm px-1 py-1 sm:w-1/2 md:px-4 md:py-4"
            >
              <div
                class="relative flex h-[45vw] max-h-[370px] flex-wrap items-end justify-end sm:h-[20vw]"
              >
                <div
                  class="absolute inset-0 flex items-center justify-center text-4xl font-bold text-retwisst-green-normal text-opacity-70 sm:text-5xl lg:text-6xl"
                >
                  100%
                </div>
                <div
                  class="flex h-1/3 w-1/3 items-center justify-center"
                  v-for="box in 9"
                >
                  <img src="/box.svg" />
                </div>
              </div>
              <img src="/pallet_empty.svg" />
            </div>
            <div
              class="flex w-full items-center justify-center sm:w-1/2 sm:justify-start"
            >
              <span class="text-4xl text-slate-700 md:text-5xl"
                >x {{ Math.floor(percentage / 100) }}</span
              >
            </div>
          </div>
          <div
            class="flex w-1/2 flex-col rounded-sm px-1 py-1 sm:flex-row md:px-4 md:py-4"
          >
            <div
              class="flex w-full flex-col px-1 py-1 sm:w-1/2 md:px-4 md:py-4"
              v-if="Math.floor(percentage % 100) > 0"
            >
              <div
                class="relative flex h-[45vw] max-h-[370px] flex-wrap-reverse sm:h-[20vw]"
              >
                <div
                  class="absolute inset-0 flex items-center justify-center text-4xl font-bold text-retwisst-purple-normal text-opacity-70 sm:text-5xl lg:text-6xl"
                >
                  ~{{ Math.floor(percentage % 100) }}%
                </div>
                <div
                  class="flex h-1/3 w-1/3 items-center justify-center"
                  :id="box.toString()"
                  v-for="box in 9"
                >
                  <img
                    v-if="Math.ceil((percentage % 100) / (100 / 9)) >= box"
                    src="/box.svg"
                  />
                </div>
              </div>
              <img src="/pallet_empty.svg" />
            </div>
            <div
              class="flex w-full items-center justify-center sm:w-1/2 sm:justify-start"
              v-if="Math.floor(percentage % 100) > 0"
            >
              <span class="text-4xl text-slate-700 md:text-5xl">x 1</span>
            </div>
          </div>
        </div>
      </div>
      <template v-if="Math.floor(percentage) >= 50">
        <div class="col-span-1 flex flex-col gap-6 lg:col-span-2">
          <div class="flex">
            <span
              class="block w-full border-b border-slate-300 text-3xl font-thin"
              >SELECT ADDRESS</span
            >
          </div>
          <div class="flex">
            <RadioGroup v-model="selectedAddress" class="w-full">
              <div
                class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              >
                <RadioGroupOption
                  as="template"
                  v-for="address in user.user?.Addresses || []"
                  :key="address.name"
                  :value="address.id"
                  v-slot="{ active, checked }"
                >
                  <div
                    :class="[
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                        : '',
                      checked
                        ? 'bg-sky-900 bg-opacity-75 text-white '
                        : 'bg-white '
                    ]"
                    class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                  >
                    <div class="flex w-full items-center justify-between">
                      <div class="flex items-center">
                        <div class="text-sm">
                          <RadioGroupLabel
                            as="p"
                            :class="checked ? 'text-white' : 'text-gray-900'"
                            class="font-medium"
                          >
                            {{ address.name }}
                          </RadioGroupLabel>
                          <RadioGroupDescription
                            as="span"
                            :class="checked ? 'text-sky-100' : 'text-gray-500'"
                            class="flex flex-col"
                          >
                            <span>{{ address.street }}</span>
                            <span>{{ address.zip }}</span>
                            <span>{{ address.city }}, {{ address.state }}</span>
                            <span class="mt-4 font-bold">{{
                              address.country
                            }}</span>
                          </RadioGroupDescription>
                        </div>
                      </div>
                      <div v-show="checked" class="flex-shrink-0 text-white">
                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <circle
                            cx="12"
                            cy="12"
                            r="12"
                            fill="#fff"
                            fill-opacity="0.2"
                          />
                          <path
                            d="M7 13l3 3 7-7"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </RadioGroupOption>
                <button
                  class="relative flex min-h-[150px] items-center justify-center gap-4 rounded-lg bg-retwisst-green-normal px-5 py-4 text-slate-100 shadow-md transition-colors hover:bg-retwisst-green-dark focus:outline-none active:bg-retwisst-green-darkest"
                  @click="createAddress"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span class="text-2xl">New Address</span>
                </button>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div class="col-span-1 flex flex-col gap-6 lg:col-span-2">
          <div class="flex">
            <span
              class="block w-full border-b border-slate-300 text-3xl font-thin"
              >SELECT DELIVERY METHOD</span
            >
          </div>
          <div class="flex">
            <RadioGroup v-model="selectedMethod" class="w-full">
              <div
                class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
              >
                <RadioGroupOption
                  as="template"
                  v-for="method in shippingMethods || []"
                  :key="method.name"
                  :value="method.id"
                  v-slot="{ active, checked }"
                >
                  <div
                    :class="[
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                        : '',
                      checked
                        ? 'bg-blue-700 bg-opacity-75 text-white '
                        : 'bg-white '
                    ]"
                    class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                  >
                    <div class="flex w-full items-center justify-between">
                      <div class="flex items-center">
                        <div class="text-sm">
                          <RadioGroupLabel as="p" class="font-medium">
                            <span
                              class="mr-2 text-xl"
                              :class="checked ? 'text-white' : 'text-gray-900'"
                              >{{ method.acronym }}</span
                            >
                            <span
                              class="text-md"
                              :class="checked ? 'text-white' : 'text-gray-900'"
                              >{{ method.name }}</span
                            >
                          </RadioGroupLabel>
                          <RadioGroupDescription
                            as="span"
                            :class="checked ? 'text-sky-100' : 'text-gray-500'"
                            class="flex flex-col"
                          >
                            <span>{{ method.description }}</span>
                          </RadioGroupDescription>
                        </div>
                      </div>
                      <div v-show="checked" class="flex-shrink-0 text-white">
                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                          <circle
                            cx="12"
                            cy="12"
                            r="12"
                            fill="#fff"
                            fill-opacity="0.2"
                          />
                          <path
                            d="M7 13l3 3 7-7"
                            stroke="#fff"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          class="col-span-1 mt-8 flex w-full flex-col items-center justify-center gap-8 lg:col-span-2"
        >
          <div class="text-center">
            <span
              class="text-center text-xl text-slate-700 md:text-2xl xl:text-3xl"
              >OUR MINIMUM ORDER AMOUNT IS HALF (50%) PALLET!
              <span class="block text-sm"
                >YOU CANNOT COMPLETE YOUR ORDER BEFORE ADDING HALF PALLET!</span
              ></span
            >
          </div>
          <div class="text-center">
            <NuxtLink
              to="/"
              class="flex items-center justify-center gap-2 rounded-md bg-retwisst-green-darkest py-2 px-8 text-sm font-light text-white shadow-sm transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
            >
              <span class="font-bold uppercase">Continue Shopping</span>
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
      </template>
    </div>
    <div
      v-else
      class="mt-8 flex w-full flex-col items-center justify-center gap-8"
    >
      <div>
        <img src="/empty-cart.png" class="w-[250px]" />
      </div>
      <div class="text-center">
        <span class="text-center text-xl text-slate-700 md:text-2xl xl:text-3xl"
          >YOUR SHOPPING CART IS EMPTY!</span
        >
      </div>
      <div class="text-center">
        <NuxtLink
          to="/"
          class="flex items-center justify-center gap-2 rounded-md bg-retwisst-green-darkest py-2 px-8 text-sm font-light text-white shadow-sm transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
        >
          <span class="font-bold uppercase">Continue Shopping</span>
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
    <ElementsNewaddress
      :isOpen="isOpenAddress"
      @cls="setIsOpenAddress(false)"
      :address="addressProp"
      type="Create"
    ></ElementsNewaddress>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store';
import { debounce } from 'vue-debounce';
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupOption,
  RadioGroupLabel
} from '@headlessui/vue';
import { Ref } from 'nuxt3/dist/app/compat/capi';

const user = useUserStore();
const selectedAddress = ref(
  user.user?.Addresses?.length ? user.user.Addresses[0].id : -1
);
const {
  data
}: { data: Ref<{ shippingMethods?: [{ [key: string]: string }] }> } =
  await useAsyncData(
    'shippingMethods',
    async () =>
      await $fetch('http://localhost:3100/api/user/address/shipping-methods', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      })
  );
const shippingMethods = data.value.shippingMethods || [];
const selectedMethod = ref(shippingMethods[0].id);
const updateCartItemQuantity = debounce(
  async (id: number, quantity: number) => {
    await user.updateCartItemQuantity(id, quantity);
    await user.syncUser();
  },
  '400ms'
);
const isOpenAddress = ref(false);
const addressProp = reactive({
  name: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  id: -1
});
const setIsOpenAddress = (value: boolean) => {
  isOpenAddress.value = value;
};
const createAddress = () => {
  Object.keys(addressProp).forEach((k) => {
    addressProp[k] = '';
  });
  setIsOpenAddress(true);
};
const removeCartItem = async (id: number): Promise<void> => {
  await user.removeCartItem(id);
};
const percentage = computed((): number => {
  return user.user?.CartItems.reduce((acc, item) => {
    return acc + (1 / item.Variant.boxPerPallet) * item.quantity * 100;
  }, 0);
});
useMeta({
  title: `Checkout - Retwisst B2B`
});
</script>

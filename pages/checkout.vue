<template>
  <div v-if="user?.token">
    <AuthHead></AuthHead>
    <div
      class="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0"
      v-if="user?.user?.CartItems?.length > 0"
    >
      <div class="flex flex-col gap-6 px-1 lg:px-8">
        <div class="flex">
          <span
            class="block w-full border-b border-slate-300 text-3xl font-thin"
            >CART</span
          >
        </div>
        <div class="flex flex-col divide-y">
          <div
            class="grid grid-cols-12 items-center justify-center gap-2 rounded-sm py-4"
            v-for="cartItem in user.user.CartItems"
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
      </div>
      <div class="flex flex-col gap-6 px-1 lg:px-8">
        <div class="flex">
          <span
            class="block w-full border-b border-slate-300 text-3xl font-thin"
            >PALLET SUMMARY</span
          >
        </div>
        <div class="flex flex-wrap">
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
            v-if="Math.ceil((percentage % 100) / (100 / 9)) > 0"
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
      </div>
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
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store';
import { debounce } from 'vue-debounce';
const user = useUserStore();
const updateCartItemQuantity = debounce(
  async (id: number, quantity: number) => {
    await user.updateCartItemQuantity(id, quantity);
    await user.syncUser();
  },
  '400ms'
);
const removeCartItem = async (id: number) => {
  await user.removeCartItem(id);
};
const percentage = computed((): number => {
  return user.user.CartItems.reduce((acc, item) => {
    return acc + (1 / item.Variant.boxPerPallet) * item.quantity * 100;
  }, 0);
});
</script>

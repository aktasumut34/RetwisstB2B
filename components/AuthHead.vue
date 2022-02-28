<template>
  <div>
    <div class="mb-10 flex flex-col gap-12">
      <notifications
        group="custom-template"
        :duration="5000"
        :width="500"
        animation-name="v-fade-left"
        position="top right"
      >
        <template #body="{ item }">
          <div class="custom-template">
            <div class="custom-template-content">
              <div class="custom-template-title">
                {{ item.title }}
              </div>
              <div class="custom-template-text" v-html="item.text" />
              <div>
                <NuxtLink to="/checkout" class="font-bold"
                  >Go to checkout</NuxtLink
                >
              </div>
            </div>
            <div class="custom-template-close text-xs" @click="c">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-black"
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
            </div>
          </div>
        </template>
      </notifications>
      <div class="flex items-center justify-between">
        <div class="flex lg:hidden">
          <ElementsMenubutton ref="menuPageOpenButton" @click="setMenuPage" />
        </div>
        <NuxtLink to="/">
          <img src="/logo.png" alt="Retwisst B2B Logo" class="" />
        </NuxtLink>
        <div class="flex gap-2">
          <ElementsCart ref="cartPageOpenButton" @click="setCartPage" />
          <ElementsUserdropdown class="z-[9996] hidden sm:inline-block" />
        </div>
      </div>
      <div class="hidden items-center justify-between px-0 lg:flex xl:px-8">
        <ElementsCategorylink
          v-for="category in categories"
          :key="category.id"
          :text="category.CategoryDescriptions[0].name"
          :href="category.slug"
        />
      </div>
    </div>
    <div
      class="fixed inset-0 z-[9998] bg-black transition-colors duration-500"
      :class="{
        'bg-opacity-40': cartPage || menuPage,
        'pointer-events-none bg-opacity-0': !cartPage && !menuPage
      }"
    ></div>
    <TransitionRoot
      :show="menuPage"
      as="div"
      v-click-outside="setMenuPage"
      class="fixed left-0 top-0 z-[9999] flex h-screen w-[100%] max-w-[600px] flex-col gap-6 overflow-y-auto bg-slate-100 py-12 px-8 transition-all lg:w-[50%]"
      enter="duration-300"
      enter-from="-translate-x-full"
      enter-to="translate-x-0"
      leave="duration-150"
      leave-from="translate-x-0"
      leave-to="-translate-x-full"
    >
      <div
        class="flex items-center justify-between border-b border-slate-300 pb-2"
      >
        <span class="block flex-1 text-3xl font-thin">MENU</span>
        <button
          class="flex h-10 w-10 items-center justify-center gap-1 rounded-full text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200"
          @click="setMenuPage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-full w-full"
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
      <div class="flex flex-col divide-y">
        <div class="flex flex-col gap-4 py-4">
          <span class="flex-1 text-xl">CATEGORIES</span>
          <div class="flex flex-col gap-2">
            <NuxtLink
              v-for="category in categories"
              :key="category.id"
              :to="'/category/' + category.slug"
              class="flex justify-between rounded-md bg-white px-4 py-2"
              ><span class="uppercase">{{
                category.CategoryDescriptions[0].name
              }}</span>
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col gap-4 py-4">
          <span class="flex-1 text-xl">ORDERS</span>
          <div class="flex flex-col gap-2">
            <NuxtLink
              to="/profile"
              class="flex justify-between rounded-md bg-white px-4 py-2"
            >
              My Orders
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col gap-4 py-4">
          <span class="flex-1 text-xl">HELP</span>
          <div class="flex flex-col gap-2">
            <NuxtLink
              to="/faq"
              class="flex justify-between rounded-md bg-white px-4 py-2"
            >
              FAQ
            </NuxtLink>
            <NuxtLink
              to="/support"
              class="flex justify-between rounded-md bg-white px-4 py-2"
            >
              Support
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col gap-4 py-4">
          <span class="flex-1 text-xl">ACCOUNT</span>
          <div class="flex flex-col gap-2">
            <NuxtLink
              to="/account"
              class="flex justify-between rounded-md bg-white px-4 py-2"
            >
              My Account
            </NuxtLink>
            <button
              @click="logout"
              class="flex justify-between rounded-md bg-white px-4 py-2"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </TransitionRoot>
    <TransitionRoot
      :show="cartPage"
      as="div"
      v-click-outside="setCartPage"
      class="fixed right-0 top-0 z-[9999] flex h-screen w-[100%] max-w-[600px] flex-col gap-6 overflow-y-auto bg-slate-100 py-12 px-8 transition-all lg:w-[50%]"
      enter="duration-300"
      enter-from="translate-x-full"
      enter-to="translate-x-0"
      leave="duration-150"
      leave-from="translate-x-0"
      leave-to="translate-x-full"
    >
      <div
        class="flex items-center justify-between border-b border-slate-300 pb-2"
      >
        <span class="block flex-1 text-3xl font-thin">CART</span>
        <button
          class="flex h-10 w-10 items-center justify-center gap-1 rounded-full text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200"
          @click="setCartPage"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-full w-full"
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
      <div
        v-if="user?.user?.CartItems?.length > 0"
        class="flex flex-col divide-y"
      >
        <div
          class="grid grid-cols-12 items-center justify-center gap-2 rounded-sm py-4"
          v-for="cartItem in user.user.CartItems"
        >
          <div class="col-span-2 text-slate-700">
            <img :src="cartItem.Variant.Images[0].image" alt="" />
          </div>
          <div class="col-span-5 flex flex-col">
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
          </div>
          <div class="col-span-4">
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
        <div class="flex justify-end">
          <NuxtLink
            to="/checkout"
            class="my-4 inline-flex gap-2 rounded-md bg-retwisst-green-darkest py-2 px-8 text-sm font-light text-white shadow-sm transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
            @click="setCartPage(false)"
          >
            <span class="font-bold uppercase">Checkout</span>
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
      <div
        v-else
        class="flex w-full flex-col items-center justify-center gap-8"
      >
        <div>
          <img src="/empty-cart.png" class="w-[250px]" />
        </div>
        <div class="text-center">
          <span
            class="text-center text-xl text-slate-700 md:text-2xl xl:text-3xl"
            >YOUR SHOPPING CART IS EMPTY!</span
          >
        </div>
        <div class="text-center">
          <button
            class="flex items-center justify-center gap-2 rounded-md bg-retwisst-green-darkest py-2 px-8 text-sm font-light text-white shadow-sm transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
            @click="() => setCartPage(false)"
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
          </button>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification';
import { useProductStore, useUserStore } from '~~/store';
import { TransitionRoot } from '@headlessui/vue';
const productStore = useProductStore();
await productStore.getCategories();
const categories = productStore.categories;
const user = useUserStore();
const c = () => {
  notify({
    group: 'custom-template',
    clean: true
  });
};

const logout = () => user.logout();
const cartPage = ref(false);
const cartPageOpenButton = ref(null);
const menuPage = ref(false);
const menuPageOpenButton = ref(null);
defineExpose({ cartPageOpenButton, menuPageOpenButton });
const setCartPage = (event) =>
  (cartPage.value = event.target === cartPageOpenButton.value.$el);
const setMenuPage = (event) =>
  (menuPage.value = event.target === menuPageOpenButton.value.$el);
const updateCartItemQuantity = async (id: number, quantity: number) => {
  await user.updateCartItemQuantity(id, quantity);
};
const removeCartItem = async (id: number) => {
  await user.removeCartItem(id);
};
</script>

<style lang="scss">
.vue-notification-group {
  z-index: 9997;
}
.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 0;

  &,
  & > div {
    box-sizing: border-box;
  }

  background: #e8f9f0;
  border: 2px solid #d0f2e1;

  .custom-template-icon {
    flex: 0 1 auto;
    color: #15c371;
    font-size: 32px;
    padding: 0 10px;
  }

  .custom-template-close {
    flex: 0 1 auto;
    padding: 5px 20px;
    opacity: 0.2;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;
    word-wrap: break-word;

    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }
}

.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all 0.5s;
}

.v-fade-left-enter-from,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(500px) scale(0.2);
}
</style>

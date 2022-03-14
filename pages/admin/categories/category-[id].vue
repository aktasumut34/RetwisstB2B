<template>
  <div class="mainContent flex flex-1 flex-col">
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold"
        >CATEGORY: #{{ category.id
        }}<span class="text-lg font-normal">
          &lt;{{ category.slug }}&gt;</span
        ></span
      >
    </div>
    <div class="flex max-h-screen flex-1 px-8 py-4 lg:max-h-[60%]">
      <div class="grid w-full grid-cols-3 items-stretch justify-center gap-4">
        <div
          class="flex h-full flex-col gap-8 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">General Information</span>
          </div>
          <div class="flex flex-col gap-4">
            <span class="font-light"
              >Slug:
              <span class="text-sm font-semibold xl:text-lg">{{
                category.slug
              }}</span></span
            >
            <span class="font-light"
              >Product Count:
              <span class="text-sm font-semibold xl:text-lg">{{
                category.Products.length
              }}</span></span
            >
            <span class="font-light"
              >Variant Count:
              <span class="text-sm font-semibold xl:text-lg">{{
                category.Products.reduce(
                  (acc, cur) => acc + cur.Product._count.ProductVariants,
                  0
                )
              }}</span></span
            >
            <span class="font-light"
              >Created:
              <span class="text-sm font-semibold xl:text-lg">{{
                dayjs(category.createdAt).format('LLL')
              }}</span></span
            >
          </div>
        </div>
        <div
          class="flex h-full flex-col gap-6 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">Descriptions</span>
          </div>
          <div class="flex flex-col gap-2">
            <template v-if="category.CategoryDescriptions.length > 0">
              <Disclosure
                as="div"
                v-for="description in category.CategoryDescriptions"
                v-slot="{ open }"
              >
                <DisclosureButton
                  class="flex w-full justify-between rounded-t-lg bg-slate-200 px-4 py-2 text-left font-medium text-slate-800 transition-colors hover:bg-slate-300 focus:outline-none focus-visible:ring"
                  :class="{
                    'rounded-b-lg': !open,
                    'bg-slate-600 !text-white hover:bg-slate-600': open
                  }"
                  ><span>{{ description.Language.name }}</span
                  ><svg
                    v-if="!open"
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <svg
                    v-else
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
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </DisclosureButton>
                <transition
                  enter-active-class="transition ease-in"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition ease-out"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <DisclosurePanel
                    class="rounded-b-lg bg-white px-4 pt-4 pb-2 text-sm"
                    ><div class="flex flex-col gap-2">
                      <span class="font-extralight"
                        ><span class="mr-2 font-semibold uppercase">Name:</span
                        >{{ description.name }}</span
                      >
                      <span class="font-extralight"
                        ><span class="mr-2 font-semibold uppercase"
                          >Description:</span
                        >{{ description.description }}</span
                      >
                    </div>
                  </DisclosurePanel>
                </transition>
              </Disclosure>
            </template>
            <template v-else>
              <span>This category doesn't have any descriptions yet.</span>
            </template>
          </div>
        </div>
        <div
          class="flex h-full flex-col gap-6 overflow-y-auto rounded-md bg-slate-100 p-4"
        >
          <div>
            <span class="text-2xl">Products</span>
          </div>
          <div class="flex flex-col gap-3">
            <template v-if="category.Products.length > 0">
              <NuxtLink
                v-for="product in category.Products"
                :to="`/admin/products/product-${product.id}`"
                class="flex gap-3 rounded-lg bg-white p-1 hover:bg-opacity-60 active:bg-opacity-40"
              >
                <div class="w-16">
                  <img :src="product.Product.ProductImages[0]?.image" />
                </div>
                <div class="flex flex-1 flex-col gap-1">
                  <span class="text-xl font-medium">{{
                    product.Product.ProductDescriptions[0]?.name
                  }}</span>
                  <span class="font-thin"
                    ><span class="font-normal">{{
                      product.Product._count.ProductVariants
                    }}</span>
                    variant in
                    <span class="font-normal">{{
                      product.Product._count.ProductOptions
                    }}</span>
                    options</span
                  >
                </div>
              </NuxtLink>
            </template>
            <template v-else>
              <span>This category doesn't have any products yet.</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full px-8 py-4">
      <div
        class="flex h-[25vh] flex-1 flex-col gap-6 rounded-md bg-slate-100 p-4"
      >
        <div>
          <span class="text-2xl">Actions</span>
        </div>
        <div class="flex gap-3">
          <button
            class="group flex items-center gap-2 rounded-md border border-retwisst-purple-darkest px-2 py-1 uppercase text-retwisst-purple-darkest transition-colors hover:bg-retwisst-purple-darkest hover:text-white active:bg-retwisst-purple-dark active:text-white"
            @click="removeCategory"
          >
            <i class="pi pi-times-circle"></i> <span>Remove Category</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { useUserStore } from '~~/store';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/vue';
import { singleButtonSwal, yesNoSwal } from '~~/utils/swal';
dayjs.extend(LocalizedFormat);
const user = useUserStore();
const router = useRouter();
const route = useRoute();
const fetchCategories = async () =>
  await $fetch(
    `http://localhost:3100/api/admin/categories/${route.params.id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      }
    }
  );
const {
  data
}: {
  data: Ref<{
    category?: {
      id: number;
      slug: string;
      CategoryDescriptions: any[];
      Products: any[];
      createdAt: string;
    };
    success?: boolean;
  }>;
} = await useAsyncData('allCategories', fetchCategories);
if (!data.value) router.push('/admin/categories');
const category = computed(() => data.value.category);

const removeCategory = () => {
  if (category.value) {
    yesNoSwal
      .fire({
        title: 'Are you sure?',
        html: `Are you sure you want to remove the category <b>${category.value.CategoryDescriptions[0].name}</b>?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then(async (willDelete) => {
        if (willDelete.isConfirmed) {
          const {
            success
          }: {
            success: boolean;
          } = await $fetch(
            `http://localhost:3100/api/admin/categories/remove`,
            {
              method: 'POST',
              body: {
                id: category.value.id
              },
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              }
            }
          );
          if (success) {
            singleButtonSwal
              .fire({
                title: 'Removed!',
                html: `The category <b>${category.value.CategoryDescriptions[0].name}</b> has been removed.`,
                icon: 'success'
              })
              .then(() => {
                router.push('/admin/categories');
              });
          }
        }
      });
  }
};

definePageMeta({
  layout: 'admin'
});
useMeta({
  title: `Category: ${category.value?.CategoryDescriptions[0].name} - Admin - Retwisst`
});
</script>

<style scoped></style>

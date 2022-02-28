<template>
  <div v-if="userStore?.token">
    <AuthHead></AuthHead>
    <div class="flex flex-col items-center gap-4 pb-4 md:flex-row md:pb-6">
      <button
        class="flex items-center justify-center gap-1 rounded-lg border border-slate-300 px-2 py-2 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 active:bg-slate-200 sm:px-4"
        @click="setFilterPage"
        ref="filterOpenButton"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="pointer-events-none h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <span class="pointer-events-none text-lg text-slate-700">FILTER</span>
      </button>
      <div
        class="flex flex-wrap items-center justify-center gap-2 md:justify-start"
      >
        <button
          class="flex items-center justify-center gap-2 rounded-md bg-retwisst-purple-darkest px-1 py-1 text-xs font-light text-white shadow-sm transition-colors hover:bg-retwisst-purple-dark active:bg-retwisst-purple-normal md:px-2 md:text-sm"
          v-if="priceMin !== '0' || priceMax !== priceMaxAvailable"
          @click="
            () => {
              priceMin = '0';
              priceMax = priceMaxAvailable;
            }
          "
        >
          <span class="font-light">PRICE:</span>
          <span class="font-bold"
            ><span class="font-normal">€</span>{{ priceMin }} -
            <span class="font-normal">€</span>{{ priceMax }}</span
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <template v-for="appliedFilterType in Object.keys(filtersApplied)">
          <button
            class="flex items-center justify-center gap-2 rounded-md bg-retwisst-purple-darkest px-1 py-1 text-xs font-light text-white shadow-sm transition-colors hover:bg-retwisst-purple-dark active:bg-retwisst-purple-normal md:px-2 md:text-sm"
            v-for="appliedFilterValue in filtersApplied[appliedFilterType]"
            @click="removeFilter(appliedFilterType, appliedFilterValue)"
          >
            <span class="font-light">{{ appliedFilterType }}:</span>
            <span class="font-bold">{{ appliedFilterValue }}</span>
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </template>
      </div>
    </div>
    <template v-if="!loadingProducts">
      <div class="flex flex-col gap-8">
        <div
          class="grid grid-cols-1 gap-y-6 gap-x-2 sm:grid-cols-2 sm:gap-y-8 md:grid-cols-3 md:gap-y-10 xl:grid-cols-4 xl:gap-y-12"
        >
          <ProductCard
            v-for="product in products"
            :image="product.ProductImages[0]?.image"
            :image2="product.ProductImages[1]?.image"
            :name="product.ProductDescriptions[0]?.name"
            :slug="product.slug"
            :min="product.ProductVariants[0]?.price"
          >
          </ProductCard>
        </div>
        <div
          class="mb-12 flex w-full flex-wrap items-center justify-center gap-2"
        >
          <span
            v-for="p in pages"
            class="text-md flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300"
            :key="p"
            :class="{
              'pointer-events-none border-transparent bg-slate-700 text-white':
                p === page
            }"
            @click="changePage(p)"
            >{{ p }}</span
          >
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center"
      >
        <ElementsLoader />
      </div>
    </template>
    <div
      class="fixed inset-0 z-[9998] bg-black transition-colors duration-500"
      :class="{
        'bg-opacity-40': filterPage,
        'pointer-events-none bg-opacity-0': !filterPage
      }"
    ></div>
    <TransitionRoot
      :show="filterPage"
      as="div"
      v-click-outside="setFilterPage"
      class="overflow-scroll-y fixed left-0 top-0 z-[9999] flex h-screen w-[100%] flex-col gap-6 bg-slate-100 py-12 px-8 transition-all md:w-[75%] lg:w-[50%] xl:w-[35%]"
      enter="duration-300"
      enter-from="-translate-x-full"
      enter-to="translate-x-0"
      leave="duration-150"
      leave-from="translate-x-0"
      leave-to="-translate-x-full"
    >
      <div class="flex justify-between">
        <span class="w-max border-b border-slate-300 text-3xl font-thin"
          >FILTERS</span
        >
        <button
          class="flex items-center justify-center gap-2 rounded-md bg-retwisst-purple-darkest py-1 px-2 text-sm font-light text-white shadow-sm transition-colors hover:bg-retwisst-purple-dark active:bg-retwisst-purple-normal"
          @click="resetAppliedFilters"
        >
          <span class="font-bold">RESET</span>
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-col gap-12">
        <div v-for="filter in Object.keys(filters)" class="flex flex-col gap-2">
          <span class="text-xl uppercase text-slate-700">{{ filter }}</span>
          <v-multiselect
            v-model="filtersApplied[filter]"
            :placeholder="
              'Select between our ' + filter.toLowerCase() + ' options'
            "
            :options="filters[filter].map((v) => v.toUpperCase())"
            :multiple="true"
            :close-on-select="false"
          >
          </v-multiselect>
        </div>
        <div class="flex flex-col gap-6">
          <span class="text-xl uppercase text-slate-700">PRICE</span>
          <div class="relative flex flex-col gap-4">
            <span class="text-slate-md text-sm">MINIMUM</span>
            <input
              type="range"
              v-debounce:350ms="loadProductsDebounced"
              :debounce-events="['input']"
              v-model="priceMin"
              step="5"
              :min="priceMinAvailable"
              :max="priceMaxAvailable"
              class="p-0"
            />
            <div
              class="pointer-events-none absolute -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-retwisst-green-normal text-sm text-white"
              :style="{
                left:
                  ((parseFloat(priceMin) - parseFloat(priceMinAvailable)) /
                    (parseFloat(priceMaxAvailable) -
                      parseFloat(priceMinAvailable))) *
                    100 +
                  '%',
                transform: `translateX(-${
                  ((parseFloat(priceMin) - parseFloat(priceMinAvailable)) /
                    (parseFloat(priceMaxAvailable) -
                      parseFloat(priceMinAvailable))) *
                    100 +
                  '%'
                })`
              }"
            >
              €{{ parseInt(priceMin).toFixed(0) }}
            </div>
          </div>
          <div class="relative flex flex-col gap-4">
            <span class="text-slate-md text-sm">MAXIMUM</span>
            <input
              type="range"
              v-debounce:350ms="loadProductsDebounced"
              :debounce-events="['input']"
              v-model="priceMax"
              step="5"
              :min="priceMinAvailable"
              :max="priceMaxAvailable"
            />

            <div
              class="pointer-events-none absolute -bottom-2 flex h-10 w-10 items-center justify-center rounded-full bg-retwisst-green-normal text-sm text-white"
              :style="{
                left:
                  ((parseFloat(priceMax) - parseFloat(priceMinAvailable)) /
                    (parseFloat(priceMaxAvailable) -
                      parseFloat(priceMinAvailable))) *
                    100 +
                  '%',
                transform: `translateX(-${
                  ((parseFloat(priceMax) - parseFloat(priceMinAvailable)) /
                    (parseFloat(priceMaxAvailable) -
                      parseFloat(priceMinAvailable))) *
                    100 +
                  '%'
                })`
              }"
            >
              €{{ parseInt(priceMax).toFixed(0) }}
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end">
          <button
            class="flex w-[50%] items-center justify-center gap-2 rounded-md bg-retwisst-green-darkest py-2 text-sm font-light text-white shadow-sm transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
            @click="() => setFilterPage(false)"
          >
            <span class="font-bold">APPLY</span>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { useUserStore } from '~~/store';
import { TransitionRoot } from '@headlessui/vue';
const route = useRoute();
const userStore = useUserStore();
const category = route.params.category;
const page = ref(1);
const limit = ref(12);
const filtersApplied = reactive({});
const filterPage = ref(false);
const filterOpenButton = ref(null);
const priceMin = ref('0');
const priceMax = ref(Number.MAX_SAFE_INTEGER.toString());
const priceMinAvailable = ref('0');
const priceMaxAvailable = ref(Number.MAX_SAFE_INTEGER.toString());
interface Product {
  id: number;
  ProductDescriptions: any[];
  ProductImages: any[];
  slug: string;
  Categories: any[];
  ProductVariants: any[];
}
interface ProductCategoryResponse {
  products?: Product[];
  total?: number;
}
interface Filter {
  [key: string]: string[];
}
interface PriceRange {
  min: string;
  max: string;
}
interface FilterResponse {
  priceRange?: PriceRange;
  filters?: Filter[];
}
const fetchProducts = async () => {
  return await $fetch(
    'http://localhost:3100/api/product/category/' + category,
    {
      method: 'POST',
      body: {
        page: page.value,
        limit: limit.value,
        filters: filtersApplied,
        priceRange: {
          min: priceMin.value,
          max: priceMax.value
        }
      },
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + userStore.token
      }
    }
  );
};
let { data }: { data: Ref<ProductCategoryResponse> } = await useAsyncData(
  'category' + category,
  fetchProducts
);
let loadImage = async (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve('');
    img.src = src;
  });
await loadImage('/no-image.png');
const fillWithProducts = async (d: Product[]) => {
  products.value = d;
  let i = 0;
  products.value.forEach(async (product) => {
    let img1 = await loadImage(product.ProductImages[0].image);
    let img2 = product.ProductImages[1]
      ? await loadImage(product.ProductImages[1]?.image)
      : '';
    product.ProductImages[0].image = img1;
    product.ProductImages[1] = { image: img2 };
    i++;
    if (i === d.length) {
      loadingProducts.value = false;
    }
  });
};
const setTotalPages = (total: number) => {
  pages.value = Math.ceil(total / limit.value);
};

const products: Ref<Product[]> = ref([]);
const loadingProducts = ref(true);
const pages = ref(0);
fillWithProducts(data.value.products);
setTotalPages(data.value.total);
const fetchFilters = async () =>
  await $fetch(
    `http://localhost:3100/api/product/category/${category}/filters`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + userStore.token
      }
    }
  );
let { data: fResponse }: { data: Ref<FilterResponse> } = await useAsyncData(
  'filters' + category,
  fetchFilters
);
const filters: Ref<Filter[]> = ref(fResponse.value.filters);
const priceRange: Ref<PriceRange> = ref(fResponse.value.priceRange);

priceMax.value = (
  parseInt(priceRange.value.max) +
  (5 - (parseInt(priceRange.value.max) % 5))
).toString();
priceMaxAvailable.value = (
  parseInt(priceRange.value.max) +
  (5 - (parseInt(priceRange.value.max) % 5))
).toString();
const resetAppliedFilters = () => {
  Object.keys(filters.value).forEach((k) => {
    filtersApplied[k] = [];
  });
  page.value = 1;
  filterPage.value = false;
  priceMin.value = '0';
  priceMax.value = priceMaxAvailable.value;
};
const changePage = (p) => {
  page.value = p;
};
resetAppliedFilters();
watch(priceMin, () => {
  if (parseInt(priceMax.value) <= parseInt(priceMin.value)) {
    priceMax.value = priceMin.value;
  }
});
watch(priceMax, () => {
  if (parseInt(priceMax.value) <= parseInt(priceMin.value)) {
    priceMin.value = priceMax.value;
  }
});
watch([page, filtersApplied], async () => {
  await loadProductsDebounced();
});

const loadProductsDebounced = async () => {
  loadingProducts.value = true;
  products.value = [];
  const response: ProductCategoryResponse = await fetchProducts();
  fillWithProducts(response.products);
  setTotalPages(response.total);
  if (page.value > pages.value) {
    page.value = pages.value;
  }
};
const removeFilter = (filter: string, value: string) => {
  filtersApplied[filter] = filtersApplied[filter].filter((v) => v !== value);
};
defineExpose({ filterOpenButton });
const setFilterPage = (event) => {
  if (event.target === filterOpenButton.value) {
    filterPage.value = true;
  } else {
    filterPage.value = false;
  }
};
</script>

<style>
@import '@aktasumut34/vue-multiselect/dist/vue-multiselect.css';
</style>

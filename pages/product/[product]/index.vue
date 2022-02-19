<template>
  <div v-if="userStore?.token">
    <AuthHead></AuthHead>
    <template v-if="loadingProduct">
      <div
        class="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] items-center justify-center"
      >
        <ElementsLoader />
      </div>
    </template>
    <template v-else>
      <div class="grid grid-cols-3 gap-4 md:grid-cols-5 md:gap-10">
        <div class="col-span-3 flex">
          <div
            v-if="imgsLoading"
            class="flex w-full flex-col items-center justify-center gap-4"
          >
            <ElementsLoader class="justify-self-center" />
          </div>
          <div v-else class="flex w-full flex-col gap-4">
            <div
              class="group w-full cursor-zoom-in overflow-hidden"
              @mousemove="mover"
              @mouseleave="mout"
            >
              <img
                :src="curImg"
                class="w-full origin-top-left"
                :style="{
                  transform: `translate(-${mousePos.X}px,-${mousePos.Y}px) scale(${mousePos.scale})`
                }"
                @click="setLightboxVisible(true, curImgIndex)"
              />
            </div>
            <div class="flex gap-2 md:grid md:grid-cols-2">
              <carousel
                class="md:hidden"
                :items-to-show="4"
                :items-to-scroll="Math.floor(imgsToShow.length / 4)"
              >
                <slide
                  v-for="(image, k) in imgsToShow"
                  :key="k"
                  @click="changeImage(k)"
                >
                  <div class="carousel__item">
                    <img
                      :src="image.image"
                      :class="{ active: curImg === image.image }"
                    />
                  </div>
                </slide>
                <template v-if="imgsToShow.length > 4" #addons>
                  <navigation />
                  <pagination />
                </template>
              </carousel>
              <template v-for="(image, k) in imgsToShow">
                <div
                  class="hidden cursor-zoom-in gap-2 md:flex"
                  v-if="image.image !== curImg"
                >
                  <img
                    :src="image.image"
                    @click="setLightboxVisible(true, k)"
                  /></div
              ></template>
            </div>
          </div>
        </div>
        <div class="col-span-3 flex flex-col md:col-span-2">
          <span class="text-xs text-slate-400">RETWISST</span>
          <span
            class="mb-2 text-[30px] font-light uppercase leading-[40px] text-slate-700 lg:mb-4 lg:text-[40px] lg:leading-[50px]"
            >{{ product.ProductDescriptions[0].name }}</span
          >
          <span
            v-if="!validVariant"
            class="text-lg font-extralight text-slate-600"
            >${{ priceRange.min.toFixed(2) }} ~ ${{ priceRange.max.toFixed(2) }}
            / package
          </span>
          <span v-else class="text-lg font-extralight text-slate-600"
            >${{ validVariant.price.toFixed(2) }} /
            <span class="text-sm text-slate-600"
              >package ( {{ validVariant.productPerBox }} x ~ ${{
                (validVariant.price / validVariant.productPerBox).toFixed(2)
              }}
              / piece )</span
            ></span
          >
          <div class="mt-8 flex flex-col gap-4">
            <div v-for="filter in Object.keys(options)">
              <span class="text-xs text-slate-400">{{ filter }}</span>
              <v-multiselect
                v-model="variantsApplied[filter]"
                :placeholder="
                  'Select between our ' + filter.toLowerCase() + ' options'
                "
                :options="availableVariants(filter)"
                :close-on-select="true"
                :custom-label="(i) => i.toUpperCase()"
                deselect-label="Remove selection"
              >
              </v-multiselect>
            </div>
            <button
              class="flex w-max items-center justify-center gap-2 rounded-md bg-retwisst-purple-darkest py-1 px-4 text-sm font-light text-white shadow-sm transition-colors hover:bg-retwisst-purple-dark active:bg-retwisst-purple-normal"
              @click="resetAppliedFilters"
              v-if="!allEmpty"
            >
              <span class="font-bold">RESET SELECTIONS</span>
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
          <div v-if="full && !validVariant" class="mt-6 flex">
            <div class="text-sm text-red-400">
              The variant with options you selected is not available. Please
              <span
                class="cursor-pointer font-bold underline underline-offset-2"
                >create a request</span
              >
              if you are interested in these options. Our sales managers will
              contact you to discuss your request.
              <div class="mt-1 flex gap-2">
                <span
                  class="text-xs text-red-500"
                  v-for="v in Object.keys(variantsApplied)"
                >
                  {{ v }}:
                  <span class="font-bold">{{
                    variantsApplied[v].toUpperCase()
                  }}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-2">
            <span class="text-xs text-slate-400">Quantity</span>
            <div class="max-w-[140px]">
              <vue-number-input
                :model-value="quantity"
                :min="1"
                :inputtable="false"
                @update:model-value="updateQuantity"
                controls
                center
              ></vue-number-input>
            </div>
          </div>
          <button
            class="mt-8 flex flex items-center justify-center border border-retwisst-green-normal bg-retwisst-green-normal py-2 text-white transition"
            :class="{
              'cursor-not-allowed': !validVariant,
              'cursor-pointer hover:bg-retwisst-green-dark active:bg-retwisst-green-darkest':
                validVariant
            }"
            :disabled="!validVariant"
            @click="addToCart"
          >
            <span class="text-md tracking-tighter" v-if="!loadingAddToCart"
              >Add to cart</span
            >
            <span v-else><img src="/loader.svg" class="h-6 w-6" /></span>
          </button>
          <div class="mt-8 flex flex-col gap-4">
            <span class="text-xs text-slate-400">Quantities & Packaging</span>
            <div class="flex justify-around">
              <div class="flex flex-col items-center gap-2">
                <img src="/box.svg" class="h-24 w-24" />
                <div
                  class="flex flex-col text-lg font-extralight text-slate-600"
                >
                  <span class="text-center" v-if="!validVariant"
                    >{{ productPerBoxRange.min }} ~
                    {{ productPerBoxRange.max }}</span
                  >
                  <span class="text-center" v-else>{{
                    validVariant.productPerBox
                  }}</span>
                  <span class="text-center text-sm">product per package</span>
                </div>
              </div>
              <div class="flex flex-col items-center justify-center gap-2">
                <img src="/pallet.svg" class="h-24 w-24" />
                <div
                  class="flex flex-col justify-center text-lg font-extralight text-slate-600"
                >
                  <span class="text-center" v-if="!validVariant"
                    >{{ boxPerPalletRange.min }} ~
                    {{ boxPerPalletRange.max }}</span
                  >
                  <span class="text-center" v-else>{{
                    validVariant.boxPerPallet
                  }}</span>
                  <span class="text-center text-sm">package per pallet</span>
                  <span class="text-center text-xs" v-if="validVariant"
                    >(1 package fills ~{{
                      ((1 / validVariant.boxPerPallet) * 100).toFixed(1)
                    }}% of EuroPallet)</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 flex flex-col gap-2">
            <span class="text-xs text-slate-400">Description</span
            ><span class="text-md text-slate-700">
              {{ description }}
            </span>
          </div>
        </div>
      </div>
      <lightbox
        :visible="lightBoxVisible"
        :imgs="imgsToShow.map((image) => image.image)"
        @hide="setLightboxVisible(false, 0)"
        :index="lightBoxIndex"
      ></lightbox>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { useUserStore } from '~~/store';
import _ from 'lodash';
import { notify } from '@kyvg/vue3-notification';
const userStore = useUserStore();
const lightBoxVisible = ref(false);
const lightBoxIndex = ref(0);
const quantity = ref(1);
const updateQuantity = (newValue, oldValue) => {
  quantity.value = newValue;
};
interface Product {
  id: number;
  ProductDescriptions: any[];
  ProductImages: any[];
  ProductVariants: {
    ProductVariantOptionValues: any[];
  };
  ProductOptions: any[];
  slug: string;
}
const route = useRoute();
const loadingProduct = ref(true);
const slug = route.params.product;
const mousePos = reactive({ X: 0, Y: 0, scale: 1 });
const fetchProducts = async () => {
  return await $fetch('http://localhost:3100/api/product/product/' + slug, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + userStore.token
    }
  });
};
let {
  data
}: {
  data: Ref<{
    product?: Product;
    filterOptionsGrouped?: { [key: string]: string | number };
    productOptionValues?: [
      {
        id: number;
        boxPerPallet: number;
        productPerBox: number;
        price: number;
        variant_options: {};
        images: string[];
      }
    ];
    priceRange?: { min: number; max: number };
    boxPerPalletRange?: { min: number; max: number };
    productPerBoxRange?: { min: number; max: number };
  }>;
} = await useAsyncData('product' + slug, fetchProducts);
let loadImage = async (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve('');
    img.src = src;
  });
const product = data.value.product;
const options = data.value.filterOptionsGrouped;
const variants = data.value.productOptionValues;
const priceRange = data.value.priceRange;
const productPerBoxRange = data.value.productPerBoxRange;
const boxPerPalletRange = data.value.boxPerPalletRange;
const variantsApplied = reactive({});
const resetAppliedFilters = () => {
  Object.keys(options).forEach((k) => {
    variantsApplied[k] = '';
  });
};
resetAppliedFilters();
const description = product?.ProductDescriptions[0]?.description || '';

const mover = (event: MouseEvent) => {
  mousePos.X = event.offsetX;
  mousePos.Y = event.offsetY;
  mousePos.scale = 2;
};
const mout = (event: MouseEvent) => {
  mousePos.X = 0;
  mousePos.Y = 0;
  mousePos.scale = 1;
};
const full = computed(() => {
  let valid = true;
  Object.keys(variantsApplied).forEach((k) => {
    if (!variantsApplied[k]) {
      valid = false;
    }
  });
  return valid;
});
const validVariant = computed(() => {
  if (full.value) {
    for (let i = 0; i < variants.length; i++) {
      if (_.isEqual(variants[i].variant_options, variantsApplied)) {
        return variants[i];
      }
    }
  }
  return false;
});
const curImgIndex = ref(0);
const changeImage = async (imageIndex: number) => {
  curImgIndex.value = imageIndex;
};
const imgsToShow = computed(() => {
  if (!validVariant.value) {
    return product.ProductImages;
  } else {
    return validVariant.value.images;
  }
});
const curImg = computed(() => {
  return imgsToShow.value[curImgIndex.value].image;
});
const setLightboxVisible = (v: boolean, ind: number) => {
  lightBoxIndex.value = ind;
  lightBoxVisible.value = v;
};
const imgsLoading = ref(false);
watch(imgsToShow, async () => {
  imgsLoading.value = true;
  for await (let img of imgsToShow.value) {
    await loadImage(img.image);
  }
  lightBoxIndex.value = 0;
  curImgIndex.value = 0;
  imgsLoading.value = false;
});
product.ProductImages.forEach(async (img, i) => {
  await loadImage(img.image);
  if (i === product.ProductImages.length - 1) {
    loadingProduct.value = false;
  }
});
const allEmpty = computed(() => {
  let empty = true;
  Object.keys(variantsApplied).forEach((k) => {
    if (variantsApplied[k]) {
      empty = false;
    }
  });
  return empty;
});
//FIXME: This works but not the best way to do filter.
const availableVariants = (filter: string) => {
  const optArray = [];
  let othersEmpty = true;
  for (const applied of Object.keys(variantsApplied)) {
    if (variantsApplied[applied] && applied !== filter) {
      othersEmpty = false;
    }
  }
  if (othersEmpty) {
    return options[filter];
  }
  for (const applied of Object.keys(variantsApplied)) {
    if (applied !== filter) {
      for (const variant of variants) {
        if (
          variantsApplied[applied] === variant.variant_options[applied] &&
          !optArray.includes(variant.variant_options[filter])
        ) {
          optArray.push(variant.variant_options[filter]);
        }
      }
    }
  }
  return optArray;
};
const loadingAddToCart = ref(false);
const addToCart = async () => {
  if (validVariant.value && !loadingAddToCart.value) {
    loadingAddToCart.value = true;
    const cart: { product: {} } = await $fetch(
      'http://localhost:3100/api/cart/add',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: 'Bearer ' + userStore.token
        },
        body: {
          variant_id: validVariant.value.id,
          quantity: quantity.value
        }
      }
    );
    await userStore.syncUser();
    if (cart.product) {
      const selecteds = Object.keys(validVariant.value.variant_options).map(
        (k) =>
          validVariant.value
            ? validVariant.value.variant_options[k].toUpperCase()
            : ''
      );
      notify({
        group: 'custom-template',
        title: 'SUCCESS!',
        text: `<b>${quantity.value} x ${
          product.ProductDescriptions[0].name
        }</b> (${selecteds.join(', ')})<br/>has been added to your cart.`,
        duration: 3000
      });
    }
    loadingAddToCart.value = false;
  }
};
</script>

<style>
@import 'vue3-carousel/dist/carousel.css';
@import '@aktasumut34/vue-multiselect/dist/vue-multiselect.css';
:root {
  --vc-clr-primary: rgb(150, 36, 121);
}
.carousel__item {
  padding: 4px;
}
.carousel__item img.active {
  border: 2px solid transparent;
}
.vue-number-input__input:focus {
  outline: none !important;
  border: 1px solid #ddd !important;
}
</style>

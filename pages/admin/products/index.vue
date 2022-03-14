<template>
  <div class="mainContent flex flex-1 flex-col">
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold">PRODUCTS</span>
    </div>
    <div class="flex-1">
      <Datatable
        :value="products"
        :auto-layout="true"
        :paginator="true"
        :rows="10"
        v-model:filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :rowsPerPageOptions="[10, 25, 50]"
        :row-hover="true"
        selectionMode="single"
        v-model:selection="selectedProduct"
        class="p-datatable-customers"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h5 class="m-0 text-2xl">All Products</h5>
            <div class="flex items-center bg-white">
              <input
                type="text"
                v-model="filters['global'].value"
                placeholder="Search"
                class="text-md rounded-md px-4 py-2 text-slate-700 focus:outline-none"
              />
              <div class="mr-2 flex items-center justify-center">
                <i class="pi pi-search" />
              </div>
            </div>
          </div>
        </template>
        <Column field="id" header="Product ID" :sortable="true">
          <template #body="{ data }">{{ data.id }}</template>
        </Column>
        <Column field="model" header="Model" :sortable="true">
          <template #body="{ data }">
            <span>{{ data.model }}</span>
          </template>
        </Column>
        <Column header="Slug" field="slug" :sortable="true">
          <template #body="{ data }">
            <span>{{ data.slug }}</span>
          </template>
        </Column>
        <Column header="Images">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <template v-for="(image, index) in data.ProductImages">
                <div class="h-12 w-12" v-if="index < 3">
                  <img :src="image.image" class="h-full w-full object-cover" />
                </div>
              </template>
              <div
                v-if="data.ProductImages.length > 3"
                class="flex h-6 w-6 items-center justify-center rounded-full bg-retwisst-purple-normal text-xs text-white"
              >
                +{{ data.ProductImages.length - 3 }}
              </div>
            </div>
          </template>
        </Column>
        <template #empty> No products found. </template>
      </Datatable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { FilterMatchMode } from 'primevue/api';
import { useUserStore } from '~~/store';
import Datatable from 'primevue/datatable';
import Column from 'primevue/column';
const user = useUserStore();
const router = useRouter();
const fetchProducts = async () =>
  await $fetch('http://localhost:3100/api/admin/products/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    }
  });
const { data }: { data: Ref<{ products?: [] }> } = await useAsyncData(
  'allProducts',
  fetchProducts
);
const products = computed(() => data.value.products);
const filters: {} = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const selectedProduct = ref(null);
watch(selectedProduct, (val) => {
  router.push(`/admin/products/product-${val.id}`);
});
definePageMeta({
  layout: 'admin'
});
useMeta({
  title: `Products - Admin - Retwisst`
});
</script>

<style scoped></style>

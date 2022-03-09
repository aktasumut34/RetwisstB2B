<template>
  <div class="flex flex-1 flex-col">
    <div class="flex gap-8 border-l bg-gray-100 p-4">
      <span class="text-2xl font-semibold">CATEGORIES</span>
      <button
        class="flex items-center gap-1 rounded-md bg-retwisst-green-darkest px-4 py-1 text-white transition-colors hover:bg-retwisst-green-dark active:bg-retwisst-green-normal"
        @click="createCategory()"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>New Category</span>
      </button>
    </div>
    <div class="flex-1">
      <Datatable
        :value="categories"
        :auto-layout="true"
        :paginator="true"
        :rows="10"
        v-model:filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :rowsPerPageOptions="[10, 25, 50]"
        :row-hover="true"
        selectionMode="single"
        v-model:selection="selectedCategory"
        class="p-datatable-customers"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h5 class="m-0 text-2xl">All Categories</h5>
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
        <Column field="id" header="Category ID" :sortable="true">
          <template #body="{ data }">
            <NuxtLink class="block" :to="`/orders/${data.id}`"
              >{{ data.id }}
            </NuxtLink></template
          >
        </Column>
        <Column header="Name">
          <template #body="{ data }">
            <span>{{ data.CategoryDescriptions[0].name }}</span>
          </template>
        </Column>
        <Column header="Slug" field="slug" :sortable="true">
          <template #body="{ data }">
            <span>{{ data.slug }}</span>
          </template>
        </Column>
        <Column header="Total Products">
          <template #body="{ data }">
            <span>{{ data.Products.length }}</span>
          </template>
        </Column>
        <Column header="Total Variants">
          <template #body="{ data }">
            <span>{{
              data.Products.reduce(
                (cur, next) => (cur += next.Product._count.ProductVariants),
                0
              )
            }}</span>
          </template>
        </Column>
        <template #empty> No categories found. </template>
      </Datatable>
    </div>
    <AdminNewcategory
      :isOpen="isOpenCategoryCreate"
      @cls="setIsOpenCategoryCreate(false)"
      @success="refreshCategories"
      :category="categoryProp"
    ></AdminNewcategory>
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
const fetchCategories = async () =>
  await $fetch('http://localhost:3100/api/admin/categories/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`
    }
  });
const { data }: { data: Ref<{ categories?: [] }> } = await useAsyncData(
  'allCategories',
  fetchCategories
);
const categoryProp = reactive({
  name: '',
  slug: '',
  description: ''
});
const isOpenCategoryCreate = ref(false);
const setIsOpenCategoryCreate = (value: boolean) => {
  isOpenCategoryCreate.value = value;
};
const createCategory = () => {
  Object.keys(categoryProp).forEach((k) => {
    categoryProp[k] = '';
  });
  setIsOpenCategoryCreate(true);
};
const categories = computed(() => data.value.categories);
const refreshCategories = async () => {
  data.value = await fetchCategories();
};
const filters: {} = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const selectedCategory = ref(null);
watch(selectedCategory, (val) => {
  router.push(`/admin/categories/category-${val.id}`);
});
definePageMeta({
  title: 'Admin',
  layout: 'admin'
});
</script>

<style scoped></style>

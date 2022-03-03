<template>
  <div v-if="userStore?.token">
    <AuthHead></AuthHead>
    <div class="flex flex-col gap-6">
      <span class="block w-full border-b border-slate-300 text-3xl font-thin"
        >ORDERS
      </span>
      <div class="flex flex-col">
        <div class="flex">
          <Datatable
            :value="orders"
            :auto-layout="true"
            :paginator="true"
            :rows="10"
            v-model:filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :rowsPerPageOptions="[10, 25, 50]"
            :row-hover="true"
            selectionMode="single"
            v-model:selection="selectedOrder"
            class="p-datatable-customers"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h5 class="m-0 text-2xl">All Orders</h5>
                <div class="flex items-center bg-white">
                  <input
                    type="text"
                    v-model="filters['global'].value"
                    placeholder="Keyword Search"
                    class="text-md rounded-md px-4 py-2 text-slate-700 focus:outline-none"
                  />
                  <div class="mr-2 flex items-center justify-center">
                    <i class="pi pi-search" />
                  </div>
                </div>
              </div>
            </template>
            <Column field="id" header="#NO" :sortable="true">
              <template #body="{ data }">
                <NuxtLink class="block" :to="`/orders/${data.id}`"
                  ># {{ data.id }}
                </NuxtLink></template
              >
            </Column>
            <Column
              field="ShippingAddress.name"
              header="Address"
              :sortable="true"
            >
              <template #body="{ data }">
                <span>{{ data.ShippingAddress.name }}</span>
              </template>
            </Column>
            <Column
              field="ShippingMethod.acronym"
              header="Method"
              :sortable="true"
            >
              <template #body="{ data }">
                <span>{{ data.ShippingMethod.acronym }}</span>
              </template>
            </Column>
            <Column
              header="Pallets"
              class="table-cell md:hidden 2xl:table-cell"
            >
              <template #body="{ data }">
                <div class="flex flex-col items-end lg:items-start">
                  <span
                    ><span class="font-bold">{{
                      Math.floor(
                        data.OrderItems.reduce((cur, it) => {
                          return cur + it.quantity / it.Variant.boxPerPallet;
                        }, 0)
                      )
                    }}</span>
                    x Full Pallet</span
                  ><span
                    v-if="
                      data.OrderItems.reduce((cur, it) => {
                        return cur + it.quantity / it.Variant.boxPerPallet;
                      }, 0) %
                        1 >
                      0
                    "
                    ><span class="font-bold"
                      >1x
                      {{
                        (
                          (data.OrderItems.reduce((cur, it) => {
                            return cur + it.quantity / it.Variant.boxPerPallet;
                          }, 0) %
                            1) *
                          100
                        ).toFixed(2)
                      }}% Filled</span
                    >
                    Pallet</span
                  >
                </div>
              </template>
            </Column>
            <Column field="OrderStatus.name" :sortable="true" header="Status">
              <template #body="{ data }">
                <span>{{ data.OrderStatus.name }}</span>
              </template>
            </Column>
            <Column
              field="createdAt"
              header="Created"
              :sortable="true"
              class="table-cell md:hidden 2xl:table-cell"
            >
              <template #body="{ data }">
                <span>{{ dayjs(data.createdAt).format('LLL') }}</span>
              </template>
            </Column>
            <Column field="updatedAt" header="Last Action" :sortable="true">
              <template #body="{ data }">
                <span>{{ dayjs(data.updatedAt).format('LLL') }}</span>
              </template>
            </Column>
            <Column field="totalPrice" header="Total" :sortable="true">
              <template #body="{ data }"> $ {{ data.totalPrice }}</template>
            </Column>
          </Datatable>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'nuxt3/dist/app/compat/vue-demi';
import { useUserStore } from '~~/store';
import Datatable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(LocalizedFormat);
const userStore = useUserStore();
const router = useRouter();
const {
  data
}: {
  data: Ref<{
    orders?: [
      {
        id?: number;
        OrderItems?: [{ [key: string]: string }];
        OrderStatus?: { [key: string]: string };
        OrderStatusHistories?: [{ [key: string]: string }];
        ShippingAddress?: { [key: string]: string };
        ShippingMethod?: { [key: string]: string };
        totalPrice?: number;
        status?: string;
      }
    ];
  }>;
} = await useAsyncData('orders', () =>
  $fetch('http://localhost:3100/api/order/all', {
    headers: {
      Authorization: `Bearer ${userStore.token}`
    }
  })
);
const filters: {} = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const orders = data.value.orders;

const selectedOrder = ref(null);
watch(selectedOrder, (val) => {
  router.push(`/orders/order-${val.id}`);
});
useMeta({
  title: `Orders - Retwisst B2B`
});
</script>

<style lang="scss">
td {
  white-space: nowrap !important;
}
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;

  .p-progressbar-value {
    background-color: #607d8b;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}
.p-datatable {
  width: 100% !important;
  overflow-x: auto;
}
::v-deep(.p-datatable.p-datatable-customers) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
  }

  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
  }

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
}
</style>

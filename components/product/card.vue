<template>
  <NuxtLink
    :to="`/product/${slug}`"
    class="group flex cursor-pointer flex-col gap-2"
  >
    <div class="group relative max-h-[300px] w-full overflow-hidden">
      <img
        :src="image ? image : image2 ? image2 : '/no-image.png'"
        :key="name"
        class="max-h-[300px] w-full object-contain opacity-100 transition duration-500 group-hover:scale-110"
        :class="{ 'group-hover:opacity-0': image2 !== '' }"
      />
      <img
        v-if="image2 !== ''"
        :src="image2"
        :key="name"
        class="absolute inset-0 max-h-[300px] w-full object-contain opacity-0 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
      />
    </div>
    <div class="mt-1 flex flex-col justify-center gap-1">
      <h3
        class="text-sm font-light uppercase text-slate-700 underline-offset-4 group-hover:underline"
      >
        {{ name }}
      </h3>
      <span class="text-sm font-extralight">From ${{ min.toFixed(2) }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    required: true
  },
  image2: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  min: {
    type: Number,
    required: true
  }
});
</script>

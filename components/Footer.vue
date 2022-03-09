<template>
  <div class="mt-auto flex w-full flex-col">
    <div
      class="mt-20 hidden justify-evenly bg-slate-900 px-4 py-12 md:flex xl:grid xl:grid-cols-4"
    >
      <div class="flex items-center">
        <NuxtLink to="/"><img src="/logo.png" alt="" /></NuxtLink>
      </div>
      <div class="flex flex-col gap-4 text-slate-100">
        <span class="text-xl font-bold">CONTACT</span>
        <div class="flex flex-col gap-2">
          <a
            href="mailto:info@retwisst.com"
            class="flex items-center gap-4 font-extralight"
            ><i class="pi pi-envelope"></i> info@retwisst.com</a
          >
          <a
            href="tel:+905376556889"
            class="flex items-center gap-4 font-extralight"
            ><i class="pi pi-mobile"></i> +90 (537) 655 6889</a
          >
          <a
            href="https://www.google.com/maps/place/@51.4368338,-0.0202623,17z/data=!3m1!4b1!4m5!3m4!1s0x487602195139b5c9:0x5fc57da61bb2d717!8m2!3d51.4366201!4d-0.01795"
            target="_blank"
            class="flex items-center gap-4 font-extralight"
            ><i class="pi pi-map-marker"></i>
            <span
              >Bromley Road Catford 160<br />
              Office 107, SE6 2NZ<br />
              London</span
            ></a
          >
        </div>
      </div>
      <div class="hidden flex-col gap-4 text-slate-100 xl:flex">
        <span class="text-xl font-bold">USEFUL LINKS</span>
        <div class="flex flex-col gap-2">
          <a class="font-extralight" target="blank" href="http://retwisst.com"
            >Retwisst Website</a
          >
          <NuxtLink class="font-extralight" to="/support">Support</NuxtLink>
          <NuxtLink class="font-extralight" to="/faq">FAQ</NuxtLink>
        </div>
      </div>
      <div class="hidden flex-col gap-4 text-slate-100 xl:flex">
        <div class="flex flex-col gap-1">
          <span class="text-xl font-bold">Information Pages</span>
          <div class="flex flex-col gap-2">
            <NuxtLink class="font-extralight" to="/about-us">About Us</NuxtLink>
            <NuxtLink class="font-extralight" to="/distrubutor-program"
              >Distrubutor Program</NuxtLink
            >
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-xl font-bold">Social Media</span>
          <div class="flex items-center gap-4">
            <a
              href="https://www.youtube.com/channel/UCpy8gKCRpSX9On9Fv28kp-w"
              target="_blank"
              ><i class="pi pi-youtube !text-3xl"></i
            ></a>
            <a href="https://www.facebook.com/retwisst/" target="_blank"
              ><i class="pi pi-facebook !text-3xl"></i
            ></a>
            <a href="https://www.instagram.com/retwisst/" target="_blank"
              ><i class="pi pi-instagram !text-3xl"></i
            ></a>
            <a
              href="https://linkedin.com/company/retwisst-recycled-craft-yarns"
              target="_blank"
              ><i class="pi pi-linkedin !text-3xl"></i
            ></a>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-20 flex items-center justify-center bg-slate-700 py-2 text-slate-300 md:mt-0"
    >
      Copyright &copy; 2022 Retwisst
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

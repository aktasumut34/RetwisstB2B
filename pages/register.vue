<template>
  <div class="flex h-full min-h-screen w-full items-center justify-center">
    <div
      class="flex min-w-[75%] flex-col rounded-md p-6 shadow-2xl lg:min-w-[50%] lg:p-10 2xl:min-w-[33%] 2xl:p-16"
    >
      <div class="flex flex-col gap-6">
        <div class="mx-auto">
          <img src="/logo.png" alt="Retwisst B2B Logo" class="" />
        </div>
        <h1
          class="text-center text-3xl font-thin text-slate-700 lg:text-4xl 2xl:text-5xl"
        >
          Register
        </h1>
        <span class="text-center text-sm text-slate-400">
          Register for new Retwisst B2B account.
        </span>
      </div>
      <div class="mt-10 flex flex-col gap-3">
        <span
          v-if="triedLogin && whyNot.length"
          class="mb-2 text-sm text-red-600"
        >
          {{ whyNot }}
        </span>
        <div class="flex flex-col gap-6" v-show="curStep === 0">
          <div
            class="group relative"
            :class="{
              'danger-shake': dangers.includes('name')
            }"
          >
            <input
              type="text"
              class="relative w-full rounded border-0 bg-white py-3 pl-12 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
              :class="{
                'ring-retwisst-purple-normal': !validName,
                'ring-retwisst-green-normal': validName,
                ring: name.length > 0 || triedLogin
              }"
              v-model="name"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <font-awesome-icon
                :icon="['fas', 'id-badge']"
                fixed-width
                class="text-slate-300 group-focus-within:text-slate-500"
                :class="{
                  'text-slate-500': name.length > 0 || triedLogin
                }"
              />
            </div>

            <span
              class="pointer-events-none absolute top-2 left-12 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
              :class="{
                '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                  name.length > 0
              }"
              >Name</span
            >
          </div>
          <div
            class="group relative"
            :class="{
              'danger-shake': dangers.includes('email')
            }"
          >
            <input
              type="text"
              class="relative w-full rounded border-0 bg-white py-3 pl-12 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
              :class="{
                'ring-retwisst-purple-normal': !validMail,
                'ring-retwisst-green-normal': validMail,
                ring: email.length > 0 || triedLogin
              }"
              v-model="email"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <font-awesome-icon
                :icon="['fas', 'at']"
                fixed-width
                class="text-slate-300 group-focus-within:text-slate-500"
                :class="{
                  'text-slate-500': email.length > 0 || triedLogin
                }"
              />
            </div>

            <span
              class="pointer-events-none absolute top-2 left-12 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
              :class="{
                '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                  email.length > 0
              }"
              >E-mail</span
            >
          </div>
          <div
            class="group relative"
            :class="{
              'danger-shake': dangers.includes('password')
            }"
          >
            <input
              type="password"
              class="relative w-full rounded border-0 bg-white py-3 pl-12 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
              :class="{
                'ring-retwisst-purple-normal': !validPassword,
                'ring-retwisst-green-normal': validPassword,
                ring: password.length > 0 || triedLogin
              }"
              v-model="password"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <font-awesome-icon
                :icon="['fas', 'lock']"
                fixed-width
                class="text-slate-300 group-focus-within:text-slate-500"
                :class="{
                  'text-slate-500': password.length > 0 || triedLogin
                }"
              />
            </div>

            <span
              class="pointer-events-none absolute top-2 left-12 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
              :class="{
                '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                  password.length > 0
              }"
              >Password</span
            >
          </div>
          <div
            class="group relative"
            :class="{
              'danger-shake': dangers.includes('password')
            }"
          >
            <input
              type="password"
              class="relative w-full rounded border-0 bg-white py-3 pl-12 text-sm text-slate-600 shadow outline-none transition focus:outline-none focus:ring"
              :class="{
                'ring-retwisst-purple-normal': !validPassword,
                'ring-retwisst-green-normal': validPassword,
                ring: passwordConfirm.length > 0 || triedLogin
              }"
              v-model="passwordConfirm"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <font-awesome-icon
                :icon="['fas', 'lock']"
                fixed-width
                class="text-slate-300 group-focus-within:text-slate-500"
                :class="{
                  'text-slate-500': passwordConfirm.length > 0 || triedLogin
                }"
              />
            </div>

            <span
              class="pointer-events-none absolute top-2 left-12 bg-white px-0 text-lg text-slate-300 transition-all group-focus-within:-translate-x-5 group-focus-within:-translate-y-6 group-focus-within:scale-75 group-focus-within:px-1 group-focus-within:text-slate-500"
              :class="{
                '-translate-x-5 -translate-y-6 scale-75 !px-1 text-slate-500':
                  passwordConfirm.length > 0
              }"
              >Confirm Password</span
            >
          </div>
        </div>
        <div class="flex flex-col gap-6" v-show="curStep === 1">
          <span class="text-slate-700"
            >Welcome {{ name }}, please verify your phone!</span
          >
          <client-only>
            <vue-tel-input
              v-model="phone"
              @validate="phoneValidate"
              class="border-0 bg-white text-sm text-slate-600 shadow outline-none ring transition"
              :class="{
                'ring-retwisst-purple-normal': !validPhone,
                'ring-retwisst-green-normal': validPhone
              }"
            ></vue-tel-input>
          </client-only>
        </div>
        <button
          class="mt-4 w-full rounded bg-retwisst-purple-normal py-2 font-thin text-white outline-none ring-0 ring-retwisst-purple-normal ring-offset-2 transition-colors hover:bg-retwisst-purple-dark focus:outline-none focus:ring-2 active:bg-retwisst-purple-darkest"
          @click="nextStep"
        >
          <template v-if="regLoading">
            <font-awesome-icon
              :icon="['fas', 'spinner']"
              spin
            ></font-awesome-icon>
          </template>
          <template v-else> Continue </template>
        </button>
      </div>
      <NuxtLink class="mt-10" to="/login">Have an account? Log In</NuxtLink>
    </div>
    <div
      class="absolute flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
      v-if="phoneSended"
    >
      <div class="min-w-[30%] rounded-md bg-white p-4 shadow-sm">
        <div class="flex flex-col items-center justify-center gap-2">
          <h1 class="text-2xl font-bold">Verify your phone</h1>
          <p class="text-sm font-thin">
            We sent a code to <span class="font-normal">{{ phone }}</span>
          </p>
          <input
            type="text"
            v-model="twofacode"
            class="border-blakc w-full rounded-md border-2 py-2 px-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-retwisst-green-normal"
            placeholder="Enter code"
          />
          <button
            class="rounded-md bg-retwisst-green-dark px-4 py-2 text-white"
            @click="verifyPhone"
          >
            <template v-if="phoneLoading">
              <font-awesome-icon
                :icon="['fas', 'spinner']"
                spin
              ></font-awesome-icon>
            </template>
            <template v-else> Verify </template>
          </button>

          <p
            class="pt-4 text-left text-sm text-red-600"
            v-if="phoneValidationError.length"
          >
            {{ phoneValidationError }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import is from 'is_js';
const curStep = ref(0);
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const phone = ref('');
const formattedPhone = ref('');
const phoneSended = ref(false);
const twofacode = ref('');
const phoneValidationError = ref('');
const whyNot = ref('');
const triedLogin = ref(false);
const invalidMails = ref([]);
const regLoading = ref(false);
const phoneLoading = ref(false);
const validMail = computed(
  () => is.email(email.value) && !invalidMails.value.includes(email.value)
);
const validPassword = computed(
  () => password.value.length >= 8 && password.value === passwordConfirm.value
);
const validName = computed(() => name.value.length >= 3);
const validPhone = ref(false);
const phoneValidate = (p) => {
  validPhone.value = p.valid ? true : false;
  formattedPhone.value = p.number;
};
const dangers = ref([]);
const nextStep = async () => {
  triedLogin.value = true;
  if (!validName.value) {
    dangers.value = ['name'];
    whyNot.value = 'Name must be at least 3 characters long';
  } else if (!validMail.value) {
    dangers.value.push('email');
    whyNot.value = 'Please enter a valid email address';
  } else if (!validPassword.value) {
    dangers.value.push('password');
    whyNot.value =
      'Password must be at least 8 characters and match with the confirm password.';
  }
  if (dangers.value.length > 0) {
    setTimeout(() => {
      dangers.value = [];
    }, 250);
    return;
  } else {
    if (curStep.value === 0) {
      regLoading.value = true;
      try {
        const response = await fetch(
          'http://localhost:3000/api/auth/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
              name: name.value
            })
          }
        );
        if (response.status === 200) {
          const { token } = await response.json();
          localStorage.setItem('token', token);
          curStep.value = 1;
          whyNot.value = '';
        } else {
          curStep.value = 0;
          const { errors } = await response.json();
          whyNot.value = errors[0].message;
          if (errors[0].type === 'email') {
            invalidMails.value.push(email.value);
            dangers.value = ['email'];
          }
        }
      } catch (e) {
        whyNot.value = 'Something went wrong, please try again later.';
      }
      regLoading.value = false;
      setTimeout(() => {
        dangers.value = [];
      }, 250);
    } else if (curStep.value === 1) {
      if (!validPhone.value) {
        whyNot.value = 'Please enter a valid phone number';
        return;
      }
      try {
        regLoading.value = true;
        const response = await fetch(
          'http://localhost:3000/api/sms/send-2fa-code',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              to: formattedPhone.value
            })
          }
        );
        const data = await response.json();
        if (response.status === 200) {
          if (data.success) {
            phoneSended.value = true;
          }
        } else if (response.status >= 400) {
          whyNot.value = data.message;
        }
      } catch (e) {
        whyNot.value = 'Something went wrong, please try again later.';
      }
      regLoading.value = false;
    }
  }
};
const verifyPhone = async () => {
  try {
    phoneLoading.value = true;
    const response = await fetch(
      'http://localhost:3000/api/sms/verify-2fa-code',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          to: formattedPhone.value,
          code: twofacode.value
        })
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      if (data.success) {
        window.location.href = '/';
      } else {
        phoneValidationError.value = 'Invalid code! Please try again.';
      }
    } else throw new Error(data.message);
  } catch (e) {
    phoneValidationError.value =
      'Something went wrong, please try again later.';
  }
  phoneLoading.value = false;
};
</script>
<style scoped>
.or-section::before,
.or-section::after {
  content: '';
  height: 0.5em;
  border-bottom: 1px solid rgb(203, 213, 225);
  flex: 1 0 auto;
}
.orspan {
  flex: 0.2 0 auto;
  font-size: 1em;
  line-height: 1em;
}
.danger-shake {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
@keyframes shake {
  0% {
    transform: skewY(0);
  }
  20% {
    transform: skewY(1deg);
  }
  40% {
    transform: skewY(-1deg);
  }
  60% {
    transform: skewY(1deg);
  }
  100% {
    transform: skewY(0);
  }
}
</style>

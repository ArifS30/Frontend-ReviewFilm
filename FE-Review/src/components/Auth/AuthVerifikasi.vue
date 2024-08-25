<template>
  <AuthHeader />
  <main class="mx-auto max-w-6xl px-8 py-20 my-10 rounded-xl min-h-[80vh]">
    <div class="mx-auto max-w-2xl border rounded-2xl border-neutral px-2 py-3">
      <h1 class="text-center text-3xl font-bold mb-5">Verify</h1>
      <form @submit.prevent="handleVerifikasi">
        <div class="my-5">
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input type="text" class="grow" placeholder="OTP Code" v-model="otp" />
          </label>
          <input type="submit" class="btn btn-neutral btn-block mt-5" value="Verify" />
        </div>
      </form>
      <p>
        Didn't get the code?
        <button @click="handleGenerate" class="link link-neutral link-hover">Resend</button>
      </p>
      <div v-if="showAlert" class="alert alert-success shadow-lg">
        <div>
          <span>OTP code has been resent!</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import AuthHeader from './AuthHeader.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { ref } from 'vue';

const authStore = useAuthStore();
const otp = ref(null);
const showAlert = ref(false);

const {verifyAccount, generateOTP} = authStore;

const handleGenerate = () => {
  showAlert.value = true;
  generateOTP();
  setTimeout(() => {
    showAlert.value = false;
  }, 5000);
};

const handleVerifikasi = () => {
  verifyAccount(otp.value);
};
</script>
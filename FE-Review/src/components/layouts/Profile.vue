<template>
  <div class="bg-white shadow-md rounded-lg max-w-3xl px-6 py-20  mx-auto flex justify-center items-center">
    <div class="flex flex-col items-center">
      <div class="bg-neutral  w-24 h-24 rounded-lg text-white flex items-center justify-center mb-4">
        <span class="text-3xl font-bold">{{ authStore.currentUser.name }}</span>
      </div>
      <div v-if="authStore.currentUser">
        <div class="mb-4">
          <p class="font-bold">Name: {{ authStore.currentUser.name }}</p>
        </div>
        <div class="mb-4">
          <p class="font-bold">Email: {{ authStore.currentUser.email }}</p>
        </div>
        <div>
          <p class="font-bold">Verification Status: </p>
          <p v-if="authStore.currentUser?.email_verified_at" class="text-green-500 text-center mt-4 text-2xl">Verified
          </p>
          <p v-else class="text-red-500">Not Verified</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.getMe();
});
</script>
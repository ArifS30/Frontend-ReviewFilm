<template>
  <main class="bg-white shadow-md rounded-lg max-w-3xl px-6 py-10  mx-auto">
    <form @submit.prevent="handleUpdate">
      <div class="text-center text-2xl mb-5">
        <p class="font-bold">Name: {{ authStore.currentUser.name }}</p>
      </div>
      <label class="input input-bordered flex items-center my-4 ">
        <input type="text" class="grow " placeholder="newName" v-model="newName" />
      </label>
      <input type="submit" class="btn btn-neutral btn-block text-white" placeholder="Update" />
    </form>
  </main>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const { updateUser } = authStore;

const newName = ref('');
onMounted(() => {
  authStore.getMe();
});

const handleUpdate = () => {
  updateUser(newName.value);
};
</script>

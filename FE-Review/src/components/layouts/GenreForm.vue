<template>
  <main class="mx-auto max-w-6xl px-8 py-8 my-10 rounded-xl min-h-[80vh]">
    <div class="bg-white shadow-md rounded-lg max-w-3xl px-6 py-10 mx-auto">
      <h1 class="text-center text-3xl font-bold mb-5">
        {{ props.title }} Genre
      </h1>
      <form @submit.prevent="handleSubmit()">
        <label class="input input-bordered flex items-center">
          <input type="text" class="grow mb-2" placeholder="Add Genre Name" v-model="name" />
        </label>
        <input type="submit" :value="props.title" class="btn btn-neutral btn-block mt-5" />
      </form>
    </div> 
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import costumAPI from "@/api";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  isUpdate: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const GenreById = async () => {
  const { data } = await costumAPI(`/Genre/${route.params.id}`);
  name.value = data.data.name;
};

const authStore = useAuthStore();
const router = useRouter();
const name = ref("");


const handleSubmit = async () => {
  try {
    if (!props.isUpdate) {
      await costumAPI.post(
        "/Genre",
        {
          name: name.value,
        },
        {
          headers: { Authorization: `Bearer ${authStore.tokenUser}` },
        }
      );
      alert("Genre Added Successfully");
      router.push({ name: "Genre" });
    } else {
      await costumAPI.put(
        `/Genre/${route.params.id}`,
        {
          name: name.value,
        },
        {
          headers: { Authorization: `Bearer ${authStore.tokenUser}` },
        }
      );

      alert("Genre Updated Successfully");
      router.push({ name: "Genre" });
    }
  } catch (e) {
    alert("Internal Server Error");
  }
};

onMounted(() => {
  if (props.isUpdate) {
    GenreById();
  }
});
</script>

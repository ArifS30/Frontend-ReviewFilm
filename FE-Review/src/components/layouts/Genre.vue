<template>
    <div>
      <div class="divider divider-neutral">
        <h1 class="text-3xl font-bold text-neutral">Genre Movie</h1>
      </div>
      <div class="flex justify-end" v-if="authStore.currentUser?.role_id === '9c5ecdf3-01ae-4102-962b-58f0de2027aa'">
        <RouterLink :to="{ name: 'CreateGenre' }" class="btn btn-neutral">Add Genre</RouterLink>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 mt-3 gap-4">
        <div class="card glass" v-for="genre in genres" :key="genre.id" v-if="genres">
          <div class="card-body shadow-xl rounded-xl">
            <h2 class="card-title text-center md:text-left">{{ genre.name }}</h2>
            <div class="card-actions justify-center md:justify-end">
              <div class="flex justify-center md:justify-end">
                <RouterLink class="btn btn-neutral" :to="{ name: 'DetailGenre', params: { id: genre.id } }">
                  Details
                </RouterLink>
              </div>
              <div class="card-actions justify-center md:justify-end">
                <RouterLink class="btn btn-success" :to="{ name: 'UpdateGenre', params: { id: genre.id } }"
                  v-if="authStore.currentUser.role_id === '9c5ecdf3-01ae-4102-962b-58f0de2027aa'">
                  Update
                </RouterLink>
              </div>
              <div class="card-actions justify-center md:justify-end">
                <button class="btn btn-warning" @click="handleDelete(genre.id)"
                  v-if="authStore.currentUser.role_id === '9c5ecdf3-01ae-4102-962b-58f0de2027aa'">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { RouterLink } from "vue-router";
  import costumAPI from "@/api";
  import { onMounted, ref } from "vue";
  import { useAuthStore } from "@/stores/AuthStore";
  
  const authStore = useAuthStore();
  const genres = ref("");
  
  const FetchGenres = async () => {
    const response = await costumAPI.get("/Genre");
  
    genres.value = response.data.data;
  };
  
  const handleDelete = async (id) => {
    try {
      const response = await costumAPI.delete(`/Genre/${id}`, {
        headers: { Authorization: `Bearer ${authStore.tokenUser}` },
      });
  
      alert(response.data?.message || "Genre Deleted Successfully"); 
      FetchGenres();
    } catch (error) {
      alert("Internal Server Error");
    }
  };
  
  onMounted(() => {
    FetchGenres();
  });
  </script>
  
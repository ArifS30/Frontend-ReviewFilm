<template>
  <div class="container mx-auto">
    <div class="flex justify-end">
      <RouterLink :to="{ name: 'AddMovie' }" class="btn btn-neutral" v-if="authStore.currentUser.role_id === '9c5ecdf3-01ae-4102-962b-58f0de2027aa'"
      >Add Movie</RouterLink>
    </div>
    <Movie :carousel="trendingMovies" :data="movies" v-if="movies.length > 0" :onDelete="deleteMovie" />
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import costumAPI from "@/api";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import Movie from "@/components/layouts/Movie.vue";

const authStore = useAuthStore();
const trendingMovies = ref("");
const movies = ref("");

const fetchMovies = async () => {
  const response = await costumAPI.get("/movie");

  trendingMovies.value = response.data.trending;
  movies.value = response.data.data;
};

onMounted(() => {
  fetchMovies();
});


const deleteMovie = async (id) => {
  try {
    await costumAPI.delete(`/movie/${id}`, {
      headers: { Authorization: `Bearer ${authStore.tokenUser}` },
    });
    fetchMovies();

    alert("Movie Deleted Successfully");
  } catch (error) {
    console.log(error);

    alert("Internal Server Error");
  }
};

</script>

<template>
  <div class="container mx-auto">
    <Home :carousel="trendingMovies" :data="movies" v-if="movies.length > 0" />
  </div>
</template>

<script setup>
import costumAPI from "@/api";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import Home from "@/components/layouts/Home.vue";

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

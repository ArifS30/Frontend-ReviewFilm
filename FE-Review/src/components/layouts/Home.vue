<template>
  <div class="mx-auto max-w-6xl px-8  rounded-xl min-h-[80vh]">
    <section>
      <div class="hero  min-h-[40vh]">
        <div class="hero-content flex-col lg:flex-row">
          <img :src="carousel[0].poster" class="max-w-sm rounded-lg shadow-2xl" />
          <div class="ml-10">
            <h1 class="text-5xl font-bold">Welcome!</h1>
            <p class="py-6 text-2xl">
              There are lots of movies to see!
            </p>
            <RouterLink to="/movie" class="btn btn-neutral">Get Started</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="divider divider-neutral">
        <h1 class="text-3xl font-bold text-neutral">Trending</h1>
      </div>
      <div class="container mx-auto pb-2">
        <div class="card rounded-box grid h-full place-items-center">
          <div class="carousel carousel-center rounded-box w-full space-x-4 p-4">
            <div class="carousel-item relative" v-for="item in props.carousel" :key="item.id">
              <div class="w-full h-96 overflow-hidden rounded-xl">
                <img :src="item.poster" class="object-cover w-full h-full" />
              </div>
              <div class="absolute bottom-0 left-0 w-full bg-neutral bg-opacity-75 text-center py-2">
                <div class="font-bold">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <div v-for="(movies, genre) in groupedMovies" :key="genre">
      <div class="divider divider-neutral">
        <h2 class="text-3xl font-bold mb-3 mt-5 text-neutral">{{ genre }}</h2>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div class="card bg-base-100 shadow-xl text-center" v-for="movie in movies" :key="movie.id">
          <figure>
            <img :src="movie.poster" class="h-60" />
          </figure>
          <div class="card-body items-center">
            <h2 class="card-title">{{ movie.title }}</h2>
            <div class="btn-group">
              <RouterLink class="btn btn-neutral" :to="{ name: 'DetailMovie', params: { id: movie.id } }"
               >Details</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/AuthStore";
import { computed } from "vue";

const authStore = useAuthStore();

const props = defineProps({
  carousel: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,

  },
});

const groupedMovies = computed(() => {
  return props.data.reduce((acc, movie) => {
    if (!acc[movie.genre]) {
      acc[movie.genre] = [];
    }
    acc[movie.genre].push(movie);
    return acc;
  }, {});
});

</script>

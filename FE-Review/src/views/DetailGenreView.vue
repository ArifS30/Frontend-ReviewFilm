<template>
  <section v-if="genre">
    <div class="divider divider-neutral">
      <h1 class="text-3xl font-bold text-neutral">{{ genre.name }}</h1>
    </div>
    <div class="container mx-auto pb-2">
      <div class="card rounded-box grid h-full place-items-center"  v-if="genre.list_movies.length">
          <div
            class="carousel carousel-center rounded-box w-full space-x-4 p-4"
          >
            <div
              class="carousel-item relative"
              v-for="(item, index) in genre.list_movies"
              :key="index"
            >
                <RouterLink>
                    <div class="w-full h-96 overflow-hidden rounded-xl">
                <img :src="item.poster" class="object-cover w-full h-full" />
              </div>
                </RouterLink>
              <div
                class="absolute bottom-0 left-0 w-full bg-neutral bg-opacity-75 text-center py-2"
              >
                <div class="font-bold">{{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
        <h1 class="text-3xl font-bold text-neutral">No Movies Found</h1>
      </div>
      </div>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";
import costumAPI from "@/api";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";


const route = useRoute();


const genre = ref(null);

const GenreById = async () => {
  const { data } = await costumAPI(`/Genre/${route.params.id}`);
  genre.value = data.data;
};

onMounted(() => {
  GenreById();
});
</script>

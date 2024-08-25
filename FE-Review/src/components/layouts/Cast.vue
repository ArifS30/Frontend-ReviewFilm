<template>
  <div>
    <h1 class="text-3xl font-bold mb-3">List Cast</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div class="card bg-base-100 shadow-xl text-center" v-for="item in listCast" :key="item.id">
        <figure>
          <img :src="item.image" class="h-60" />
        </figure>
        <div class="card-body items-center">
          <h2 class="card-title">{{ item.name }}</h2>
          <p>{{ item.movie }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  listCast: {
    type: Array,
    required: true,
  },
});
</script>

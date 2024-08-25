<template>
<RouterLink class="btn btn-neutral" to="/cast">Back</RouterLink>
<Cast :listCast="listCast"/>
</template>

<script setup>
import Cast from '@/components/layouts/Cast.vue'
import { RouterLink } from 'vue-router';
const listCast = [
  {
    id:1,
    name:"Dilan",
    movie:"Deadpool",
    image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id:2,
    name:"Kaka",
    movie:"Deadpool",
    image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id:3,
    name:"Motel",
    movie:"Deadpool",
    image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id:4,
    name:"Dilan",
    movie:"Deadpool",
    image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id:5,
    name:"Kaka",
    movie:"Deadpool",
    image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    id:6,
    name:"Motel",
    movie:"Deadpool",
    image:"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
]
</script>
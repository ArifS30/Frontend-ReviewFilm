<template>
  <nav class="text-white">
    <div class="navbar bg-neutral p-0">
      <div>
        <div class="dropdown lg:hidden">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
            <li v-for="item in listNav" :key="item.id">
              <RouterLink :to="item.link" class="mr-2 hover:text-stone-800">{{
                item.name
                }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-start">
        <RouterLink to="/" class="btn btn-ghost">
          <img :src="image" class="h-8 w-auto" />
        </RouterLink>
        <ul class="hidden lg:flex lg:items-center">
          <li v-for="item in listNav" :key="item.id">
            <RouterLink :to="item.link" class="mr-2 hover:text-stone-800">{{
              item.name
              }}</RouterLink>
          </li>
          <li v-if="
            authStore.currentUser && authStore.currentUser.email_verified_at
          ">
            <RouterLink to="/profile" class="mr-2 hover:text-stone-800">Profile</RouterLink>
            <RouterLink to="/update" class="mr-2 hover:text-stone-800">Update</RouterLink>
          </li>
          <li v-if="
            authStore.tokenUser && !authStore.currentUser.email_verified_at
          ">
            <RouterLink to="/verifikasi" class="mr-2 hover:text-stone-800">Verify Account</RouterLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <button v-if="authStore.tokenUser" class="btn btn-warning" @click="handleLogout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import image from "@/assets/logo.png";
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logoutUser();
};

const listNav = [
  {
    id: 1,
    name: "Movie",
    link: "/movie",
  },
  {
    id: 2,
    name: "Cast",
    link: "/cast",
  },
  {
    id: 3,
    name: "Genre",
    link: "/genre",
  },
];
</script>

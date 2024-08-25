import { createRouter, createWebHistory } from "vue-router";
import CastView from "@/views/CastView.vue";
import GenreView from "@/views/GenreView.vue";
import ProfileView from "@/views/ProfileView.vue";
import UpdateView from "@/views/UpdateView.vue";
import LoginView from "@/views/Auth/LoginView.vue";
import RegisterView from "@/views/Auth/RegisterView.vue";
import MovieView from "@/views/MovieView.vue";
import Verifikasi from "@/views/Auth/Verifikasi.vue";
import PublicLayouts from "@/layouts/PublicLayouts.vue";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/AuthStore";
import AddMovieView from "@/views/AddMovieView.vue";
import CreateGenreView from "@/views/CreateGenreView.vue";
import DetailGenreView from "@/views/DetailGenreView.vue";
import UpdateGenreView from "@/views/UpdateGenreView.vue";
import UpdateMovieView from "@/views/UpdateMovieView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: PublicLayouts,
      children: [
        {
          path: "/",
          name: "Home",
          component: HomeView,
        },
        {
          path: "/cast",
          name: "Cast",
          component: CastView,
        },
        {
          path: "/movie",
          name: "Movie",
          component: MovieView,
        },
        {
          path: "/movie/:id",
          name: "DetailMovie",
          component: MovieView,
        },
        {
          path: "/movie/:id/update",
          name: "UpdateMovie",
          component: UpdateMovieView,
        },
        {
          path: "/genre",
          name: "Genre",
          component: GenreView,
        },
        {
          path: "/genre/:id",
          name: "DetailGenre",
          component: DetailGenreView,
        },
        {
          path: "/genre/:id/update",
          name: "UpdateGenre",
          component: UpdateGenreView,
        },
        {
          path: "/genre/CreateGenre",
          name: "CreateGenre",
          component: CreateGenreView,
        },
        {
          path: "/movie/addmovie",
          name: "AddMovie",
          component: AddMovieView,
        },
        {
          path: "/profile",
          name: "Profile",
          component: ProfileView,
          meta: { isVerifikasi: true },
        },
        {
          path: "/update",
          name: "Update",
          component: UpdateView,
          meta: { isVerifikasi: true },
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiredAuth: true },
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
      meta: { requiredAuth: true },
    },
    {
      path: "/verifikasi",
      name: "Verifikasi",
      component: Verifikasi,
      meta: { isVerifikasiOTP: true },
    },
  ],
});

// Global Navigation Guard
router.beforeEach(async (to) => {
  const authStore = await useAuthStore();
  if (to.meta.requiredAuth && authStore.tokenUser) {
    alert("Anda Sudah Login");
    return {
      path: "/",
    };
  }
  if (to.meta.isVerifikasi && !authStore.currentUser.email_verified_at) {
    alert("Anda Belum Verifikasi");
    return {
      path: "/",
    };
  }
  if (to.meta.isVerifikasiOTP && authStore.currentUser.email_verified_at) {
    alert("Anda Sudah Verifikasi");
    return {
      path: "/",
    };
  }
});

export default router;

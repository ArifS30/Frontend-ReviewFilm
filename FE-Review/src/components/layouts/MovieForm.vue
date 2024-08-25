<template>
    <div
      class="bg-white shadow-md rounded-lg max-w-3xl px-6 py-20 mx-auto flex justify-center items-center"
    >
      <div class="flex flex-col items-center">
        <form @submit.prevent="handleSubmit">
          <h1 class="text-4xl text-center font-bold pb-4">Add Or Update Movie</h1>
          <label class="input input-bordered flex items-center mb-4">
            <input
              type="text"
              class="grow"
              v-model="movie.title"
              placeholder="Title"
            />
          </label>
          <textarea
            class="textarea textarea-bordered mb-4 pr-72"
            v-model="movie.summary"
            placeholder="Summary"
          ></textarea>
          <label class="input input-bordered flex items-center mb-4">
            <input
              type="text"
              class="grow"
              v-model="movie.year"
              placeholder="Year"
            />
          </label>
          <label class="form-control w-full max-w-xs mb-4">
            <select
              class="select select-bordered"
              v-if="genre"
              v-model="movie.genre_id"
            >
              <option disabled selected>Pick Genre</option>
              <option :value="genre.id" v-for="genre in genre" :key="genre.id">
                {{ genre.name }}
              </option>
            </select>
          </label>
          <input
            type="file"
            class="file-input file-input-bordered w-full max-w-xs"
            @change="handleUpload"
          />
          <input
            type="submit"
            value="Add Or Update"
            class="btn btn-neutral btn-block mt-5"
          />
        </form>
  
        <div v-if="errors && Object.keys(errors).length">
          <h3 class="text-red-600 font-bold">Please correct the following:</h3>
          <ul>
            <li v-for="error in errors" :key="error" class="text-red-600">
              {{ error[0] }}
            </li>
          </ul>  
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import costumAPI from "@/api";
  import { onMounted, ref } from "vue";
  import { reactive } from "vue";
  import { useAuthStore } from "@/stores/AuthStore";
  import { useRoute, useRouter } from "vue-router";
  
  const authStore = useAuthStore();
  const route = useRoute();
  const router = useRouter();
  const errors = ref({});
  const genre = ref("");
  
  const props = defineProps({
    isUpdate: {
      type: Boolean,
      default: false,
    },
    movieUpdate: {
        type: Object,
        default: ()=>({}),
    }
  })
  const movie = reactive({
  title: props.movieUpdate?.title || "",
  summary: props.movieUpdate?.summary || "",
  year: props.movieUpdate?.year || "",
  genre_id: props.movieUpdate?.genre_id || "",
  poster: null,
});
  
  const handleUpload = (event) => {
    const selectPoster = event.target.files[0];
  
    movie.poster = selectPoster;
  };
  
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
  
      formData.append("title", movie.title);
      formData.append("summary", movie.summary);
      formData.append("year", movie.year);
      formData.append("poster", movie.poster);
      formData.append("genre_id", movie.genre_id);
  
      if(!props.isUpdate){ await costumAPI.post("/movie", formData, {
        headers: {
          Authorization: `Bearer ${authStore.tokenUser}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Movie Added Successfully");
      router.push({ name: "Movie" });
        } else{
        await costumAPI.put(
            `/movie/${route.params.id}`, formData, 
                {
                movie: movie.value
                },
            {
                headers: {Authorization: `Bearer ${authStore.tokenUser}`,
                "Content-Type": "multipart/form-data",
            }
            },
        );
        
        alert("Movie Updated Successfully");
        router.push({ name: "Movie" });
    } 
    }catch (error) {
        console.log(error);
      } 
    };

  

  const fetchGenres = async () => {
  const { data } = await costumAPI.get("/Genre");
  genre.value = data.data;
};

const fetchMovieToUpdate = async () => {
  if (props.isUpdate && route.params.id) {
    const { data } = await costumAPI.get(`/movie/${route.params.id}`);
    movie.value = data.data;
    movie.title = data.data.title;
    movie.summary = data.data.summary;
    movie.year = data.data.year;
    movie.genre_id = data.data.genre_id;
  }
};
  
onMounted(async () => {
  await fetchGenres();
  await fetchMovieToUpdate();
});
  </script>
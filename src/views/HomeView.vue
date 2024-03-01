<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" placeholder="Search for City or State"
        v-model="searchQuery"
        @input="getSearchResults"
        class="bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <ul v-bind:class="{ ' bg-red-600':!searchError && mapboxSearchResults.length === 0, 'bg-weather-secondary': mapboxSearchResults }"
        class="absolute  text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
      <p v-if="searchError"> birşeyler yanlış gitti </p>
      <p
          class="py-2 "
          v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
      <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
      class="py-2 cursor-pointer"
      @click="previewCity(searchResult)">
        {{ searchResult.place_name }}
      </li>
    </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <AnimatedPreloader />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import AnimatedPreloader from "../components/AnimatedPreloader.vue";
import { getMapboxSearchResults } from "../service/apiService";

const router = useRouter();
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = async () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        mapboxSearchResults.value = await getMapboxSearchResults(
          searchQuery.value
        );
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>


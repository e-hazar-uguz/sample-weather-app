<template>
    <header class="sticky top-0 bg-weather-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-none items-center gap-4 text-white py-6">
        
        <RouterLink :to="{name:'home'}">
          
              <div class="flex items-center gap-16 ">
                <i class="fa-solid fa-sun text-3xl icon"></i>
                <i class="fa-solid fa-cloud-sun text-3xl icon"></i>
                <i class="fa-solid fa-cloud-sun-rain text-3xl icon"></i>
                <i class="fa-solid fa-smog text-3xl icon"></i>
              <i class="fa-solid fa-cloud-rain text-3xl icon"></i>
              <i class="fa-solid fa-cloud-meatball text-3xl icon"></i>
              </div>

          </RouterLink> 
       
            <div class="flex gap-3 flex-1 justify-end">
        <i class="fa-solid fa-circle-plus text-2xl md:text-3xl lg:text-4xl text-red-400 hover:text-red-300 duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
       </div>

        </nav>
    </header>
    
</template>

<script setup>
import { uid } from "uid";
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const isAdded = ref(false)
const route = useRoute();
const router = useRouter();
const savedCities = ref([]);
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );
  }
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };
  savedCities.value.push(locationObj);
  localStorage.setItem(
    "savedCities",
    JSON.stringify(savedCities.value)
  );

  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
}
</script>

<style  scoped>

.icon {
    animation: colorChange 30s infinite;
}

@keyframes colorChange {
  0% { color: lightblue; }
  20% { color: yellow; }
  40% { color:goldenrod }
  60% { color: orangered; }
  80% { color: pink; }
  100% { color: whitesmoke; }
}


@media only screen and (max-width: 640px) {
  .container {
    padding: 0 10px; 
  }
  
  .gap-16 {
    gap: 24px;
  }
  
  .icon {
    font-size: 1.5rem; 
  }
  .items-center{
    margin-top: 10px;
  }
}

</style>
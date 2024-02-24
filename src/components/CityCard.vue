<template>
  
    <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer" style="background: linear-gradient(135deg, #3498db, #bd5d25);">
        <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(((city.weather.main.temp - 32) * 5) / 9) }}&deg;C
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:
          {{ Math.round(((city.weather.main.temp_max- 32) * 5) / 9) }}&deg;C
        </span>
        <span class="text-xs">
          L:
          {{ Math.round(((city.weather.main.temp_min - 32) * 5) / 9) }}&deg;C
        </span>
      </div>
    </div>
    </div>
</template>

<script setup>

defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>

<style>
@media only screen and (max-width: 640px) {
  .flex-1 h2 {
    font-size: 1.5rem;
  }
  
  .flex-1 h3 {
    font-size: .9rem; 
  }
}

</style>

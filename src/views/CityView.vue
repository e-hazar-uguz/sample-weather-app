<template>
    <div>
        <Suspense>
      <template #default>
        <AsyncCityView />
      </template>
      <template #fallback>
        <AnimatedPreloader />
      </template>
    </Suspense> 
    </div>
</template>

<script setup>
import AsyncCityView from "../components/CityView.vue";
import AnimatedPreloader from "../components/AnimatedPreloader.vue";
</script> 
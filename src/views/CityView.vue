<template>
    <div>
        <Suspense>
      <template #default>
        <AsyncCityView />
      </template>
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense> 
    </div>
</template>

<script setup>
import AsyncCityView from "../components/CityView.vue";
import CityViewSkeleton from "../components/CityViewPreloader.vue";
</script> 
<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary
     bg-gradient-to-r
    from-weather-primary 
    via-amber-950
    to-weather-secondary
    background-animate">
    <SiteNavigation></SiteNavigation>
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page" mode="out-in">
      <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>


<script setup>
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue'
</script>

<style scoped>
.page-enter-active {
  transition: 600ms ease all;
}

.page-enter-from {
  opacity: 0;
}

.background-animate {
    background-size: 400%;

    -webkit-animation: AnimationName 30s ease infinite;
    -moz-animation: AnimationName 30s ease infinite;
    animation: AnimationName 30s ease infinite;
  }

  @keyframes AnimationName {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

</style>
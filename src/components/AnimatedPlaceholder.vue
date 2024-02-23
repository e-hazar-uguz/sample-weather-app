  <template>
    <div class="preloader">
      <div class="animate-pulse bg-gradient-to-r from-blue-400 to-orange-600 rounded-full h-20 w-20"></div>
    </div>
  </template>
  
  <style scoped>
  .preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .animate-pulse {
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  </style>
  
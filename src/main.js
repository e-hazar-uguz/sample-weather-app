

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './assets/tailwind.css'


 const app = createApp(App)
app.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCfvNUFd8B8hZCDNsNriYqL1g768IroSq4',
    },
  })
app.use(router)
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/data/jquery.min.js'
import '../src/assets/data/semantic.min.js'
import '../src/assets/js/all.min.js'
import '../src/assets/css/all.css'
import "@soerenmartius/vue3-clipboard"
import '../src/assets/data/g2.min.js'
import { VueClipboard } from '@soerenmartius/vue3-clipboard'



const apps = createApp(App)
apps.use(VueClipboard)
apps.use(router)
apps.mount('#app')

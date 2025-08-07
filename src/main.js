import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/js/components/base/lucide'
import './assets/js/vendors/lucide.js'
import './assets/movimientos.css'
import './assets/links.css'
import './Utils/tippy.js'
import './assets/tippy.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

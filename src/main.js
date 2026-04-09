import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import './assets/main.css'

import App from './App.vue'
import router from './router/index.js'

const TarotTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#4338ca',
      600: '#3730a3',
      700: '#2b2d6a',
      800: '#1e1f4f',
      900: '#141534',
      950: '#080a1f'
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: TarotTheme,
    options: {
      darkModeSelector: '.dark'
    }
  }
})
app.mount('#app')

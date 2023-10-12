import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
// import InputFacade from 'vue-input-facade'

createApp(App)
    .use(store)
    .mount('#app')


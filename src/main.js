import { createApp, onMounted } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import "../node_modules/flag-icons/css/flag-icons.min.css";

createApp(App).use(store).use(router).mount('#app')


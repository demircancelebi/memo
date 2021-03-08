import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Styles from './style.vue'

Vue.component('styles', Styles)

createApp(App).use(store).use(router).mount('#app');

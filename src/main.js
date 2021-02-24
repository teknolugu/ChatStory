import { createApp } from 'vue';
import Toast from 'vue-toastification';
import App from './App.vue';
import router from './router';
import store from './store';
import ui from './lib/ui';
import 'vue-toastification/dist/index.css';
import './assets/css/tailwind.css';
import './assets/css/style.css';

createApp(App).use(store).use(router).use(ui).use(Toast).mount('#app');

import { createApp } from 'vue';
import Toast from 'vue-toastification';
import App from './App.vue';
import router from './router';
import store from './store';
import ui from './lib/ui';
import VTooltip from './directives/VTooltip';
import 'vue-toastification/dist/index.css';
import './assets/css/tailwind.css';
import './assets/css/style.css';
import './assets/css/tooltip.css';

const app = createApp(App);

app.directive('tooltip', VTooltip);

app.use(store).use(router).use(ui).use(Toast).mount('#app');

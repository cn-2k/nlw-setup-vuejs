import { createApp } from 'vue';
import router from '../router/index';
import '@/style/base.css';
import './lib/dayjs'
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.mount('#app');

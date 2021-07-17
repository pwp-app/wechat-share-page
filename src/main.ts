import { createApp } from 'vue';
import App from './App.vue';
import config from './config.json';

const app = createApp(App);
app.provide('qrcode_feed', config.qrcode_feed);
app.mount('#app');

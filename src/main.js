import { createApp } from 'vue'
import App from './App.vue'

import axios from 'axios'

const app = createApp(App);
app.config.globalProperties.$axios = axios; // Every components can be used as this.$axios without import.
app.mount("#app");

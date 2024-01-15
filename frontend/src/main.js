import { createApp } from 'vue'
import { Axios } from '@/configAxios';
import App from './App.vue'
import router from './router'
import store from './store'
import mitt from 'mitt';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


library.add(fas);

const eventBus = mitt();

const app = createApp(App);
app.config.globalProperties.$axios = Axios;
app.use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app');



import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import router from "./router";
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.prototype.$axios = axios;
//引入summernote
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'popper.js';
import 'summernote';
import 'summernote/dist/lang/summernote-zh-CN.js';
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs5.css';
import 'summernote/dist/summernote.css';

import '/src/assets/mtstyle.css';
import { createApp }  from 'vue';
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.config.devtools = true;


createApp(App).use(store).use(router).mount('#app');


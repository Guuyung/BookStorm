import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vuex from '@/store'
import Vue from 'vue'
import 'vant/lib/index.css';
import { Swipe, SwipeItem,Lazyload,Badge   } from 'vant';

let app= createApp(App);
app
    .use(Swipe)
    .use(Badge)
    .use(SwipeItem).use(Lazyload,{preload:2})
    .use(router).use(vuex).mount('#app')

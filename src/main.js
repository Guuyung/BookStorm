import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vuex from '@/store'
import Vue from 'vue'

let app= createApp(App);
app.use(router).use(vuex).mount('#app')

import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index'
import vuex from '@/store'
import Vue from 'vue'
import 'vant/lib/index.css';
import {
    Swipe, SwipeItem, Lazyload, Badge, Collapse, CollapseItem, Sidebar, SidebarItem,
    Tab,
    Tabs,
    Card


} from 'vant';


let app = createApp(App);

app.use(Sidebar)
    .use(Tab)
    .use(Tabs)
    .use(SidebarItem)
    .use(Card)
    .use(Swipe)
    .use(Collapse)
    .use(CollapseItem)
    .use(Badge)
    .use(SwipeItem).use(Lazyload, {preload: 2})
    .use(router).use(vuex).mount('#app')

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
    Card,Button,Tag,Form,Field,SwipeCell,SubmitBar
    ,Toast,Notify,Stepper,Checkbox,CheckboxGroup,Cell, CellGroup,Pagination,Empty

} from 'vant';


let app = createApp(App);
app.f=()=>{
    console.log(123)}
app.use(Sidebar)
    .use(Toast)
    .use(Empty)
    .use(Pagination )
    .use(Cell)
    .use(CellGroup)
    .use(Checkbox)
    .use(CheckboxGroup )
    .use(Stepper )
    .use(SubmitBar)
    .use(SwipeCell )
    .use(Form)
    .use(Notify)
    .use(Field)
    .use(Tag)
    .use(Button)
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

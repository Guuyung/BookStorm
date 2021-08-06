import {createRouter, createWebHashHistory} from "vue-router";

const route = [
    {
        path: '/test',
        component: () => import('./src/test')
    }
    ,{
    path: '/',
        component:() => import('./src/App')
    }
]
const router = createRouter(
    {
        route,
        history: createWebHashHistory()
}
)
export default router
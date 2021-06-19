import {createRouter, createWebHistory} from 'vue-router'

const home = () => import('views/home/home.vue');
const category = () => import('views/category/category.vue');
const profile = () => import('views/profile/profile.vue');
const shopcart = () => import('views/shopcart/shopcart.vue');
const detail = () => import('views/detail/detail.vue')

const routes = [
    {
        path: '/',
        component: home,
        meta: {
            title: 'Book Storm 首页'
        }
    },
    {
        path: '/home',
        component: home,
        meta: {
            title: 'Book Storm 首页'
        }
    },
    {
        path: '/category',
        component: category,
        meta: {
            title: 'Book Storm 分类'
        }

    },
    {
        path: '/profile',
        component: profile,
        meta: {
            title: 'Book Storm 我的'

        }

    },
    {
        path: '/shopcart',
        component: shopcart,
        meta: {
            title: 'Book Storm 购物车'
        }


    },
    {
        path: '/detail',
        component: detail,
        meta: {
            title: 'Book Storm 详细'
        }
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {

    next();
    document.title = to.meta.title;

})


export default router

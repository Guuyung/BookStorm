import {createRouter, createWebHistory} from 'vue-router'
import {Notify} from "vant";
import store from '../store'

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
            title: 'Book Storm 首页',
            keepAlive: true
        }
    },
    {
        path: '/home',
        component: home,
        meta: {
            title: 'Book Storm 首页',
            keepAlive: true
        }
    },
    {
        path: '/category',
        component: category,
        meta: {
            title: 'Book Storm 分类',
            keepAlive: true
        }

    },
    {
        name: 'profile',
        path: '/profile',
        component: profile,
        meta: {
            title: 'Book Storm 我的',
            //是否需要登录后才能访问
            isAuthRequired: true


        }

    },
    {
        path: '/shopcart',
        component: shopcart,
        meta: {
            title: 'Book Storm 购物车',
            isAuthRequired: true
        }


    },
    {
        name: 'detail',
        path: '/detail',
        component: () => import('../views/detail/detail'),
        meta: {
            title: 'Book Storm 详细',

        }
    },
    {
        path: '/sign',
        component: () => import('../views/profile/sign'),
        meta: {
            title: '注册',

        }
    },
    {
        path: '/login',
        component: () => import('../views/profile/login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/collections',
        component: () => import('../views/collections/collections'),
        meta: {
            title: '我的收藏',
            isAuthRequired: true
        }
    },

    {
        name: 'address',
        path: '/address',
        component: () => import('../views/addressMng/addressAdd'),
        meta: {
            title: '',
            isAuthRequired: true
        }
    },
    {
        path: '/addresslist',
        component: () => import('../views/addressMng/addresslist'),
        meta: {
            title: '地址管理',
            isAuthRequired: true
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/error'),
        meta: {
            title: '找不到该资源',
        }
    },
    {
        path: '/orderpreview',
        component: () => import('../views/order/orderPreview'),
        meta: {
            title: '订单预览',
            isAuthRequired: true
        }
    },
    {
        path: '/orderlist',
        component: () => import('../views/order/orderList'),
        meta: {
            title: '订单列表',
            isAuthRequired: true
        }
    },
    {
        path: '/orderdetail',
        component: () => import('../views/order/orderDetail'),
        meta: {
            title: '订单详情',
            isAuthRequired: true
        }
    },    {
        path: '/profileupdate',
        component: () => import('../views/profile/profileupdate'),
        meta: {
            title: '账号管理',
            isAuthRequired: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {

    if (to.meta.isAuthRequired && store.state.isLogin == false) {
        Notify({type: 'warning', message: '请先登录'});
        return next('/login');
    } else {
        next();
        document.title = to.meta.title;
    }

})


export default router

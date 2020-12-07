import Layout from '@/components/layout/index'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
export const constantRoutes = [{
    path: '/',
    component: Layout,
    redriect: '/index',
    meta: {
        title: '首页',
        icon: 'home-4-line'
    }
},
{
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
},
{
    path: '/403',
    name: '403',
    component: () => import('@/views/custom-error/403'),
    hidden: true,
},
{
    path: '/404',
    name: '404',
    component: () => import('@/views/custom-error/404'),
    hidden: true,
},
]
export const asyncRoutes = []

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: constantRoutes,
})

export default router
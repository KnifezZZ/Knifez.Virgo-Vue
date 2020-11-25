import { createRouter, createWebHashHistory } from 'vue-router'
export const constantRoutes = [
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
    history: createWebHashHistory(),
    routes: constantRoutes,
})

export default router
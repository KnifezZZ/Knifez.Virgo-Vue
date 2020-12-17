import Layout from '@/components/layout/index'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
export const constantRoutes = [
	{
		path: '/',
		component: Layout,
		name: 'home',
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => {
					return import('@/views/dashboard/index.vue')
				},
				name: 'Dashboard',
				meta: {
					title: '面板',
					icon: 'home-4',
					affix: true,
				},
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
		],
	},
	{
		path: '/login',
		component: () => import('@/views/login'),
		hidden: true,
	},
]
export const asyncRoutes = []

const router = createRouter({
	history: createWebHistory(),
	scrollBehavior: (to, from, savedPosition) => {
		if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	},
	routes: constantRoutes,
})

export default router

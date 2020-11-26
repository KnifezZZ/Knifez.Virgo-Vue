/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from '@/router'
import store from '@/store'
import title from '@/configs'
import {
    authentication,
    loginInterception,
    recordRoute,
    routesWhiteList,
} from '@/configs/index'
NProgress.configure({ showSpinner: false });
/**
 * @param {页面标题} pageTitle 
 */
const getPageTitle = (pageTitle) => {
    let newTitles = []
    if (pageTitle) newTitles.push(pageTitle)
    if (title) newTitles.push(title)
    return newTitles.join('-')
}

router.beforeEach(async (to, from, next) => {
    debugger
    NProgress.start();
    let hasToken = store.getters['user/token']
    if (!loginInterception) hasToken = true

    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            if (store.getters['user/token'].length > 0) {

            }
            const hasRoles = store.getters['user/admin']
            if (hasRoles) {
                next()
            } else {
                try {
                    if (loginInterception) {
                        await store.dispatch('user/getUserInfo')
                    }

                    let accessRoutes = []
                    if (authentication === 'intelligence') {
                        accessRoutes = await store.dispatch('routes/setRoutes')
                    } else if (authentication === 'all') {
                        accessRoutes = await store.dispatch('routes/setAllRoutes')
                    }
                    accessRoutes.forEach((item) => {
                        router.addRoute(item)
                    })

                    next({ ...to, replace: true })
                } catch {
                    await store.dispatch('user/resetAll')
                    NProgress.done();
                    if (recordRoute)
                        next({
                            path: '/login',
                            query: { redirect: to.path },
                            replace: true,
                        })
                    else next({ path: '/login', replace: true })
                }
            }
        }
    } else {
        if (routesWhiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            NProgress.done();
            if (recordRoute)
                next({ path: '/login', query: { redirect: to.path }, replace: true })
            else next({ path: '/login', replace: true })
        }
    }
})
router.afterEach((to) => {
    NProgress.done();
    document.title = getPageTitle(to.meta.title)
})

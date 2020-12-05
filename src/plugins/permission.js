/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from '@/router'
import store from '@/store'
import {
    title,
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
    NProgress.start();
    let hasToken = store.getters['user/token']
    //不开启登录拦截或白名单
    if (!loginInterception || routesWhiteList.indexOf(to.path) !== -1) {
        next()
    } else {
        debugger
        //cookie验证存在
        if (hasToken) {
            if (to.path === '/login') {
                next({ path: '/' })
            } else {
                debugger
                const hasRoles = store.getters['user/roles'].length > 0
                if (hasRoles) {
                    //无匹配路由跳转404
                    if (to.matched.length !== 0) {
                        next()
                    } else {
                        next("/404");
                    }
                } else {
                    try {
                        await store.dispatch('user/getUserInfo')
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
            //跳转登录是否记录当前路由
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

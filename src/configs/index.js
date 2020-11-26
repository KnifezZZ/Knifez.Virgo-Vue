const configs = {
    headerApi: "/api",
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: 'KnifeZ.Virgo with Vue',
    /**
     * @description 系统名称
     */
    projectName: 'KnifeZ.VirGo',
    /**
     * @description 版本号
     */
    version: process.env.VUE_APP_VERSION,
    /**
     * debugger调试
     */
    development: process.env.NODE_ENV !== "production",
    /**
     *  cookies 过期时间
     */
    cookiesExpires: 365,
    /**
     * iframe 嵌入页面标示
     */
    staticPage: "@StaticPage",
    /**
     * intelligence（前端导出路由）和all（后端导出路由）两种方式
     */
    authentication: 'all',
    /**
     * 是否开启登录拦截
     */
    loginInterception: false,
    /**
     * cookie前缀
     */
    cookiePre: 'KV',
    /**
     * token失效回退到登录页时是否记录本次的路由
     */
    recordRoute: true,
    /**
     * 路由白名单，不参与登录校验
     */
    routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
}

module.exports = Object.assign({}, configs)
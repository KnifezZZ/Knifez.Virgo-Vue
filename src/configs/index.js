export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: 'KnifeZ.Virgo with Vue',
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
}
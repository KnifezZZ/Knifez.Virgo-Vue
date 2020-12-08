const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}
const { version, author } = require('./package.json')
process.env.VUE_APP_VERSION = version
process.env.VUE_APP_AUTHOR = author || 'KnifeZ'
// gzip压缩
const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    //ant-design 默认主题色
                    modifyVars: {
                        'primary-color': '#512bd4',
                        'primary-color-1': '#7551e0',
                        'link-color': '#1DA57A',
                        'border-radius-base': '2px',
                    },
                    javascriptEnabled: true,
                },
            },
        },
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                resolve: {
                    alias: {
                        '@': resolve('src'),
                        '*': resolve(''),
                    },
                },
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
                        threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
                        deleteOriginalAssets: false, // 是否删除原文件
                        minRatio: 0.8
                    })
                ]
            }
        }
    },
    chainWebpack (config) {
        config.resolve.symlinks(true)
        config.module.rule('svg').exclude.add(resolve('src/icon/remixIcon')).end()
        config.module
            .rule('remixIcon')
            .test(/\.svg$/)
            .include.add(resolve('src/icon/remixIcon'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'remix-icon-[name]' })
            .end()
    },
    devServer: {
        proxy: {
            '/api': {
                target: `https://localhost:44379/api`,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
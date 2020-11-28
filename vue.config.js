const path = require('path')
const resolve = (dir) => {
    return path.join(__dirname, dir)
}
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
        // hot: true,
        // port: 44379,
        // open: true,
        // noInfo: false,
        // overlay: {
        //     warnings: true,
        //     errors: true,
        // },
        // 注释掉的地方是前端配置代理访问后端的示例
        // proxy: {
        //   [baseURL]: {
        //     target: `http://你的后端接口地址`,
        //     ws: true,
        //     changeOrigin: true,
        //     pathRewrite: {
        //       ["^/" + baseURL]: "",
        //     },
        //   },
        // },
    }
}
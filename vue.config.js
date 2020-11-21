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
    }
};
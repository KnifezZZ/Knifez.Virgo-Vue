const path = require('path')
const resolve = (dir) => {
	return path.join(__dirname, dir)
}
const { version, author } = require('./package.json')
process.env.VUE_APP_VERSION = version
process.env.VUE_APP_AUTHOR = author || 'KnifeZ'
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
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
	configureWebpack: (config) => {
		if (process.env.NODE_ENV === 'production') {
			let optimization = {
				resolve: {
					alias: {
						'@': resolve('src'),
						'*': resolve(''),
					},
				},
				plugins: [
					new CompressionWebpackPlugin({
						asset: '[path].gz[query]',
						algorithm: 'gzip',
						test: /\.js$|\.css$/, // 需要压缩的文件类型
						threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
						deleteOriginalAssets: false, // 是否删除原文件
						minRatio: 0.8,
					}),
				],
			}
			Object.assign(config, {
				optimization,
			})
		}
		Object.assign(config, {
			// 开发生产共同配置
			resolve: {
				extensions: ['.js', '.vue', '.json'], //请求本地json
				alias: {
					'@': resolve('src'),
					'*': resolve(''),
					'@c': resolve('src/components'),
				},
			},
		})
	},
	chainWebpack(config) {
		config.resolve.symlinks(true)
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icon/remixIcon'))
			.end()
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
				target: `https://localhost:44313/api`,
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
}

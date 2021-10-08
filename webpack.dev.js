const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.resolve(__dirname, './dist')
		},
		open: true,
		compress: true,
		port: 5000,
		hot: true
	},
	devtool: 'source-map',
	module: {
		rules: [
			// CSS, PostCSS, and Sass
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			}
		]
	}
})

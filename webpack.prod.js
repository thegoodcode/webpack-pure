const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const common = require('./webpack.common.js')
const path = require('path')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
	output: {
		publicPath: './',
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[contenthash].bundle.js'
	},
	mode: 'production',
	devtool: false,
	module: {
		rules: [
			// CSS, PostCSS, and Sass
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: true
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		// Extracts CSS into separate files
		new MiniCssExtractPlugin({
			filename: '/styles/[name].[contenthash].css',
			chunkFilename: '[id].css'
		})
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), '...'],
		runtimeChunk: {
			name: 'runtime'
		}
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}
})

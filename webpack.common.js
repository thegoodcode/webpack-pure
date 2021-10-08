const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
// const CopyPlugin = require('copy-webpack-plugin')

let htmlPageNames = ['example1', 'example2']
let multipleHtmlPlugins = htmlPageNames.map(name => {
	return new HtmlWebpackPlugin({
		template: path.resolve(__dirname, `./src/${name}.html`),
		filename: `${name}.html`,
		title: name,
		chunks: [`${name}`]
	})
})

module.exports = {
	// Where webpack looks to start building the bundle
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
		example1: path.resolve(__dirname, './src/example1.js'),
		example2: path.resolve(__dirname, './src/example2.js')
	},
	// Where webpack outputs the assets and bundles
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),
		// Copies files from target to destination folder
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: paths.public,
		// 			to: 'assets',
		// 			globOptions: {
		// 				ignore: ['*.DS_Store']
		// 			},
		// 			noErrorOnMissing: true
		// 		}
		// 	]
		// }),
		// Generates an HTML file from a template & deprecation warning
		// new HtmlWebpackPlugin({
		// 	title: 'webpack boilerplate',
		// 	favicon: paths.src + '/images/favicon.png',
		// 	template: paths.src + '/template.html', // template file
		// 	filename: 'index.html' // output file
		// })
		new HtmlWebpackPlugin({
			title: 'webpack boilerplate',
			template: path.resolve(__dirname, './src/template.html'),
			filename: 'index.html',
			chunks: ['main']
		})
	].concat(multipleHtmlPlugins),
	// Determine how modules within the project are treated
	module: {
		rules: [
			// JavaScript: Use Babel to transpile JavaScript files
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},

			// Images: Copy image files to build folder
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource'
			},

			// Fonts and SVGs: Inline files
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline'
			}
		]
	}
	// resolve: {
	// 	modules: [path.resolve(__dirname, './src', 'node_modules')],
	// 	extensions: ['.js', '.jsx', '.json'],
	// 	alias: {
	// 		'@': path.resolve(__dirname, './src')
	// 	}
	// }
}
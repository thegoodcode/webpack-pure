const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

let htmlPageNames = ['example1', 'example2']
let multipleHtmlPlugins = htmlPageNames.map(name => {
	return new HtmlWebpackPlugin({
		template: path.resolve(__dirname, `./src/${name}.html`),
		favicon: path.resolve(__dirname, `./src/images/${name}-favicon.png`),
		filename: `${name}.html`,
		title: name,
		chunks: [`${name}`]
	})
})

module.exports = {
	// Where webpack looks to start building the bundle
	entry: {
		main: path.resolve(__dirname, './src/js/index.js'),
		example1: path.resolve(__dirname, './src/js/example1.js'),
		example2: path.resolve(__dirname, './src/js/example2.js')
	},
	// Where webpack outputs the assets and bundles
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	plugins: [
		// Removes/cleans build folders and unused assets when rebuilding
		new CleanWebpackPlugin(),
		// Generates an HTML file from a template & deprecation warning
		new HtmlWebpackPlugin({
			title: 'webpack boilerplate',
			template: path.resolve(__dirname, './src/template.html'),
			favicon: path.resolve(__dirname, './src/images/template-favicon.png'),
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
}

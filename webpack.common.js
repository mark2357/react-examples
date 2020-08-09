const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// the app entry point is /src/index.js
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		// the output of the webpack build will be in /dist directory
		path: path.resolve(__dirname, 'dist'),
		// the filename of the JS bundle will be bundle.js
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				// for any file with a suffix of js or jsx
				test: /\.(js|jsx)$/,
				// ignore transpiling JavaScript from node_modules as it should be that state
				exclude: /node_modules/,
				// use the babel-loader for transpiling JavaScript to a suitable format
				loader: 'babel-loader',
				options: {
					// attach the presets to the loader (most projects use .babelrc file instead)
					presets: [
						"@babel/preset-env",
						"@babel/preset-react"
					],
					plugins: [
						"@babel/plugin-proposal-class-properties"
					]
				}
			},
			{
				test: /\.(s[ac]ss|css)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.jsx', '.js', '.json'],
	},
	devServer: {
		historyApiFallback: true,
	},
	// add a custom index.html as the template
	plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') })]
};